const Web3 = require('web3');
let web31 = new Web3("https://rpc.ankr.com/bsc_testnet_chapel");
let web32 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545/");
web31.eth.getBlock().then(console.log)
web32.eth.getBlock().then(console.log)