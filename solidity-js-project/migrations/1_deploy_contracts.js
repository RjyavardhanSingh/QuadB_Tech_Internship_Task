const MyContract = artifacts.require("MyContract");

module.exports = function (deployer) {
  // Deploy with name and initial value parameters
  deployer.deploy(MyContract, "BlockchainSimulation", 100);
};