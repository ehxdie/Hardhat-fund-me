// Declaring the deploy function
const { hre, network } = require("hardhat");
const { networkConfig } = require("../helper-hardhat-config");
const { developmentChains, decimals, initialAnswer } = require("../helper-hardhat-config");
const { tasks } = require("hardhat");
const { task } = require("hardhat/config");

module.exports =  async ({ getNamedAccounts, deployments }) => {
    
        // Getting the following two methods from the hardhat runtime environment

        // grabbing even more things from the things that were grabbed
        const { deploy, log } = deployments;

        // executing the getNamedAccounts method
        const { deployer } = await getNamedAccounts();

        // getting chain id of network that we have chosen to deploy the contract to
        const chainID = network.config.chainId;

        // Figuring out deploying the mock contract
        // if the chain id(or name in this case) deployed to is in the developmentChains array deploy to that chain
        if (developmentChains.includes(network.name)) {
            log("Local network detected!");
            await deploy("MockV3Aggregator", {
                from: deployer,
                args: [decimals, initialAnswer]
            });
            log("Mocks deployed")

        }
    }



module.exports.tags = ["all","mocks"];