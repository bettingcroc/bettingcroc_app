function run() {
  try {
    const logger = require('./logger.js')

    logger.high("--------------------------------------------------------------------------------------------------------------------------------------------------------------------");
    const model = require('./model.js')
    const request = require("request");
    //var https = require('follow-redirects').https;
    const Web3 = require('web3');
    const NODE_URL_BSCTESTNET = "https://endpoints.omniatech.io/v1/bsc/testnet/public"; //url of bsc testnet node
    //const NODE_URL_BSCTESTNET = "https://rpc.ankr.com/bsc_testnet_chapel";
    const NODE_URL_POLYGON = "https://speedy-nodes-nyc.moralis.io/d7cfb9005cec8b6a40236ec8/polygon/mainnet"; // url of polygon mainnet node
    const HDWalletProvider = require('@truffle/hdwallet-provider');
    const fs = require('fs');
    const DELAY = 120000//86400000
    //const { Contract } = require('web3-eth-contract');
    var multiBetABI = fs.readFileSync('./MultiBetABI.txt').toString();
    var tx = 0;
    multiBetAddress = '0xBD445c5A2C4197ce12DE4e28473dE471aD21D8B5';

    timestampTest = new Date();
    var FirstDay = Math.round((timestampTest.getTime() ) / 1000);

    function decimalsConverter(numberToConvert) {
      return Math.pow(numberToConvert, 18)
    }
    function weiconvert(number) { return BigInt(number * decimalsConverter(10)); } // function to manage decimals of the token

    function dateIterator(days) {
      let timestamp = FirstDay + (days * 86400); // jour de départ iteration dates
      date = new Date(timestamp * 1000).toLocaleDateString("en-US");
      year = new Date(timestamp * 1000).getFullYear();
      month = new Date(timestamp * 1000).getMonth();
      month++;
      day = new Date(timestamp * 1000).getDate();
      if (day < 10) { day = "0" + day }
      if (month < 10) { month = "0" + month };
      return year + "-" + month + "-" + day;
    }

    keyPublic = '0x6d3DCcF2C028766D26a5382Fce9d898e75E6D629';
    keyPrivate = 'd20947a33bb7e2b8a17b3a29c59f4bcb86131ede571fbf150aa0884e5fa48fa9';

    const provider = new HDWalletProvider(keyPrivate, NODE_URL_BSCTESTNET);
    var web3 = new Web3(provider);
    multiBetContract = new web3.eth.Contract(JSON.parse(multiBetABI), multiBetAddress);
    var day = 0;

    var dayParams = 0;

    leagueFootIDs = {
      "PremierLeague": 39,
      "LaLiga": 140,
      "SerieA": 135
    }
    leagueBasketIDs = {
      "NBA": 12,
      "LNB": 2,
      "GLeague": 20,
      "NBASL":17,
      "WNBA":13
    }

    function getOptions(paramsDate, sport, league) {
      idLeague = 0;
      if (sport === 'football') {
        if (league === 'Premier League') {
          idLeague = leagueFootIDs.PremierLeague;
        }
        if (league === 'LaLiga') {
          idLeague = leagueFootIDs.LaLiga;
        }
        if (league === 'Serie A') {
          idLeague = leagueFootIDs.SerieA;
        }
        return {
          'method': 'GET',
          'url': 'https://v3.football.api-sports.io/fixtures',
          qs: { date: paramsDate, league: idLeague, season: '2022' },
          'headers': {
            'x-rapidapi-host': 'v3.football.api-sports.io',
            'x-rapidapi-key': '1b8bea4eb9795ae6f10a338ffe214f5d' //achille zgiw api
          }
        }
      }
      if (sport === 'basketball') {
        if (league === 'NBA') {
          idLeague = leagueBasketIDs.NBA;
        }
        if (league === 'NBASL') {
          idLeague = leagueBasketIDs.NBASL;
        }
        if (league === 'GLeague') {
          idLeague = leagueBasketIDs.GLeague;
        }
        if (league === 'LNB') {
          idLeague = leagueBasketIDs.LNB;
        }
        return {
          'method': 'GET',
          'url': 'https://v1.basketball.api-sports.io/games',
          qs: { date: paramsDate, league: idLeague, season: '2023' },
          'headers': {
            'x-rapidapi-host': 'v1.basketball.api-sports.io',
            'x-rapidapi-key': '1b8bea4eb9795ae6f10a338ffe214f5d' //achille zgiw api
          }
        }
      }
    }
    //console.log(options("11-02-2022","basketball","NBA"))

    async function betWriter(listNames, listOptions, numberOfBets, response, numberOfOptions, type) {
      console.log("///////////////////// INTERACTION BLOCKCHAIN " + type + "////////////////////");
      //console.log(listNames);
      console.log(listNames, listOptions, numberOfBets)

      try {
        await multiBetContract.methods
          .createNewBets(listNames, listOptions, numberOfBets)
          .send({ from: keyPublic })
          .on('receipt', function (receipt) {
            console.log(receipt);
            console.log('tx ' + tx);
            tx++;
            let newBets=[]
            for(let e in receipt.events.newBetCreated)
            {
                newBets.push(receipt.events.newBetCreated[e].returnValues.betNumber)
            }
            for (a = 0; a < JSON.parse(response.body).results; a++) {
              let nameHome = JSON.parse(response.body).response[a].teams.home.name;
              let nameAway = JSON.parse(response.body).response[a].teams.away.name;
              let betNumber = newBets[a]
              let timestamp;
              let nameBet;
              let country;
              let idAPI;
              let league;
              if (type === 'basketball') {
                timestamp = JSON.parse(response.body).response[a].timestamp;
                nameBet = nameHome + "," + nameAway;
                country = JSON.parse(response.body).response[a].country.name;
                idAPI = JSON.parse(response.body).response[a].id;
                league = JSON.parse(response.body).response[a].league.name;
              }
              if (type === 'football') {
                timestamp = JSON.parse(response.body).response[a].fixture.timestamp;
                nameBet = nameHome + ",Draw," + nameAway;
                country = JSON.parse(response.body).response[a].league.country;
                idAPI = JSON.parse(response.body).response[a].fixture.id;
                league = JSON.parse(response.body).response[a].league.name;
              }

              model.add_bet(betNumber, numberOfOptions, nameBet, timestamp, type, country, league, idAPI);
              timeNow = new Date().toLocaleTimeString();
              dateNow = new Date().toLocaleDateString();
              let str = dateNow + " " + timeNow + " Bet created n " + betNumber + " " + timestamp + " " + type + " " + country + " " + league + " " + nameBet + "\n";
              fs.appendFile("../logs/logsBetCreator.txt", str, function (err) {
                if (err) {
                  return console.log(err);
                }
              });
            }
            console.log(listNames, " ", listOptions + " " + numberOfBets + " sent for Trannsaction");
            console.log('fin tx ');

          })
          .on('error', function (error, receipt) {
            console.log("e ", error);
            if(error.code===-32000){
              setTimeout(async function(){await betWriter(listNames, listOptions, numberOfBets, response, numberOfOptions, type)},60000)
            }
            if (type === 'basketball') { console.log("error tx basketball") }
            if (type === 'football') { console.log("error tx football") }
            //console.log(error," ",receipt);
          })
      }
      catch (error) { console.log(error) }

    }

    betCreator();


    async function betCreator() {
      //leagues=["Premier League","LaLiga","Serie A"];
      //sports=["football","football","football"];
      //leagues=["NBA","LNB","GLeague"];
      //sports=["basketball","basketball","basketball"];
      //leagues=["LaLiga","Serie A"];
      //sports=["football","football"];
      leagues = ["WNBA"]
      sports = ["basketball"]
      params = dateIterator(dayParams);
      logger.cyan("!!!!!!!!!!!!!!!!!!!!!!!! début requetes " + params + " !!!!!!!!!!!!!!!!!!!!!!!!");
      //console.log(params);
      dayParams = dayParams + 1;
      setTimeout(betCreator, DELAY);

      for (i = 0; i < leagues.length; i++) {
        logger.magenta("-------------------- new request -----------------------");
        let league = leagues[i];
        let sport = sports[i];
        console.log(league, " ", sport, " ", i);
        let options = getOptions(params, sport, league);
        console.log(options)
        /*if(sport==='football'){
          await new Promise(next =>{request(options, async function (error, response) {
            console.log(JSON.parse(response.body))
            console.log("request ",i," : ",league,sport," received with ",JSON.parse(response.body).results," results");
            //console.log(JSON.parse(response.body));
            namesBetToWriteOnChain = [];
            numberOfOptionsToWriteOnChain = [];
            if (error)
              throw new Error(error);
            for (u = 0; u < JSON.parse(response.body).results; u++) {
        
              let idHome = JSON.parse(response.body).response[u].teams.home.id;
              let idAway = JSON.parse(response.body).response[u].teams.away.id;
              let timestamp = JSON.parse(response.body).response[u].fixture.timestamp;
              namesBetToWriteOnChain.push(idHome + " " + idAway + " " + timestamp);
        
              numberOfOptionsToWriteOnChain.push(3);
            }
            //console.log(JSON.parse(response.body));
            if(namesBetToWriteOnChain.length>0){
              console.log("données du ", params, league ,sport,"recues, écriture on chain en cours");
              await betWriter(namesBetToWriteOnChain, numberOfOptionsToWriteOnChain, JSON.parse(response.body).results, response, 3, 'football');
            }
            else{
              logger.blue("0 bets "+league+" football to add")
            }
            next();
            })
          })
        }*/
        if (sport === 'basketball') {
          await new Promise(next => {
            request(options, async function (error, response) {
              console.log("request ", league, sport, " received with ", JSON.parse(response.body).results, " results");
              namesBetToWriteOnChain = [];
              numberOfOptionsToWriteOnChain = [];
              if (error) throw new Error(error);
              for (u = 0; u < JSON.parse(response.body).results; u++) {

                let idHome = JSON.parse(response.body).response[u].teams.home.id;
                let idAway = JSON.parse(response.body).response[u].teams.away.id;
                let timestamp = JSON.parse(response.body).response[u].timestamp;
                namesBetToWriteOnChain.push(idHome + " " + idAway + " " + timestamp);

                numberOfOptionsToWriteOnChain.push(2);
              }

              if (namesBetToWriteOnChain.length > 0) {
                console.log("données du ", params, league, sport, " recues, écriture on chain en cours");
                await betWriter(namesBetToWriteOnChain, numberOfOptionsToWriteOnChain, JSON.parse(response.body).results, response, 2, 'basketball');

              }
              else {
                logger.blue("0 bets basketball to add");
              }
              next();
            })
          })
        }
        //await new Promise(r => setTimeout(r, 10000));
      }
      logger.cyan("fin requête " + params);
    }
  }
  catch (e) {
    console.log(e)
    run()
  }
}
run()