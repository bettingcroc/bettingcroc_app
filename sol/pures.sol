// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Pures{
        
    function compareStrings(string memory a, string memory b) public pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }
    
    function isInArrayAddress(address element, address[] memory list) public pure returns (bool) {
        
        for (uint i=0; i<list.length; i++) {
            if (list[i]==element){
                return true;
            }
        }
        return false;
    }
    
    function isInArrayUint256(uint256 element, uint256[] memory list) public pure returns (bool) {
        
        for (uint i=0; i<list.length; i++) {
            if (list[i]==element){
                return true;
            }
        }
        return false;
    }
    function deleteIndexFromUint256Array(uint index, uint256[] memory list)public pure returns(uint256[] memory){
        uint256[] memory newList=new uint256[](list.length-1);
        for(uint i=0;i<index;i++){
            newList[i]=list[i];
        }
        for(uint i=index;i<list.length-1;i++){
            newList[i]=list[i+1];
        }
        return newList;
    }

}