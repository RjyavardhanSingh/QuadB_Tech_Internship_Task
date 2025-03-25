// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Block {
    uint256 public index;
    uint256 public timestamp;
    string[] public transactions;
    bytes32 public previousHash;
    bytes32 public currentHash;
    uint256 public nonce;
    
    event BlockMined(uint256 index, bytes32 hash, uint256 nonce);
    
    constructor(
        uint256 _index,
        string[] memory _transactions,
        bytes32 _previousHash
    ) {
        index = _index;
        timestamp = block.timestamp;
        transactions = _transactions;
        previousHash = _previousHash;
        
        // Calculate initial hash
        currentHash = calculateHash(0);
    }
    
    // Calculate hash based on block data
    function calculateHash(uint256 _nonce) public view returns (bytes32) {
        return keccak256(
            abi.encodePacked(
                index,
                timestamp,
                _transactionsToBytes(),
                previousHash,
                _nonce
            )
        );
    }
    
    // Helper to convert transactions array to bytes
    function _transactionsToBytes() internal view returns (bytes memory) {
        bytes memory result;
        for (uint i = 0; i < transactions.length; i++) {
            result = abi.encodePacked(result, transactions[i]);
        }
        return result;
    }
    
    // Simple proof-of-work: find a hash with leading zeros
    function mine(uint8 difficulty) public {
        bytes32 target = bytes32(
            (2**(256 - uint256(difficulty))) - 1
        );
        
        uint256 attemptedNonce = 0;
        bytes32 hash;
        
        while(true) {
            hash = calculateHash(attemptedNonce);
            if (uint256(hash) < uint256(target)) {
                break;
            }
            attemptedNonce++;
        }
        
        nonce = attemptedNonce;
        currentHash = hash;
        
        emit BlockMined(index, currentHash, nonce);
    }
    
    // Get all transactions
    function getTransactions() public view returns (string[] memory) {
        return transactions;
    }
}