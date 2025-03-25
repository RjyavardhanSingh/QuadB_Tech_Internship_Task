const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  console.log("Deploying Blockchain Simulation...");
  
  // Deploy the Blockchain contract
  const Blockchain = await ethers.getContractFactory("Blockchain");
  const blockchain = await Blockchain.deploy();
  await blockchain.deploymentTransaction().wait();
  
  const blockchainAddress = await blockchain.getAddress();
  console.log("Blockchain deployed to:", blockchainAddress);
  
  // Save the blockchain address
  fs.writeFileSync(
    './blockchain-address.txt',
    blockchainAddress
  );
  
  // Get the genesis block
  const genesisBlockAddress = await blockchain.blocks(0);
  const Block = await ethers.getContractFactory("Block");
  const genesisBlock = Block.attach(genesisBlockAddress);
  
  // Print genesis block details
  console.log("\n--- Genesis Block ---");
  console.log("Index:", (await genesisBlock.index()).toString());
  
  // Fix: Convert BigInt to Number before arithmetic operations
  const timestamp = await genesisBlock.timestamp();
  console.log("Timestamp:", new Date(Number(timestamp) * 1000).toLocaleString());
  
  console.log("Current Hash:", await genesisBlock.currentHash());
  console.log("Previous Hash:", await genesisBlock.previousHash());
  console.log("Nonce:", (await genesisBlock.nonce()).toString());
  
  // Add a new block with transactions
  console.log("\nAdding a new block...");
  await blockchain.addBlock(["Transaction 1", "Transaction 2"]);
  
  // Get the chain length
  const chainLength = await blockchain.getChainLength();
  console.log("Chain length:", chainLength.toString());
  
  // Get the new block
  const newBlockAddress = await blockchain.blocks(1);
  const newBlock = Block.attach(newBlockAddress);
  
  // Print new block details
  console.log("\n--- New Block ---");
  console.log("Index:", (await newBlock.index()).toString());
  
  // Convert BigInt to Number for the new block's timestamp too
  const newTimestamp = await newBlock.timestamp();
  console.log("Timestamp:", new Date(Number(newTimestamp) * 1000).toLocaleString());
  
  console.log("Current Hash:", await newBlock.currentHash());
  console.log("Previous Hash:", await newBlock.previousHash());
  console.log("Nonce:", (await newBlock.nonce()).toString());
  
  // Validate the chain
  console.log("\nValidating blockchain...");
  const isValid = await blockchain.validateChain();
  console.log("Is blockchain valid?", isValid);
  
  // Demonstration of tampering detection would be added here in a real implementation
  console.log("\nBlockchain simulation completed!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });