// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Block.sol";

contract Blockchain {
    Block[] public blocks;
    uint8 public difficulty = 2; // Difficulty for proof-of-work
    
    event BlockAdded(uint256 index, address blockAddress);
    
    constructor() {
        // Create genesis block
        string[] memory genesisTransactions = new string[](1);
        genesisTransactions[0] = "Genesis Block";
        
        Block genesisBlock = new Block(
            0,
            genesisTransactions,
            bytes32(0)
        );
        
        // Mine the genesis block
        genesisBlock.mine(difficulty);
        
        blocks.push(genesisBlock);
        emit BlockAdded(0, address(genesisBlock));
    }
    
    // Add a new block to the chain
    function addBlock(string[] memory _transactions) public {
        require(blocks.length > 0, "Genesis block does not exist");
        
        // Get the last block
        Block lastBlock = blocks[blocks.length - 1];
        
        // Create new block
        Block newBlock = new Block(
            blocks.length,
            _transactions,
            lastBlock.currentHash()
        );
        
        // Mine the new block
        newBlock.mine(difficulty);
        
        // Add to chain
        blocks.push(newBlock);
        emit BlockAdded(blocks.length - 1, address(newBlock));
    }
    
    // Validate the blockchain's integrity
    function validateChain() public view returns (bool) {
        if (blocks.length <= 1) {
            return true; // Only genesis block
        }
        
        for (uint i = 1; i < blocks.length; i++) {
            Block currentBlock = blocks[i];
            Block previousBlock = blocks[i-1];
            
            // Check if current hash matches calculated hash
            if (currentBlock.currentHash() != currentBlock.calculateHash(currentBlock.nonce())) {
                return false;
            }
            
            // Check if previous hash reference is correct
            if (currentBlock.previousHash() != previousBlock.currentHash()) {
                return false;
            }
        }
        
        return true;
    }
    
    // Get the chain length
    function getChainLength() public view returns (uint256) {
        return blocks.length;
    }
}