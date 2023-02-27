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
    
    function isInArrayArray(uint256[2] memory element, uint256[2][] memory list) public pure returns (bool) {
        
        for (uint i=0; i<list.length; i++) {
            if (list[i][0]==element[0] && list[i][1]==element[1]){
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
    function getLowerIndexMinimum(uint256[] memory list)public pure returns(uint256){
        uint256 indexmin=0;
        for(uint i=0;i<list.length;i++){
            if(list[i]<list[indexmin]){
                indexmin=i;
            }
        }
        return indexmin;
    }
    function countZeros(uint256[] memory list)public pure returns(uint256){
        uint256 zeros=0;
        for(uint i=0;i<list.length;i++){
            if(list[i]==0){i++;}
        }
        return zeros;
    }

    function sort(uint256[] memory data) public pure returns(uint256[] memory) {
       quickSort(data, int(0), int(data.length - 1));
       return arrayReverser(data);
    }
    
    function quickSort(uint256[] memory arr, int left, int right) internal pure {
        int i = left;
        int j = right;
        if(i==j) return;
        uint256 pivot = arr[uint256(left + (right - left) / 2)];
        while (i <= j) {
            while (arr[uint256(i)] < pivot) i++;
            while (pivot < arr[uint(j)]) j--;
            if (i <= j) {
                (arr[uint256(i)], arr[uint256(j)]) = (arr[uint256(j)], arr[uint256(i)]);
                i++;
                j--;
            }
        }
        if (left < j)
            quickSort(arr, left, j);
        if (i < right)
            quickSort(arr, i, right);
    }
    function arrayReverser(uint256[] memory arr) public pure returns(uint256[] memory){
        uint256[] memory newArr=new uint256[](arr.length);
        uint e=0;
        for(uint i=arr.length;i>0;i--){
            newArr[i-1]=arr[e];
            e++;
        }
        return newArr;
    }

    function checkEven(uint256 testNo) public pure returns(bool){
        uint256 remainder = testNo%2;
        if(remainder==0)
            return true;
        else
            return false;
    }
}