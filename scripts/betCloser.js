
const logger = require('./logger.js')
const model = require('./model.js');
const Web3 = require('web3');
const NODE_URL_BSCTESTNET = "https://data-seed-prebsc-1-s1.binance.org:8545/"; //url of bsc testnet node
//const NODE_URL_BSCTESTNET = "https://rpc.ankr.com/bsc_testnet_chapel";
const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const { Contract } = require('web3-eth-contract');
const multiBetABI = fs.readFileSync('./MultiBetABI.txt').toString();
const multiBetAddress = '0x99E3AC652BaB8F1b2Ff2b25d58862f1854C6689d';
const keyPublic = '0x6d3DCcF2C028766D26a5382Fce9d898e75E6D629';
const keyPrivate = 'd20947a33bb7e2b8a17b3a29c59f4bcb86131ede571fbf150aa0884e5fa48fa9';
const provider = new HDWalletProvider(keyPrivate, NODE_URL_BSCTESTNET);
const web3 = new Web3(provider);
const multiBetContract = new web3.eth.Contract(JSON.parse(multiBetABI), multiBetAddress);

function betCloser() {
    setTimeout(betCloser, 60000);
    date1 = new Date().getTime(); //1 min en avance chaque min
    date2 = new Date().getTime() + 60000;
    date1 = Math.floor(date1 / 1000);
    date2 = Math.floor(date2 / 1000);
    resultDB = model.get_BetBetween2dates(date1, date2);
    betsToClose = [];
    for (let i = 0; i < resultDB.length; i++) {
        betsToClose.push(resultDB[i]["betNumber"]);
    }

    timeNow = new Date();
    dateNow = new Date().toLocaleDateString();
    if (betsToClose.length > 0) {
        console.log(betsToClose + " sent for closing on " + dateNow + " at " + timeNow.toLocaleTimeString());
        closeBetOnChain(betsToClose);
    }
    else {
        let str = "no bet to close on " + dateNow + " at " + timeNow.toLocaleTimeString() + " to " + new Date(timeNow.getTime() + 60000).toLocaleTimeString();
        logger.magenta(str);
        fs.appendFile("../logs/logsBetCloser.txt", str + "\n", function (err) {
            if (err) {
                return console.log(err);
            }
        });
    }
}
betCloser();

async function closeBetOnChain(betsToClose) {
    timeNow = new Date().toLocaleTimeString();
    dateNow = new Date().toLocaleDateString();
    await multiBetContract.methods
        .closeBets(betsToClose)
        .send({ from: keyPublic })
        .on('receipt', function (receipt) {
            let betsToClose = []
            if (receipt.events.betClosed.length === undefined) { // si un bet fermé, un seul event et donc pas de liste mais un objet
                betsToClose.push(receipt.events.betClosed.returnValues.betNumber)
            }
            else { for (let e in receipt.events.betClosed) { betsToClose.push(receipt.events.betClosed[e].returnValues.betNumber) } }
            model.closeBets(betsToClose)
            console.log(betsToClose + " closed on " + dateNow + " at " + timeNow);
            fs.appendFile("../logs/logsBetCloser.txt", str, function (err) {
                if (err) {
                    return console.log(err);
                }
            });
        })
        .on('error', function (error, receipt) {
            console.log("error tx");
        })
}
