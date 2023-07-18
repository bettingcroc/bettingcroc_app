const model = require('./model.js')
const Web3 = require('web3');
const NODE_URL_BSCTESTNET = "https://data-seed-prebsc-1-s1.binance.org:8545/"; //url of bsc testnet node
const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const apiKey = "81539bf5b04eb05071c0cb74df4a5da592910d8006b47be9b1fa1a608c90b3f1"
const multiBetAddress = '0xBD445c5A2C4197ce12DE4e28473dE471aD21D8B5';
const multiBetABI = fs.readFileSync('./MultiBetABI.txt').toString();
const keyPublic = '0x6d3DCcF2C028766D26a5382Fce9d898e75E6D629';
const keyPrivate = 'd20947a33bb7e2b8a17b3a29c59f4bcb86131ede571fbf150aa0884e5fa48fa9';
const provider = new HDWalletProvider(keyPrivate, NODE_URL_BSCTESTNET);
const web3 = new Web3(provider);
const multiBetContract = new web3.eth.Contract(JSON.parse(multiBetABI), multiBetAddress);


function setMatchesForOneDay() {
  let date = getTodayDate()
  console.log("asking api for " + date);
  let link = getApiLink(date, "766")
  fetch(link, { method: "GET" }).then((res) => {
    res.json().then(async (data) => {
      //console.log(data)
      let numberOfMatches = data["result"].length
      let namesBetToWriteOnChain = [];
      let numberOfOptionsToWriteOnChain = [];
      let infosBets = [];
      for (let indexMatches = 0; indexMatches < numberOfMatches; indexMatches++) {
        let match = data["result"][indexMatches]
        let teamHome = match["event_home_team"]
        let teamAway = match["event_away_team"]
        let idMatch = match["event_key"]
        let idHome = match["home_team_key"]
        let idAway = match["away_team_key"]
        let dateMatch = match["event_date"]
        let yearMatch = dateMatch.split("-")[0]
        let monthMatch = dateMatch.split("-")[1]
        let dayMatch = dateMatch.split("-")[2]
        let scheduleMatch = match["event_time"]
        let hoursMatch = scheduleMatch.split(":")[0]
        let minutesMatch = scheduleMatch.split(":")[1]
        let timestampMatch = dateToTimestamp(yearMatch, monthMatch, dayMatch, hoursMatch, minutesMatch)
        let countryMatch = match["country_name"]
        let leagueMatch = match["league_name"]
        console.log(teamAway + " @ " + teamHome + " on " + dateMatch + " at " + scheduleMatch + " => ts: " + timestampMatch)
        namesBetToWriteOnChain.push(idHome + " " + idAway + " " + timestampMatch);

        numberOfOptionsToWriteOnChain.push(2);
        infosBets.push({
          nameHome: teamHome,
          nameAway: teamAway,
          timestamp: timestampMatch,
          country: countryMatch,
          idAPI: idMatch,
          league: leagueMatch
        })
      }
      //console.log(namesBetToWriteOnChain)
      //console.log(numberOfOptionsToWriteOnChain)
      //console.log(infosBets)
      setTimeout(setMatchesForOneDay, 86400000);
      if (namesBetToWriteOnChain.length > 0) {
        console.log("données du " + date + " recues, écriture on chain en cours");
        await betWriter(namesBetToWriteOnChain, numberOfOptionsToWriteOnChain, 'basketball', infosBets);
      }
      else {
        console.log("0 bets basketball to add");
      }
    })
  })
}


function getApiLink(date, league) {
  return "https://apiv2.allsportsapi.com/basketball/?met=Fixtures&APIkey=" + apiKey + "&from=" + date + "&to=" + date + "&leagueId=" + league
}


function dateToTimestamp(year, month, day, hour, minute) {
  var datum = new Date(Date.UTC(year, month, day, hour, minute));
  return (datum.getTime() / 1000) - 7200;
}


async function betWriter(listNames, listOptions, type, infosBets) {
  console.log("///////////////////// INTERACTION BLOCKCHAIN " + type + "////////////////////");
  let numberOfBets = listNames.length;
  try {
    await multiBetContract.methods
      .createNewBets(listNames, listOptions, numberOfBets)
      .send({ from: keyPublic })
      .on('receipt', function (receipt) {
        console.log(receipt.events.newBetCreated.length)
        //console.log(receipt.events.newBetCreated)
        let newBets = []
        if (receipt.events.newBetCreated.length === undefined) { // si un bet créé, un seul event et donc pas de liste mais un objet
          newBets.push(receipt.events.newBetCreated.returnValues.betNumber)
        }
        else { for (let e in receipt.events.newBetCreated) { newBets.push(receipt.events.newBetCreated[e].returnValues.betNumber) } }
        console.log("newBets")
        console.log(newBets)
        console.log(listNames, " ", listOptions + " " + numberOfBets + " wrote on blockchain");

        for (let a = 0; a < numberOfBets; a++) {
          let nameHome = infosBets[a].nameHome;
          let nameAway = infosBets[a].nameAway;
          let nameBet = nameHome + "," + nameAway;
          let numberOfOptions = listOptions[a]
          let betNumber = newBets[a];
          let timestamp = infosBets[a].timestamp;
          let country = infosBets[a].country;
          let idAPI = infosBets[a].idAPI;
          let league = infosBets[a].league;

          model.add_bet(betNumber, numberOfOptions, nameBet, timestamp, type, country, league, idAPI);

          timeNow = new Date().toLocaleTimeString();
          dateNow = new Date().toLocaleDateString();
          let str = dateNow + " " + timeNow + " Bet created n " + betNumber + " " + timestamp + " " + type + " " + country + " " + league + " " + nameBet + "\n";

          fs.appendFile("../logs/logsBetCreator.txt", str, function (err) { if (err) { return console.log(err); } });
        }
        console.log('fin tx');
      })
      .on('error', function (error, receipt) {
        console.log("e ", error);
        if (error.code === -32000) {
          setTimeout(async function () { await betWriter(listNames, listOptions, type, infosBets) }, 60000)
        }
        if (type === 'basketball') { console.log("error tx basketball") }
        if (type === 'football') { console.log("error tx football") }
      })
  }
  catch (error) { console.log(error) }
}


function getTodayDate() {
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  let day = tomorrow.getDate();
  let month = tomorrow.getMonth() + 1;
  let year = tomorrow.getFullYear();
  let currentDate = `${year}-${month}-${day}`;
  return currentDate
}

setMatchesForOneDay();