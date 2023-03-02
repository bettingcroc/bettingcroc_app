const request = require("request");
var https = require('follow-redirects').https;
const Web3 = require('web3');
const NODE_URL_BSCTESTNET = "https://data-seed-prebsc-1-s1.binance.org:8545/"; //url of bsc testnet node
//const NODE_URL_BSCTESTNET = "https://rpc.ankr.com/bsc_testnet_chapel";
const NODE_URL_POLYGON = "https://speedy-nodes-nyc.moralis.io/d7cfb9005cec8b6a40236ec8/polygon/mainnet"; // url of polygon mainnet node
const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const { Contract } = require('web3-eth-contract');
var multiBetABI = fs.readFileSync('../public/MultiBetMultiOptionsUSDTABI.txt').toString();
var tx = 0;
multiBetAddress = '0x33844f8042D7980C7060067562a11b14F278018e';
keyPublic = '0x6d3DCcF2C028766D26a5382Fce9d898e75E6D629';
keyPrivate = 'd20947a33bb7e2b8a17b3a29c59f4bcb86131ede571fbf150aa0884e5fa48fa9';
const provider = new HDWalletProvider(keyPrivate, NODE_URL_BSCTESTNET);
var web3 = new Web3(provider);
multiBetContract = new web3.eth.Contract(JSON.parse(multiBetABI), multiBetAddress);
multiBetContract.methods
          .createNewBets(["newBet7","newBet8","newBet9"], [2,2,2], 3)
          .send({ from: keyPublic })
          .on('receipt', function (receipt) {
            //console.log(receipt);
            //console.log(receipt.events)
            //console.log(receipt.events.newBetCreated)
            let newBets=[]
            for(let e in receipt.events.newBetCreated)
            {
                newBets.push(receipt.events.newBetCreated[e].returnValues.betNumber)
            }
            console.log(newBets)
        })
