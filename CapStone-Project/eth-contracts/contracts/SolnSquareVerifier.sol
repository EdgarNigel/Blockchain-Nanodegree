pragma solidity >0.4.21 <=0.8.21;

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
import "./ERC721Mintable.sol";
import "./Verifier.sol";

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is CustomERC721Token, Verifier {


// TODO define a solutions struct that can hold an index & an address
    struct Solution {
        uint256 index;
        address solutionAddress;
    }

// TODO define an array of the above struct
    Solution[] public solutions;

// TODO define a mapping to store unique solutions submitted
    mapping(bytes32 => Solution) private uniqueSolutions;


// TODO Create an event to emit when a solution is added
    event SolutionAdded(uint256 index, address solutionAddress);


// TODO Create a function to add the solutions to the array and emit the event
    function addSolution(uint256 index, address solutionAddress) public {
        bytes32 solutionHash = keccak256(abi.encodePacked(index, solutionAddress));
        require(uniqueSolutions[solutionHash].solutionAddress == address(0), "Solution already exists");
        uniqueSolutions[solutionHash] = Solution({index: index, solutionAddress: solutionAddress});
        emit SolutionAdded(index, solutionAddress);
    }


// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly
    function mintNewNFT(
        address to,
        uint256 tokenId,
        uint[2] memory a,
        uint[2][2] memory b,
        uint[2] memory c,
        uint[2] memory input
    ) public {
        require(verifyTx(a, b, c, input), "Solution is not verified");
        addSolution(tokenId, to);
        super.mint(to, tokenId);
    }

}



  


























