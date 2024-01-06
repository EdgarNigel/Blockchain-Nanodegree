let SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
const truffleAssert = require('truffle-assertions');
const proof = require('../../zokrates/code/square/proof.json');

contract('SolnSquareVerifier', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('New Solution', async () => {

        beforeEach(async () => {
            this.contract = await SolnSquareVerifier.new({from: account_one});
        });

        // Test if a new solution can be added for contract - SolnSquareVerifier
        it('should add new solution', async () => {
            let result = false;
            let solution = await this.contract.addSolution(this.contract.solutions.length, account_one)
            truffleAssert.eventEmitted(solution, 'SolutionAdded', () => {
                result = true;
                return true;
            });
            assert.equal(result, true, "Solution was not added");
        });

        // Test if an ERC721 token can be minted for contract - SolnSquareVerifier
        it('should mint token', async () => {
            let result = false;
            let tx = await this.contract.mintNewNFT(
                account_two,
                this.contract.solutions.length,
                proof.proof.a, 
                proof.proof.b, 
                proof.proof.c, 
                proof.inputs,
                {from: account_one}
            );
            truffleAssert.eventEmitted(tx, 'SolutionAdded', () => {
                result = true;
                return true;
            });
            assert.equal(result, true, "Token was not minted");   
        });
    });
});

