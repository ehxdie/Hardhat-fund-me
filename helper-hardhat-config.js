// This config file will allow for the interaction with the aggregate interface depending on the network being used

const networkConfig = {
    11155111 : {
        name: "sempolia",
        ethUsdPriceFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
     },
    5: {
        name: "goerli",
         ethUsdPriceFeed: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
     }
    }

 
module.exports = {
    networkConfig
}