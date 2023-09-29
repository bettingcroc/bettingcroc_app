const logger = require('./logger.js')
const model = require('./model.js');
const Web3 = require('web3');
const request = require("request");
const NODE_URL_BSCTESTNET = "https://data-seed-prebsc-1-s1.binance.org:8545/"; //url of bsc testnet node
//const NODE_URL_BSCTESTNET = "https://rpc.ankr.com/bsc_testnet_chapel";
const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const { Contract } = require('web3-eth-contract');
const multiBetABI = fs.readFileSync('./MultiBetABI.txt').toString();
const multiBetAddress = '0xBD445c5A2C4197ce12DE4e28473dE471aD21D8B5';
const keyPublic = '0x1deecf77dD59A35c9f68cf507d79DDbd8524fa65';
const keyPrivate = '8b2e6d2f97bc806b85d17ecd3eae0a8dd24b4d40c96fb6ebebaf2835ce6714fb';


async function betEnder() {
    setTimeout(betEnder, 60000);
    resultDB = model.get_betClosed();
    betsClosed = [];
    for (i = 0; i < resultDB.length; i++) {
        betsClosed.push(resultDB[i]["betNumber"]);
    }
    timeNow = new Date();
    dateNow = new Date().toLocaleDateString();
    if (betsClosed.length > 0) {
        createWinnersArray(betsClosed)
            .then((result) => {
                if (result[0].length > 0) {
                    //logger.blue(result)
                    console.log(result[0] + " sent for ending on with " + result[1] + " on " + dateNow + " at " + timeNow.toLocaleTimeString());
                    endBetOnChain(result[0], result[1]);
                }
                else {
                    console.log("no bet to end on " + dateNow + " at ", new Date(timeNow.getTime() - 60000).toLocaleTimeString(), " to ", timeNow.toLocaleTimeString());
                    let str = dateNow + " " + new Date(timeNow.getTime() - 300000).toLocaleTimeString() + " to " + timeNow.toLocaleTimeString() + " : no bet to End";
                    fs.appendFile("../logs/logsBetEnder.txt", str + "\n", function (err) {
                        if (err) {
                            return console.log(err);
                        }
                    });
                }
            })

    }
    else {
        console.log("no bet to end on " + dateNow + " at ", new Date(timeNow.getTime() - 60000).toLocaleTimeString(), " to ", timeNow.toLocaleTimeString());
        let str = dateNow + " " + new Date(timeNow.getTime() - 300000).toLocaleTimeString() + " to " + timeNow.toLocaleTimeString() + " : no bet to End";
        fs.appendFile("../logs/logsBetEnder.txt", str + "\n", function (err) {
            if (err) {
                return console.log(err);
            }
        });
    }
}

betEnder();

async function endBetOnChain(betsToEnd, winnerBetsToEnd) {
    const provider = new HDWalletProvider(keyPrivate, NODE_URL_BSCTESTNET);
    let web3 = new Web3(provider);
    multiBetContract = new web3.eth.Contract(JSON.parse(multiBetABI), multiBetAddress);
    console.log("tx sent")
    await multiBetContract.methods
        .endBets(betsToEnd, winnerBetsToEnd)
        .send({ from: keyPublic })
        .on('receipt', function (receipt) {
            model.endBets(betsToEnd)
            let timeNow = new Date().toLocaleTimeString();
            let dateNow = new Date().toLocaleDateString();
            console.log(betsToEnd + " ended with " + winnerBetsToEnd + " on " + dateNow + " at " + timeNow);
            console.log(receipt);
            let str = dateNow + " " + timeNow + " " + betsToEnd + " ended with " + winnerBetsToEnd;
            fs.appendFile("../logs/logsBetEnder.txt", str + "\n", function (err) {
                if (err) {
                    return console.log(err);
                }
            });
        })
        .on('error', function (error, receipt) {
            console.log("error tx");
        })
}

async function createWinnersArray(betsClosed) {
    betsToEnd = [];
    winnerBetsToEnd = [];
    for (i = 0; i < betsClosed.length; i++) {
        let betNumber = betsClosed[i]
        if (model.get_Type(betNumber) === 'football') {
            var optionsFoot = {
                'method': 'GET',
                'url': 'https://v3.football.api-sports.io/fixtures',
                qs: { id: model.get_idAPI(betNumber) },
                'headers': {
                    'x-rapidapi-host': 'v3.football.api-sports.io',
                    'x-rapidapi-key': '1b8bea4eb9795ae6f10a338ffe214f5d'
                }
            };
            await new Promise(next => {
                request(optionsFoot, function (error, response) {
                    console.log("requête foot for bet " + betNumber);
                    //console.log(JSON.parse(response.body).response[0].fixture.status)
                    if (JSON.parse(response.body).response[0].fixture.status.short === "FT" || JSON.parse(response.body).response[0].fixture.status.short === "AET" || JSON.parse(response.body).response[0].fixture.status.short === "PEN") {
                        if (JSON.parse(response.body).response[0].teams.home.winner === true) {
                            winnerBetsToEnd.push(0);
                            betsToEnd.push(betNumber);
                        }
                        else {
                            if (JSON.parse(response.body).response[0].teams.away.winner === true) {
                                winnerBetsToEnd.push(2);
                            }
                            else {
                                winnerBetsToEnd.push(1);
                            }
                            betsToEnd.push(betNumber);
                        }
                    }

                    next();
                })
            })
        }
        if (model.get_Type(betNumber) === 'basketball') {
            var optionsNBA = {
                'method': 'GET',
                'url': 'https://v1.basketball.api-sports.io/games',
                qs: { id: model.get_idAPI(betNumber) },
                'headers': {
                    'x-rapidapi-key': '1b8bea4eb9795ae6f10a338ffe214f5d',
                    'x-rapidapi-host': 'v1.basketball.api-sports.io'
                }
            };

            await new Promise(next => {
                request(optionsNBA, function (error, response) {
                    console.log("request basket for bet " + betNumber);
                    let matchStatus = JSON.parse(response.body).response[0].status.short
                    let scoreHome = JSON.parse(response.body).response[0].scores.home.total
                    let scoreAway = JSON.parse(response.body).response[0].scores.away.total
                    if (matchStatus === "FT" || matchStatus === "AOT") {
                        model.update_score(betNumber,scoreHome,scoreAway)
                        if (scoreHome > scoreAway) {
                            winnerBetsToEnd.push(0);
                        }
                        else {
                            winnerBetsToEnd.push(1);
                        }
                        betsToEnd.push(betNumber);
                    }
                    else if (
                        matchStatus === "POST"|| matchStatus === "CANC"|| matchStatus === "SUSP"|| matchStatus === "AWD"|| matchStatus === "ABD"
                    ) {
                        model.cancelBet(betNumber)
                    }
                    else if (matchStatus !== "NS") {
                        model.update_score(betNumber,scoreHome,scoreAway)
                    }
                    next();
                })

            })

        }
    }
    if (betsToEnd.length > 0) {
        console.log(betsToEnd, winnerBetsToEnd);
    }
    return [betsToEnd, winnerBetsToEnd];
}