// Declaring the deploy function
const { hre, network, run } = require("hardhat");
const { networkConfig, developmentChains } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

module.exports = async (hre) => {
    // Getting the following two methods from the hardhat runtime environment
    const { getNamedAccounts, deployments } = hre;

    // grabbing even more things from the things that were grabbed
    const { deploy, log } = deployments;

    // executing the getNamedAccounts method
    const { deployer } = await getNamedAccounts();

    // getting chain id of network that we have chosen to deploy the contract to
    const chainID = network.config.chainId; 

    // USING THE networkconfig  
    let ethUsdPriceFeedAddress;
    
    // Handling cases where the network deployed to is not in the networkconfig file
    if (developmentChains.includes(network.name)) {
        // It is expected that the contract ould have been deployed 
        const ethUsdAggregator = await deployments.get("MockV3Aggregator");
        ethUsdPriceFeedAddress = ethUsdAggregator.address;
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainID]["ethUsdPriceFeed"];
    }


    // using the features of the "hardhat-deploy" and "hardhat-deploy-ethers" packages
    // Instead of using a contract factory 
    const fundMe = await deploy("FundMe",{
          from: deployer,
          args: [ethUsdPriceFeedAddress], // This where the constructor arguments would be placed
          waitConfirmations: network.config.blockConfirmations

    });
    log("------- Test-net being deployed to"); 
    console.log("Fund me = " + fundMe.address);

    // Handling verification
    // first checking if the network being deployed to is a testnet
   /* if (!developmentChains.includes(network.name)){
        // the verification takes in the contract address and the constructor argumentsd
       await verify(fundMe.address, ethUsdPriceFeedAddress); 
     }*/
    
}


 
module.exports.tags = ["all", "fundme"];