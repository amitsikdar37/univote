// const circomlib = require('circomlibjs'); // Make sure you use circomlibjs for Poseidon
// const crypto = require('crypto');
// let poseidonInstance;
// (async () => {
//   poseidonInstance = await circomlib.buildPoseidon();
// })();

// const Voters = require('../../models/voter');
// const ElectionCriteria = require('../../models/election_criteria');

// // === Generate the secret ===
// const secret = '0x' + crypto.randomBytes(32).toString('hex');

// function sha256ToBigInt(data) {
//   const hash = crypto.createHash('sha256').update(data).digest('hex');
//   return BigInt('0x' + hash);
// }

// function generatePublicRegisteredCommitment(userId, electionId) {
//   if (!poseidonInstance) throw new Error("Poseidon not initialized yet");
//   const hashOutput = poseidonInstance([BigInt(secret)]);
//   const commitment = poseidonInstance.F.toString(hashOutput);
//   return { commitment };
// }

// exports.checkPublicClaim = async (req, res) => {
//   try {
//     const { email } = req.user;
//     const { election_id } = req.body;
//     const voter = await Voters.findOne({ email });
//     if (!voter) {
//       return res.status(404).json({ message: 'Voter not found' });
//     }

//     const electionCriteria = await ElectionCriteria.findOne({ election_id });
//     if (!electionCriteria) {
//       return res.status(404).json({ message: 'Election criteria not found' });
//     }

//     const criteria = electionCriteria.criteria instanceof Map
//       ? Object.fromEntries(electionCriteria.criteria)
//       : electionCriteria.criteria;

//     let failedCriteria = [];

//     // Example checks (expand as needed)
//     if (criteria.onlyIITP && !(voter.email && voter.email.endsWith("@iitp.ac.in"))) {
//       failedCriteria.push('onlyIITP');
//     }
//     if (criteria.account10Days) {
//       const accountCreatedAt = new Date(voter.createdAt);
//       const accountAgeInDays = (Date.now() - accountCreatedAt.getTime()) / (1000 * 60 * 60 * 24);
//       if (accountAgeInDays < 10) failedCriteria.push('account10Days');
//     }
//     if (criteria.completedPartX && !voter.completedPartX) {
//       failedCriteria.push('completedPartX');
//     }
//     if (criteria.connectedGoogleAccount && !voter.googleConnected) {
//       failedCriteria.push('connectedGoogleAccount');
//     }

//     if (failedCriteria.length > 0) {
//       return res.status(403).json({
//         eligible: false,
//         failedCriteria
//       });
//     }

//     // All criteria passed

//     const { commitment, components } = generatePublicRegisteredCommitment(email, election_id, secret);

//     return res.status(200).json({
//       eligible: true,
//       publicRegisteredCommitment: commitment,
//       secret, // ⚠️ Remove in production
//       debug_components: components // ⚠️ Remove in production
//     });
//   }
//   catch (error) {
//     console.error('Error checking public claim:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// };



const { ethers } = require("ethers"); // Ethers library ko import karein
const circomlib = require('circomlibjs');
const crypto = require('crypto');

// Mongoose Models ko import karein
const Voters = require('../../models/voter');
const ElectionCriteria = require('../../models/election_criteria');

let poseidonInstance;
(async () => {
    poseidonInstance = await circomlib.buildPoseidon();
    console.log("Poseidon instance initialized for the API.");
})();

// =================================================================
// ===== SAHI HELPER FUNCTIONS =====
// =================================================================

/**
 * Har user ke liye ek unique aur constant secret generate karta hai.
 */
function generateUserSecret(userId) {
    const masterSecret = process.env.VOTER_MASTER_SECRET;
    if (!masterSecret) {
        throw new Error("VOTER_MASTER_SECRET environment variable not set!");
    }
    const hash = crypto.createHmac('sha256', masterSecret)
                       .update(userId)
                       .digest('hex');
    return '0x' + hash;
}

/**
 * User ke secret se uska commitment banata hai (SAHI TAREEKA).
 */
function generateCommitmentFromSecret(userSecret) {
    if (!poseidonInstance) throw new Error("Poseidon not initialized yet");

    // poseidon ka output ek Uint8Array hota hai.
    const hashOutput = poseidonInstance([BigInt(userSecret)]);
    
    // Ethers ka istemaal karke Uint8Array ko hex string mein badlein
    const hexHash = ethers.hexlify(hashOutput);

    // Ab is hex string ko 32 bytes me pad karein
    const paddedCommitment = ethers.zeroPadValue(hexHash, 32);

    return paddedCommitment;
}

// =================================================================
// ===== POORA AUR SAHI `checkPublicClaim` FUNCTION =====
// =================================================================

exports.checkPublicClaim = async (req, res) => {
    try {
        // Step 1: User aur Election ki jaankari prapt karein
        const { email } = req.user; // Maan rahe hain ki login ke baad user object milta hai
        const { election_id } = req.body;

        if (!election_id) {
            return res.status(400).json({ message: 'Election ID is required' });
        }

        const voter = await Voters.findOne({ email });
        if (!voter) {
            return res.status(404).json({ message: 'Voter not found' });
        }

        const electionCriteria = await ElectionCriteria.findOne({ election_id });
        if (!electionCriteria) {
            return res.status(404).json({ message: 'Election criteria not found' });
        }

        const criteria = electionCriteria.criteria || {};
        const failedCriteria = [];

        // Step 2: Eligibility Criteria Check Karein
        if (criteria.onlyIITP && !(voter.email && voter.email.endsWith("@iitp.ac.in"))) {
            failedCriteria.push('onlyIITP');
        }
        if (criteria.account10Days) {
            const accountCreatedAt = new Date(voter.createdAt);
            const accountAgeInDays = (Date.now() - accountCreatedAt.getTime()) / (1000 * 60 * 60 * 24);
            if (accountAgeInDays < 10) {
                failedCriteria.push('account10Days');
            }
        }
        if (criteria.completedPartX && !voter.completedPartX) {
            failedCriteria.push('completedPartX');
        }
        if (criteria.connectedGoogleAccount && !voter.googleConnected) {
            failedCriteria.push('connectedGoogleAccount');
        }

        // Step 3: Result Bhejein
        if (failedCriteria.length > 0) {
            // Agar user eligible nahi hai
            return res.status(200).json({ // 403 ki jagah 200 use karein taaki frontend error na samjhe
                eligible: false,
                failedCriteria
            });
        }

        // Agar user sabhi criteria pass kar leta hai
        // 1. User ke liye constant secret generate karein
        const userSecret = generateUserSecret(email);

        // 2. Us secret se commitment banayein
        const commitment = generateCommitmentFromSecret(userSecret);

        // 3. Frontend ko success response bhejein
        return res.status(200).json({
            eligible: true,
            publicRegisteredCommitment: commitment, // Sahi commitment
            secret: userSecret, // Sahi secret
        });

    } catch (error) {
        console.error('Error checking public claim:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};