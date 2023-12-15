import { PRIVATE_KEY_CERATOR, PUBLIC_KEY_CREATOR, multiBetAddress, NODE_URL_BSCTESTNET, NODE_URL_POLYGON, multiBetABI, newBetCreatedABI, URL_API_BASKETBALL, URL_API_FOOTBALL, leagueFootIDs, leagueBasketIDs } from "../config.js"
import fs from 'fs';
import { cyan, logBetCreator, blue } from '../logger.js'
import model from '../model.js'
import { Web3 } from 'web3';
import HDWalletProvider from '@truffle/hdwallet-provider'

function run() {
  try {
    const DELAY = 86400000 // 30000
    const provider = new HDWalletProvider(PRIVATE_KEY_CERATOR, NODE_URL_BSCTESTNET, 0, 10000);
    const web3 = new Web3(provider);
    const multiBetContract = new web3.eth.Contract(multiBetABI, multiBetAddress);

    multiBetContract.setConfig({ contractDataInputFill: "both" })


    var tx = 0;
    var FirstDay = Math.round((new Date().getTime()) / 1000);
    var dayIncrementer = 3;


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
      return `${now.getFullYear()}-${month}-${day}`;
    }


    async function betWriter(listNames, listOptions, numberOfBets, response, numberOfOptions, type, date) {
      //try {
        console.log(`trying to write ${numberOfBets} bets`)
        await multiBetContract.methods
          .createNewBets(listNames, listOptions, numberOfBets)
          .send({ from: PUBLIC_KEY_CREATOR })
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
              let [nameHome, nameAway, betNumber, timestamp, country, idAPI, league] = type === 'basketball' ? //Cannot access 'nameHome' before initialization
                [response.response[a].teams.home.name, response.response[a].teams.away.name, newBets[a], response.response[a].timestamp, response.response[a].country.name, response.response[a].id, response.response[a].league.name]
                : type === 'football' ?
                  [response.response[a].teams.home.name, response.response[a].teams.away.name, newBets[a], response.response[a].fixture.timestamp, response.response[a].league.country, response.response[a].fixture.id, response.response[a].league.name]
                  : null
              let nameBet = type === 'basketball' ? nameHome + "," + nameAway : type === 'football' ? nameHome + ",Draw," + nameAway : null
              model.add_bet(betNumber, numberOfOptions, nameBet, timestamp, type, country, league, idAPI);
              logBetCreator(`${new Date().toLocaleDateString()}  ${new Date().toLocaleTimeString()} : Bet created n ${betNumber} ${timestamp} ${type} ${country} ${league} ${nameBet}`)
            }
            console.log(`${date} bets succesfully added`);
          })
          .on('error', function (error, receipt) {
            console.log("e ", error);
            if (error.code === -32000) {
              setTimeout(async function () { await betWriter(listNames, listOptions, numberOfBets, response, numberOfOptions, type) }, 60000)
            }
            console.log(`error tx ${type}`)
        })
        .catch((error) => {
            if (error.error.code === -32000) {
              setTimeout(async function () { await betWriter(listNames, listOptions, numberOfBets, response, numberOfOptions, type) }, 60000)
            }
            console.log(`error tx ${type} ${error.error.code} : ${error.error.message}`)
        })
     /*   }
      catch (error) { console.log(error) }*/
    }


    async function betCreator() {
      let leagues = ["NBA"]
      let sports = ["basketball"]
      let date = dateIterator(dayIncrementer);
      cyan("!!!!!!!!!!!!!!!!!!!!!!!! début requetes " + date + " !!!!!!!!!!!!!!!!!!!!!!!!");
      setTimeout(betCreator, DELAY);
      for (let i = 0; i < leagues.length; i++) {
        let league = leagues[i];
        let sport = sports[i];
        let options = {
          'method': 'GET',
          'headers': {
            'x-rapidapi-host': sport === "basketball" ? 'v1.basketball.api-sports.io' : 'v3.football.api-sports.io',
            'x-rapidapi-key': '0bd2ece4d5dca48c6d12f3d678737494' //achille zgiw api
          }
        }
        let [url, season, IDs, numberOfOptions] = sport === 'football' ? [URL_API_FOOTBALL, "2023", leagueFootIDs, 3] : sport === 'basketball' ? [URL_API_BASKETBALL, "2023-2024", leagueBasketIDs, 2] : null
        fetch(url + `?date=${date}&season=${season}&league=${IDs[league]}`, options).then((res) => {
          res.json().then(async (data) => {
            let namesBetToWriteOnChain = [];
            let numberOfOptionsToWriteOnChain = [];
            for (let u = 0; u < data.results; u++) {
              let idHome = data.response[u].teams.home.id;
              let idAway = data.response[u].teams.away.id;
              let timestamp = sport === 'football' ? data.response[u].fixture.timestamp : sport === 'basketball' ? data.response[u].timestamp : null;
              namesBetToWriteOnChain.push(idHome + " " + idAway + " " + timestamp);
              numberOfOptionsToWriteOnChain.push(3);
            }
            if (namesBetToWriteOnChain.length > 0) {
              await betWriter(namesBetToWriteOnChain, numberOfOptionsToWriteOnChain, data.results, data, numberOfOptions, sport, date);
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