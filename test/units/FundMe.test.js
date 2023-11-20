/**
 * @dev this script will be responsible for the unit tests of the fundme contract
 * 
 */
const { deployments, ethers, getNamedAccounts } = require("hardhat");
const { expect } = require("chai");

describe("fundme", async() => {
    let fundMe
    let deployer
    let mockv3aggregator
    beforeEach(async function (){
        /* Contract deployment */

        // Getting the deployer for some reason
        deployer = (await getNamedAccounts()).deployer;

        // This kind of deploys the contract using the tags on all the deploy scripts
        await deployments.fixture(["all"])
        
        // This will allow for interaction with the smart contract
        fundMe = await ethers.getContract("FundMe", deployer);
        mockv3aggregator = await ethers.getContract("MockV3Aggregator",deployer);

        /* Instead of all that nonsense */
        const fundMeContractFactory = await ethers.getContractFactory("FundMe");
        const Mockv3ContractFactory = await ethers.getContractFactory("MockV3Aggregator");

        fundMe = fundMeContractFactory.deploy()

    })

    /**
     * @dev Responsible for testsing the constructor of the fund me contract
     */
    describe("constructor", async function() {
        it("sets the aggregator address correctly", async function(){
            const response = await fundMe.returnpriceFeed();
            expect(response).to.equal(mockv3aggregator.address);
             

        })
    })
})
