import { API_KEY, PRIVATE_KEY_ENDER, PUBLIC_KEY_ENDER, multiBetAddress, NODE_URL_BSCTESTNET, NODE_URL_POLYGON, multiBetABI, URL_API_BASKETBALL } from "../config.js"
import fs from 'fs';
import db_betEnder from './db_betEnder.js'
import { Web3 } from 'web3';
import HDWalletProvider from '@truffle/hdwallet-provider'


const provider = new HDWalletProvider(PRIVATE_KEY_ENDER, NODE_URL_BSCTESTNET);
const web3 = new Web3(provider);
const multiBetContract = new web3.eth.Contract(multiBetABI, multiBetAddress);

multiBetContract.setConfig({ contractDataInputFill: "both" })


async function betEnder() {
    setTimeout(betEnder, 60000);
    let betsClosed = db_betEnder.get_betClosed();
    if (betsClosed.length > 0) {
        createWinnersArray(betsClosed)
            .then((winnerArray) => {
                if (winnerArray[0].length > 0) {
                    console.log(`${winnerArray[0]} sent for ending on with ${winnerArray[1]} on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`);
                    endBetOnChain(winnerArray[0], winnerArray[1]);
                }
                else {
                    let str = `${new Date().toLocaleDateString()} ${new Date(new Date().getTime() - 60000).toLocaleTimeString()} to ${new Date().toLocaleTimeString()} : no bet to End`
                    console.log(str);
                    fs.appendFile("../logs/logsBetEnder.txt", str + "\n", function (err) {
                        if (err) {
                            return console.log(err);
                        }
                    });
                }
            })
    }
    else {
        let str = `${new Date().toLocaleDateString()} ${new Date(new Date().getTime() - 60000).toLocaleTimeString()} to ${new Date().toLocaleTimeString()} : no bet to End`
        console.log(str);
        fs.appendFile("../logs/logsBetEnder.txt", str + "\n", function (err) {
            if (err) {
                return console.log(err);
            }
        });
    }
}

betEnder();

async function endBetOnChain(betsToEnd, winnerBetsToEnd) {
    console.log("tx sent")
    await multiBetContract.methods
        .endBets(betsToEnd, winnerBetsToEnd)
        .send({ from: keyPublic })
        .on('receipt', function (receipt) {
            db_betEnder.endBets(betsToEnd)
            let str =`${new Date().toLocaleDateString()} ${new Date()} ${betsToEnd} ended with ${winnerBetsToEnd}`
            console.log(str);
            fs.appendFile("../logs/logsBetEnder.txt", str + "\n", function (err) {
                if (err) {
                    return console.log(err);
                }
            });
        })
        .on('error', function (error, receipt) {
            console.log(`error tx ${error}`);
        })
}

async function createWinnersArray(betsClosed) {
    let betsToEnd = [];
    let winnerBetsToEnd = [];
    await new Promise(async next => {
        for (i = 0; i < betsClosed.length; i++) {
            let betNumber = betsClosed[i]
            let options = {
                'method': 'GET',
                'headers': {
                    'x-rapidapi-key': API_KEY,
                    'x-rapidapi-host': 'v1.basketball.api-sports.io'
                }
            }
            let res = await fetch(URL_API_BASKETBALL + `?id=${db_betEnder.get_idAPI(betNumber)}`, options)
            let data = await res.json()

            console.log("request basket for bet " + betNumber);
            let matchStatus = data.response[0].status.short
            let scoreHome = data.response[0].scores.home.total
            let scoreAway = data.response[0].scores.away.total
            if (matchStatus === "FT" || matchStatus === "AOT") {
                db_betEnder.update_score(betNumber, scoreHome, scoreAway)
                if (scoreHome > scoreAway) {
                    winnerBetsToEnd.push(0);
                }
                else {
                    winnerBetsToEnd.push(1);
                }
                betsToEnd.push(betNumber);
            }
            else if (
                matchStatus === "POST" || matchStatus === "CANC" || matchStatus === "SUSP" || matchStatus === "AWD" || matchStatus === "ABD"
            ) {
                db_betEnder.cancelBet(betNumber)
            }
            else if (matchStatus !== "NS") {
                db_betEnder.update_score(betNumber, scoreHome, scoreAway)
            }
        }
        next()
    })
    if (betsToEnd.length > 0) {
        console.log(betsToEnd, winnerBetsToEnd);
    }
    return [betsToEnd, winnerBetsToEnd];
}