const crypto = require('crypto');
const circomlib = require('circomlibjs');

let poseidonInstance;
(async () => {
  poseidonInstance = await circomlib.buildPoseidon();
})();

const Voters = require('../../models/voter');

const ElectionCriteria = require('../../models/election_criteria');



function sha256ToBigInt(data) {
  const hash = crypto.createHash('sha256').update(data).digest('hex');
  return BigInt('0x' + hash);
}

function generatePublicAttestationNonce(userId, electionId) {
  const userHash = sha256ToBigInt(userId);
  const electionHash = sha256ToBigInt(electionId);
  const randomField = BigInt('0x' + crypto.randomBytes(31).toString('hex')); // 248-bit

  if (!poseidonInstance) {
    throw new Error("Poseidon not initialized yet");
  }

  const hashOutput = poseidonInstance([userHash, electionHash, randomField]);
  const nonce = poseidonInstance.F.toString(hashOutput);

  return {
    nonce,
    components: {
      userHash: userHash.toString(),
      electionHash: electionHash.toString(),
      randomField: randomField.toString()
    }
  };
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

    const criteria = electionCriteria.criteria;

    const requiredDomain = criteria.get("email_domain");
    if (requiredDomain && !voter.email.endsWith(requiredDomain)) {
      return res.status(403).json({ message: 'Email domain not eligible' });
    }

    const minAccountAgeDays = criteria.get("min_account_age_days");
    if (minAccountAgeDays) {
      const accountCreatedAt = new Date(voter.createdAt);
      const accountAgeInDays = (Date.now() - accountCreatedAt.getTime()) / (1000 * 60 * 60 * 24);
      if (accountAgeInDays < minAccountAgeDays) {
        return res.status(403).json({ message: 'Account too new for this election' });
      }
    }

    // All criteria passed
    const { nonce, components } = generatePublicAttestationNonce(email, election_id);

    return res.status(200).json({
      eligible: true,
      publicAttestationNonce: nonce,
      debug_components: components // ⚠️ Remove in production
    });
  }
  catch (error) {
    console.error('Error checking public claim:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};