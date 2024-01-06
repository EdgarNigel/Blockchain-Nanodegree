// migrating the appropriate contracts
// var SquareVerifier = artifacts.require("./SquareVerifier.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");
var Verifier = artifacts.require("./Verifier.sol");

module.exports = function(deployer) {
  // deployer.deploy(SquareVerifier);
  deployer.deploy(Verifier);
  deployer.deploy(SolnSquareVerifier);
};
