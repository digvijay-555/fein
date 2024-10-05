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
      accounts: ["0x310c45f770d5d01ae3335574980a7fb56784a6f8bbdb8e2053f1e46fe596273e"] // Using private key from .env (optional)
    }
  }
};
