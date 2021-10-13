require('dotenv').config();
const ALCHEMY_URL = process.env.ALCHEMY_URL;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const alchemyWeb3 = createAlchemyWeb3(ALCHEMY_URL);
const contract = require("../artifacts/contracts/SkinToken.sol/ExampleNFT.json"); 