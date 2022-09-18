
const logger = require('./logger.js')
const model = require('./model.js');
const Web3 = require('web3');
const { promisify } = require('util');
const NODE_URL_BSCTESTNET = "https://data-seed-prebsc-1-s1.binance.org:8545/"; //url of bsc testnet node
const NODE_URL_POLYGON = "https://speedy-nodes-nyc.moralis.io/d7cfb9005cec8b6a40236ec8/polygon/mainnet"; // url of polygon mainnet node
//var web3 = new Web3(new Web3.providers.HttpProvider(NODE_URL_BSCTESTNET)); // new web3 object
const HDWalletProvider= require('@truffle/hdwallet-provider');
const fs = require('fs');
const { Contract } = require('web3-eth-contract');
var multiBetABI = fs.readFileSync('../public/MultiBetMultiOptionsUSDTABI.txt').toString();

multiBetAddress='0xD90531a9234A38dfFC8493c0018ad17cB5F7A867';

function decimalsConverter(numberToConvert){return Math.pow(numberToConvert,18)}
function weiconvert(number){return BigInt(number*decimalsConverter(10));} // function to manage decimals of the token

keyPublic='0x6d3DCcF2C028766D26a5382Fce9d898e75E6D629';
keyPrivate='d20947a33bb7e2b8a17b3a29c59f4bcb86131ede571fbf150aa0884e5fa48fa9';


function main(){
    
    setTimeout(main,60000);
    date1=new Date().getTime(); //-6,6 min
    date2=new Date().getTime()+60000;
    date1=Math.floor(date1/1000);
    date2=Math.floor(date2/1000);
    resultDB=model.get_BetBetween2dates(date1,date2);
    betsToClose=[];
    for(i=0;i<resultDB.length;i++){
        betsToClose.push(resultDB[i]["betNumber"]);
    }
 
    timeNow=new Date();
    dateNow=new Date().toLocaleDateString();
    if(betsToClose.length>0){
        console.log(betsToClose+" sent for closing on "+dateNow+" at "+timeNow.toLocaleTimeString());
        closeBetOnChain(betsToClose);
    }    
    else{
        let str="no bet to close on "+dateNow+" at "+timeNow.toLocaleTimeString()+" to "+new Date(timeNow.getTime()+60000).toLocaleTimeString();
        logger.magenta(str);     
        fs.appendFile("../logs/logsBetCloser.txt",str+"\n" , function(err) {
            if(err) {
                return console.log(err);
            }
          });     
    }
}
main();

//console.log("miaou",model.get_BetBetween2dates(1641079800,1641164400));
async function closeBetOnChain(betsToClose){
    const provider=new HDWalletProvider(keyPrivate,NODE_URL_BSCTESTNET);
    let web3 = new Web3(provider);
    multiBetContract= new web3.eth.Contract(JSON.parse(multiBetABI),multiBetAddress);
    
    timeNow=new Date().toLocaleTimeString();
    dateNow=new Date().toLocaleDateString();
    console.log("tx sent")
    await multiBetContract.methods
        .closeBets(betsToClose)
        .send({from : keyPublic})
        .on('receipt', function(receipt){
            model.closeBets(betsToClose)
            console.log(receipt);
            let str=betsToClose+" closed on "+dateNow+" at "+timeNow;
            console.log(str);
            fs.appendFile("logsBetCloser.txt",str , function(err) {
                if(err) {
                    return console.log(err);
                }
              });  
        })
        .on('error', function(error, receipt) {
            console.log("error tx");
        })
}
