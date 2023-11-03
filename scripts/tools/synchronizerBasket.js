import fs from 'fs';
const multiBetABI = fs.readFileSync('./MultiBetABI.json').toString();
const request = require("request");

const NODE_URL_BSCTESTNET = "https://data-seed-prebsc-1-s1.binance.org:8545/"; //url of bsc testnet node
//const NODE_URL_BSCTESTNET = "https://rpc.ankr.com/bsc_testnet_chapel";
const NODE_URL_POLYGON =
	"https://speedy-nodes-nyc.moralis.io/d7cfb9005cec8b6a40236ec8/polygon/mainnet";
var Web3 = require("web3");
var web3 = new Web3(new Web3.providers.HttpProvider(NODE_URL_BSCTESTNET)); // new web3 object

//multiBetAddress='0xD5F51022d66382c3f432Ed2d0bc4cE18647f85a5'; Polygon
multiBetAddress = "0xBD445c5A2C4197ce12DE4e28473dE471aD21D8B5";
multiBetContract = new web3.eth.Contract(JSON.parse(multiBetABI), multiBetAddress);
const model = require("../model.js");
//console.log(model.get_MaxBet())
multiBetContract.methods
	.getLastBetNumber()
	.call()
	.then(async function (result) {
		for (i = model.get_MaxBet() + 1; i < result; i++) {
			console.log(i);
			await multiBetContract.methods
				.getBetNumberToBetName(i)
				.call()
				.then(async (result) => {
					matchUnsync = result.split(" ")
					let options = getOptions(dateFormater(matchUnsync[2]), matchUnsync[0])
					await new Promise(next => {
						request(options, async function (error, response) {
							//console.log(JSON.parse(response.body))
							let nameHome = JSON.parse(response.body).response[0].teams.home.name;
							let nameAway = JSON.parse(response.body).response[0].teams.away.name;
							let timestamp = JSON.parse(response.body).response[0].timestamp;
							let country = JSON.parse(response.body).response[0].country.name;
							let idAPI = JSON.parse(response.body).response[0].id;
							let league = JSON.parse(response.body).response[0].league.name;
							model.add_bet(i, 2, nameHome + "," + nameAway, timestamp, "basketball", country, league, idAPI);

							next()
						})
					})


				});
		}
	});

function getOptions(date, team) {
	return {
		method: "GET",
		url: "https://v1.basketball.api-sports.io/games",
		qs: { date: date, team: team, season: "2022-2023" },
		headers: {
			"x-rapidapi-host": "v1.basketball.api-sports.io",
			"x-rapidapi-key": "1b8bea4eb9795ae6f10a338ffe214f5d", //achille zgiw api
		},
	};
}

function dateFormater(timestamp) {
	let date = new Date(timestamp * 1000)
	let month = (date.getUTCMonth() + 1)
	let day = date.getUTCDate()
	if (month < 10) { month = "0" + month.toString() }
	if (day < 10) { day = "0" + day.toString() }
	return date.getUTCFullYear() + "-" + month + "-" + day
}