const io = require('socket.io-client')
const logger = require('./logger.js')
const db = require('./db_betEnder.js');
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
    let betsClosed_fromDB = db.get_betClosed_byType("basketball");
    let leaguesClosed_fromDB = db.get_leagueClosed_byType("basketball");
    betsClosed = [];
    leaguesClosed = [];
    for (i = 0; i < betsClosed_fromDB.length; i++) {
        betsClosed.push(betsClosed_fromDB[i]["betNumber"]);
    }
    for (i = 0; i < leaguesClosed_fromDB.length; i++) {
        leaguesClosed.push(leaguesClosed_fromDB[i]["league"]);
    }
    console.log(betsClosed)
    console.log(leaguesClosed)
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
        /*console.log("no bet to end on " + dateNow + " at ", new Date(timeNow.getTime() - 60000).toLocaleTimeString(), " to ", timeNow.toLocaleTimeString());
        let str = dateNow + " " + new Date(timeNow.getTime() - 300000).toLocaleTimeString() + " to " + timeNow.toLocaleTimeString() + " : no bet to End";
        fs.appendFile("../logs/logsBetEnder.txt", str + "\n", function (err) {
            if (err) {
                return console.log(err);
            }
        });*/
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
            db.endBets(betsToEnd)
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
            console.log("e ", error);
            if (error.code === -32000) {
              setTimeout(async function () { await betWriter(listNames, listOptions, type, infosBets) }, 60000)
            }
        })
}

async function createWinnersArray(betsClosed) {
    betsToEnd = [];
    winnerBetsToEnd = [];

    let link = getApiLink("773")

    fetch(link, { method: "GET" }).then((res) => {
        res.json().then(async (data) => {
            let numberOfMatches = betsClosed.length

            for (let indexMatches = 0; indexMatches < numberOfMatches; indexMatches++) {
                let betNumber = betsClosed[indexMatches]
                let idAPIMatch = db.get_idAPI(betNumber)
                let match = null
                try {


                    for (let matchData = 0; matchData < data["result"].length; matchData++) {
                        if (data["result"][matchData].event_key === idAPIMatch) { match = data["result"][matchData] }

                    }

                    let statusMatch = match["event_quarter"]
                    let scoreMatch = match["event_final_result"].split(" - ")
                    let scoreHome = scoreMatch[0]
                    let scoreAway = scoreMatch[1]
                    if (statusMatch === "3rd Quarter") { // à remplacer par Finished
                        betsToEnd.push(betsClosed[indexMatches])
                        if (scoreHome > scoreAway) {
                            winnerBetsToEnd.push(0)
                        }
                        else {
                            winnerBetsToEnd.push(1)
                        }
                    }
                    console.log(betNumber, scoreHome, scoreAway)
                    db.update_score(betNumber, scoreHome, scoreAway)
                }
                catch (e) {
                    //console.log(e)
                }

            }
        })
    })
    if (betsToEnd.length > 0) {
        console.log(betsToEnd, winnerBetsToEnd);
    }
    return [betsToEnd, winnerBetsToEnd];
}

function getApiLink(league) {
    return "https://apiv2.allsportsapi.com/basketball/?met=Livescore&APIkey=81539bf5b04eb05071c0cb74df4a5da592910d8006b47be9b1fa1a608c90b3f1&leagueId=" + league
}