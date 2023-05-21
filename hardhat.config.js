require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337
    },
    goerli: {
      url: process.env.GOERLI_RPC_URL,
      accounts: [process.env.ACCOUNT],
      chainId: 5
    },
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,
      accounts: [process.env.ACCOUNT],
      chainId: 11155111
    }
  },
  etherscan: {
    apiKey: {
      sepolia: process.env.ETH_API
    }
  }

};