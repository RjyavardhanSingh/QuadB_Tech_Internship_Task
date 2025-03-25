const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  try {
    let contractAddress;
    try {
      // Try to read from the file
      contractAddress = fs.readFileSync('./deployed-contract-address.txt', 'utf8');
    } catch (error) {
      console.error("Error reading contract address:", error.message);
      console.log("Please deploy the contract first using 'npm run deploy'");
      return;
    }
    
    console.log('Contract address:', contractAddress);
    
    // Get the contract factory to get the ABI
    const MyContract = await ethers.getContractFactory("MyContract");
    
    // Create contract instance
    const contract = await ethers.getContractAt("MyContract", contractAddress);
    
    // Get current values
    const name = await contract.name();
    const initialValue = await contract.getValue();
    console.log('Current name:', name);
    console.log('Current value:', initialValue.toString());
    
    // Update value
    const newValue = 500;
    console.log(`Setting new value to ${newValue}...`);
    const tx = await contract.setValue(newValue);
    await tx.wait(); // Wait for transaction to be mined
    
    // Get updated value
    const updatedValue = await contract.getValue();
    console.log('Updated value:', updatedValue.toString());
    
  } catch (error) {
    console.error("Error:", error);
  }
}

// Execute the interaction
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });