import { GAS_PRICE, API_KEY, PRIVATE_KEY_ENDER, PUBLIC_KEY_ENDER, multiBetAddress, NODE_URL_BSCTESTNET, NODES_URL_BSCTESTNET, NODE_URL_POLYGON, multiBetABI,  betClosedABI } from "../config.js"
import db_betEnder from './db_betEnder.js'
import HDWalletProvider from '@truffle/hdwallet-provider'
import { logBetEnder } from "../logger.js";
import { Web3 } from 'web3';

function run() {
    try {
        const DELAY = 60000
        const provider = new HDWalletProvider(PRIVATE_KEY_ENDER, NODE_URL_BSCTESTNET, 0, 10000);
        const web3 = new Web3(provider);
        const multiBetContract = new web3.eth.Contract(multiBetABI, multiBetAddress);

        multiBetContract.setConfig({ contractDataInputFill: "both" })


        async function betEnder() {
            setTimeout(betEnder, DELAY);
            let betsClosed = db_betEnder.get_betClosed();
            if (betsClosed.length > 0) {
                createWinnersArray(betsClosed)
                    .then((winnerArray) => {
                        if (winnerArray[0].length > 0) {
                            console.log(`${winnerArray[0]} sent for ending on with ${winnerArray[1]} on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`);
                            endBetOnChain(winnerArray[0], winnerArray[1]);
                        }
                        else {
                            logBetEnder(`${new Date().toLocaleDateString()} ${new Date(new Date().getTime() - 60000).toLocaleTimeString()} to ${new Date().toLocaleTimeString()} : no bet to End`)
                        }
                    })
            }
            else {
                logBetEnder(`${new Date().toLocaleDateString()} ${new Date(new Date().getTime() - 60000).toLocaleTimeString()} to ${new Date().toLocaleTimeString()} : no bet to End`)
            }
        }


        async function endBetOnChain(betsToEnd, winnerBetsToEnd) {
            await multiBetContract.methods
                .endBets(betsToEnd, winnerBetsToEnd)
                .send({ from: PUBLIC_KEY_ENDER, gasPrice: GAS_PRICE })
                .on('receipt', function (receipt) {
                    db_betEnder.endBets(betsToEnd)
                    logBetEnder(`${new Date().toLocaleDateString()} ${new Date()} bets ${betsToEnd} ended with ${winnerBetsToEnd}`)
                })
                .catch((error) => {
                    console.log(error)
                    logBetEnder(`error ${error.error.code} : ${error.error.message} on ${web3.currentProvider.engine._providers[3].rpcUrl}`)
                    if (error.error.code === -32000) {
                        let newProvider = new HDWalletProvider(PRIVATE_KEY_CREATOR, NODES_URL_BSCTESTNET[Math.floor(Math.random() * NODES_URL_BSCTESTNET.length)], 0, 10000);
                        web3.setProvider(newProvider)
                        console.log("after error, provider is set to " + web3.currentProvider.engine._providers[3].rpcUrl)
                    }
                })
        }


        async function createWinnersArray(betsClosed) {
            let betsToEnd = [];
            let winnerBetsToEnd = [];
            await new Promise(async next => {
                for (let i = 0; i < betsClosed.length; i++) {
                    let betNumber = betsClosed[i]
                    let type = db_betEnder.get_Type(betNumber)
                    let idApi = db_betEnder.get_idAPI(betNumber)
                    let options = {
                        'method': 'GET'
                    }
                    let url = `https://apiv2.allsportsapi.com/${type}/?met=Livescore&APIkey=${API_KEY}&matchId=${idApi}`
                    let res = await fetch(url, options)
                    let data;
                    try {
                        data = await res.json()
                    } catch (error) {
                        console.error('Error parsing response:', error);
                        // Handle the error appropriately
                    }
                    let isDataFromLiveAPI = true
                    if (data.result === undefined) {
                        isDataFromLiveAPI = false
                        url = `https://apiv2.allsportsapi.com/${type}/?met=Fixtures&APIkey=${API_KEY}&matchId=${db_betEnder.get_idAPI(betNumber)}`

                        res = await fetch(url, options)
                        try {
                            data = await res.json()
                        } catch (error) {
                            console.error('Error parsing response:', error);
                            // Handle the error appropriately
                        }
                    }
                    console.log(url)
                    let matchStatus = data.result[0].event_status
                    let score = type === "basketball" ? data.result[0].event_final_result : isDataFromLiveAPI ? data.result[0].event_final_result : data.result[0].event_ft_result
                    console.log(`bet ${betNumber} apiNumber ${idApi} : matchStatus ${matchStatus === "" ? "null" : matchStatus} score ${score=== "" ? "null" : score}`)
                    if (
                        matchStatus === "Abandoned" || matchStatus === "Cancelled" || matchStatus === "Postponed"
                    ) {
                        db_betEnder.cancelBet(betNumber)
                    }
                    if (score !== "") {
                        let scoreHome = score.split('-')[0].replace(' ', '')
                        let scoreAway = score.split('-')[1].replace(' ', '')
                        if (matchStatus === "Finished" || matchStatus === "After ET" || matchStatus === "After Pen.") {
                            db_betEnder.update_score(betNumber, scoreHome, scoreAway)
                            if (scoreHome > scoreAway) {
                                winnerBetsToEnd.push(0);
                            } else if (scoreHome === scoreAway) {
                                winnerBetsToEnd.push(1);
                            }
                            else {
                                winnerBetsToEnd.push(2);
                            }
                            betsToEnd.push(betNumber);
                        }
                        else {
                            db_betEnder.update_score(betNumber, scoreHome, scoreAway)
                        }
                    }
                }
                next()
            })
            if (betsToEnd.length > 0) {
                console.log(betsToEnd, winnerBetsToEnd);
            }
            return [betsToEnd, winnerBetsToEnd];
        }


        betEnder();
    }
    catch (e) {
        console.log("error running")
        console.log(e)
        run()
    }
}

run()