// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./contracts/2_Owner.sol";

abstract contract IUSDT{
    function approve(address _spender, uint _value) virtual external returns (bool);
    function transferFrom(address _from, address _to, uint _value) virtual public;
    function transfer(address recipient, uint256 amount) virtual external returns (bool);
}

contract MultiBetUSDTMultiOptions is Owner{
    uint256 lastBet;
    mapping(uint256 => string) numberToNameBet;
    mapping(string => uint256) nameToNumberBet;
    mapping(uint256 => uint256) numberOfOptions;
    IUSDT TetherContract;
    mapping(uint256=>bool) closed;
    mapping(uint256=>bool) dead;
    mapping(uint256 => mapping(uint256=> uint256)) moneyInPool;
    mapping(uint256 => mapping(uint256 => mapping (address => uint256))) miseBettersOn;
    mapping(uint256 => uint256) Winner;
    uint256 fees;
    uint256 toClaimForOwner;
    mapping(uint256 => address[])payed;
    mapping(address => uint256[])myBets; 
    mapping(address => uint256[])myBetsUnpaid;
    mapping(uint256 => uint256)moneyLosedOnBet;
    address USDTaddress;

    //////////////////////////// EVENTS/////////////////////////////////////////

    event newBetCreated(uint256 indexed betNumber, string indexed nameBet);
    event betting(address indexed better, uint256 indexed numberBet ,uint256 option ,uint256 indexed amount);
    event betClosed(uint256 indexed betNumber);
    event betDead(uint256 indexed betNumber, uint256 indexed winner);
    event payment(address indexed payed,uint256 indexed amount);
    event ownerPayed(uint256 amount);
    ///////////////////////// CONSTRUCTOR /////////////////////////

    constructor(address _tetherAddress,uint256 _fees){
        TetherContract=IUSDT(_tetherAddress);
        USDTaddress=_tetherAddress;
        fees=_fees;
        lastBet=0;
        toClaimForOwner=0;
        createNewBet("0",0);
    }

    /////////////////////////// GETTERS ////////////////////////////////////////////////

    function getLastBet()public view returns(uint256){
        return lastBet;
    }
    function getNumberToName(uint256 number)public view returns(string memory){
        return numberToNameBet[number];
    }
    function getNameToNumber(string memory name)public view returns(uint256){
        return nameToNumberBet[name];
    }
    function getNumberOfOptions(uint256 betNumber)public view returns (uint256){
        return numberOfOptions[betNumber];
    }
    function isClosed(uint256 betNumber) view public returns (bool){
        return closed[betNumber];
    }
    function isDead(uint256 betNumber) view public returns (bool){
        return dead[betNumber];
    }
    function getOptionMoney(uint256 betNumber,uint256 option)public view returns (uint256){
        return moneyInPool[betNumber][option];
    }
    function howMuchIGotOnAnOption(uint256 betNumber,uint256 option,address msgsender)public view returns(uint256){
        return miseBettersOn[betNumber][option][msgsender];
    }
    function myPourcentageOnOption(uint256 betNumber,uint256 option,address msgsender) public view returns(uint256){
        uint256 pourc;
        if(moneyInPool[betNumber][option]==0){
            return 0;
        }
        pourc=100*miseBettersOn[betNumber][option][msgsender]/moneyInPool[betNumber][option];
        return pourc;
    }
    function getWinner(uint256 betNumber) view public returns (uint256){
        return Winner[betNumber];
    }
    function getFees()public view returns(uint256){
        return fees;
    }
    function getFeesRewards()public view returns (uint256){
        return toClaimForOwner;
    }
    function seeMyBets(address msgsender)public view returns(uint256[] memory){
        return myBets[msgsender];
    }
    function getMyBetsUnpaid (address msgsender) public view returns(uint256[] memory) {
        uint256[] memory unpaidBets= new uint[](myBets[msgsender].length);
        for (uint i=0; i<myBets[msgsender].length; i++) {
            if (didIWinSmth(myBets[msgsender][i],msgsender)){
                unpaidBets[i]=myBets[msgsender][i];
            }
            else{
                unpaidBets[i]=666;
            }
        }
        return unpaidBets;
    }
    function getMoneyLosedOnBet(uint256 betNumber)public view returns (uint256){
        if (!isDead(betNumber)){
            return 0;
        }
        else{
        return moneyLosedOnBet[betNumber];
        }
        
    }
    function getUSDTaddress()public view returns(address){
        return USDTaddress;
    }
    ///////////////////////////////////////// BET ON //////////////////////////////////////////
    
    
    
    function betOn (uint256 betNumber,uint256 option,uint256 amount) public  {
        require(closed[betNumber]==false,"bet is closed");
        require(dead[betNumber]==false,"bet is dead");
        require(amount!=0,"amount need to be >0");
        require(option < numberOfOptions[betNumber],"invalid option");
        TetherContract.transferFrom(msg.sender,address(this),amount);
        
        miseBettersOn[betNumber][option][msg.sender]=miseBettersOn[betNumber][option][msg.sender]+amount;
        moneyInPool[betNumber][option]=moneyInPool[betNumber][option]+amount;
        
        if(isInArrayUint256(betNumber,myBets[msg.sender])==false){
            myBets[msg.sender].push(betNumber);
        }
        emit betting(msg.sender,betNumber,option,amount);
    }
    
 /////////////////////////////////// BETS ADMINISTRATION//////////////////////////////////////////////////////////////

    function createNewBet(string memory name,uint256 optionsNumber)isOwner public{
        require(nameToNumberBet[name]==0,"bet still exist");
        numberToNameBet[lastBet]=name;
        nameToNumberBet[name]=lastBet;
        numberOfOptions[lastBet]=optionsNumber;
        emit newBetCreated(lastBet,name);
        lastBet=lastBet+1;
    }
    
    function createNewBets(string[] memory names,uint256[] memory optionsNumbers,uint256 numberOfBetsToAdd)isOwner public{
        for(uint i=0;i<numberOfBetsToAdd;i++){
            require(nameToNumberBet[names[i]]==0,"bet still exist");
            numberToNameBet[lastBet]=names[i];
            nameToNumberBet[names[i]]=lastBet;
            numberOfOptions[lastBet]=optionsNumbers[i];
            emit newBetCreated(lastBet,names[i]);
            lastBet=lastBet+1;
        }
    }
    
    function closeBet (uint256 betNumber) isOwner public{
        closed[betNumber]=true;
        emit betClosed(betNumber);
    }
    function closeBets(uint256[] memory betsToClose)isOwner public{
        for(uint i=0;i<betsToClose.length;i++){
            closed[betsToClose[i]]=true;
        }
    }
    
    function endBet (uint256 betNumber,uint256 poolWin) isOwner public{
        require(closed[betNumber],"bet still open");
        require(poolWin<=numberOfOptions[betNumber],"invalid winner");
        dead[betNumber]=true;
        Winner[betNumber]=poolWin;
        uint256 feesBet=0;
        for (uint i=0; i<numberOfOptions[betNumber]; i++){
            uint256 feesPool;
            if(i!=poolWin){
            feesPool=moneyInPool[betNumber][i]*fees/100;
            feesBet=feesBet+feesPool;
            moneyInPool[betNumber][i]=moneyInPool[betNumber][i]-feesPool;
            }
        }
        toClaimForOwner=toClaimForOwner+feesBet;
        moneyLosedOnBet[betNumber]=moneyLosed(betNumber);
        emit betDead(betNumber,poolWin);
    }
    
    function moneyLosed(uint256 betNumber)view internal returns (uint256){
        require(dead[betNumber],"bet still alive");
        uint256 moneyTotal=0;
        for (uint i=0; i<numberOfOptions[betNumber]; i++) {
            if(i!=Winner[betNumber]){
            moneyTotal+=moneyInPool[betNumber][i];
            }

        }
        return moneyTotal;
    }
    
    /////////////////////////////////// WINNER REWARDS//////////////////////////////////////////////////////////////
  
    function didIWinSmth(uint256 betNumber,address msgsender) public view returns(bool){
        if(dead[betNumber]==false){return false;}

        return miseBettersOn[betNumber][Winner[betNumber]][msgsender]!=0 && isInArrayAddress(msgsender,payed[betNumber])==false;
    }
    
    function howMuchIWon(uint256 betNumber,address msgsender)public view returns(uint256){
        require(dead[betNumber],"bet still alive");
        require(didIWinSmth(betNumber,msgsender),"i didnt win anything");
        return ((miseBettersOn[betNumber][Winner[betNumber]][msgsender]*moneyLosedOnBet[betNumber])/moneyInPool[betNumber][Winner[betNumber]])
                +miseBettersOn[betNumber][Winner[betNumber]][msgsender];    
    }

    function toClaimTotal(address msgsender)public view returns(uint256){
        uint256 rewardsTotal=0;
        for(uint i=0;i<myBets[msgsender].length; i++) {
            uint256 betNumberIterator=getMyBetsUnpaid(msgsender)[i];
            if(betNumberIterator!=666){
                uint256 toBePaidWon;
                uint256 toBePaid;
                uint256 moneyBetted =miseBettersOn[betNumberIterator][Winner[betNumberIterator]][msg.sender];
                uint256 moneyInPoolBefore=moneyInPool[betNumberIterator][Winner[betNumberIterator]];
                toBePaidWon=(moneyBetted*moneyLosedOnBet[betNumberIterator])/moneyInPoolBefore;  
                toBePaid=toBePaidWon+moneyBetted;
                rewardsTotal=rewardsTotal+toBePaid;
            }
        }
        return rewardsTotal;
    }

    function recupAllWin() public{
        uint256 rewardsTotal=0;
        for (uint i=0; i<myBets[msg.sender].length; i++) {
            uint256 betNumberIterator=getMyBetsUnpaid(msg.sender)[i];
            if(betNumberIterator!=666){
                payed[betNumberIterator].push(msg.sender);
                uint256 toBePaidWon;
                uint256 toBePaid;
                uint256 moneyBetted =miseBettersOn[betNumberIterator][Winner[betNumberIterator]][msg.sender];
                miseBettersOn[betNumberIterator][Winner[betNumberIterator]][msg.sender]=0;
                uint256 moneyInPoolBefore=moneyInPool[betNumberIterator][Winner[betNumberIterator]];
                moneyInPool[betNumberIterator][Winner[betNumberIterator]]=moneyInPool[betNumberIterator][Winner[betNumberIterator]]-moneyBetted;
                toBePaidWon=(moneyBetted*moneyLosedOnBet[betNumberIterator])/moneyInPoolBefore;  
                toBePaid=toBePaidWon+moneyBetted;
                moneyLosedOnBet[betNumberIterator]=moneyLosedOnBet[betNumberIterator]-toBePaidWon;
                rewardsTotal=rewardsTotal+toBePaid;
                }
        }
        payWinner(msg.sender,rewardsTotal);
    }

    function haveIBeenPaid(uint256 betNumber,address addressToTest) public view returns (bool){
        return isInArrayAddress(addressToTest,payed[betNumber]);
    }
    
    function payWinner (address winnerAddress,uint256 amount) private {
        TetherContract.transfer(winnerAddress,amount);
        emit payment(winnerAddress,amount);
    }

    
    
/////////////////////////////////// FEES//////////////////////////////////////////////////////////////

    
    function setFees(uint256 _fees) public isOwner{
        fees=_fees;
    }

    function claimFeesMoney() public {
        address toSend=getOwner();
        TetherContract.transfer(toSend,toClaimForOwner);
        emit ownerPayed(toClaimForOwner);
        toClaimForOwner=0;
        
    }
    
    
 /////////////////////////////////// PURES//////////////////////////////////////////////////////////////
    
    
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
}
