const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyContract", function () {
  let myContract;
  let owner, addr1;

  beforeEach(async function () {
    // Get signers
    [owner, addr1] = await ethers.getSigners();
    
    // Deploy the contract for each test
    const MyContract = await ethers.getContractFactory("MyContract");
    myContract = await MyContract.deploy("BlockchainSimulation", 100);
    await myContract.deploymentTransaction().wait();
  });

  it("should have the correct initial name and value", async function () {
    const name = await myContract.name();
    const value = await myContract.value();
    
    expect(name).to.equal("BlockchainSimulation");
    expect(value).to.equal(100);
  });

  it("should update value correctly", async function () {
    await myContract.setValue(200);
    const updatedValue = await myContract.getValue();
    expect(updatedValue).to.equal(200);
  });

  it("should emit the ValueChanged event", async function () {
    await expect(myContract.setValue(300))
      .to.emit(myContract, "ValueChanged")
      .withArgs(300);
  });
});