require('dotenv').config();
const ALCHEMY_URL = process.env.ALCHEMY_URL;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const alchemyWeb3 = createAlchemyWeb3(ALCHEMY_URL);
const contract = require("../artifacts/contracts/SkinToken.sol/ExampleNFT.json"); 
const contractAddress = "0x3130E6040CF6601adceBF737AF327d8B4C8DF13d";
const nftContract = new alchemyWeb3.eth.Contract(contract.abi, contractAddress);



const METAMASK_PUBLIC_KEY = process.env.METAMASK_PUBLIC_KEY;
const METAMASK_PRIVATE_KEY = process.env.METAMASK_PRIVATE_KEY;
const walletAddress=METAMASK_PUBLIC_KEY;

async function mintNFT(tokenURI) {
    // get the nonce - nonce is needed for security reasons. It keeps track of the number of
    // transactions sent from our address and prevents replay attacks.
    const nonce = await (alchemyWeb3.eth.getTransactionCount(walletAddress,'latest')+1)
    const transactionData = {
    from: METAMASK_PUBLIC_KEY, // our MetaMask public key
    to: contractAddress, // the smart contract address we want to interact with
    // nonce: nonce, // nonce with the no of transactions from our account (not working)
    gas: 1000000, // fee estimate to complete the transaction
    data: nftContract.methods
      .createNFT(walletAddress, tokenURI)
      .encodeABI(), // call the createNFT function from our OsunRiverNFT.sol file and pass the account that should receive the minted NFT.
  };

  const signPromise = alchemyWeb3.eth.accounts.signTransaction(
    transactionData,
    METAMASK_PRIVATE_KEY
  );
  signPromise
    .then((signedTx) => {
      alchemyWeb3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of our transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of our transaction!"
            );
          } else {
            console.log(
              "Something went wrong when submitting our transaction:",
              err
            );
          }
        }
      );
    })
    .catch((err) => {
      console.log(" Promise failed:", err);
    });
}

mintNFT("https://ipfs.io/ipfs/QmayjR57nqdbEUEULu14nWq2rF6M3bzLMrwuNRJArYac8v")
