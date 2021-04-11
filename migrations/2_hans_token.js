const HansToken = artifacts.require("HansToken");

module.exports = function (deployer) {
  deployer.deploy(HansToken, 1000);
};
