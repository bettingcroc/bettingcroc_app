// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./2_Owner.sol";

abstract contract IUSDC{
    function approve(address _spender, uint _value) virtual external returns (bool);
    function transferFrom(address _from, address _to, uint _value) virtual public;
    function transfer(address recipient, uint256 amount) virtual external returns (bool);
}


contract Bet is Owner{
    IUSDC TetherContract;
    bool closed;
    bool dead;
    uint256 argentTotalLakers;
    uint256 argentTotalClippers;
    mapping (address => uint256) MiseLakers;
    mapping (address => uint256) MiseClippers;
    address[] LakersBeters;
    address[] ClippersBeters;
    string Winner;

    
    address[] payed=new address[](0);
    
    
    constructor(address _tetherAddress){
        TetherContract=IUSDC(_tetherAddress);
        argentTotalLakers=0;
        argentTotalClippers=0;
    }
    
    function betOn (uint256 Id,uint256 amount) public returns (bool) {
        require(closed==false && dead==false);
        //TetherContract.approve(address(this),amount);
        TetherContract.transferFrom(msg.sender,address(this),amount);
        //TetherContract.transfer(address(this),amount);
        
        if(Id==1){
            MiseLakers[msg.sender]=MiseLakers[msg.sender]+amount;
            argentTotalLakers=argentTotalLakers+amount;
        }
        if(Id==2){
            MiseClippers[msg.sender]=MiseClippers[msg.sender]+amount;
            argentTotalClippers=argentTotalClippers+amount;
        }
        return true;
    }
    
   
    
    function recupWin(address msgsender) public {
        require(dead && didIWinSmth(msgsender));
        
        
        uint256 toBePaid;
        if(compareStrings("Lakers",Winner)){
            toBePaid=MiseLakers[msgsender]/argentTotalLakers*argentTotalClippers;  
            argentTotalClippers=argentTotalClippers-toBePaid;
            toBePaid=toBePaid+MiseLakers[msgsender];
        }
        if(compareStrings("Clippers",Winner)){
            toBePaid=MiseClippers[msgsender]/argentTotalClippers*argentTotalLakers;    
            argentTotalLakers=argentTotalLakers-toBePaid;
            toBePaid=toBePaid+MiseClippers[msgsender];
        }
        payWinner(msgsender,toBePaid);
        payed.push(msgsender);
        
    }
    function recupWinFromPoolTest(address msgsender)public view returns(uint256){
        require(dead && didIWinSmth(msgsender));
        
        if(compareStrings("Lakers",Winner)){
            return (MiseLakers[msgsender]/argentTotalLakers)*argentTotalClippers;  
        }
        if(compareStrings("Clippers",Winner)){
            return (MiseClippers[msgsender]/argentTotalClippers)*argentTotalLakers;    
        }
        return 555;
    }
    
    
    function payWinner (address winnerAddress,uint256 amount) internal {
        TetherContract.transfer(winnerAddress,amount);
    }
    
    function closeBet () isOwner public{
        closed=true;
    }
    function isClosed() view public returns (bool){
        return closed;
    }
    function isDead() view public returns (bool){
        return dead;
    }
    function getWinner() view public returns (string memory){
        return Winner;
    }
    function endBet (uint256 poolWin) isOwner public{
        dead=true;
        if(poolWin==1){
            Winner="Lakers";
        }
        if(poolWin==2){
            Winner="Clippers";
        }
        //distribWin(Winner);
    }
    function myPourcentageLakers(address msgsender) public view returns(uint256){
        uint256 pourc;
        if(argentTotalLakers==0){
            return 0;
        }
        pourc=100*MiseLakers[msgsender]/argentTotalLakers;
        return pourc/100;
    }
    function myPourcentageClippers(address msgsender) public view returns(uint256){
        uint256 pourc;
        if(argentTotalClippers==0){
            return 0;
        }
        pourc=100*MiseClippers[msgsender]/argentTotalClippers;
        return pourc/100;
    }
    function getClippersMoney()public view returns (uint256){
        return argentTotalClippers;
    }
    function getLakersMoney()public view returns (uint256){
        return argentTotalLakers;
    }
    function howMuchIGotOnLakers(address msgsender)public view returns(uint256){
        return MiseLakers[msgsender];
    }
    function howMuchIGotOnClippers(address msgsender)public view returns(uint256){
        return MiseClippers[msgsender];
    }
    function setArgentTotalLakers(uint256 newValue) public {
        argentTotalLakers=newValue;
    }
    function setArgentTotalClippers(uint256 newValue) public {
        argentTotalClippers=newValue;
    }
    
    function didIWinSmth(address msgsender) public view returns(bool){
        if(dead!=true){return false;}
        if(compareStrings("Lakers",Winner)){
            return MiseLakers[msgsender]!=0 && isInArray(msgsender,payed)==false;
        }
        if(compareStrings("Clippers",Winner)){
            return MiseClippers[msgsender]!=0 && isInArray(msgsender,payed)==false;
        }
        return false;
    }
    
    
    
    function compareStrings(string memory a, string memory b) public pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) === keccak256(abi.encodePacked((b))));
    }
    
    function isInArray(address element, address[] memory list) public pure returns (bool) {
        
        for (uint i=0; i<list.length; i++) {
            if (list[i]==element){
                return true;
            }
        }
        return false;
    }
    function haveIBeenPaid(address addressToTest) public view returns (bool){
        return isInArray(addressToTest,payed);
    }
}

