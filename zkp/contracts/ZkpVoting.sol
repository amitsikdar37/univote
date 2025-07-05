 // SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./Verifier.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract ZkpVoting {
    using Strings for uint256;

  
    address public admin;
    Verifier public verifier;
    uint256 private nextElectionCounter;


    mapping(bytes32 => bool) public commitments;


    event VoterRegistered(bytes32 indexed commitment);
    event ElectionCreated(string indexed electionId, string name, uint endTime);
    event Voted(string indexed electionId, uint candidateIndex);
    event ElectionEnded(string indexed electionId);

    struct Election {
        string name;
        address electionAdmin;
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

    
    constructor(address _verifier) {
        admin = msg.sender;
        verifier = Verifier(_verifier);
    }


    modifier onlyElectionAdmin(string memory _electionId) {
        require(msg.sender == elections[_electionId].electionAdmin, "Only the election admin can call this");
        _;
    }

    modifier electionExists(string memory _electionId) {
        require(existingIds[_electionId], "Election doesn't exist");
        _;
    }

    function registerCommitment(bytes32 _commitment) external {
        require(_commitment != bytes32(0), "Commitment cannot be zero.");
        require(!commitments[_commitment], "Commitment already registered.");

        commitments[_commitment] = true;
        emit VoterRegistered(_commitment);
    }

    function isRegistered(bytes32 _commitment) public view returns (bool) {
        return commitments[_commitment];
    }


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
        e.electionAdmin = msg.sender;
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

    function endElection(string memory _electionId)
        external
        onlyElectionAdmin(_electionId)
        electionExists(_electionId)
    {
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
