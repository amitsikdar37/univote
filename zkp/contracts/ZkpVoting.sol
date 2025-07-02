 // SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./Verifier.sol"; // Verifier.sol abhi bhi zaroori hai
import "@openzeppelin/contracts/utils/Strings.sol";

contract ZkpVoting {
    using Strings for uint256;

    //--- ZKP Votings se jude State Variables ---
    address public admin; // Global admin (contract deployer)
    Verifier public verifier;
    uint256 private nextElectionCounter;

    //--- VoterRegistry se merge kiye gaye State Variables ---
    // Yeh mapping sabhi registered commitments ko globally store karti hai.
    // bytes32 commitment => boolean (true agar registered hai)
    mapping(bytes32 => bool) public commitments;

    //--- Events ---
    event VoterRegistered(bytes32 indexed commitment); // VoterRegistry se
    event ElectionCreated(string indexed electionId, string name, uint endTime);
    event Voted(string indexed electionId, uint candidateIndex);
    event ElectionEnded(string indexed electionId);

    //--- Structs ---
    struct Election {
        string name;
        address electionAdmin; // Har election ka apna admin ho sakta hai
        uint endTime;
        bool isActive;
        bool isEnded;
        uint totalVotes;
        uint candidateCount;
        mapping(uint => string) candidates;
        mapping(bytes32 => bool) nullifierHashes;
        mapping(uint => uint) candidateVotes;
    }

    mapping(string => Election) private elections;
    mapping(string => bool) private existingIds;
    mapping(uint => string) private idByCounter;

    //--- Constructor ---
    // Ab constructor sirf verifier ka address lega.
    constructor(address _verifier) {
        admin = msg.sender; // Contract deploy karne wala global admin ban jaayega
        verifier = Verifier(_verifier);
    }

    //--- Modifiers ---
    modifier onlyGlobalAdmin() {
        require(msg.sender == admin, "Only the global contract admin can call this");
        _;
    }

    modifier onlyElectionAdmin(string memory _electionId) {
        require(msg.sender == elections[_electionId].electionAdmin, "Only the election admin can call this");
        _;
    }

    modifier electionExists(string memory _electionId) {
        require(existingIds[_electionId], "Election doesn't exist");
        _;
    }

    //==============================================================
    //== VOTER REGISTRY FUNCTIONS (MERGED) ==
    //==============================================================

    /**
     * @notice Ek naye voter ka commitment register karta hai.
     * @dev Sirf global admin hi is function ko call kar sakta hai.
     */
    function addCommitment(bytes32 _commitment) external onlyGlobalAdmin {
        require(_commitment != bytes32(0), "Commitment cannot be zero.");
        require(!commitments[_commitment], "Commitment already registered.");

        commitments[_commitment] = true;
        emit VoterRegistered(_commitment);
    }

    /**
     * @notice Ek saath kai voters ke commitments ko register karta hai.
     */
    function addCommitmentsInBatch(bytes32[] calldata _commitments) external onlyGlobalAdmin {
        for (uint i = 0; i < _commitments.length; i++) {
            bytes32 _commitment = _commitments[i];
            if (_commitment != bytes32(0) && !commitments[_commitment]) {
                commitments[_commitment] = true;
                emit VoterRegistered(_commitment);
            }
        }
    }

    /**
     * @notice Check karta hai ki koi commitment registered hai ya nahi.
     */
    function isRegistered(bytes32 _commitment) public view returns (bool) {
        return commitments[_commitment];
    }


    //==============================================================
    //== ZKP VOTING FUNCTIONS ==
    //==============================================================

    function createElection(
        string memory _name,
        uint _durationInMinutes,
        string[] memory _candidateNames
    ) external returns (string memory newElectionId) {
        require(_candidateNames.length >= 2, "Need min 2 candidates");

        nextElectionCounter++;
        newElectionId = string(abi.encodePacked("uni-vote-", nextElectionCounter.toString()));

        require(!existingIds[newElectionId], "Internal duplicate ID error");

        Election storage e = elections[newElectionId];
        e.name = _name;
        e.electionAdmin = msg.sender; // Election banane wala uska admin hoga
        e.endTime = block.timestamp + (_durationInMinutes * 1 minutes);
        e.isActive = true;
        e.candidateCount = _candidateNames.length;

        for (uint i = 0; i < _candidateNames.length; i++) {
            e.candidates[i] = _candidateNames[i];
        }

        existingIds[newElectionId] = true;
        idByCounter[nextElectionCounter] = newElectionId;

        emit ElectionCreated(newElectionId, _name, e.endTime);
        return newElectionId;
    }

    function voteWithZKProof(
        string memory _electionId,
        uint[2] calldata a,
        uint[2][2] calldata b,
        uint[2] calldata c,
        uint[4] calldata input,
        uint candidateIndex
    ) external electionExists(_electionId) {
        Election storage e = elections[_electionId];
        require(e.isActive, "Election not active");
        require(block.timestamp <= e.endTime, "Voting closed");
        
        bytes32 nullifier = bytes32(input[0]);
        bytes32 commitment = bytes32(input[3]);

        // <<<<<<<<<<< YAHAN BADLAV HUA HAI >>>>>>>>>>>>
        // Ab hum seedhe isi contract ke 'isRegistered' function ko call kar rahe hain.
        require(isRegistered(commitment), "Voter commitment not registered");
        
        require(!e.nullifierHashes[nullifier], "Double vote: This proof has already been used");
        require(candidateIndex < e.candidateCount, "Invalid candidate");

        bool valid = verifier.verifyProof(a, b, c, input);
        require(valid, "Invalid ZK proof");

        e.nullifierHashes[nullifier] = true;
        e.totalVotes++;
        e.candidateVotes[candidateIndex]++;

        emit Voted(_electionId, candidateIndex);
    }

    function endElection(string memory _electionId) external onlyElectionAdmin(_electionId) electionExists(_electionId) {
        Election storage e = elections[_electionId];
        require(!e.isEnded, "Already ended");
        e.isActive = false;
        e.isEnded = true;
        emit ElectionEnded(_electionId);
    }

    //--- Baaki ke saare 'view' functions waise hi rahenge ---
    function showResult(string memory _electionId) public view returns (bool) {
        Election storage e = elections[_electionId];
        return e.isEnded || block.timestamp > e.endTime;
    }

    function getCandidateName(string memory _electionId, uint index) public view returns (string memory) {
        return elections[_electionId].candidates[index];
    }

    function getCandidateCount(string memory _electionId) public view returns (uint) {
        return elections[_electionId].candidateCount;
    }

    function getVotesForCandidate(string memory _electionId, uint index) public view returns (uint) {
        return elections[_electionId].candidateVotes[index];
    }

    function getTotalVotes(string memory _electionId) public view returns (uint) {
        return elections[_electionId].totalVotes;
    }

    function getGeneratedElectionId(uint counter) public view returns (string memory) {
        return idByCounter[counter];
    }

    function getNextElectionCounter() public view returns (uint) {
        return nextElectionCounter;
    }
}