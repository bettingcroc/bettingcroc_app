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
    //address[] LakersBeters;
    //address[] ClippersBeters;
    string Winner;
    uint256 fees;
    uint256 toClaimForOwner;
    address[] payed=new address[](0);
    address ew=super.getOwner();
    
    constructor(address _tetherAddress,uint256 _fees){
        TetherContract=IUSDC(_tetherAddress);
        argentTotalLakers=0;
        argentTotalClippers=0;
        fees=_fees;
    }
    /////////////////////////// PLAYERS GETTERS ////////////////////////////////////////////////
    
    
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
    function myPourcentageLakers(address msgsender) public view returns(uint256){
        uint256 pourc;
        if(argentTotalLakers==0){
            return 0;
        }
        pourc=100*MiseLakers[msgsender]/argentTotalLakers;
        return pourc;
    }
    function myPourcentageClippers(address msgsender) public view returns(uint256){
        uint256 pourc;
        if(argentTotalClippers==0){
            return 0;
        }
        pourc=100*MiseClippers[msgsender]/argentTotalClippers;
        return pourc;
    }
    
    
    
    ///////////////////////////////////////// BET ON //////////////////////////////////////////
    
    
    
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
    
 /////////////////////////////////// BETS ADMINISTRATION//////////////////////////////////////////////////////////////


    
    function isClosed() view public returns (bool){
        return closed;
    }
    function closeBet () isOwner public{
        closed=true;
    }
    function isDead() view public returns (bool){
        return dead;
    }
    function endBet (uint256 poolWin) isOwner public{
        closed=true;
        dead=true;
        //uint256 mult=100-fees;
        if(poolWin==1){
            Winner="Lakers";
            toClaimForOwner=argentTotalClippers*fees/100;
            argentTotalClippers=argentTotalClippers-toClaimForOwner;
        }
        if(poolWin==2){
            Winner="Clippers";
            toClaimForOwner=argentTotalLakers*fees/100;
            argentTotalLakers=argentTotalLakers-toClaimForOwner;
        }
        //distribWin(Winner);
    }
    function getWinner() view public returns (string memory){
        return Winner;
    }

    
  /////////////////////////////////// WINNER REWARDS//////////////////////////////////////////////////////////////
  
  
    function didIWinSmth(address msgsender) public view returns(bool){
        require(dead);
        //if(dead!=true){return false;}
        if(compareStrings("Lakers",Winner)){
            return MiseLakers[msgsender]!=0 && isInArray(msgsender,payed)==false;
        }
        if(compareStrings("Clippers",Winner)){
            return MiseClippers[msgsender]!=0 && isInArray(msgsender,payed)==false;
        }
        return false;
    }
    function howMuchIWon(address msgsender)public view returns(uint256){
        require(dead && didIWinSmth(msgsender));
        
        if(compareStrings("Lakers",Winner)){
            return ((MiseLakers[msgsender]*argentTotalClippers)/argentTotalLakers)+MiseLakers[msgsender];  
        }
        if(compareStrings("Clippers",Winner)){
            return ((MiseClippers[msgsender]*argentTotalLakers)/argentTotalClippers)+MiseClippers[msgsender];    
        }
        return 555;
    }
    function recupWin(address msgsender) public {
        require(dead && didIWinSmth(msgsender));
        
        uint256 toBePaidWon;
        uint256 toBePaid;
        if(compareStrings("Lakers",Winner)){
            toBePaidWon=(MiseLakers[msgsender]*argentTotalClippers)/argentTotalLakers;  
            toBePaid=toBePaidWon+MiseLakers[msgsender];
            argentTotalLakers=argentTotalLakers-MiseLakers[msgsender];
            MiseLakers[msgsender]=0;
            argentTotalClippers=argentTotalClippers-toBePaidWon;
        }
        if(compareStrings("Clippers",Winner)){
            toBePaidWon=(MiseClippers[msgsender]*argentTotalLakers)/argentTotalClippers;    
            argentTotalClippers=argentTotalClippers-MiseClippers[msgsender];
            toBePaid=toBePaidWon+MiseClippers[msgsender];
            MiseClippers[msgsender]=0;
            argentTotalLakers=argentTotalLakers-toBePaidWon;
        }
        payWinner(msgsender,toBePaid);
        payed.push(msgsender);
    }

    function haveIBeenPaid(address addressToTest) public view returns (bool){
        return isInArray(addressToTest,payed);
    }
    
        function payWinner (address winnerAddress,uint256 amount) internal {
        TetherContract.transfer(winnerAddress,amount);
    }
    
/////////////////////////////////// FEES//////////////////////////////////////////////////////////////

    function getFees()public view returns(uint256){
        return fees;
    }
    function setFees(uint256 _fees)public isOwner{
        require(!closed && !dead);
        fees=_fees;
    }
    function claimFeesMoney() public {
        address toSend=getOwner();
        TetherContract.transfer(toSend,toClaimForOwner);
        
    }
    function getFeesRewards()public view returns (uint256){
        require(dead);
        return toClaimForOwner;
    }
    
 /////////////////////////////////// PURES//////////////////////////////////////////////////////////////
    
    
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

}

