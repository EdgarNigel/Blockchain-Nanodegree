const Web3 = require('web3');
const infuraKey = process.env.INFURA_KEY;
const mnemonic = process.env.MNEMONIC;
let web3 = new Web3(`https://sepolia.infura.io/v3/${infuraKey}`);

const contract = require("/Users/philipplaurim/Desktop/Udemy/BlockchainNanodegree/CapStone-Project/eth-contracts/SolnSquareVerifierABI.json");
const contractAddress = "0xBcF9d65cbB6a796C13e1bc4abd04015B4C9b5D9f";
const nftContract = new web3.eth.Contract(contract, contractAddress);
const privateKey = mnemonic;
const publicKey = "0x27D8D15CbC94527cAdf5eC14B69519aE23288B95";

web3.eth.defaultAccount = publicKey;
console.log(web3.eth.defaultAccount);

async function mint() {
  const nonce = await web3.eth.getTransactionCount(publicKey, 'latest'); //get latest nonce
  console.log(nonce);
  //the transaction
  const tx = {
    'from': publicKey,
    'to': contractAddress,
    'nonce': nonce,
    'gas': 500000,
    'maxPriorityFeePerGas': 1999999987,
    'data': nftContract.methods.mint("0x27D8D15CbC94527cAdf5eC14B69519aE23288B95", 1).encodeABI()
  };

  const signPromise = web3.eth.accounts.signTransaction(tx, privateKey);
  signPromise.then((signedTx) => {

    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(err, hash) {
      if (!err) {
        console.log("The hash of your transaction is: ", hash, "\nCheck Alchemy's Mempool to view the status of your transaction!"); 
      } else {
        console.log("Something went wrong when submitting your transaction:", err)
      }
    });
  }).catch((err) => {
    console.log("Promise failed:", err);
  });
}

mint();