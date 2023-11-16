// Declaring the deploy function
const { hre, network } = require("hardhat");

module.exports = async (hre) => {
    // Getting the following two methods from the hardhat runtime environment
    const { getNamedAccounts, deployments } = hre;

    // grabbing even more things from the things that were grabbed
    const { deploy, log } = deployments;

    // executing the getNamedAccounts method
    const { deployer } = await getNamedAccounts();

    // getting chain id of network
    const chainID = network.config.chainId 


} 