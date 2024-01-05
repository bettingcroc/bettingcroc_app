// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
import "./contracts/pures.sol";

abstract contract IUSDT {
    function approve(
        address _spender,
        uint _value
    ) external virtual returns (bool);

    function transferFrom(
        address _from,
        address _to,
        uint _value
    ) public virtual;

    function transfer(
        address recipient,
        uint256 amount
    ) external virtual returns (bool);
}

contract decentraBet is Pures {
    IUSDT TetherContract;

    constructor() {
        TetherContract = IUSDT(
            address(0x243F13935a8a855715c1e06d5dC6f0650354A1F5)
        );
    }
    uint256 FEE = 5;
    uint256 decentraBetLastNumber;
    mapping(uint256 => decentraBetStruct) decentraBets;
    struct decentraBetStruct {
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

    function createDecentraBet(
        address oracle,
        uint256 amount,
        address[] memory authorized,
        uint256 playersNumber,
        bool privateBet
    ) public {
        TetherContract.transferFrom(msg.sender, address(this), amount);
        bool fri = false;
        if (authorized.length > 0) {
            fri = true;
        }
        address[] memory playerS;
        decentraBets[decentraBetLastNumber + 1] = decentraBetStruct(
            decentraBetLastNumber,
            msg.sender,
            oracle,
            playerS,
            amount,
            fri,
            authorized,
            false,
            playersNumber,
            address(0),
            privateBet
        );
        decentraBetLastNumber++;
    }

    function endBet(uint256 id, address winner) public {
        require(decentraBets[id].oracle == msg.sender, "not oracle");
        require(
            isInArrayAddress(winner, decentraBets[id].players),
            "winner didn't play"
        );
        require(!decentraBets[id].dead, "already dead");
        decentraBets[id].dead = true;
        decentraBets[id].winner = winner;
    }

    function joinBet(uint256 id) public {
        if (decentraBets[id].friend == true) {
            require(isInArrayAddress(msg.sender, decentraBets[id].authorized));
        } else {
            require(
                decentraBets[id].players.length <
                    decentraBets[id].playersNumber ||
                    decentraBets[id].playersNumber == 0
            );
        }

        require(!isInArrayAddress(msg.sender, decentraBets[id].players));

        TetherContract.transferFrom(
            msg.sender,
            address(this),
            decentraBets[id].amount
        );

        decentraBets[id].players.push(msg.sender);
    }

    function recupWin(uint256 id) public {
        require(decentraBets[id].winner == msg.sender);
        uint256 amount = ((decentraBets[id].players.length *
            decentraBets[id].amount) * (100 / FEE)) / 100;
        payWinner(msg.sender, amount);
    }

    function payWinner(address winnerAddress, uint256 amount) internal {
        TetherContract.transfer(winnerAddress, amount);
    }

    function viewADecentrabet(
        uint256 id
    )
        public
        view
        returns (
            address,
            uint256,
            bool,
            address[] memory,
            bool,
            uint256,
            address
        )
    {
        return (
            decentraBets[id].oracle,
            decentraBets[id].amount,
            decentraBets[id].friend,
            decentraBets[id].authorized,
            decentraBets[id].dead,
            decentraBets[id].playersNumber,
            decentraBets[id].winner
        );
    }

    function infoSpecBet(
        uint256 id
    ) public view returns (bool, bool, bool, bool) {
        return (
            decentraBets[id].dead,
            decentraBets[id].friend,
            isInArrayAddress(msg.sender, decentraBets[id].authorized),
            isInArrayAddress(msg.sender, decentraBets[id].players)
        );
    }
}
