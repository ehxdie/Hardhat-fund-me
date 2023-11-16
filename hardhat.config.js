require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  defaultNetwork: "hardhat",
  networks: {
    sepolia: {
      url: process.env.RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
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
