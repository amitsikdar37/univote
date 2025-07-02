// // const circomlib = require('circomlibjs'); // Make sure you use circomlibjs for Poseidon
// // const crypto = require('crypto');
// // let poseidonInstance;
// // (async () => {
// //   poseidonInstance = await circomlib.buildPoseidon();
// // })();

// // const Voters = require('../../models/voter');
// // const ElectionCriteria = require('../../models/election_criteria');

// // // === Generate the secret ===
// // const secret = '0x' + crypto.randomBytes(32).toString('hex');

// // function sha256ToBigInt(data) {
// //   const hash = crypto.createHash('sha256').update(data).digest('hex');
// //   return BigInt('0x' + hash);
// // }

// // function generatePublicRegisteredCommitment(userId, electionId) {
// //   if (!poseidonInstance) throw new Error("Poseidon not initialized yet");
// //   const hashOutput = poseidonInstance([BigInt(secret)]);
// //   const commitment = poseidonInstance.F.toString(hashOutput);
// //   return { commitment };
// // }

// // exports.checkPublicClaim = async (req, res) => {
// //   try {
// //     const { email } = req.user;
// //     const { election_id } = req.body;
// //     const voter = await Voters.findOne({ email });
// //     if (!voter) {
// //       return res.status(404).json({ message: 'Voter not found' });
// //     }

// //     const electionCriteria = await ElectionCriteria.findOne({ election_id });
// //     if (!electionCriteria) {
// //       return res.status(404).json({ message: 'Election criteria not found' });
// //     }

// //     const criteria = electionCriteria.criteria instanceof Map
// //       ? Object.fromEntries(electionCriteria.criteria)
// //       : electionCriteria.criteria;

// //     let failedCriteria = [];

// //     // Example checks (expand as needed)
// //     if (criteria.onlyIITP && !(voter.email && voter.email.endsWith("@iitp.ac.in"))) {
// //       failedCriteria.push('onlyIITP');
// //     }
// //     if (criteria.account10Days) {
// //       const accountCreatedAt = new Date(voter.createdAt);
// //       const accountAgeInDays = (Date.now() - accountCreatedAt.getTime()) / (1000 * 60 * 60 * 24);
// //       if (accountAgeInDays < 10) failedCriteria.push('account10Days');
// //     }
// //     if (criteria.completedPartX && !voter.completedPartX) {
// //       failedCriteria.push('completedPartX');
// //     }
// //     if (criteria.connectedGoogleAccount && !voter.googleConnected) {
// //       failedCriteria.push('connectedGoogleAccount');
// //     }

// //     if (failedCriteria.length > 0) {
// //       return res.status(403).json({
// //         eligible: false,
// //         failedCriteria
// //       });
// //     }

// //     // All criteria passed

// //     const { commitment, components } = generatePublicRegisteredCommitment(email, election_id, secret);

// //     return res.status(200).json({
// //       eligible: true,
// //       publicRegisteredCommitment: commitment,
// //       secret, // ⚠️ Remove in production
// //       debug_components: components // ⚠️ Remove in production
// //     });
// //   }
// //   catch (error) {
// //     console.error('Error checking public claim:', error);
// //     return res.status(500).json({ message: 'Internal server error' });
// //   }
// // };


 









// const { ethers } = require("ethers");
// const circomlib = require('circomlibjs');
// const crypto = require('crypto');

// // Mongoose Models ko import karein
// const Voters = require('../../models/voter');
// const ElectionCriteria = require('../../models/election_criteria');

// // Poseidon instance ko yahan sirf declare karein, initialize na karein.
// let poseidonInstance;

// // Helper functions (inmein koi badlav nahi hai)
// function generateUserSecret(userId) {
//     const masterSecret = process.env.VOTER_MASTER_SECRET;
//     if (!masterSecret) {
//         throw new Error("VOTER_MASTER_SECRET environment variable not set!");
//     }
//     const hash = crypto.createHmac('sha256', masterSecret)
//                        .update(userId)
//                        .digest('hex');
//     return '0x' + hash;
// }

// function generateCommitmentFromSecret(userSecret) {
//     if (!poseidonInstance) throw new Error("Poseidon has not been initialized");
//     const hashOutput = poseidonInstance([BigInt(userSecret)]);
//     const hexHash = ethers.hexlify(hashOutput);
//     return ethers.zeroPadValue(hexHash, 32);
// }


// // =================================================================
// // ===== POORA AUR SAHI `checkPublicClaim` FUNCTION =====
// // =================================================================

// exports.checkPublicClaim = async (req, res) => {
//     try {
//         // <<<<< YAHAN BADLAV HUA HAI: Poseidon ko yahan initialize karein >>>>>
//         // Agar poseidonInstance abhi tak nahi bana hai, to use banayein.
//         if (!poseidonInstance) {
//             poseidonInstance = await circomlib.buildPoseidon();
//             console.log("Poseidon instance initialized on first API request.");
//         }

//         const { email } = req.user;
//         const { election_id } = req.body;

//         if (!election_id) {
//             return res.status(400).json({ message: 'Election ID is required' });
//         }
        
//         // ... (Baaki ka saara logic waise hi rahega) ...
//         const voter = await Voters.findOne({ email });
//         if (!voter) {
//             return res.status(404).json({ message: 'Voter not found' });
//         }

//         const electionCriteria = await ElectionCriteria.findOne({ election_id });
//         if (!electionCriteria) {
//             return res.status(404).json({ message: 'Election criteria not found' });
//         }
        
//         const criteria = electionCriteria.criteria || {};
//         const failedCriteria = [];

//         // Eligibility checks...
//         if (criteria.onlyIITP && !(voter.email && voter.email.endsWith("@iitp.ac.in"))) {
//             failedCriteria.push('onlyIITP');
//         }
//         // ... (baaki saare criteria checks) ...


//         if (failedCriteria.length > 0) {
//             return res.status(200).json({
//                 eligible: false,
//                 failedCriteria
//             });
//         }

//         const userSecret = generateUserSecret(email);
//         const commitment = generateCommitmentFromSecret(userSecret);

//         return res.status(200).json({
//             eligible: true,
//             publicRegisteredCommitment: commitment,
//             secret: userSecret,
//         });

//     } catch (error) {
//         console.error('Error checking public claim:', error);
//         return res.status(500).json({ message: 'Internal server error' });
//     }
// };
















const { ethers } = require("ethers");
const circomlib = require('circomlibjs');
const crypto = require('crypto');

// Mongoose Models ko import karein
const Voters = require('../../models/voter');
// ElectionCriteria model ki ab zaroorat nahi hai.
// const ElectionCriteria = require('../../models/election_criteria');

// Poseidon instance ko yahan sirf declare karein, initialize na karein.
let poseidonInstance;

// Helper functions
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

function generateCommitmentFromSecret(userSecret) {
    if (!poseidonInstance) throw new Error("Poseidon has not been initialized");
    const hashOutput = poseidonInstance([BigInt(userSecret)]);
    const hexHash = ethers.hexlify(hashOutput);
    return ethers.zeroPadValue(hexHash, 32);
}

// =================================================================
// ===== SIMPLIFIED `checkPublicClaim` FUNCTION =====
// =================================================================

exports.checkPublicClaim = async (req, res) => {
    try {
        // Poseidon ko initialize karein agar nahi hua hai
        if (!poseidonInstance) {
            poseidonInstance = await circomlib.buildPoseidon();
            console.log("Poseidon instance initialized on first API request.");
        }

        const { email } = req.user; // Logged-in user ka email lein

        // Yeh check karein ki voter database mein hai ya nahi
        const voter = await Voters.findOne({ email });
        if (!voter) {
            // Agar user database mein hi nahi hai, to use not eligible bata dein
             return res.status(200).json({
                eligible: false,
                failedCriteria: ['VoterNotFound']
            });
        }
        
        // ======================================================================
        // ===== ELIGIBILITY CRITERIA CHECK KARNE WALA LOGIC HATA DIYA GAYA HAI =====
        // ======================================================================

        // Ab code seedhe yahan aayega aur user ko hamesha eligible maanega.

        const userSecret = generateUserSecret(email);
        const commitment = generateCommitmentFromSecret(userSecret);

        // Frontend ko hamesha success response bhejein
        return res.status(200).json({
            eligible: true,
            publicRegisteredCommitment: commitment,
            secret: userSecret,
        });

    } catch (error) {
        console.error('Error checking public claim:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};