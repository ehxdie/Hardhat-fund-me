require("hardhat-gas-reporter");
require("dotenv").config();
require("solidity-coverage");
require("hardhat-deploy");
require("@nomiclabs/hardhat-ethers");
require("@nomicfoundation/hardhat-ethers");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      { version: "0.8.19" },
      { version: "0.6.6" },
    ]       
  },
  defaultNetwork: "hardhat",
  networks: {
    sepolia: {
      url: process.env.RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      blockConfirmations: 6,
      chainId: 11155111, 
    },
    localhost: {
      url: "http://127.0.0.1:8545/",
    }
  },
  etherscan: {
    apiKey: process.env.ETHER_SCAN_API_KEY
  },
  gasReporter: {
    enabled: false,
    outputFile: "gas-report.txt",
  },
  namedAccounts: {
    deployer: {
      default:0,
    },
    users:{
      default:1,
    }
  }
};
