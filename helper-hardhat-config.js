require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

// This config file will allow for the interaction with the aggregate interface depending on the network being used

const networkConfig = {
    11155111 : {
        name: "sepolia",
        ethUsdPriceFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
     },
    5: {
        name: "goerli",
         ethUsdPriceFeed: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
     } 
}

const developmentChains = ["hardhat", "localhost"];

// Setting the constructor argument for the mockv3aggregator contract deployment
const decimals = 8;
const initialAnswer = 2000000000000;
 
module.exports = {
    networkConfig,
    developmentChains,
    decimals,
    initialAnswer
}