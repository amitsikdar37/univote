// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./Verifier.sol";
// import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Strings.sol";


contract ZkpVoting {
    using Strings for uint256;

    Verifier public verifier;
    uint256 private nextElectionCounter;

    constructor(address _verifier) {
        verifier = Verifier(_verifier);
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

    // === 2. Vote with ZK Proof ===
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
        require(!e.nullifierHashes[bytes32(input[1])], "Double vote");
        require(candidateIndex < e.candidateCount, "Invalid candidate");

        bool valid = verifier.verifyProof(a, b, c, input);
        require(valid, "Invalid ZK proof");

        e.nullifierHashes[bytes32(input[1])] = true;
        e.totalVotes++;
        e.candidateVotes[candidateIndex]++;

        emit Voted(_electionId, candidateIndex);
    }

    // === 3. Admin Ends Election Manually ===
    function endElection(string memory _electionId) external onlyAdmin(_electionId) electionExists(_electionId) {
        Election storage e = elections[_electionId];
        require(!e.isEnded, "Already ended");
        e.isActive = false;
        e.isEnded = true;
        emit ElectionEnded(_electionId);
    }

    // === 4. Result Visibility ===
    function showResult(string memory _electionId) public view returns (bool) {
        Election storage e = elections[_electionId];
        return e.isEnded || block.timestamp > e.endTime;
    }

    // === 5. Getters ===
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
