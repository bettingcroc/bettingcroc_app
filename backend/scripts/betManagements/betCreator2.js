import { GAS_PRICE, web3, NODES_URL_BSCTESTNET, PRIVATE_KEY_CREATOR, PUBLIC_KEY_CREATOR, multiBetAddress, NODE_URL_BSCTESTNET, NODE_URL_POLYGON, multiBetABI, newBetCreatedABI, URL_API_BASKETBALL, URL_API_FOOTBALL, leagueFootIDs, leagueBasketIDs } from "../config.js"
import fs from 'fs';
import { cyan, logBetCreator, blue } from '../logger.js'
import db from '../db.js'
import HDWalletProvider from '@truffle/hdwallet-provider'

function run() {
  try {
    const DELAY = 86400000 // 30000 //
    const multiBetContract = new web3.eth.Contract(multiBetABI, multiBetAddress);
    multiBetContract.setConfig({ contractDataInputFill: "both" })

    var tx = 0;
    var FirstDay = Math.round((new Date().getTime()) / 1000);
    var dayIncrementer = 6;


    function run() {
      try {
        betCreator();
      }
      catch (e) {
        console.log(e)
        run()
      }
    }
    run()


    function dateIterator(days) {
      dayIncrementer++;
      let timestamp = FirstDay + (days * 86400); // jour de départ iteration dates
      let now = new Date(timestamp * 1000)
      let month = (now.getMonth() + 1) < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1
      let day = now.getDate() < 10 ? `0${now.getDate()}` : now.getDate()
      return `${day}.${month}.${now.getFullYear()}`;
    }


    async function betWriter(listNames, listOptions, numberOfBets, response, numberOfOptions, type, date) {
      //try {
      console.log(`trying to write ${numberOfBets} bets`)
      await multiBetContract.methods
        .createNewBets(listNames, listOptions, numberOfBets)
        .send({ from: PUBLIC_KEY_CREATOR, gasPrice: GAS_PRICE })
        .on('receipt', function (receipt) {
          console.log("writing on chain succeed")
          tx++;
          let newBets = []
          let logs = receipt.logs.filter(log => log.address.toLowerCase() === multiBetAddress.toLowerCase());
          logs.forEach(log => {
            let res = web3.eth.abi.decodeLog(newBetCreatedABI, log.data, log.topics);
            newBets.push(parseInt(res.betNumber))
          });
          for (let a = 0; a < numberOfBets; a++) {
            let match = response[a]
            let dateString = match.datetime_utc;
            let [day, month, yearTime] = dateString.split('.');
            let [year, time] = yearTime.split(' ');
            let [hour, minute] = time.split(':');
            let timestamp = Date.parse(new Date(`${year}-${month}-${day}T${hour}:${minute}:00.000Z`).toISOString()) / 1000;
            let [nameHome, nameAway, betNumber, country, idAPI, league] = [match.hometeam.name, match.awayteam.name, newBets[a],"USA",match.id,"NBA"]
            let nameBet = nameHome + "," + nameAway
            db.add_bet(betNumber, numberOfOptions, nameBet, timestamp, type, country, league, idAPI);
            logBetCreator(`${new Date().toLocaleDateString()}  ${new Date().toLocaleTimeString()} : Bet created n ${betNumber} ${timestamp} ${type} ${country} ${league} ${nameBet}`)
          }
          console.log(`${date} bets succesfully added`);
        })
        .catch((error) => {
          console.log(error)
          if (error.error.code === -32000) {
            let newProvider = new HDWalletProvider(PRIVATE_KEY_CREATOR, NODES_URL_BSCTESTNET[Math.floor(Math.random() * NODES_URL_BSCTESTNET.length)], 0, 10000);
            web3.setProvider(newProvider)
            setTimeout(async function () { await betWriter(listNames, listOptions, numberOfBets, response, numberOfOptions, type) }, 60000)
          }
          console.log(`error tx ${type} ${error.error.code} : ${error.error.message}`)
        })
    }


    async function betCreator() {
      let leagues = ["NBA"]
      let sport = "basketball"
      let date = dateIterator(dayIncrementer);
      let numberOfOptions = 2
      cyan("!!!!!!!!!!!!!!!!!!!!!!!! début requetes " + date + " !!!!!!!!!!!!!!!!!!!!!!!!");
      setTimeout(betCreator, DELAY);
      for (let i = 0; i < leagues.length; i++) {
        fetch("https://www.goalserve.com/getfeed/80cd75140b2e4e6e2e6a08dc31548fe8/bsktbl/nba-shedule" + `?date1=${date}&date2=${date}&json=1`).then((res) => {
          res.json().then(async (data) => {
            let namesBetToWriteOnChain = [];
            let numberOfOptionsToWriteOnChain = [];
            for (let u = 0; u < data.shedules.matches.match.length; u++) {
              let idHome = data.shedules.matches.match[u].hometeam.id
              let idAway = data.shedules.matches.match[u].awayteam.id
              let dateString = data.shedules.matches.match[u].datetime_utc;
              let [day, month, yearTime] = dateString.split('.');
              let [year, time] = yearTime.split(' ');
              let [hour, minute] = time.split(':');
              let timestamp = Date.parse(new Date(`${year}-${month}-${day}T${hour}:${minute}:00.000Z`).toISOString()) / 1000;
              namesBetToWriteOnChain.push(idHome + " " + idAway + " " + timestamp);
              numberOfOptionsToWriteOnChain.push(numberOfOptions);
            }
            if (namesBetToWriteOnChain.length > 0) {
              await betWriter(namesBetToWriteOnChain, numberOfOptionsToWriteOnChain, data.shedules.matches.match.length, data.shedules.matches.match, numberOfOptions, sport, date);
            }
            else {
              blue(`0 bets ${sport} to add`);
            }
          })
        })
      }
    }
  }
  catch (e) {
    console.log("error running")
    console.log(e)
    run()
  }
}

run()