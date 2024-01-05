import { multiBetABI, NODE_URL_BSCTESTNET, multiBetAddress, URL_API_BASKETBALL } from '../config.js';
import { Web3 } from 'web3'; 
import db from '../db.js'

const web3 = new Web3(new Web3.providers.HttpProvider(NODE_URL_BSCTESTNET)); // new web3 object
const multiBetContract = new web3.eth.Contract(multiBetABI, multiBetAddress);

multiBetContract.setConfig({ contractDataInputFill: "both" })

multiBetContract.methods
	.getLastBetNumber()
	.call()
	.then(async function (result) {
		for (let i = db.get_MaxBet() + 1; i < result; i++) {
			await multiBetContract.methods
				.getBetNumberToBetName(i)
				.call()
				.then(async (result) => {
					let matchUnsync = result.split(" ")
					let options = {
						'method': 'GET',
						'headers': {
							'x-rapidapi-host': 'v1.basketball.api-sports.io',
							'x-rapidapi-key': '0bd2ece4d5dca48c6d12f3d678737494' //achille zgiw api
						}
					}
					fetch(URL_API_BASKETBALL + `?date=${dateFormater(matchUnsync[2])}&season=${"2023-2024"}&team=${matchUnsync[0]}`, options).then((res) => {
						res.json().then(async (data) => {
							let nameHome = data.response[0].teams.home.name;
							let nameAway = data.response[0].teams.away.name;
							let timestamp = data.response[0].timestamp;
							let country = data.response[0].country.name;
							let idAPI = data.response[0].id;
							let league = data.response[0].league.name;
							db.add_bet(i, 2, nameHome + "," + nameAway, timestamp, "basketball", country, league, idAPI);
						})
					})
				});
		}
	});

function dateFormater(timestamp) {
	let date = new Date(timestamp * 1000)
	let month = (date.getUTCMonth() + 1)
	let day = date.getUTCDate()
	if (month < 10) { month = "0" + month.toString() }
	if (day < 10) { day = "0" + day.toString() }
	return date.getUTCFullYear() + "-" + month + "-" + day
}