// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


import "./pures.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";



contract Proxy {
    // Code position in storage is keccak256("PROXIABLE") = "0xc5f16f0fcc639fa48a6947836d9850f504798523bf8c9a3a87d5876cf622bcf7"
    constructor(bytes memory constructData, address contractLogic) {
        // save the code address
        assembly { // solium-disable-line
            sstore(0xc5f16f0fcc639fa48a6947836d9850f504798523bf8c9a3a87d5876cf622bcf7, contractLogic)
        }
         (bool success, bytes memory result ) = contractLogic.delegatecall(constructData); // solium-disable-line
        require(success, "Construction failed");
    }

    fallback() external payable {
        assembly { // solium-disable-line
            let contractLogic := sload(0xc5f16f0fcc639fa48a6947836d9850f504798523bf8c9a3a87d5876cf622bcf7)
            calldatacopy(0x0, 0x0, calldatasize())
            let success := delegatecall(sub(gas(), 10000), contractLogic, 0x0, calldatasize(), 0, 0)
            let retSz := returndatasize()
            returndatacopy(0, 0, retSz)
            switch success
            case 0 {
                revert(0, retSz)
            }
            default {
                return(0, retSz)
            }
        }
    }
}
contract Proxiable {
    // Code position in storage is keccak256("PROXIABLE") = "0xc5f16f0fcc639fa48a6947836d9850f504798523bf8c9a3a87d5876cf622bcf7"

    function updateCodeAddress(address newAddress) internal {
        require(
            bytes32(0xc5f16f0fcc639fa48a6947836d9850f504798523bf8c9a3a87d5876cf622bcf7) == Proxiable(newAddress).proxiableUUID(),
            "Not compatible"
        );
        assembly { // solium-disable-line
            sstore(0xc5f16f0fcc639fa48a6947836d9850f504798523bf8c9a3a87d5876cf622bcf7, newAddress)
        }
    }

    function proxiableUUID() public pure returns (bytes32) {
        return 0xc5f16f0fcc639fa48a6947836d9850f504798523bf8c9a3a87d5876cf622bcf7;
    }
} 
abstract contract IUSDT{
    function approve(address _spender, uint _value) virtual external returns (bool);
    function transferFrom(address _from, address _to, uint _value) virtual public;
    function transfer(address recipient, uint256 amount) virtual external returns (bool);
}
abstract contract IMBT{
    function approve(address _spender, uint _value) virtual external returns (bool);
    function transferFrom(address _from, address _to, uint _value) virtual public;
    function transfer(address recipient, uint256 amount) virtual external returns (bool);
}

contract MultiBetUSDTMultiOptions is Pures,AccessControl{
    uint256 lastBet;
    mapping(uint256 => string) numberToNameBet;
    mapping(string => uint256) nameToNumberBet;
    mapping(uint256 => uint256) numberOfOptions;
    IUSDT TetherContract;
    IMBT MBTokenContract;
    mapping(uint256=>bool) closed;
    mapping(uint256=>bool) dead;
    mapping(uint256=>bool) canceled;
    mapping(uint256 => mapping(uint256=> uint256)) moneyInPool;

    mapping(uint256 => mapping(uint256 => mapping (address => uint256))) miseBettersOn;
    mapping(uint256 => uint256) Winner;
    uint256 fees;
    uint256 toClaimForOwner;
    mapping(uint256 => address[])payed;
    mapping(address => uint256[])myBets; 
    //mapping(address => uint256[])myBetsUnpaid;
    mapping(uint256 => uint256)moneyLosedOnBet;
    mapping(uint256 => uint256)moneyPoolWinner;
    mapping(uint256 => uint256)moneyPoolLoser;

    address USDTaddress;
    address MBTaddress;
    mapping(address => uint256) score;

    bytes32 public constant CREATOR_ROLE = keccak256("CREATOR_ROLE");
    bytes32 public constant ENDER_ROLE = keccak256("ENDER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

    address constant RECEIVER = address(0xF89ca523f78C323a950c6Cf2e997C1bed13a7CDE); //privateKey 0xa496a1b2c469913d78140e3a3fe40faf3249c371f18761e0b4c1f378db6a6658
    

    //////////////////////////// EVENTS/////////////////////////////////////////

    event newBetCreated(uint256 indexed betNumber, string indexed nameBet);
    event betting(address indexed better, uint256 indexed numberBet ,uint256 option ,uint256 indexed amount);
    event betClosed(uint256 indexed betNumber);
    event betDead(uint256 indexed betNumber, uint256 indexed winner);
    event payment(address indexed payed,uint256 indexed amount);
    event ownerPayed(uint256 amount);
    ///////////////////////// CONSTRUCTOR /////////////////////////




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
    function isCanceled(uint256 betNumber) view public returns(bool){
        return canceled[betNumber];
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
                unpaidBets[i]=0;
            }
        }
        return unpaidBets;
    }// dynamic array : max => nombre de paris d'un joueur
    function getMoneyLosedOnBet(uint256 betNumber)public view returns (uint256){
        if (!isDead(betNumber)){
            return 0;
        }
        else{
        return moneyLosedOnBet[betNumber];
        }
        
    }
    /*function getUSDTaddress()public view returns(address){
        return USDTaddress;
    }
    function getMBTaddress()public view returns(address){
        return MBTaddress;
    }*/
    ///////////////////////////////////////// BET ON //////////////////////////////////////////
    function payMBToken (address winnerAddress,uint256 amount) internal {
        MBTokenContract.transfer(winnerAddress,amount);
        emit payment(winnerAddress,amount);
    }
    
    function betOn (uint256 betNumber,uint256 option,uint256 amount) public  {
        require(closed[betNumber]==false,"betclosed");
        require(dead[betNumber]==false,"betdead");
        require(amount!=0,"amount<0");
        require(option < numberOfOptions[betNumber],"invalidoption");
        TetherContract.transferFrom(msg.sender,address(this),amount);
        
        miseBettersOnEnd[betNumber][option][msg.sender]=miseBettersOnEnd[betNumber][option][msg.sender]+amount;
        miseBettersOn[betNumber][option][msg.sender]=miseBettersOn[betNumber][option][msg.sender]+amount;

        moneyInPool[betNumber][option]=moneyInPool[betNumber][option]+amount;
        moneyInPoolEnd[betNumber][option]=moneyInPool[betNumber][option]+amount;

        if(isInArrayUint256(betNumber,myBets[msg.sender])==false){
            myBets[msg.sender].push(betNumber);
        }
        
        uint256 earnedMBT=moneyInPool[betNumber][option];
        uint256 divisor=0;
        uint earnedFinal=0;
        for(uint i=0;i<numberOfOptions[betNumber];i++){
            if(i!=option){
                divisor=divisor+moneyInPool[betNumber][i];
            }
        }
        if(divisor==0){
            earnedFinal=amount*20;
        }
        else if(divisor/earnedMBT>100){
            earnedFinal=amount*100;
        }
        else{
            earnedFinal=(amount*divisor)/earnedMBT;
        }
        payMBToken(msg.sender,earnedFinal);
        emit betting(msg.sender,betNumber,option,amount);

    }
    
 /////////////////////////////////// BETS ADMINISTRATION//////////////////////////////////////////////////////////////


    
    function closeBet (uint256 betNumber) onlyRole(CREATOR_ROLE) public{
        closed[betNumber]=true;
        emit betClosed(betNumber);
    }
    function closeBets(uint256[] memory betsToClose)onlyRole(CREATOR_ROLE) public{
        for(uint i=0;i<betsToClose.length;i++){
            closed[betsToClose[i]]=true;
        }
    }// dynamic array : max => mathcs qui demarrent en simultané
    
    function endBet (uint256 betNumber,uint256 poolWin) onlyRole(ENDER_ROLE) public{
        require(closed[betNumber],"betopen");
        require(poolWin<=numberOfOptions[betNumber],"invalidwinner");
        dead[betNumber]=true;
        Winner[betNumber]=poolWin;
        uint256 feesBet=0;
        for (uint i=0; i<numberOfOptions[betNumber]; i++){
            uint256 feesPool;
            if(i!=poolWin){
                //moneyInPoolEnd[betNumber][i]=moneyInPool[betNumber][i];
                feesPool=moneyInPool[betNumber][i]*fees/100;
                feesBet=feesBet+feesPool;
                moneyInPool[betNumber][i]=moneyInPool[betNumber][i]-feesPool;
            }
        }
        toClaimForOwner=toClaimForOwner+feesBet;
        moneyLosedOnBet[betNumber]=moneyLosed(betNumber);
        moneyPoolWinner[betNumber]=moneyInPool[betNumber][poolWin];
        moneyPoolLoser[betNumber]=moneyLosed(betNumber);
        emit betDead(betNumber,poolWin);
    }

    function endBets(uint256[] memory betNumbers,uint256[] memory poolwinners) onlyRole(ENDER_ROLE)  public{
        require(betNumbers.length==poolwinners.length,"notsameamountbetswinners");
        for(uint i=0;i<betNumbers.length;i++){
            uint256 betNumber=betNumbers[i];
            if(closed[betNumber]==true && poolwinners[i]<numberOfOptions[betNumber]){
                //end bet
                dead[betNumber]=true;
                Winner[betNumber]=poolwinners[i];
                uint256 feesBet=0;
                for (uint u=0; u<numberOfOptions[betNumber]; u++){
                    uint256 feesPool;
                    if(u!=poolwinners[i]){
                        //moneyInPoolEnd[betNumber][u]=moneyInPool[betNumber][u];
                        feesPool=moneyInPool[betNumber][u]*fees/100;
                        feesBet=feesBet+feesPool;
                        moneyInPool[betNumber][u]=moneyInPool[betNumber][u]-feesPool;
                    }
                }
                toClaimForOwner=toClaimForOwner+feesBet;
                moneyLosedOnBet[betNumber]=moneyLosed(betNumber);
                moneyPoolWinner[betNumber]=moneyInPool[betNumber][Winner[betNumber]];
                moneyPoolLoser[betNumber]=moneyLosed(betNumber);
                emit betDead(betNumber,poolwinners[i]);
            }
        }
    }// dynamic array : max => matchs à end en simultané
    
    function cancelBet(uint256 betNumber) onlyRole(ENDER_ROLE) public{
        canceled[betNumber]=true;
    }


    function moneyLosed(uint256 betNumber)view internal returns (uint256){
        require(dead[betNumber],"betive");
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
        if(dead[betNumber]==false && canceled[betNumber]==false){return false;}
        if(canceled[betNumber]==true){
            for(uint i=0;i<numberOfOptions[betNumber];i++){
                if(miseBettersOn[betNumber][i][msgsender]>0){
                    return true;
                }
            }
            return false;
        }
        return miseBettersOn[betNumber][Winner[betNumber]][msgsender]!=0 && isInArrayAddress(msgsender,payed[betNumber])==false;
    }
    
    function howMuchIWon(uint256 betNumber,address msgsender)public view returns(uint256){
        if(!didIWinSmth(betNumber,msgsender)){return 0;}
        if(canceled[betNumber]==true){
            uint256 toRefund;
            for(uint i=0;i<numberOfOptions[betNumber];i++){
                toRefund+=miseBettersOn[betNumber][i][msgsender];
            }
            return toRefund;
        }
        return ((miseBettersOn[betNumber][Winner[betNumber]][msgsender]*moneyLosedOnBet[betNumber])/moneyInPool[betNumber][Winner[betNumber]])
                +miseBettersOn[betNumber][Winner[betNumber]][msgsender];    
    }

    function toClaimTotal(address msgsender)public view returns(uint256){
        uint256 rewardsTotal=0;
        uint256[] memory myBetsArray=getMyBetsUnpaid(msgsender);
        for(uint i=0;i<myBetsArray.length; i++) {
            uint256 bet=myBetsArray[i];
            rewardsTotal+=howMuchIWon(bet,msgsender);
        }
        return rewardsTotal;
    }// dynamic array : max => nombre total de paris d'un joueur => penser à vider la liste ou à l'archiver


    function recupAllP2PWin()public{
        uint256 rewardsTotal=0;
        for(uint i=0;i<myP2Pbets[msg.sender].length;i++){
            //bool userWon=false;
            uint256 betNum=myP2Pbets[msg.sender][i];
            if(isDead(betNum)){
                for(uint o=0;o<myP2PbetsDetails[msg.sender][betNum].length;o++){
                    uint256 p2pNum=myP2PbetsDetails[msg.sender][betNum][o];
                    if(!isInArrayAddress(msg.sender,payedP2P[betNum][p2pNum])){
                        if(msg.sender==p2pBets[betNum][p2pNum].creator && getWinner(betNum)==p2pBets[betNum][p2pNum].optionCreator){
                            payedP2P[betNum][p2pNum].push(msg.sender);
                            uint256 toPay=p2pBets[betNum][p2pNum].cote-p2pBets[betNum][p2pNum].amountToEnter+p2pBets[betNum][p2pNum].amountBet;
                            rewardsTotal+=toPay;
                            hasUserWonP2P[msg.sender][betNum][p2pNum]=true;
                            //userWon=true;
                        }
                        if(msg.sender==p2pBets[betNum][p2pNum].creator && getWinner(betNum)!=p2pBets[betNum][p2pNum].optionCreator){
                            payedP2P[betNum][p2pNum].push(msg.sender);
                            uint256 toPay=(p2pBets[betNum][p2pNum].amountBet*p2pBets[betNum][p2pNum].amountToEnter)/p2pBets[betNum][p2pNum].cote;
                            rewardsTotal+=toPay;
                            hasUserWonP2P[msg.sender][betNum][p2pNum]=false;

                        }
                        if(amountBetted[betNum][p2pNum][msg.sender]>0 && getWinner(betNum)!=p2pBets[betNum][p2pNum].optionCreator){
                            payedP2P[betNum][p2pNum].push(msg.sender);
                            uint256 toPay=amountBetted[betNum][p2pNum][msg.sender]*p2pBets[betNum][p2pNum].amountBet;
                            rewardsTotal+=toPay/p2pBets[betNum][p2pNum].cote+amountBetted[betNum][p2pNum][msg.sender];
                            hasUserWonP2P[msg.sender][betNum][p2pNum]=true;
                        }
                    }
                }// dynamic array : max => nombre de p2p bets sur un pari
            }
            if(canceled[betNum]){
                for(uint o=0;o<myP2PbetsDetails[msg.sender][betNum].length;o++){
                    uint256 p2pNum=myP2PbetsDetails[msg.sender][betNum][o];
                    if(!isInArrayAddress(msg.sender,payedP2P[betNum][p2pNum])){
                        if(msg.sender==p2pBets[betNum][p2pNum].creator){
                            payedP2P[betNum][p2pNum].push(msg.sender);
                            rewardsTotal+=p2pBets[betNum][p2pNum].amountBet;
                        }
                        if(amountBetted[betNum][p2pNum][msg.sender]>0){
                            payedP2P[betNum][p2pNum].push(msg.sender);
                            rewardsTotal+=amountBetted[betNum][p2pNum][msg.sender];
                        }
                    }
                }// dynamic array : max => nombre de p2p bets sur un pari
            }
        }
        if(rewardsTotal>0){
            payWinner(msg.sender,rewardsTotal);
        }
    }// dynamic array : max => nombre max de p2p bets d'un joueur => penser à archiver les bets 

    function recupAllWin() public{
        uint256 rewardsTotal=0;
        for (uint i=0; i<myBets[msg.sender].length; i++) {
            uint256 betNumberIterator=getMyBetsUnpaid(msg.sender)[i];
            if(betNumberIterator!=0){
                payed[betNumberIterator].push(msg.sender);
                uint256 toBePaid;
                if(canceled[betNumberIterator]){
                    for(uint u=0;u<numberOfOptions[betNumberIterator];u++){
                        toBePaid+=miseBettersOn[betNumberIterator][u][msg.sender];
                        miseBettersOn[betNumberIterator][u][msg.sender]=0;
                    }
                }
                else{
                    uint256 toBePaidWon;
                    uint256 moneyBetted =miseBettersOn[betNumberIterator][Winner[betNumberIterator]][msg.sender];
                    if(moneyBetted>0){hasUserWon[msg.sender][betNumberIterator]=true;}
                    miseBettersOn[betNumberIterator][Winner[betNumberIterator]][msg.sender]=0;
                    uint256 moneyInPoolBefore=moneyInPool[betNumberIterator][Winner[betNumberIterator]];
                    moneyInPool[betNumberIterator][Winner[betNumberIterator]]=moneyInPool[betNumberIterator][Winner[betNumberIterator]]-moneyBetted;
                    toBePaidWon=(moneyBetted*moneyLosedOnBet[betNumberIterator])/moneyInPoolBefore;  
                    toBePaid=toBePaidWon+moneyBetted;
                    moneyLosedOnBet[betNumberIterator]=moneyLosedOnBet[betNumberIterator]-toBePaidWon; 
                    score[msg.sender]+=moneyPoolLoser[betNumberIterator]*1000000000/moneyPoolWinner[betNumberIterator]; // decimales score
                }
                rewardsTotal=rewardsTotal+toBePaid;
                }
        }// dynamic array : max => nobmre max de bets d'un joueur => penser à archiver
        payWinner(msg.sender,rewardsTotal);
    }



    function haveIBeenPaid(uint256 betNumber,address addressToTest) public view returns (bool){
        return isInArrayAddress(addressToTest,payed[betNumber]);
    }
    
    function payWinner (address winnerAddress,uint256 amount) internal {
        TetherContract.transfer(winnerAddress,amount);
        emit payment(winnerAddress,amount);
    }



    
    
/////////////////////////////////// FEES//////////////////////////////////////////////////////////////

    
    function setFees(uint256 _fees) public onlyRole(CREATOR_ROLE){
        fees=_fees;
    }

    function claimFeesMoney() public {
        address toSend=RECEIVER;
        TetherContract.transfer(toSend,toClaimForOwner);
        emit ownerPayed(toClaimForOwner);
        toClaimForOwner=0;
        
    }
    
    
 /////////////////////////////////// PURES//////////////////////////////////////////////////////////////
    


    


    function constructor1() public {
        TetherContract=IUSDT(address(0x243F13935a8a855715c1e06d5dC6f0650354A1F5));
        MBTokenContract=IMBT(address(0x8bC9B949D39d0136ea98CF3AF5d770391e76d999));
        USDTaddress=address(0x243F13935a8a855715c1e06d5dC6f0650354A1F5);
        MBTaddress=address(0x8bC9B949D39d0136ea98CF3AF5d770391e76d999);
        fees=6;
        lastBet=0;
        toClaimForOwner=0;
        _setupRole(CREATOR_ROLE,msg.sender);
        createNewBet("0",0);
        renounceRole(CREATOR_ROLE,msg.sender);
        _setupRole(CREATOR_ROLE,address(0x6d3DCcF2C028766D26a5382Fce9d898e75E6D629)); //privateKey 0xd20947a33bb7e2b8a17b3a29c59f4bcb86131ede571fbf150aa0884e5fa48fa9
        _setupRole(ENDER_ROLE,address(0x1deecf77dD59A35c9f68cf507d79DDbd8524fa65)); //privateKey 0x8b2e6d2f97bc806b85d17ecd3eae0a8dd24b4d40c96fb6ebebaf2835ce6714fb
        _setupRole(PAUSER_ROLE,address(0x3FD296730cE65e00218F44175cf8aca4DDd7E993)); //privateKey 0x167bbf0f5bcd53019609d6b9b7f3bbcbdede1939856438631a6b3c3f54e71f68
        _setupRole(DEFAULT_ADMIN_ROLE,address(0x0BD3D64A172B0057f83Ab82774B18Fc04ffA002c)); //privateKey 0x61267dc1bbbb7e8d83e7e737d5e5e42d16d83f0cd471df71f1d65fc936820a5d
        //0x473be604
    }


    function createNewBet(string memory name,uint256 optionsNumber) onlyRole(CREATOR_ROLE) public{
        require(nameToNumberBet[name]==0,"one bet already exist");
        numberToNameBet[lastBet]=name;
        nameToNumberBet[name]=lastBet;
        numberOfOptions[lastBet]=optionsNumber;
        emit newBetCreated(lastBet,name);
        address[] memory array;
        createP2PBet(0,1,lastBet,0,array);
        lastBet=lastBet+1;
    }
    
    function createNewBets(string[] memory names,uint256[] memory optionsNumbers,uint256 numberOfBetsToAdd)onlyRole(CREATOR_ROLE) public{
        for(uint i=0;i<numberOfBetsToAdd;i++){
            require(nameToNumberBet[names[i]]==0,"bet already exist");
            numberToNameBet[lastBet]=names[i];
            nameToNumberBet[names[i]]=lastBet;
            numberOfOptions[lastBet]=optionsNumbers[i];
            emit newBetCreated(lastBet,names[i]);
            address[] memory array;
            createP2PBet(0,1,lastBet,0,array);
            lastBet=lastBet+1;
        }
    }
/////////////////////////////////////////////////// P2P BETS //////////////////////////////////////////////

    mapping(uint256 => p2pBet[])p2pBets;
    
    mapping(uint256 => uint256)betNumberToLastBetPP;
    mapping(uint256 => mapping(uint256=>mapping(address=>uint256)))amountBetted;
    mapping(uint256 => mapping(uint256=>address[]))payedP2P;
    mapping(address => uint256[])myP2Pbets;
    mapping(address => mapping(uint256 => uint256[]))myP2PbetsDetails;

    function seeP2PBet(uint256 betNumber,uint256 p2pNumber)public view returns(uint256,address,uint256,uint256,uint256,uint256,uint256,bool,address[] memory){
        p2pBet memory bet=p2pBets[betNumber][p2pNumber];
        return(bet.ppbetNumber,bet.creator,bet.amountBet,bet.cote,bet.amountToEnter,bet.betCorrelated,bet.optionCreator,bet.friends,bet.authorized);
    }
    struct p2pBet{
        uint256 ppbetNumber;
        address creator;
        uint256 amountBet;
        uint256 cote;
        uint256 amountToEnter;
        uint256 betCorrelated;
        uint256 optionCreator;
        bool friends;
        address[] authorized;
    }
    function seeP2PBets(uint256 betNumber)public view returns(p2pBet[] memory){
        return p2pBets[betNumber];
    }
    function getbetNumberToLastBetPP(uint256 betNumber) public view returns(uint256){
        return betNumberToLastBetPP[betNumber];
    }
    function getAmountBetted(uint256 betNumber,uint256 p2pNumber,address msgsender)public view returns (uint256){
        return amountBetted[betNumber][p2pNumber][msgsender];
    }
    function getPayedP2P(uint256 betNumber,uint256 p2pNumber)public view returns (address[]memory){
        return payedP2P[betNumber][p2pNumber];
    }
    function seeMyP2PBets(address msgsender)public view returns(uint256[] memory){
        return myP2Pbets[msgsender];
    }
    function seeMyP2PBetsDetail(address msgsender,uint256 betNumber)public view returns(uint256[] memory){
        return myP2PbetsDetails[msgsender][betNumber];
    }

    

    


    function howMuchIWonP2P(address msgsender)public view returns(uint256){
        uint256 rewardsTotal=0;
        uint256 lengthArray = seeMyP2PBets(msgsender).length;
        uint256 indexArray=0;
        uint256 zero=0;
        uint256[2][] memory payedSimuler=new uint256[2][](lengthArray);
        for(uint i=0;i<lengthArray;i++){
            payedSimuler[i]=[zero,zero];
        }
        for(uint i=0;i<myP2Pbets[msgsender].length;i++){
            //bool userWon=false;
            uint256 betNum=myP2Pbets[msgsender][i];
            if(isDead(betNum)){
                for(uint o=0;o<myP2PbetsDetails[msgsender][betNum].length;o++){
                    uint256 p2pNum=myP2PbetsDetails[msgsender][betNum][o];
                    //if(!isInArrayArray([betNum,p2pNum],payedSimuler)){
                    if(!isInArrayAddress(msgsender,payedP2P[betNum][p2pNum]) && !isInArrayArray([betNum,p2pNum],payedSimuler)){
                        if(msgsender==p2pBets[betNum][p2pNum].creator && getWinner(betNum)==p2pBets[betNum][p2pNum].optionCreator){
                            payedSimuler[indexArray]=[betNum,p2pNum];
                            indexArray++;
                            uint256 toPay=p2pBets[betNum][p2pNum].cote-p2pBets[betNum][p2pNum].amountToEnter+p2pBets[betNum][p2pNum].amountBet;
                            rewardsTotal+=toPay;
                            //userWon=true;
                        }
                        if(msgsender==p2pBets[betNum][p2pNum].creator && getWinner(betNum)!=p2pBets[betNum][p2pNum].optionCreator){
                            payedSimuler[indexArray]=[betNum,p2pNum];
                            indexArray++;
                            uint256 toPay=(p2pBets[betNum][p2pNum].amountBet*p2pBets[betNum][p2pNum].amountToEnter)/p2pBets[betNum][p2pNum].cote;
                            rewardsTotal+=toPay;
                            //userWon=false;
                        }
                        if(amountBetted[betNum][p2pNum][msgsender]>0 && getWinner(betNum)!=p2pBets[betNum][p2pNum].optionCreator){
                            payedSimuler[indexArray]=[betNum,p2pNum];
                            indexArray++;
                            uint256 toPay=amountBetted[betNum][p2pNum][msgsender]*p2pBets[betNum][p2pNum].amountBet;
                            rewardsTotal+=toPay/p2pBets[betNum][p2pNum].cote+amountBetted[betNum][p2pNum][msgsender];
                            //userWon=true;
                        }
                    }
                }// dynamic array : max => nombre de p2p bets sur un pari
            }
            if(canceled[betNum]){
                for(uint o=0;o<myP2PbetsDetails[msgsender][betNum].length;o++){
                    uint256 p2pNum=myP2PbetsDetails[msgsender][betNum][o];
                    if(!isInArrayAddress(msgsender,payedP2P[betNum][p2pNum]) && !isInArrayArray([betNum,p2pNum],payedSimuler)){
                        if(msgsender==p2pBets[betNum][p2pNum].creator){
                            payedSimuler[indexArray]=[betNum,p2pNum];
                            indexArray++;
                            rewardsTotal+=p2pBets[betNum][p2pNum].amountBet;
                        }
                        if(amountBetted[betNum][p2pNum][msgsender]>0){
                            payedSimuler[indexArray]=[betNum,p2pNum];
                            indexArray++;
                            rewardsTotal+=amountBetted[betNum][p2pNum][msgsender];
                        }
                    }
                }// dynamic array : max => nombre de p2p bets sur un pari
            }
        }
        return rewardsTotal;
    }

    function createP2PBet(uint256 amountToBet,uint256 amountToEnter,uint256 betNumber,uint256 optionToBet,address[] memory authorized)public{
        require(betNumber<getLastBet()+1,"bet doesn't exist");
        require(!isClosed(betNumber),"bet expired");
        TetherContract.transferFrom(msg.sender,address(this),amountToBet);
        MBTokenContract.transferFrom(msg.sender,address(this),amountToBet);
        bool friends=false;
        if(authorized.length>0){
            friends=true;
        }
        p2pBets[betNumber].push(p2pBet(betNumberToLastBetPP[betNumber],msg.sender,amountToBet,amountToEnter,amountToEnter,betNumber,optionToBet,friends,authorized));
        myP2Pbets[msg.sender].push(betNumber);
        myP2PbetsDetails[msg.sender][betNumber].push(betNumberToLastBetPP[betNumber]);
        betNumberToLastBetPP[betNumber]++;
    }

    function joinP2PBet(uint256 betNumber,uint256 p2pNumber,uint256 amountToBet)public{
        require(!isClosed(betNumber),"bet closed");
        require(amountToBet>0 && amountToBet<=p2pBets[betNumber][p2pNumber].amountToEnter,"invalid amount");
        if(p2pBets[betNumber][p2pNumber].friends){
            require(isInArrayAddress(msg.sender,p2pBets[betNumber][p2pNumber].authorized),"non authorized");
        }
        TetherContract.transferFrom(msg.sender,address(this),amountToBet);
        p2pBets[betNumber][p2pNumber].amountToEnter=p2pBets[betNumber][p2pNumber].amountToEnter-amountToBet;
        amountBetted[betNumber][p2pNumber][msg.sender]+=amountToBet;
        myP2Pbets[msg.sender].push(betNumber);
        myP2PbetsDetails[msg.sender][betNumber].push(p2pNumber);
        payMBToken(msg.sender,amountToBet);
    }

    function getMaxCote(uint256 betNumber,uint256 optionAgainst,uint256 minToEnter)public view returns(uint256){
        uint256 maxBet=0;
        for(uint i=1;i<p2pBets[betNumber].length;i++){
            if(
                (10000*p2pBets[betNumber][i].amountBet)/p2pBets[betNumber][i].cote
                >
                (10000*p2pBets[betNumber][maxBet].amountBet)/p2pBets[betNumber][maxBet].cote
                &&
                p2pBets[betNumber][i].optionCreator==optionAgainst
                &&
                minToEnter<=p2pBets[betNumber][i].amountToEnter
                &&
                p2pBets[betNumber][i].amountToEnter>0
            )
            {
                maxBet=i;
            }
        }// dynamic array : max => nombre max de p2p bets sur un bet
        return maxBet;
    }

    function getScore(address msgsender) public view returns(uint256){
        return score[msgsender];
    }


    function getTotalMoney(uint256 betNumber) public view returns(uint256){
        uint256 totalMoney=0;
        for(uint i=0;i<numberOfOptions[betNumber];i++){
            totalMoney+=getOptionMoney(betNumber,i);
        }
        return totalMoney;
    }

    function recupAllGains()public{
        recupAllWin(); 
        recupAllP2PWin();
    }

    mapping(address=>mapping(uint256=>bool)) hasUserWon;

    mapping(address=>mapping(uint256=>mapping(uint256=>bool))) hasUserWonP2P;

    function getHasUserWon (address msgsender,uint256 betNumber) view public returns (bool){
        return hasUserWon[msgsender][betNumber];
    }

    function getHasUserWonP2P (address msgsender,uint256 betNumber, uint256 p2pBetNumber) view public returns (bool){
        return hasUserWonP2P[msgsender][betNumber][p2pBetNumber];
    }
    function didIWinSmthP2P(uint256 betNumber,address msgsender,uint256 p2pNumber) public view returns(bool){
        if((dead[betNumber]==false && canceled[betNumber]==false)||isInArrayAddress(msgsender,payedP2P[betNumber][p2pNumber])==true){return false;}
        if(canceled[betNumber]==true){       
            return isInArrayUint256(p2pNumber,seeMyP2PBetsDetail(msgsender,betNumber));
        }
        if(p2pBets[betNumber][p2pNumber].optionCreator==getWinner(betNumber) && p2pBets[betNumber][p2pNumber].creator==msgsender){
            return true;
        }
        if(p2pBets[betNumber][p2pNumber].optionCreator!=getWinner(betNumber) && p2pBets[betNumber][p2pNumber].creator!=msgsender && isInArrayUint256(p2pNumber,seeMyP2PBetsDetail(msgsender,betNumber))){
            return true;
        }
        return false;
    }
    mapping(uint256 => mapping(uint256=> uint256)) moneyInPoolEnd;
    
    function getMoneyInPoolEnd(uint256 betNumber,uint256 option)public view returns (uint256){
        return moneyInPoolEnd[betNumber][option];
    }
    mapping(uint256 => mapping(uint256=> mapping(address=>uint256))) miseBettersOnEnd;
    function getMiseBettersOnEnd(uint256 betNumber,uint256 option, address msgsender) public view returns(uint256){
        return miseBettersOnEnd[betNumber][option][msgsender];
    }
}



contract MyFinalContract is MultiBetUSDTMultiOptions, Proxiable {

    function updateCode(address newCode) onlyRole(DEFAULT_ADMIN_ROLE) public {
        updateCodeAddress(newCode);
    }


}