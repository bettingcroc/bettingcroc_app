// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "./contracts/pures.sol";

abstract contract IUSDT{
    function approve(address _spender, uint _value) virtual external returns (bool);
    function transferFrom(address _from, address _to, uint _value) virtual public;
    function transfer(address recipient, uint256 amount) virtual external returns (bool);
}

contract decentraBet is Pures{

    IUSDT TetherContract;
    constructor(){
        TetherContract=IUSDT(address(0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684));
    }
    uint256 decentraBetNumber;
    mapping(uint256=>decentraBetStruct) decentraBets;
    struct decentraBetStruct{
        uint256 id;
        address creator;
        address oracle;
        address[] players;
        uint256 amount;
        bool friend;
        address[] authorized;
        bool dead;
        uint256 playersNumber;
        address winner;
        bool privateBet;
    }

    function createDecentraBet(address oracle,uint256 amount,address[] memory authorized,uint256 playersNumber,bool privateBet)public {
        TetherContract.transferFrom(msg.sender,address(this),amount);
        bool fri=false;
        if(authorized.length>0){
            fri=true;
        }
        address[] memory playerS;
        decentraBets[decentraBetNumber+1]=decentraBetStruct(decentraBetNumber+1,msg.sender,oracle,playerS,amount,fri,authorized,false,playersNumber,address(0),privateBet);
        decentraBetNumber++;
        
    }

    function endBet(uint256 id,address winner)public{
        require(decentraBets[id].oracle==msg.sender);
        require(isInArrayAddress(winner,decentraBets[id].players));
        decentraBets[id].dead=true;
        decentraBets[id].winner=winner;
    }

    function joinBet(uint256 id)public{

        if(decentraBets[id].friend==true){
            require(isInArrayAddress(msg.sender,decentraBets[id].authorized));
        }
        else{
            require(decentraBets[id].players.length<decentraBets[id].playersNumber || decentraBets[id].playersNumber==0);
        }
        
        require(!isInArrayAddress(msg.sender,decentraBets[id].players));

        TetherContract.transferFrom(msg.sender,address(this),decentraBets[id].amount);

        decentraBets[id].players.push(msg.sender);

    }

    function recupWin(uint256 id)public{
        require(decentraBets[id].winner==msg.sender);
        uint256 amount=decentraBets[id].players.length*decentraBets[id].amount;
        payWinner(msg.sender,amount);
    }

    
    function payWinner (address winnerAddress,uint256 amount) internal {
        TetherContract.transfer(winnerAddress,amount);
    }
    function viewADecentrabet(uint256 id)public view returns (address, uint256,bool, address[] memory,bool,uint256,address){
        return (decentraBets[id].oracle,decentraBets[id].amount,
                decentraBets[id].friend,decentraBets[id].authorized,decentraBets[id].dead,
                decentraBets[id].playersNumber,decentraBets[id].winner);
    }

}