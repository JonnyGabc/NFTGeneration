require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require('@openzeppelin/hardhat-upgrades');
const { ALCHEMY_URL, METAMASK_PRIVATE_KEY } = process.env;
module.exports = {
   solidity: "0.8.0",
   defaultNetwork: "ropsten",
   networks: {
      hardhat: {},
      ropsten: {
         url: ALCHEMY_URL,
         accounts: [`0x${METAMASK_PRIVATE_KEY}`]
      }
   },
}