/*##########################

CONFIGURATION
##########################*/

// -- Step 1: Set up the appropriate configuration 
const Web3 = require("web3") 
var EthereumTransaction = require("ethereumjs-tx").Transaction 
const web3 = new Web3('HTTP://127.0.0.1:7545')

// -- Step 2: Set the sending and receiving addresses for the transaction. 
const sendingAddress = '0xb2F01371aFCEc7Cc9C9B81caE329bd986d738D96' 
const receivingAddress = '0x0081e542E7AeAC69376dAc620fA2c223Ec72fCb0'

// -- Step 3: Check the balances of each address 
web3.eth.getBalance(sendingAddress).then(console.log) 
web3.eth.getBalance(receivingAddress).then(console.log)

/*##########################

CREATE A TRANSACTION
##########################*/

// -- Step 4: Set up the transaction using the transaction variables as shown 
let rawTransaction = { 
	nonce: 0, 
	to: receivingAddress, 
	gasPrice: 200000000, 
	gasLimit: 30000, 
	value: 100000000000000000, 
	data: "0x0" }

// -- Step 5: View the raw transaction 
rawTransaction

// -- Step 6: Check the new account balances (they should be the same) 
web3.eth.getBalance(sendingAddress).then(console.log) 
web3.eth.getBalance(receivingAddress).then(console.log)

// Note: They haven't changed because they need to be signed...

/*##########################

Sign the Transaction
##########################*/

// -- Step 7: Sign the transaction with the Hex value of the private key of the sender 
var privateKeySender = 'bf2b37524dc6bcd4ad7c299a4133de05c790104e1eba0a82c47ad930fd36db64' 
var privateKeySenderHex = new Buffer(privateKeySender, 'hex') 
var transaction = new EthereumTransaction(rawTransaction) 
transaction.sign(privateKeySenderHex)

/*#########################################

Send the transaction to the network
#########################################*/

// -- Step 8: Send the serialized signed transaction to the Ethereum network. 
var serializedTransaction = transaction.serialize(); 
web3.eth.sendSignedTransaction(serializedTransaction);