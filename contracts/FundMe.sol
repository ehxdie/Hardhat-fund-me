// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

// This interface is provided by chainlink and allows for the getting
// of data from external datafeeds depending on the interface
import "contracts/PriceConverter.sol";


contract FundMe {

    // Setting up a variable that will host the owners address
    address public owner;

    // Ensuring that the address that deploys the contract is the owner of that
    // contract

    constructor(){
        owner =  msg.sender;
    }

    // Hmm I don't really get this 
    using PriceConverter for uint256;

    // Setting the minimum amount that can be sent to this contract
    uint256 minimumUsd = 10 * 1e18;

    // Array that will hold the addresses of who has funded the contract
    address[] public funders;

    // To get the amount that is being sent by an address
    mapping(address => uint256) public addressToAmount;

    // Funding function
    /* Different Individuals can fund the contract*/

    function fund() public payable {
        // Ensuring the amount  sent to the contract is > 1eth
        // 1e18 is the representation of 1eth in wei
        // msg.value is in wei
        
        // msg.value.getConversionRate() 
        require(msg.value.getConversionRate() > minimumUsd, "Didnt send enough");

        // Adding the address of the funders to the funders array;
        funders.push(msg.sender);

        // Keeping track of how much each address sends
        addressToAmount[msg.sender] = msg.value;

    }

    // Functions for Getting prices and converting from eth to usd 
    // and vice versa

    
    
    // Withdrawal function
    /* The owner of the contract can withdraw the funds sent to an 
    Individual addresss */


    function withdraw () public onlyOwner{
        // This ensures that only the owner can withdraw
        require(msg.sender == owner, "You can not withdraw");

        // When the owner of the contract withdraws from the contract then the array
        // that hosts the amount sent should be set to zero
         for (uint256 funderIndex = 0; funderIndex < funders.length; funderIndex++) 
         {
             address fundersAddress = funders[funderIndex];
             addressToAmount[fundersAddress] = 0;
         }

        // resetting the funders an array
        funders = new address[](0);

        // withdrawing the funds

        // transfer
        /*
        When transferring to another address first the address
        must be made payable, after then the <.transfer()> method
        is used
        payable(msg.sender).transfer(address(this).balance);

        // send
        bool sendTransfer = payable(msg.sender).send(address(this).balance);
        require(sendTransfer,"Transfer has not gone through"); */

        // call
        (bool callSuccess, ) = payable(msg.sender).call{value: address(this).balance}("");
        require(callSuccess, "Call failed");
    }

    modifier onlyOwner{
        require(msg.sender == owner, "You can not withdraw");
        _; 
    }


}
 