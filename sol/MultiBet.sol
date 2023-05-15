// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./pures.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract Proxy {
    // Code position in storage is keccak256("PROXIABLE") = "0xc5f16f0fcc639fa48a6947836d9850f504798523bf8c9a3a87d5876cf622bcf7"
    constructor(bytes memory constructData, address contractLogic) {
        // save the code address
        assembly {
            // solium-disable-line
            sstore(
                0xc5f16f0fcc639fa48a6947836d9850f504798523bf8c9a3a87d5876cf622bcf7,
                contractLogic
            )
        }
        (bool success, bytes memory result) = contractLogic.delegatecall(
            constructData
        ); // solium-disable-line
        require(success, "Construction failed");
    }

    fallback() external payable {
        assembly {
            // solium-disable-line
            let contractLogic := sload(
                0xc5f16f0fcc639fa48a6947836d9850f504798523bf8c9a3a87d5876cf622bcf7
            )
            calldatacopy(0x0, 0x0, calldatasize())
            let success := delegatecall(
                sub(gas(), 10000),
                contractLogic,
                0x0,
                calldatasize(),
                0,
                0
            )
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
            bytes32(
                0xc5f16f0fcc639fa48a6947836d9850f504798523bf8c9a3a87d5876cf622bcf7
            ) == Proxiable(newAddress).proxiableUUID(),
            "Not compatible"
        );
        assembly {
            // solium-disable-line
            sstore(
                0xc5f16f0fcc639fa48a6947836d9850f504798523bf8c9a3a87d5876cf622bcf7,
                newAddress
            )
        }
    }

    function proxiableUUID() public pure returns (bytes32) {
        return
            0xc5f16f0fcc639fa48a6947836d9850f504798523bf8c9a3a87d5876cf622bcf7;
    }
}

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

abstract contract IMBT {
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

contract MultiBetUSDTMultiOptions is Pures, AccessControl {
    uint256 lastBetNumber;
    mapping(uint256 => string) betNumberToBetName;
    mapping(string => uint256) betNameToBetNumber;
    mapping(uint256 => uint256) betOptions;
    IUSDT TetherContract;
    IMBT MBTokenContract;
    mapping(uint256 => bool) closed;
    mapping(uint256 => bool) dead;
    mapping(uint256 => bool) canceled;
    mapping(uint256 => mapping(uint256 => uint256)) amountInPool;

    mapping(uint256 => mapping(uint256 => mapping(address => uint256))) amountInPoolFromUser;
    mapping(uint256 => uint256) winner;
    uint256 feesRate;
    uint256 amountToClaimForOwner;
    mapping(uint256 => address[]) addressPayedOnBets;
    mapping(address => uint256[]) myBetsUser;
    //mapping(address => uint256[])myBetsUnpaid;
    mapping(uint256 => uint256) amountLosedOnBet;
    mapping(uint256 => uint256) amountPoolWinner;
    mapping(uint256 => uint256) amountPoolLoser;

    address USDTaddress;
    address MBTaddress;
    mapping(address => uint256) score;

    bytes32 public constant CREATOR_ROLE = keccak256("CREATOR_ROLE");
    bytes32 public constant ENDER_ROLE = keccak256("ENDER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

    address constant RECEIVER =
        address(0xF89ca523f78C323a950c6Cf2e997C1bed13a7CDE); //privateKey 0xa496a1b2c469913d78140e3a3fe40faf3249c371f18761e0b4c1f378db6a6658

    //////////////////////////// EVENTS/////////////////////////////////////////

    event newBetCreated(uint256 indexed betNumber, string indexed nameBet);
    event betting(
        address indexed better,
        uint256 indexed numberBet,
        uint256 option,
        uint256 indexed amount
    );
    event betClosed(uint256 indexed betNumber);
    event betDead(uint256 indexed betNumber, uint256 indexed winner);
    event payment(address indexed payed, uint256 indexed amount);
    event ownerPayed(uint256 amount);

    ///////////////////////// CONSTRUCTOR /////////////////////////

    /////////////////////////// GETTERS ////////////////////////////////////////////////

    function getLastBetNumber() public view returns (uint256) {
        return lastBetNumber;
    }

    function getBetNumberToBetName(
        uint256 number
    ) public view returns (string memory) {
        return betNumberToBetName[number];
    }

    function getBetNameToBetNumber(
        string memory name
    ) public view returns (uint256) {
        return betNameToBetNumber[name];
    }

    function getBetOptions(uint256 betNumber) public view returns (uint256) {
        return betOptions[betNumber];
    }

    function getClosed(uint256 betNumber) public view returns (bool) {
        return closed[betNumber];
    }

    function getDead(uint256 betNumber) public view returns (bool) {
        return dead[betNumber];
    }

    function getCanceled(uint256 betNumber) public view returns (bool) {
        return canceled[betNumber];
    }

    function getAmountInPool(
        uint256 betNumber,
        uint256 option
    ) public view returns (uint256) {
        return amountInPool[betNumber][option];
    }

    function getAmountInPoolFromUser(
        uint256 betNumber,
        uint256 option,
        address msgsender
    ) public view returns (uint256) {
        return amountInPoolFromUser[betNumber][option][msgsender];
    }

    function getPercentageOnOptionFromUser(
        uint256 betNumber,
        uint256 option,
        address msgsender
    ) public view returns (uint256) {
        uint256 percentage;
        if (amountInPool[betNumber][option] == 0) {
            return 0;
        }
        percentage =
            (100 * amountInPoolFromUser[betNumber][option][msgsender]) /
            amountInPool[betNumber][option];
        return percentage;
    }

    function getWinner(uint256 betNumber) public view returns (uint256) {
        return winner[betNumber];
    }

    function getFeesRate() public view returns (uint256) {
        return feesRate;
    }

    function getAmountToClaimForOwner() public view returns (uint256) {
        return amountToClaimForOwner;
    }

    function getMyBetsUser(
        address msgsender
    ) public view returns (uint256[] memory) {
        return myBetsUser[msgsender];
    }

    function getMyBetsUnpaid(
        address msgsender
    ) public view returns (uint256[] memory) {
        uint256[] memory unpaidBets = new uint[](myBetsUser[msgsender].length);
        for (uint i = 0; i < myBetsUser[msgsender].length; i++) {
            if (getHasUserWon(msgsender, myBetsUser[msgsender][i])) {
                unpaidBets[i] = myBetsUser[msgsender][i];
            } else {
                unpaidBets[i] = 0;
            }
        }
        return unpaidBets;
    } // dynamic array : max => nombre de paris d'un joueur

    function getAmountLosedOnBet(
        uint256 betNumber
    ) public view returns (uint256) {
        if (!getDead(betNumber)) {
            return 0;
        } else {
            return amountLosedOnBet[betNumber];
        }
    }

    /*function getUSDTaddress()public view returns(address){
        return USDTaddress;
    }
    function getMBTaddress()public view returns(address){
        return MBTaddress;
    }*/
    ///////////////////////////////////////// BET ON //////////////////////////////////////////
    function payMBToken(address winnerAddress, uint256 amount) internal {
        MBTokenContract.transfer(winnerAddress, amount);
        emit payment(winnerAddress, amount);
    }

    function betOn(uint256 betNumber, uint256 option, uint256 amount) public {
        require(closed[betNumber] == false, "betclosed");
        require(dead[betNumber] == false, "betdead");
        require(amount != 0, "amount<0");
        require(option < betOptions[betNumber], "invalidoption");
        TetherContract.transferFrom(msg.sender, address(this), amount);

        amountInPoolFromUserEnd[betNumber][option][msg.sender] =
            amountInPoolFromUserEnd[betNumber][option][msg.sender] +
            amount;
        amountInPoolFromUser[betNumber][option][msg.sender] =
            amountInPoolFromUser[betNumber][option][msg.sender] +
            amount;

        amountInPool[betNumber][option] =
            amountInPool[betNumber][option] +
            amount;
        amountInPoolEnd[betNumber][option] =
            amountInPool[betNumber][option] +
            amount;

        if (isInArrayUint256(betNumber, myBetsUser[msg.sender]) == false) {
            myBetsUser[msg.sender].push(betNumber);
        }

        uint256 earnedMBT = amountInPool[betNumber][option];
        uint256 divisor = 0;
        uint earnedFinal = 0;
        for (uint i = 0; i < betOptions[betNumber]; i++) {
            if (i != option) {
                divisor = divisor + amountInPool[betNumber][i];
            }
        }
        if (divisor == 0) {
            earnedFinal = amount * 20;
        } else if (divisor / earnedMBT > 100) {
            earnedFinal = amount * 100;
        } else {
            earnedFinal = (amount * divisor) / earnedMBT;
        }
        payMBToken(msg.sender, earnedFinal);
        emit betting(msg.sender, betNumber, option, amount);
    }

    /////////////////////////////////// BETS ADMINISTRATION//////////////////////////////////////////////////////////////

    function closeBets(
        uint256[] memory betsToClose
    ) public onlyRole(CREATOR_ROLE) {
        for (uint i = 0; i < betsToClose.length; i++) {
            closed[betsToClose[i]] = true;
            emit betClosed(betNumber);
        }
    } // dynamic array : max => mathcs qui demarrent en simultané

    function endBets(
        uint256[] memory betNumbers,
        uint256[] memory poolwinners
    ) public onlyRole(ENDER_ROLE) {
        require(
            betNumbers.length == poolwinners.length,
            "notsameamountbetswinners"
        );
        for (uint i = 0; i < betNumbers.length; i++) {
            uint256 betNumber = betNumbers[i];
            if (
                closed[betNumber] == true &&
                poolwinners[i] < betOptions[betNumber]
            ) {
                //end bet
                dead[betNumber] = true;
                winner[betNumber] = poolwinners[i];
                uint256 feesBet = 0;
                for (uint u = 0; u < betOptions[betNumber]; u++) {
                    uint256 feesPool;
                    if (u != poolwinners[i]) {
                        //amountInPoolEnd[betNumber][u]=amountInPool[betNumber][u];
                        feesPool =
                            (amountInPool[betNumber][u] * feesRate) /
                            100;
                        feesBet = feesBet + feesPool;
                        amountInPool[betNumber][u] =
                            amountInPool[betNumber][u] -
                            feesPool;
                    }
                }
                amountToClaimForOwner = amountToClaimForOwner + feesBet;
                amountLosedOnBet[betNumber] = moneyLosed(betNumber);
                amountPoolWinner[betNumber] = amountInPool[betNumber][
                    winner[betNumber]
                ];
                amountPoolLoser[betNumber] = moneyLosed(betNumber);
                emit betDead(betNumber, poolwinners[i]);
            }
        }
    } // dynamic array : max => matchs à end en simultané

    function cancelBet(uint256 betNumber) public onlyRole(ENDER_ROLE) {
        canceled[betNumber] = true;
    }

    function moneyLosed(uint256 betNumber) internal view returns (uint256) {
        require(dead[betNumber], "betive");
        uint256 moneyTotal = 0;
        for (uint i = 0; i < betOptions[betNumber]; i++) {
            if (i != winner[betNumber]) {
                moneyTotal += amountInPool[betNumber][i];
            }
        }
        return moneyTotal;
    }

    /////////////////////////////////// WINNER REWARDS//////////////////////////////////////////////////////////////

    function moneyWonFromUser1Bet(
        uint256 betNumber,
        address msgsender
    ) public view returns (uint256) {
        if (!getHasUserWon(msgsender, betNumber)) {
            return 0;
        }
        if (canceled[betNumber] == true) {
            uint256 toRefund;
            for (uint i = 0; i < betOptions[betNumber]; i++) {
                toRefund += amountInPoolFromUser[betNumber][i][msgsender];
            }
            return toRefund;
        }
        return
            ((amountInPoolFromUser[betNumber][winner[betNumber]][msgsender] *
                amountLosedOnBet[betNumber]) /
                amountInPool[betNumber][winner[betNumber]]) +
            amountInPoolFromUser[betNumber][winner[betNumber]][msgsender];
    }

    function totalMoneyWonFromUser(
        address msgsender
    ) public view returns (uint256) {
        uint256 rewardsTotal = 0;
        uint256[] memory myBetsArray = getMyBetsUnpaid(msgsender);
        for (uint i = 0; i < myBetsArray.length; i++) {
            uint256 bet = myBetsArray[i];
            rewardsTotal += moneyWonFromUser1Bet(bet, msgsender);
        }
        return rewardsTotal;
    } // dynamic array : max => nombre total de paris d'un joueur => penser à vider la liste ou à l'archiver

    function claimMoneyFromP2P() public {
        uint256 rewardsTotal = 0;
        for (uint i = 0; i < myP2PbetsUser[msg.sender].length; i++) {
            //bool userWon=false;
            uint256 betNum = myP2PbetsUser[msg.sender][i];
            if (getDead(betNum)) {
                for (
                    uint o = 0;
                    o < myP2PbetsUserDetails[msg.sender][betNum].length;
                    o++
                ) {
                    uint256 p2pNum = myP2PbetsUserDetails[msg.sender][betNum][
                        o
                    ];
                    if (
                        !isInArrayAddress(
                            msg.sender,
                            addressesPayedP2P[betNum][p2pNum]
                        )
                    ) {
                        if (
                            msg.sender == p2pBets[betNum][p2pNum].creator &&
                            getWinner(betNum) ==
                            p2pBets[betNum][p2pNum].optionCreator
                        ) {
                            addressesPayedP2P[betNum][p2pNum].push(msg.sender);
                            uint256 toPay = p2pBets[betNum][p2pNum].cote -
                                p2pBets[betNum][p2pNum].amountToEnter +
                                p2pBets[betNum][p2pNum].amountBet;
                            rewardsTotal += toPay;
                            hasUserWonP2P[msg.sender][betNum][p2pNum] = true;
                            //userWon=true;
                        }
                        if (
                            msg.sender == p2pBets[betNum][p2pNum].creator &&
                            getWinner(betNum) !=
                            p2pBets[betNum][p2pNum].optionCreator
                        ) {
                            addressesPayedP2P[betNum][p2pNum].push(msg.sender);
                            uint256 toPay = (p2pBets[betNum][p2pNum].amountBet *
                                p2pBets[betNum][p2pNum].amountToEnter) /
                                p2pBets[betNum][p2pNum].cote;
                            rewardsTotal += toPay;
                            hasUserWonP2P[msg.sender][betNum][p2pNum] = false;
                        }
                        if (
                            amountBettedFromUserP2P[betNum][p2pNum][
                                msg.sender
                            ] >
                            0 &&
                            getWinner(betNum) !=
                            p2pBets[betNum][p2pNum].optionCreator
                        ) {
                            addressesPayedP2P[betNum][p2pNum].push(msg.sender);
                            uint256 toPay = amountBettedFromUserP2P[betNum][
                                p2pNum
                            ][msg.sender] * p2pBets[betNum][p2pNum].amountBet;
                            rewardsTotal +=
                                toPay /
                                p2pBets[betNum][p2pNum].cote +
                                amountBettedFromUserP2P[betNum][p2pNum][
                                    msg.sender
                                ];
                            hasUserWonP2P[msg.sender][betNum][p2pNum] = true;
                        }
                    }
                } // dynamic array : max => nombre de p2p bets sur un pari
            }
            if (canceled[betNum]) {
                for (
                    uint o = 0;
                    o < myP2PbetsUserDetails[msg.sender][betNum].length;
                    o++
                ) {
                    uint256 p2pNum = myP2PbetsUserDetails[msg.sender][betNum][
                        o
                    ];
                    if (
                        !isInArrayAddress(
                            msg.sender,
                            addressesPayedP2P[betNum][p2pNum]
                        )
                    ) {
                        if (msg.sender == p2pBets[betNum][p2pNum].creator) {
                            addressesPayedP2P[betNum][p2pNum].push(msg.sender);
                            rewardsTotal += p2pBets[betNum][p2pNum].amountBet;
                        }
                        if (
                            amountBettedFromUserP2P[betNum][p2pNum][
                                msg.sender
                            ] > 0
                        ) {
                            addressesPayedP2P[betNum][p2pNum].push(msg.sender);
                            rewardsTotal += amountBettedFromUserP2P[betNum][
                                p2pNum
                            ][msg.sender];
                        }
                    }
                } // dynamic array : max => nombre de p2p bets sur un pari
            }
        }
        if (rewardsTotal > 0) {
            payWinner(msg.sender, rewardsTotal);
        }
    } // dynamic array : max => nombre max de p2p bets d'un joueur => penser à archiver les bets

    function claimMoney() public {
        uint256 rewardsTotal = 0;
        for (uint i = 0; i < myBetsUser[msg.sender].length; i++) {
            uint256 betNumberIterator = getMyBetsUnpaid(msg.sender)[i];
            if (betNumberIterator != 0) {
                addressPayedOnBets[betNumberIterator].push(msg.sender);
                uint256 toBePaid;
                if (canceled[betNumberIterator]) {
                    for (uint u = 0; u < betOptions[betNumberIterator]; u++) {
                        toBePaid += amountInPoolFromUser[betNumberIterator][u][
                            msg.sender
                        ];
                        amountInPoolFromUser[betNumberIterator][u][
                            msg.sender
                        ] = 0;
                    }
                } else {
                    uint256 toBePaidWon;
                    uint256 moneyBetted = amountInPoolFromUser[
                        betNumberIterator
                    ][winner[betNumberIterator]][msg.sender];
                    if (moneyBetted > 0) {
                        hasUserWon[msg.sender][betNumberIterator] = true;
                    }
                    amountInPoolFromUser[betNumberIterator][
                        winner[betNumberIterator]
                    ][msg.sender] = 0;
                    uint256 amountInPoolBefore = amountInPool[
                        betNumberIterator
                    ][winner[betNumberIterator]];
                    amountInPool[betNumberIterator][winner[betNumberIterator]] =
                        amountInPool[betNumberIterator][
                            winner[betNumberIterator]
                        ] -
                        moneyBetted;
                    toBePaidWon =
                        (moneyBetted * amountLosedOnBet[betNumberIterator]) /
                        amountInPoolBefore;
                    toBePaid = toBePaidWon + moneyBetted;
                    amountLosedOnBet[betNumberIterator] =
                        amountLosedOnBet[betNumberIterator] -
                        toBePaidWon;
                    score[msg.sender] +=
                        (amountPoolLoser[betNumberIterator] * 1000000000) /
                        amountPoolWinner[betNumberIterator]; // decimales score
                }
                rewardsTotal = rewardsTotal + toBePaid;
            }
        } // dynamic array : max => nobmre max de bets d'un joueur => penser à archiver
        payWinner(msg.sender, rewardsTotal);
    }

    function isAddressPayed(
        uint256 betNumber,
        address addressToTest
    ) public view returns (bool) {
        return isInArrayAddress(addressToTest, addressPayedOnBets[betNumber]);
    }

    function payWinner(address winnerAddress, uint256 amount) internal {
        TetherContract.transfer(winnerAddress, amount);
        emit payment(winnerAddress, amount);
    }

    /////////////////////////////////// FEES//////////////////////////////////////////////////////////////

    function setFees(uint256 _fees) public onlyRole(CREATOR_ROLE) {
        feesRate = _fees;
    }

    function claimFeesMoney() public {
        address toSend = RECEIVER;
        TetherContract.transfer(toSend, amountToClaimForOwner);
        emit ownerPayed(amountToClaimForOwner);
        amountToClaimForOwner = 0;
    }

    /////////////////////////////////// PURES//////////////////////////////////////////////////////////////

    function constructor1() public {
        TetherContract = IUSDT(
            address(0x243F13935a8a855715c1e06d5dC6f0650354A1F5)
        );
        MBTokenContract = IMBT(
            address(0x8bC9B949D39d0136ea98CF3AF5d770391e76d999)
        );
        USDTaddress = address(0x243F13935a8a855715c1e06d5dC6f0650354A1F5);
        MBTaddress = address(0x8bC9B949D39d0136ea98CF3AF5d770391e76d999);
        feesRate = 6;
        lastBetNumber = 0;
        amountToClaimForOwner = 0;
        _setupRole(CREATOR_ROLE, msg.sender);
        string[] memory a1 = new string[](1);
        a1[0] = "0";
        uint256[] memory a2 = new uint256[](2);
        a2[0] = 0;
        createNewBets(a1, a2, 1);
        renounceRole(CREATOR_ROLE, msg.sender);
        _setupRole(
            CREATOR_ROLE,
            address(0x6d3DCcF2C028766D26a5382Fce9d898e75E6D629)
        ); //privateKey 0xd20947a33bb7e2b8a17b3a29c59f4bcb86131ede571fbf150aa0884e5fa48fa9
        _setupRole(
            ENDER_ROLE,
            address(0x1deecf77dD59A35c9f68cf507d79DDbd8524fa65)
        ); //privateKey 0x8b2e6d2f97bc806b85d17ecd3eae0a8dd24b4d40c96fb6ebebaf2835ce6714fb
        _setupRole(
            PAUSER_ROLE,
            address(0x3FD296730cE65e00218F44175cf8aca4DDd7E993)
        ); //privateKey 0x167bbf0f5bcd53019609d6b9b7f3bbcbdede1939856438631a6b3c3f54e71f68
        _setupRole(
            DEFAULT_ADMIN_ROLE,
            address(0x0BD3D64A172B0057f83Ab82774B18Fc04ffA002c)
        ); //privateKey 0x61267dc1bbbb7e8d83e7e737d5e5e42d16d83f0cd471df71f1d65fc936820a5d
        //0x473be604
    }

    function createNewBets(
        string[] memory names,
        uint256[] memory optionsNumbers,
        uint256 numberOfBetsToAdd
    ) public onlyRole(CREATOR_ROLE) {
        for (uint i = 0; i < numberOfBetsToAdd; i++) {
            require(betNameToBetNumber[names[i]] == 0, "bet already exist");
            betNumberToBetName[lastBetNumber] = names[i];
            betNameToBetNumber[names[i]] = lastBetNumber;
            betOptions[lastBetNumber] = optionsNumbers[i];
            emit newBetCreated(lastBetNumber, names[i]);
            address[] memory array;
            createP2PBet(0, 1, lastBetNumber, 0, array);
            lastBetNumber = lastBetNumber + 1;
        }
    }

    /////////////////////////////////////////////////// P2P BETS //////////////////////////////////////////////

    mapping(uint256 => p2pBet[]) p2pBets;

    mapping(uint256 => uint256) betNumberToLastBetP2P;
    mapping(uint256 => mapping(uint256 => mapping(address => uint256))) amountBettedFromUserP2P;
    mapping(uint256 => mapping(uint256 => address[])) addressesPayedP2P;
    mapping(address => uint256[]) myP2PbetsUser;
    mapping(address => mapping(uint256 => uint256[])) myP2PbetsUserDetails;

    function getP2PBet(
        uint256 betNumber,
        uint256 p2pNumber
    )
        public
        view
        returns (
            uint256,
            address,
            uint256,
            uint256,
            uint256,
            uint256,
            uint256,
            bool,
            address[] memory
        )
    {
        p2pBet memory bet = p2pBets[betNumber][p2pNumber];
        return (
            bet.ppbetNumber,
            bet.creator,
            bet.amountBet,
            bet.cote,
            bet.amountToEnter,
            bet.betCorrelated,
            bet.optionCreator,
            bet.friends,
            bet.authorized
        );
    }

    struct p2pBet {
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

    function getP2PBets(
        uint256 betNumber
    ) public view returns (p2pBet[] memory) {
        return p2pBets[betNumber];
    }

    function getBetNumberToLastBetP2P(
        uint256 betNumber
    ) public view returns (uint256) {
        return betNumberToLastBetP2P[betNumber];
    }

    function getAmountBettedFromUserP2P(
        uint256 betNumber,
        uint256 p2pNumber,
        address msgsender
    ) public view returns (uint256) {
        return amountBettedFromUserP2P[betNumber][p2pNumber][msgsender];
    }

    function getAddressesPayedP2P(
        uint256 betNumber,
        uint256 p2pNumber
    ) public view returns (address[] memory) {
        return addressesPayedP2P[betNumber][p2pNumber];
    }

    function seeMyP2PBetsUser(
        address msgsender
    ) public view returns (uint256[] memory) {
        return myP2PbetsUser[msgsender];
    }

    function seeMyP2PBetsUserDetail(
        address msgsender,
        uint256 betNumber
    ) public view returns (uint256[] memory) {
        return myP2PbetsUserDetails[msgsender][betNumber];
    }

    function totalMoneyWonFromUserP2P(
        address msgsender
    ) public view returns (uint256) {
        //here
        uint256 rewardsTotal = 0;
        uint256 lengthArray = seeMyP2PBetsUser(msgsender).length;
        uint256 indexArray = 0;
        uint256 zero = 0;
        uint256[2][] memory payedSimuler = new uint256[2][](lengthArray);
        for (uint i = 0; i < lengthArray; i++) {
            payedSimuler[i] = [zero, zero];
        }
        for (uint i = 0; i < myP2PbetsUser[msgsender].length; i++) {
            //bool userWon=false;
            uint256 betNum = myP2PbetsUser[msgsender][i];
            if (getDead(betNum)) {
                for (
                    uint o = 0;
                    o < myP2PbetsUserDetails[msgsender][betNum].length;
                    o++
                ) {
                    uint256 p2pNum = myP2PbetsUserDetails[msgsender][betNum][o];
                    //if(!isInArrayArray([betNum,p2pNum],payedSimuler)){
                    if (
                        !isInArrayAddress(
                            msgsender,
                            addressesPayedP2P[betNum][p2pNum]
                        ) && !isInArrayArray([betNum, p2pNum], payedSimuler)
                    ) {
                        if (
                            msgsender == p2pBets[betNum][p2pNum].creator &&
                            getWinner(betNum) ==
                            p2pBets[betNum][p2pNum].optionCreator
                        ) {
                            payedSimuler[indexArray] = [betNum, p2pNum];
                            indexArray++;
                            uint256 toPay = p2pBets[betNum][p2pNum].cote -
                                p2pBets[betNum][p2pNum].amountToEnter +
                                p2pBets[betNum][p2pNum].amountBet;
                            rewardsTotal += toPay;
                            //userWon=true;
                        }
                        if (
                            msgsender == p2pBets[betNum][p2pNum].creator &&
                            getWinner(betNum) !=
                            p2pBets[betNum][p2pNum].optionCreator
                        ) {
                            payedSimuler[indexArray] = [betNum, p2pNum];
                            indexArray++;
                            uint256 toPay = (p2pBets[betNum][p2pNum].amountBet *
                                p2pBets[betNum][p2pNum].amountToEnter) /
                                p2pBets[betNum][p2pNum].cote;
                            rewardsTotal += toPay;
                            //userWon=false;
                        }
                        if (
                            amountBettedFromUserP2P[betNum][p2pNum][msgsender] >
                            0 &&
                            getWinner(betNum) !=
                            p2pBets[betNum][p2pNum].optionCreator
                        ) {
                            payedSimuler[indexArray] = [betNum, p2pNum];
                            indexArray++;
                            uint256 toPay = amountBettedFromUserP2P[betNum][
                                p2pNum
                            ][msgsender] * p2pBets[betNum][p2pNum].amountBet;
                            rewardsTotal +=
                                toPay /
                                p2pBets[betNum][p2pNum].cote +
                                amountBettedFromUserP2P[betNum][p2pNum][
                                    msgsender
                                ];
                            //userWon=true;
                        }
                    }
                } // dynamic array : max => nombre de p2p bets sur un pari
            }
            if (canceled[betNum]) {
                for (
                    uint o = 0;
                    o < myP2PbetsUserDetails[msgsender][betNum].length;
                    o++
                ) {
                    uint256 p2pNum = myP2PbetsUserDetails[msgsender][betNum][o];
                    if (
                        !isInArrayAddress(
                            msgsender,
                            addressesPayedP2P[betNum][p2pNum]
                        ) && !isInArrayArray([betNum, p2pNum], payedSimuler)
                    ) {
                        if (msgsender == p2pBets[betNum][p2pNum].creator) {
                            payedSimuler[indexArray] = [betNum, p2pNum];
                            indexArray++;
                            rewardsTotal += p2pBets[betNum][p2pNum].amountBet;
                        }
                        if (
                            amountBettedFromUserP2P[betNum][p2pNum][msgsender] >
                            0
                        ) {
                            payedSimuler[indexArray] = [betNum, p2pNum];
                            indexArray++;
                            rewardsTotal += amountBettedFromUserP2P[betNum][
                                p2pNum
                            ][msgsender];
                        }
                    }
                } // dynamic array : max => nombre de p2p bets sur un pari
            }
        }
        return rewardsTotal;
    }

    function createP2PBet(
        uint256 amountToBet,
        uint256 amountToEnter,
        uint256 betNumber,
        uint256 optionToBet,
        address[] memory authorized
    ) public {
        require(betNumber < getLastBetNumber() + 1, "bet doesn't exist");
        require(!getClosed(betNumber), "bet expired");
        TetherContract.transferFrom(msg.sender, address(this), amountToBet);
        MBTokenContract.transferFrom(msg.sender, address(this), amountToBet);
        bool friends = false;
        if (authorized.length > 0) {
            friends = true;
        }
        p2pBets[betNumber].push(
            p2pBet(
                betNumberToLastBetP2P[betNumber],
                msg.sender,
                amountToBet,
                amountToEnter,
                amountToEnter,
                betNumber,
                optionToBet,
                friends,
                authorized
            )
        );
        myP2PbetsUser[msg.sender].push(betNumber);
        myP2PbetsUserDetails[msg.sender][betNumber].push(
            betNumberToLastBetP2P[betNumber]
        );
        betNumberToLastBetP2P[betNumber]++;
    }

    function joinP2PBet(
        uint256 betNumber,
        uint256 p2pNumber,
        uint256 amountToBet
    ) public {
        require(!getClosed(betNumber), "bet closed");
        require(
            amountToBet > 0 &&
                amountToBet <= p2pBets[betNumber][p2pNumber].amountToEnter,
            "invalid amount"
        );
        if (p2pBets[betNumber][p2pNumber].friends) {
            require(
                isInArrayAddress(
                    msg.sender,
                    p2pBets[betNumber][p2pNumber].authorized
                ),
                "non authorized"
            );
        }
        TetherContract.transferFrom(msg.sender, address(this), amountToBet);
        p2pBets[betNumber][p2pNumber].amountToEnter =
            p2pBets[betNumber][p2pNumber].amountToEnter -
            amountToBet;
        amountBettedFromUserP2P[betNumber][p2pNumber][
            msg.sender
        ] += amountToBet;
        myP2PbetsUser[msg.sender].push(betNumber);
        myP2PbetsUserDetails[msg.sender][betNumber].push(p2pNumber);
        payMBToken(msg.sender, amountToBet);
    }

    function getMaxCoteP2PBet(
        uint256 betNumber,
        uint256 optionAgainst,
        uint256 minToEnter
    ) public view returns (uint256) {
        uint256 maxBet = 0;
        for (uint i = 1; i < p2pBets[betNumber].length; i++) {
            if (
                (10000 * p2pBets[betNumber][i].amountBet) /
                    p2pBets[betNumber][i].cote >
                (10000 * p2pBets[betNumber][maxBet].amountBet) /
                    p2pBets[betNumber][maxBet].cote &&
                p2pBets[betNumber][i].optionCreator == optionAgainst &&
                minToEnter <= p2pBets[betNumber][i].amountToEnter &&
                p2pBets[betNumber][i].amountToEnter > 0
            ) {
                maxBet = i;
            }
        } // dynamic array : max => nombre max de p2p bets sur un bet
        return maxBet;
    }

    function getScoreUser(address msgsender) public view returns (uint256) {
        return score[msgsender];
    }

    function getTotalMoneyBet(uint256 betNumber) public view returns (uint256) {
        uint256 totalMoney = 0;
        for (uint i = 0; i < betOptions[betNumber]; i++) {
            totalMoney += getAmountInPool(betNumber, i);
        }
        return totalMoney;
    }

    function claimTotalMoney() public {
        claimMoney();
        claimMoneyFromP2P();
    }

    mapping(address => mapping(uint256 => bool)) hasUserWon;

    mapping(address => mapping(uint256 => mapping(uint256 => bool))) hasUserWonP2P;

    function getHasUserWon(
        address msgsender,
        uint256 betNumber
    ) public view returns (bool) {
        if (hasUserWon[msgsender][betNumber] == true) {
            return true;
        } else {
            if (dead[betNumber] == false && canceled[betNumber] == false) {
                return false;
            }
            if (canceled[betNumber] == true) {
                for (uint i = 0; i < betOptions[betNumber]; i++) {
                    if (amountInPoolFromUser[betNumber][i][msgsender] > 0) {
                        return true;
                    }
                }
                return false;
            }
            return
                amountInPoolFromUser[betNumber][winner[betNumber]][msgsender] !=
                0 &&
                isInArrayAddress(msgsender, addressPayedOnBets[betNumber]) ==
                false;
        }
    }

    function getHasUserWonP2P(
        address msgsender,
        uint256 betNumber,
        uint256 p2pNumber
    ) public view returns (bool) {
        if (hasUserWonP2P[msgsender][betNumber][p2pNumber] == true) {
            return true;
        } else {
            if (
                (dead[betNumber] == false && canceled[betNumber] == false) ||
                isInArrayAddress(
                    msgsender,
                    addressesPayedP2P[betNumber][p2pNumber]
                ) ==
                true
            ) {
                return false;
            }
            if (canceled[betNumber] == true) {
                return
                    isInArrayUint256(
                        p2pNumber,
                        seeMyP2PBetsUserDetail(msgsender, betNumber)
                    );
            }
            if (
                p2pBets[betNumber][p2pNumber].optionCreator ==
                getWinner(betNumber) &&
                p2pBets[betNumber][p2pNumber].creator == msgsender
            ) {
                return true;
            }
            if (
                p2pBets[betNumber][p2pNumber].optionCreator !=
                getWinner(betNumber) &&
                p2pBets[betNumber][p2pNumber].creator != msgsender &&
                isInArrayUint256(
                    p2pNumber,
                    seeMyP2PBetsUserDetail(msgsender, betNumber)
                )
            ) {
                return true;
            }
            return false;
        }
    }

    mapping(uint256 => mapping(uint256 => uint256)) amountInPoolEnd;

    function getAmountInPoolEnd(
        uint256 betNumber,
        uint256 option
    ) public view returns (uint256) {
        return amountInPoolEnd[betNumber][option];
    }

    mapping(uint256 => mapping(uint256 => mapping(address => uint256))) amountInPoolFromUserEnd;

    function getAmountInPoolFromUserEnd(
        uint256 betNumber,
        uint256 option,
        address msgsender
    ) public view returns (uint256) {
        return amountInPoolFromUserEnd[betNumber][option][msgsender];
    }
}

contract MyFinalContract is MultiBetUSDTMultiOptions, Proxiable {
    function updateCode(address newCode) public onlyRole(DEFAULT_ADMIN_ROLE) {
        updateCodeAddress(newCode);
    }
}
