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
    hardhat: {
      // No specific config needed for hardhat network
    },
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    ganache: {
      url: "http://127.0.0.1:7545",  // Default Ganache network URL
      accounts: ["0x3d5b54a1299f8a172ea23d18d3f6684295c52e7095b7d234d3b52941a015d20e"] // Using private key from .env (optional)
    }
  }
};
