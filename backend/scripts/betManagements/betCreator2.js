import { API_KEY2, GAS_PRICE, web3, NODES_URL_BSCTESTNET, PRIVATE_KEY_CREATOR, PUBLIC_KEY_CREATOR, multiBetAddress, NODE_URL_BSCTESTNET, NODE_URL_POLYGON, multiBetABI, newBetCreatedABI, URL_API_BASKETBALL, URL_API_FOOTBALL, leagueFootIDs, leagueBasketIDs } from "../config.js"
import { cyan, logBetCreator, blue } from '../logger.js'
import db from '../db.js'
import HDWalletProvider from '@truffle/hdwallet-provider'


const betToCreates = [
    {
        "sport": "basketball",
        "leagues": [{ "name": "NBA", "id": "766", "country": "USA" }],
        "numberOfOptions": 2,
        "urlAPI": `https://apiv2.allsportsapi.com/basketball/?met=Fixtures&APIkey=${API_KEY2}`
    },
    {
        "sport": "football",
        "leagues": [{ "name": "Premier League", "id": "152", "country": "England" }],
        "numberOfOptions": 3,
        "urlAPI": `https://apiv2.allsportsapi.com/football/?met=Fixtures&APIkey=${API_KEY2}`

    }
]
function run() {
    try {
        const DELAY = 86400000 // 30000 //
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
            console.log(listNames, listOptions, numberOfBets)
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
                        let [nameHome, nameAway, betNumber, timestamp, country, idAPI, league] =
                            [response.result[a].event_home_team, response.result[a].event_away_team, newBets[a], Date.parse(response.result[a].event_date + " " + response.result[a].event_time) / 1000,
                            response.result[a].country_name, response.result[a].event_key, response.result[a].league_name]
                        let nameBet = nameHome + "," + nameAway
                        console.log(betNumber, numberOfOptions, nameBet, timestamp, type, country, league, idAPI)
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
            let date = dateIterator(dayIncrementer);
            cyan("!!!!!!!!!!!!!!!!!!!!!!!! début requetes " + date + " !!!!!!!!!!!!!!!!!!!!!!!!");
            setTimeout(betCreator, DELAY);


            for (let i = 0; i < betToCreates.length; i++) {
                let sport = betToCreates[i];
                for (let l = 0; l < sport.leagues.length; l++) {
                    let league = sport.leagues[l]
                    let namesBetToWriteOnChain = [];
                    let numberOfOptionsToWriteOnChain = [];
                    console.log(league.name)
                        fetch(`${sport.urlAPI}&from=${date}&to=${date}&timezone=Africa/Abidjan&leagueId=${league.id}`, {
                            'method': 'GET',
                        }).then((res) => {
                            res.json().then(async (data) => {
                                if (data.result === undefined) {
                                    return
                                }
                                for (let u = 0; u < data.result.length; u++) {
                                    let idHome = data.result[u].home_team_key;
                                    let idAway = data.result[u].away_team_key;
                                    let timestamp = Date.parse(data.result[u].event_date + " " + data.result[u].event_time) / 1000
                                    namesBetToWriteOnChain.push(idHome + " " + idAway + " " + timestamp);
                                    numberOfOptionsToWriteOnChain.push(sport.numberOfOptions);
                                }
                                if (namesBetToWriteOnChain.length > 0) {
                                    await betWriter(namesBetToWriteOnChain, numberOfOptionsToWriteOnChain, data.result.length, data, sport.numberOfOptions, sport, date);
                                }
                                else {
                                    blue(`0 bets ${sport} to add`);
                                }
                            })
                    })
                }
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