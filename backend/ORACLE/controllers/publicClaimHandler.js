const circomlib = require('circomlibjs'); // Make sure you use circomlibjs for Poseidon
const crypto = require('crypto');
let poseidonInstance;
(async () => {
  poseidonInstance = await circomlib.buildPoseidon();
})();

const Voters = require('../../models/voter');
const ElectionCriteria = require('../../models/election_criteria');

// === Generate the secret ===
const secret = '0x' + crypto.randomBytes(32).toString('hex');

function sha256ToBigInt(data) {
  const hash = crypto.createHash('sha256').update(data).digest('hex');
  return BigInt('0x' + hash);
}

function generatePublicRegisteredCommitment(userId, electionId) {
  if (!poseidonInstance) throw new Error("Poseidon not initialized yet");
  const hashOutput = poseidonInstance([BigInt(secret)]);
  const commitment = poseidonInstance.F.toString(hashOutput);
  return { commitment };
}

exports.checkPublicClaim = async (req, res) => {
  try {
    const { email } = req.user;
    const { election_id } = req.body;
    const voter = await Voters.findOne({ email });
    if (!voter) {
      return res.status(404).json({ message: 'Voter not found' });
    }

    const electionCriteria = await ElectionCriteria.findOne({ election_id });
    if (!electionCriteria) {
      return res.status(404).json({ message: 'Election criteria not found' });
    }

    const criteria = electionCriteria.criteria instanceof Map
      ? Object.fromEntries(electionCriteria.criteria)
      : electionCriteria.criteria;

    let failedCriteria = [];

    // Example checks (expand as needed)
    if (criteria.onlyIITP && !(voter.email && voter.email.endsWith("@iitp.ac.in"))) {
      failedCriteria.push('onlyIITP');
    }
    if (criteria.account10Days) {
      const accountCreatedAt = new Date(voter.createdAt);
      const accountAgeInDays = (Date.now() - accountCreatedAt.getTime()) / (1000 * 60 * 60 * 24);
      if (accountAgeInDays < 10) failedCriteria.push('account10Days');
    }
    if (criteria.completedPartX && !voter.completedPartX) {
      failedCriteria.push('completedPartX');
    }
    if (criteria.connectedGoogleAccount && !voter.googleConnected) {
      failedCriteria.push('connectedGoogleAccount');
    }

    if (failedCriteria.length > 0) {
      return res.status(403).json({
        eligible: false,
        failedCriteria
      });
    }

    // All criteria passed

    const { commitment, components } = generatePublicRegisteredCommitment(email, election_id, secret);

    return res.status(200).json({
      eligible: true,
      publicRegisteredCommitment: commitment,
      secret, // ⚠️ Remove in production
      debug_components: components // ⚠️ Remove in production
    });
  }
  catch (error) {
    console.error('Error checking public claim:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
