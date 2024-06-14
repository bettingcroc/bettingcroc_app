import { API_KEY, GAS_PRICE, web3, NODES_URL_BSCTESTNET, PRIVATE_KEY_CREATOR, PUBLIC_KEY_CREATOR, multiBetAddress, NODE_URL_BSCTESTNET, NODE_URL_POLYGON, multiBetABI, newBetCreatedABI, URL_API_BASKETBALL, URL_API_FOOTBALL, leagueFootIDs, leagueBasketIDs } from "../config.js"
import { cyan, logBetCreator, blue } from '../logger.js'
import db from '../db.js'
import HDWalletProvider from '@truffle/hdwallet-provider'

const betToCreates = [
    {
        "name": "football",
        "leagues": [
            { "name": "Euro 2024", "id": "1", "country": "Europa" },
        ],
        "numberOfOptions": 3,
        "urlAPI": `https://apiv2.allsportsapi.com/football/?met=Fixtures&APIkey=${API_KEY}`
    }
]
/*const betToCreates = [
    {
        "name": "basketball",
        "leagues": [{ "name": "NBA", "id": "766", "country": "USA" }],
        "numberOfOptions": 2,
        "urlAPI": `https://apiv2.allsportsapi.com/basketball/?met=Fixtures&APIkey=${API_KEY}`
    },
    {
        "name": "football",
        "leagues": [
            { "name": "Premier League", "id": "152", "country": "England" },
            { "name": "UEFA Champions League", "id": "3", "country": "Europa" },
            { "name": "La Liga", "id": "302", "country": "Spain" },
            { "name": "Serie A", "id": "207", "country": "Italy" },
            { "name": "Bundesliga", "id": "175", "country": "Germany" },
            { "name": "Ligue 1", "id": "168", "country": "France" },
            { "name": "UEFA Europa League", "id": "4", "country": "Europa" },
            { "name": "UEFA Europa Conference League", "id": "683", "country": "Europa" },
            { "name": "Euro 2024", "id": "588", "country": "Europa" },



        ],
        "numberOfOptions": 3,
        "urlAPI": `https://apiv2.allsportsapi.com/football/?met=Fixtures&APIkey=${API_KEY}`

    }
]*/
function run() {
    try {
        const DELAY = 21600000 //  60000 // 
        const multiBetContract = new web3.eth.Contract(multiBetABI, multiBetAddress);
        multiBetContract.setConfig({ contractDataInputFill: "both" })

        var tx = 0;


        function run() {
            try {
                launchBetCreators()
            }
            catch (e) {
                console.log(e)
                run()
            }
        }
        run()


        function dateIterator(days) {
            let timestamp = Math.round((new Date().getTime()) / 1000) + (days * 86400); // jour de départ iteration dates
            let now = new Date(timestamp * 1000)
            let month = (now.getMonth() + 1) < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1
            let day = now.getDate() < 10 ? `0${now.getDate()}` : now.getDate()
            return `${now.getFullYear()}-${month}-${day}`;
        }


        async function betWriter(listNames, listOptions, response, numberOfOptions, type, date) {
            console.log(`${date} : trying to write ${listNames.length} bets`)
            console.log(listNames, listOptions, listNames.length)
            await multiBetContract.methods
                .createNewBets(listNames, listOptions, listNames.length)
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
                    for (let a = 0; a < listNames.length; a++) {
                        for (let r in response.result) {
                            if (response.result[r].event_key.toString() === listNames[a].toString()) {
                                let [nameHome, nameAway, betNumber, timestamp, country, idAPI, league] =
                                    [response.result[r].event_home_team, response.result[r].event_away_team, newBets[a], Date.parse(response.result[r].event_date + " " + response.result[r].event_time) / 1000,
                                    response.result[r].country_name, response.result[r].event_key, response.result[r].league_name]
                                let nameBet = type === "football" ? nameHome + ",Draw," + nameAway : nameHome + "," + nameAway
                                db.add_bet(betNumber, numberOfOptions, nameBet, timestamp, type, country, league, idAPI);
                                logBetCreator(`${new Date().toLocaleDateString()}  ${new Date().toLocaleTimeString()} : Bet created n ${betNumber} ${timestamp} ${type} ${country} ${league} ${nameBet}`)
                            }
                        }
                    }
                    console.log(`${date} bets succesfully added`);
                })
                .catch((error) => {
                    console.log(error)
                    if (error.error.code === -32000) {
                        let newProvider = new HDWalletProvider(PRIVATE_KEY_CREATOR, NODES_URL_BSCTESTNET[Math.floor(Math.random() * NODES_URL_BSCTESTNET.length)], 0, 10000);
                        web3.setProvider(newProvider)
                        setTimeout(async function () { await betWriter(listNames, listOptions, response, numberOfOptions, type) }, 60000)
                    }
                    console.log(`error tx ${type} ${error.error.code} : ${error.error.message}`)
                })
        }

        function launchBetCreators() {
            betCreator(0);
            betCreator(1);
            betCreator(2);
            betCreator(3);
            betCreator(4);
        }
        async function betCreator(dayIncrementer) {
            let date = dateIterator(dayIncrementer);
            cyan("!!!!!!!!!!!!!!!!!!!!!!!! début requetes " + date + " !!!!!!!!!!!!!!!!!!!!!!!!");
            setTimeout(launchBetCreators, DELAY);


            for (let i = 0; i < betToCreates.length; i++) {
                let sport = betToCreates[i];
                for (let l = 0; l < sport.leagues.length; l++) {
                    let league = sport.leagues[l]
                    let namesBetToWriteOnChain = [];
                    let numberOfOptionsToWriteOnChain = [];
                    console.log(league.name)
                    let url = `${sport.urlAPI}&from=${date}&to=${date}&timezone=Africa/Abidjan&leagueId=${league.id}`
                    console.log(url)
                    fetch(url, {
                        'method': 'GET',
                    }).then((res) => {
                        res.json().then(async (data) => {
                            if (data.result === undefined) {
                                blue(`${date} : 0 bets ${sport} to add because no data`);
                                return
                            }
                            for (let u = 0; u < data.result.length; u++) {
                                if (db.getFromIDAPI(data.result[u].event_key) === undefined) {
                                    namesBetToWriteOnChain.push(data.result[u].event_key.toString())
                                    numberOfOptionsToWriteOnChain.push(sport.numberOfOptions)
                                }
                            }
                            if (namesBetToWriteOnChain.length > 0) {
                                await betWriter(namesBetToWriteOnChain, numberOfOptionsToWriteOnChain, data, sport.numberOfOptions, sport.name, date);
                            }
                            else {
                                blue(`${date} : 0 bets ${sport} to add`);
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