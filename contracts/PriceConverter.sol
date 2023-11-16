// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

library PriceConverter {


    function getPrice () internal view returns(uint256) {
        // Address of price feed contract 0x694AA1769357215DE4FAC081bf1f309aDC325306
        // Using the interface to connect to a datafeed that exist on the sempoli testnet

        AggregatorV3Interface priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);

        // The <lastestRoundData()> method is used to get lastest prices of eth
        (,int256 price, , ,) = priceFeed.latestRoundData();

        /* to ensure the price in usd == msg.value (i dont 100% 
        get but they should be similar in decimal places)

        The interface <lastestRoundData()> method, returns eth price
        to 8 decimal places, but msg.value is in wei, so to the eth price
        is converted to wei
        */

        return uint256(price * 1e10);
    }

    function getConversionRate (uint256 _ethAmount) internal view returns(uint256){
        // Getting the ethereum price by calling the get price function
        uint256 ethPrice = getPrice();
        // Converting from wei to usd
        uint256 ethAmountInUsd = (ethPrice * _ethAmount)/ 1e18;
        return ethAmountInUsd;
    }

}
 