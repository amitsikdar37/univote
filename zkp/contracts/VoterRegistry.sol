// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// OpenZeppelin ek standard library hai secure smart contracts ke liye.
// Isse use karne ke liye: npm install @openzeppelin/contracts
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title VoterRegistry
 * @author (Aapka Naam)
 * @notice Yeh contract ZKP-based voting system ke liye voters ke cryptographic commitments
 * ko manage karta hai. Sirf contract ka owner hi naye voters ko add kar sakta hai.
 */
contract VoterRegistry is Ownable {

    // Yeh mapping sabhi registered commitments ko store karti hai.
    // bytes32 commitment => boolean (true agar registered hai)
    mapping(bytes32 => bool) public commitments;

    // Events, jo blockchain par important actions ko log karte hain.
    event VoterRegistered(bytes32 indexed commitment);
    event BatchVotersRegistered(uint256 count);

    // Jab contract deploy hota hai, to deploy karne wala hi owner (admin) ban jaata hai.
    constructor(address initialOwner) Ownable(initialOwner) {}

    /**
     * @notice Ek naye voter ka commitment register karta hai.
     * @dev Sirf owner hi is function ko call kar sakta hai.
     * @param _commitment Voter ka unique cryptographic commitment.
     */
    function addCommitment(bytes32 _commitment) external onlyOwner {
        require(_commitment != bytes32(0), "VoterRegistry: Commitment cannot be zero.");
        require(!commitments[_commitment], "VoterRegistry: Commitment already registered.");

        commitments[_commitment] = true;
        emit VoterRegistered(_commitment);
    }

    /**
     * @notice Ek saath kai voters ke commitments ko register karta hai.
     * @dev Yeh gas fees bachane ke liye behtar hai jab bahut saare voters add karne hon.
     * @param _commitments Register karne ke liye commitments ki list (array).
     */
    function addCommitmentsInBatch(bytes32[] calldata _commitments) external onlyOwner {
        uint256 count = _commitments.length;
        for (uint i = 0; i < count; i++) {
            bytes32 _commitment = _commitments[i];
            // Hum yahan `addCommitment` wale checks dobara daal rahe hain.
            if (_commitment != bytes32(0) && !commitments[_commitment]) {
                commitments[_commitment] = true;
                emit VoterRegistered(_commitment);
            }
        }
        emit BatchVotersRegistered(count);
    }

    /**
     * @notice Check karta hai ki koi commitment registered hai ya nahi.
     * @dev Yeh ek public view function hai, jise koi bhi (aur doosre contracts bhi) call kar sakta hai.
     * @param _commitment Check karne ke liye commitment.
     * @return bool - true agar commitment registered hai, warna false.
     */
    function isRegistered(bytes32 _commitment) public view returns (bool) {
        return commitments[_commitment];
    }
}