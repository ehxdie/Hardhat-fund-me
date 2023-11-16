// Declaring the deploy function
const { hre, network } = require("hardhat");
const { networkConfig } = require("../helper-hardhat-config");

module.exports = async (hre) => {
    // Getting the following two methods from the hardhat runtime environment
    const { getNamedAccounts, deployments } = hre;

    // grabbing even more things from the things that were grabbed
    const { deploy, log } = deployments;

    // executing the getNamedAccounts method
    const { deployer } = await getNamedAccounts();

    // getting chain id of network that we have chosen to deploy the contract to
    const chainID = network.config.chainId 

    // USING THE networkconfig  
    const ethUsdPriceFeedAddress = networkConfig[chainID]["ethUsdPriceFeed"];

    // using the features of the "hardhat-deploy" and "hardhat-deploy-ethers" packages
    // Instead of using a contract factory 
    const fundMe = await deploy("FundMe",{
          from: deployer,
          args: [ethUsdPriceFeedAddress], // This where the constructor arguments would be placed


    }) 


} 