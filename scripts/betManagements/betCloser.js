import { GAS_PRICE, web3, NODES_URL_BSCTESTNET, PRIVATE_KEY_CREATOR, PUBLIC_KEY_CREATOR, multiBetAddress, NODE_URL_BSCTESTNET, NODE_URL_POLYGON, multiBetABI, betClosedABI } from "../config.js"
import { logBetCloser } from "../logger.js";
import model from '../model.js'
import HDWalletProvider from '@truffle/hdwallet-provider'

function run() {
    try {

        const multiBetContract = new web3.eth.Contract(multiBetABI, multiBetAddress);
        const DELAY = 60000

        multiBetContract.setConfig({ contractDataInputFill: "both" })


        function betCloser() {
            setTimeout(betCloser, DELAY);
            let date1 = Math.floor(new Date().getTime() / 1000);
            let date2 = Math.floor((new Date().getTime() + DELAY) / 1000);
            let resultDB = model.get_UnderDate( date2);
            let betsToClose = [];
            for (let i = 0; i < resultDB.length; i++) {
                betsToClose.push(resultDB[i]["betNumber"]);
            }
            if (betsToClose.length > 0) {
                console.log(betsToClose + " sent for closing on " + new Date().toLocaleDateString() + " at " + new Date().toLocaleTimeString());
                closeBetsOnChain(betsToClose,multiBetContract)
            }
            else {
                console.log(`no bet to close on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()} to ${new Date(new Date().getTime() + DELAY).toLocaleTimeString()} from ${date1} to ${date2}`)
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


function closeBetsOnChain(betsToClose,multiBetContract) {
    multiBetContract.methods
        .closeBets(betsToClose)
        .send({ from: PUBLIC_KEY_CREATOR, gasPrice: GAS_PRICE })
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
        .catch((error) => {
            console.log(error)
            logBetCloser(`error ${error.error.code} : ${error.error.message} on ${web3.currentProvider.engine._providers[3].rpcUrl}`)
            if (error.error.code === -32000) {
                let newProvider = new HDWalletProvider(PRIVATE_KEY_CREATOR, NODES_URL_BSCTESTNET[Math.floor(Math.random() * NODES_URL_BSCTESTNET.length)], 0, 10000);
                web3.setProvider(newProvider)
                console.log("after error, provider is set to " + web3.currentProvider.engine._providers[3].rpcUrl)
                closeBetsOnChain(betsToClose)
            }
        })
}
run()