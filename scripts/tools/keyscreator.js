const Web3 = require('web3');

var web3 = new Web3("https://data-seed-prebsc-2-s2.binance.org:8545/");

console.log(web3.eth.accounts.create(web3.utils.randomHex(32)));