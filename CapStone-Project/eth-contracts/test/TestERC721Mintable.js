var CustomERC721Token = artifacts.require('CustomERC721Token');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];
    const account_three = accounts[2];
    const account_four = accounts[3];
    const numTokens = 10;

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await CustomERC721Token.new({from: account_one});

            // TODO: mint multiple tokens
            for (let i = 0; i < numTokens; i++) {
                await this.contract.mint(account_two, i, {from: account_one});
            }
        })

        it('should return total supply', async function () { 
            let totalSupply = await this.contract.totalSupply.call();
            assert.equal(totalSupply, numTokens, "Total supply doesn't match");
        })

        it('should get token balance', async function () { 
            let balance = await this.contract.balanceOf.call(account_two);
            assert.equal(balance, numTokens, "Balance doesn't match");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let tokenURI = await this.contract.tokenURI.call(1);
            assert.equal(tokenURI, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1", "Token URI doesn't match");
        })

        it('should transfer token from one owner to another', async function () { 
            await this.contract.transferFrom(account_two, account_three, 1, {from: account_two});
            let owner = await this.contract.ownerOf.call(1);
            assert.equal(owner, account_three, "Owner doesn't match");
        })

        it('should transfer from approved transferer', async function () {
            await this.contract.approve(account_three, 1, {from: account_two});
            await this.contract.transferFrom(account_two, account_four, 1, {from: account_three});
            let owner = await this.contract.ownerOf.call(1);
            assert.equal(owner, account_four, "Owner doesn't match");
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await CustomERC721Token.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            let minted = true;
            try {
                await this.contract.mint(account_two, 1, {from: account_two});
            } catch (e) {             
                minted = false;
            }
            assert.equal(minted, false, "Minting should fail when address is not contract owner");
        })

        it('should return contract owner', async function () { 
            let owner = await this.contract.getOwner.call();
            assert.equal(owner, account_one, "Owner should be contract owner");
        })

        it('should transfer ownership', async function () {
            await this.contract.transferOwnership(account_two, {from: account_one});
            let owner = await this.contract.getOwner.call();
            assert.equal(owner, account_two, "Owner should be account_two");
        })
    });

    describe('have pausable properties', function () {
        beforeEach(async function () {
            this.contract = await CustomERC721Token.new({from: account_one});
            await this.contract.setPaused(true, {from: account_one});
        })

        it('should fail when minting when contract is paused', async function () {
            let minted = true;
            try {
                await this.contract.mint(account_two, 1, {from: account_one});
            } catch (e) {
                minted = false;
            }
            assert.equal(minted, false, "Minting should fail when contract is paused");
        })

        it('should mint when contract is unpaused', async function () {
            await this.contract.setPaused(false, {from: account_one});
            let minted = true;
            try {
                await this.contract.mint(account_two, 1, {from: account_one});
            }
            catch (e) {
                minted = false;
            }
            assert.equal(minted, true, "Minting should succeed when contract is unpaused");
        })
    });
})