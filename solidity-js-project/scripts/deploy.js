const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {

    const contractName = 'QuadB Tech Internship Task By Rajyavardhan Singh';
    const initialValue = 120;
  // Get the contract factory
  const MyContract = await ethers.getContractFactory("MyContract");
  
  console.log("Deploying MyContract...");
  
  // Deploy with constructor parameters
  const myContract = await MyContract.deploy(contractName, initialValue);
  await myContract.deploymentTransaction().wait();
  
  const contractAddress = await myContract.getAddress();
  console.log("MyContract deployed to:", contractAddress);
  
  // Save the deployment address to a file for easier access
  fs.writeFileSync(
    './deployed-contract-address.txt',
    contractAddress
  );
  console.log('Contract address saved to deployed-contract-address.txt');
  
  // For easier verification later
  console.log("Contract constructor arguments:", [contractName, initialValue]);
}

// Execute the deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });