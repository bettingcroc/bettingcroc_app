const logger = require('./logger.js')

console.log("///////////////////////////////START////////////////////////////////");
const model = require('./model.js');
const Web3 = require('web3');
const request = require("request");
const { promisify } = require('util');
const NODE_URL_BSCTESTNET = "https://data-seed-prebsc-1-s1.binance.org:8545/"; //url of bsc testnet node
const NODE_URL_POLYGON = "https://speedy-nodes-nyc.moralis.io/d7cfb9005cec8b6a40236ec8/polygon/mainnet"; // url of polygon mainnet node
//var web3 = new Web3(new Web3.providers.HttpProvider(NODE_URL_BSCTESTNET)); // new web3 object
const HDWalletProvider= require('@truffle/hdwallet-provider');
const fs = require('fs');
const { Contract } = require('web3-eth-contract');
var multiBetABI = fs.readFileSync('../public/MultiBetMultiOptionsUSDTABI.txt').toString();

multiBetAddress='0xD90531a9234A38dfFC8493c0018ad17cB5F7A867';

keyPublic='0x1deecf77dD59A35c9f68cf507d79DDbd8524fa65';
keyPrivate='8b2e6d2f97bc806b85d17ecd3eae0a8dd24b4d40c96fb6ebebaf2835ce6714fb';


async function main(){
    setTimeout(main,60000);
    /*date1=new Date().getTime()-163000000;
    date2=new Date().getTime()-158000000;
    console.log(new Date(date1).toLocaleDateString()," ",new Date(date1).toLocaleTimeString()," ",new Date(date2).toLocaleDateString()," ",new Date(date2).toLocaleTimeString())
    date1=Math.floor(date1/1000);
    date2=Math.floor(date2/1000);*/
    resultDB=model.get_betClosed();
    betsToEnd=[];
    //winnerBetsToEnd=[];
    for(i=0;i<resultDB.length;i++){
        betsToEnd.push(resultDB[i]["betNumber"]);
    } 
    console.log(betsToEnd)
    timeNow=new Date();
    dateNow=new Date().toLocaleDateString();
    if(betsToEnd.length>0){
        createWinnersArray(betsToEnd)
        .then((result)=>{
            if(result[0].length>0){
                logger.blue(result)
                console.log(result[0]+" sent for ending on with "+result[1]+" on "+dateNow+" at "+timeNow.toLocaleTimeString());
                endBetOnChain(result[0],result[1]);
            }
            else{
                console.log("no bet to end on "+dateNow+" at ",new Date(timeNow.getTime()-60000).toLocaleTimeString()," to ",timeNow.toLocaleTimeString());   
                let str= dateNow+" "+new Date(timeNow.getTime()-300000).toLocaleTimeString()+" to "+timeNow.toLocaleTimeString()+" : no bet to End";
                fs.appendFile("../logs/logsBetEnder.txt",str+"\n" , function(err) {
                    if(err) {
                        return console.log(err);
                    }
                  });       
            }
        })
        
    }    
    else{
        console.log("no bet to end on "+dateNow+" at ",new Date(timeNow.getTime()-60000).toLocaleTimeString()," to ",timeNow.toLocaleTimeString());   
        let str= dateNow+" "+new Date(timeNow.getTime()-300000).toLocaleTimeString()+" to "+timeNow.toLocaleTimeString()+" : no bet to End";
        fs.appendFile("../logs/logsBetEnder.txt",str+"\n" , function(err) {
            if(err) {
                return console.log(err);
            }
          });       
    }
}

main();

async function endBetOnChain(betsToEnd,winnerBetsToEnd){
    const provider=new HDWalletProvider(keyPrivate,NODE_URL_BSCTESTNET);
    let web3 = new Web3(provider);
    multiBetContract= new web3.eth.Contract(JSON.parse(multiBetABI),multiBetAddress);
    console.log("tx sent")
    await multiBetContract.methods
        .endBets(betsToEnd,winnerBetsToEnd)
        .send({from : keyPublic})
        .on('receipt', function(receipt){
            model.endBets(betsToEnd)
            let timeNow=new Date().toLocaleTimeString();
            let dateNow=new Date().toLocaleDateString();
            console.log(betsToEnd+" ended with "+winnerBetsToEnd+" on "+dateNow+" at "+timeNow);
            console.log(receipt);
            let str=dateNow+" "+timeNow+" "+betsToEnd+" ended with "+winnerBetsToEnd;
            fs.appendFile("../logs/logsBetEnder.txt",str+"\n" , function(err) {
                if(err) {
                    return console.log(err);
                }
              });  
        })
        .on('error', function(error, receipt) {
            console.log("error tx");
        })
}

async function createWinnersArray(arrayBetsToEnd){
    betsToEnd=[];
    winnerBetsToEnd=[];
    for(i=0;i<arrayBetsToEnd.length;i++){

        if(model.get_Type(arrayBetsToEnd[i])=='football'){
            var optionsFoot = {
                'method': 'GET',
                'url': 'https://v3.football.api-sports.io/fixtures',
                qs: {id : model.get_idAPI(arrayBetsToEnd[i])},
                'headers': {
                  'x-rapidapi-host': 'v3.football.api-sports.io',
                  'x-rapidapi-key': '1b8bea4eb9795ae6f10a338ffe214f5d'
                }
            };
            await new Promise(next =>{request(optionsFoot, function (error, response) {
                console.log("requête foot for bet "+arrayBetsToEnd[i]);
                //console.log(JSON.parse(response.body).response[0].fixture.status)
                if(JSON.parse(response.body).response[0].fixture.status.short==="FT" || JSON.parse(response.body).response[0].fixture.status.short==="AET" || JSON.parse(response.body).response[0].fixture.status.short==="PEN"){
                    if(JSON.parse(response.body).response[0].teams.home.winner==true){
                        winnerBetsToEnd.push(0);
                        betsToEnd.push(arrayBetsToEnd[i]);
                    }
                    else{
                        if(JSON.parse(response.body).response[0].teams.away.winner==true){
                            winnerBetsToEnd.push(2);
                        }
                        else{
                            winnerBetsToEnd.push(1);
                        }
                        betsToEnd.push(arrayBetsToEnd[i]);
                    }
                }
                
                next();
                })
            })
        }
        if(model.get_Type(arrayBetsToEnd[i])=='basketball'){
            var optionsNBA = {
                'method': 'GET',
                'url': 'https://v1.basketball.api-sports.io/games',
                qs: {id : model.get_idAPI(arrayBetsToEnd[i])},
                'headers': {
                  'x-rapidapi-key': '1b8bea4eb9795ae6f10a338ffe214f5d',
                  'x-rapidapi-host': 'v1.basketball.api-sports.io'
                }
                };
            
            await new Promise(next =>{request(optionsNBA, function (error, response) {
                console.log("request basket for bet "+arrayBetsToEnd[i]);
                if(JSON.parse(response.body).response[0].status.short==="FT" || JSON.parse(response.body).response[0].status.short==="AOT" ){
                    if(JSON.parse(response.body).response[0].scores.home.total>JSON.parse(response.body).response[0].scores.away.total){
                        winnerBetsToEnd.push(0);
                    }
                    else{
                        winnerBetsToEnd.push(1);
                    }
                    betsToEnd.push(arrayBetsToEnd[i]);
                }
                next();
                })
                
            })
        
        }
    }
    console.log(betsToEnd,winnerBetsToEnd);
    return [betsToEnd,winnerBetsToEnd];
}