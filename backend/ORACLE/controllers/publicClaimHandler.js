


const { ethers } = require("ethers");
const circomlib = require('circomlibjs');
const crypto = require('crypto');
// Is file mein ab Voters ya ElectionCriteria model ki zaroorat nahi hai.

// Poseidon instance ko yahan sirf declare karein.
let poseidonInstance;

// Helper functions (yeh waise hi rahenge)
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
// ===== SIMPLIFIED `checkPublicClaim` FUNCTION (FOR TESTING) =====
// =================================================================

exports.checkPublicClaim = async (req, res) => {
    try {
        // Initialize Poseidon if not already done
        if (!poseidonInstance) {
            poseidonInstance = await circomlib.buildPoseidon();
            console.log("Poseidon instance initialized on first API request.");
        }

        console.log("Entering simplified CheckPublicClaim for testing...");

        // Step 1: Get the logged-in user's email
        // const { email } = req.user;
        // if (!email) {
        //     // Agar user logged-in nahi hai, to error bhejein
        //     return res.status(401).json({ message: "User not logged in or email not found in token." });
        // }

        const { email } = req.user;
if (!email) {
  return res.status(401).json({ message: "User not logged in or email not found in token." });
}

        // =============================================================
        // ===== ELIGIBILITY CHECK HATA DIYA GAYA HAI (REMOVED) =====
        // Har logged-in user ko ab eligible maana jaayega.
        // =============================================================

        // Step 2: Generate credentials for the user
        const userSecret = generateUserSecret(email);
        const commitment = generateCommitmentFromSecret(userSecret);

        console.log(`Bypassing eligibility for ${email}. Sending commitment for voting.`);

        // Step 3: Always return success with eligibility as true
        return res.status(200).json({
            eligible: true,
            publicRegisteredCommitment: commitment,
            secret: userSecret,
        });

    } catch (error) {
        console.error('Error in simplified checkPublicClaim:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};