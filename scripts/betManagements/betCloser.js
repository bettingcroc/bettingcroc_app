import { PRIVATE_KEY_CREATOR, PUBLIC_KEY_CREATOR, multiBetAddress, NODE_URL_BSCTESTNET, NODE_URL_POLYGON, multiBetABI, betClosedABI } from "../config.js"
import { logBetCloser } from "../logger.js";
import model from '../model.js'
import { Web3 } from 'web3';
import HDWalletProvider from '@truffle/hdwallet-provider'

function run() {
    try {

        const provider = new HDWalletProvider(PRIVATE_KEY_CREATOR, NODE_URL_BSCTESTNET,0,10000);
        const web3 = new Web3(provider);
        const multiBetContract = new web3.eth.Contract(multiBetABI, multiBetAddress);

        multiBetContract.setConfig({ contractDataInputFill: "both" })


        function betCloser() {
            setTimeout(betCloser, 60000);
            let date1 = Math.floor(new Date().getTime() / 1000);
            let date2 = Math.floor((new Date().getTime() + 60000) / 1000);
            let resultDB = model.get_BetBetween2dates(date1, date2);
            let betsToClose = [];
            for (let i = 0; i < resultDB.length; i++) {
                betsToClose.push(resultDB[i]["betNumber"]);
            }
            if (betsToClose.length > 0) {
                console.log(betsToClose + " sent for closing on " + new Date().toLocaleDateString() + " at " + new Date().toLocaleTimeString());
                multiBetContract.methods
                    .closeBets(betsToClose)
                    .send({ from: PUBLIC_KEY_CREATOR })
                    .on('receipt', function (receipt) {
                        let betsToClose = []
                        let logs = receipt.logs.filter(log => log.address.toLowerCase() === multiBetAddress.toLowerCase());
                        logs.forEach(log => {
                            let res = web3.eth.abi.decodeLog(betClosedABI, log.data, log.topics)
                            betsToClose.push(parseInt(res.betNumber))
                        });
                        model.closeBets(betsToClose)
                        logBetCloser(`${betsToClose} closed on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`)
                    })
                    .on('error', function (error, receipt) {
                        console.log("error tx");
                    })
            }
            else {
                logBetCloser(`no bet to close on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()} to ${new Date(new Date().getTime() + 60000).toLocaleTimeString()}`)
            }
        }


        betCloser();
    }
    catch (e) {
        console.log("error running")
        console.log(e)
        run()
    }
}

run()