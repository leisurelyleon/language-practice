// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    address public owner;
    mapping(address => bool) public hasVoted;
    mapping(bytes32 => uint256) public votesReceived;

    event Voted(address indexed voter, bytes32 candidate);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function vote(bytes32 candidate) public {
        require(!hasVoted[msg.sender], "You have already voted");
        
        votesReceived[candidate]++;
        hasVoted[msg.sender] = true;

        emit Voted(msg.sender, candidate);
    }

    function getVotesForCandidate(bytes32 candidate) public view returns (uint256) {
        return votesReceived[candidate];
    }

function declareWinner() public view onlyOwner returns (bytes32 winningCandidate) {
    uint256 maxVotes = 0;
    bytes32[] memory candidates = getCandidates();

    // Loop through candidates to find the one with the most votes
    for (uint256 i = 0; i < candidates.length; i++) {
        bytes32 candidate = candidates[i];
        if (votesReceived[candidate] > maxVotes) {
            maxVotes = votesReceived[candidate];
            winningCandidate = candidate;
        }
    }
}

    function getCandidates() public pure returns (bytes32[] memory) {
        bytes32[] memory candidateList = new bytes32[](10); // Assuming a maximum of 10 candidates
        for (uint256 i = 0; i < candidateList.length; i++) {
            candidateList[i] = bytes32(i); // Convert index to bytes32 for simplicity
        }
        return candidateList;
    }
}