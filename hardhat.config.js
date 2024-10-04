require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("hardhat/config");

const path = require('path');

module.exports = {
  solidity: "0.8.20",
  paths: {
    sources: "./src/web3_contracts/contracts",  // Contract source directory
    tests: "./src/web3_contracts/test",         // Test files directory
    cache: "./src/web3_contracts/cache",        // Cache directory
    artifacts: "./src/web3_contracts/artifacts" // Compiled artifacts directory
  },
  networks: {
    hardhat: {},
    localhost: {
      url: "http://127.0.0.1:8545"
    },
  }
};
