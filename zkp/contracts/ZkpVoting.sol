 // SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./Verifier.sol";
import "./VoterRegistry.sol";
import "@openzeppelin/contracts/utils/Strings.sol";


contract ZkpVoting {
    using Strings for uint256;

    Verifier public verifier;
    VoterRegistry public voterRegistry;
    uint256 private nextElectionCounter;

    constructor(address _verifier, address _registry) {
        verifier = Verifier(_verifier);
        voterRegistry = VoterRegistry(_registry);
    }

    struct Election {
        string name;
        address admin;
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

    // EVENTS
    event ElectionCreated(string indexed electionId, string name, uint endTime);
    event Voted(string indexed electionId, uint candidateIndex);
    event ElectionEnded(string indexed electionId);

    modifier onlyAdmin(string memory _electionId) {
        require(msg.sender == elections[_electionId].admin, "Only admin");
        _;
    }

    modifier electionExists(string memory _electionId) {
        require(existingIds[_electionId], "Election doesn't exist");
        _;
    }

    // === 1. Create Election ===
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
        e.admin = msg.sender;
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

    // === 2. Vote with ZK Proof (Corrected Version) ===
    function voteWithZKProof(
        string memory _electionId,
        uint[2] calldata a,
        uint[2][2] calldata b,
        uint[2] calldata c,
        uint[4] calldata input, // This array comes from snarkjs
        uint candidateIndex
    ) external electionExists(_electionId) {
        Election storage e = elections[_electionId];
        require(e.isActive, "Election not active");
        require(block.timestamp <= e.endTime, "Voting closed");
        
        // === YAHAN CHANGES HAIN: Sahi Index ka Istemal ===
        // Based on your circom file: [nullifierHash, publicClaim, publicAttestationNonce, publicRegisteredCommitment]

        // 1. Nullifier ko check karna
        // nullifierHash circuit ka output hai, jo hamesha index 0 par hota hai
        bytes32 nullifier = bytes32(input[0]);
        require(!e.nullifierHashes[nullifier], "Double vote: This proof has already been used");

        // 2. Voter registration ko check karna
        // publicRegisteredCommitment teesra public input tha, jo array mein index 3 par aayega
        bytes32 commitment = bytes32(input[3]);
        require(voterRegistry.isRegistered(commitment), "Voter commitment not registered");
        
        // Baaki ke checks
        require(candidateIndex < e.candidateCount, "Invalid candidate");

        // ZK Proof ko verify karna
        bool valid = verifier.verifyProof(a, b, c, input);
        require(valid, "Invalid ZK proof");

        // Vote cast karna
        e.nullifierHashes[nullifier] = true;
        e.totalVotes++;
        e.candidateVotes[candidateIndex]++;

        emit Voted(_electionId, candidateIndex);
    }

    // === Baaki ke functions waise hi rahenge ===
    function endElection(string memory _electionId) external onlyAdmin(_electionId) electionExists(_electionId) {
        Election storage e = elections[_electionId];
        require(!e.isEnded, "Already ended");
        e.isActive = false;
        e.isEnded = true;
        emit ElectionEnded(_electionId);
    }

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
