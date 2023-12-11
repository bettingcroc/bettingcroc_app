/* global BigInt */
import { Web3 } from 'web3';
import { multiBetAddress, NODE_URL_BSCTESTNET, NODE_URL_POLYGON, multiBetABI, } from "../config.js"
import Sqlite from 'better-sqlite3'
import { __dirname } from '../config.js';

const web3 = new Web3(new Web3.providers.HttpProvider(NODE_URL_BSCTESTNET)); // new web3 object
const multiBetContract = new web3.eth.Contract(multiBetABI, multiBetAddress);
const db = new Sqlite(__dirname+"/db.sqlite");

function randomString(length) {
	let text = "";
	let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (let i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}
function newNonce() {
	let nonce = "Login to Bettingcroc : " + randomString(6)
	return nonce
}

function timeConverter(UNIX_timestamp) {
	let a = new Date(UNIX_timestamp * 1000);
	let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	let year = a.getFullYear();
	let month = months[a.getMonth()];
	let date = a.getDate();
	let hour = a.getHours();
	let min = a.getMinutes();
	let sec = a.getSeconds();
	let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
	return time;
}
function get_Name(betNumber) {
	//console.log("betNumber to print",betNumber);
	let select = db.prepare(`SELECT optionsArray FROM Bets WHERE betNumber = '${betNumber}'`);
	let result = select.get();
	let array = result.optionsArray.split(',');
	if (result) return array[0] + " - " + array[array.length - 1];
	return null;
}

function get_Options(betNumber) {
	let select = db.prepare(`SELECT options FROM Bets WHERE betNumber = '${betNumber}'`);
	let result = select.get();
	if (result) return result.options;
	return null;
}

function get_List(betNumber) {
	let select = db.prepare(`SELECT optionsArray FROM Bets WHERE betNumber = '${betNumber}'`);
	let result = select.get();
	if (result) return result.optionsArray;
	return null;
}

function get_Date(betNumber) {
	let select = db.prepare(`SELECT date FROM Bets WHERE betNumber = '${betNumber}'`);
	let result = select.get();
	if (result) return result.date;
	return null;
}

function get_MaxBet() {
	let select = db.prepare('SELECT MAX(betNumber) as "MaxBet" FROM Bets ');
	let result = select.get();
	//betNumber=0;
	if (result) return result.MaxBet;
}

function get_BetBetween2dates(date1, date2) {
	let select = db.prepare(`SELECT betNumber from bets where date>'${date1}' and date<'${date2}'`);
	let result = select.all();
	if (result) return result;
}

function get_Type(betNumber) {
	let select = db.prepare(`SELECT type FROM Bets WHERE betNumber = '${betNumber}'`);
	let result = select.get();
	if (result) return result.type;
	return null;
}

/*function get_CLosestDates(date) {
	let select = db.prepare(`select betNumber from bets where date>'${date}' limit 14`);
	let result = select.all();
	if (result) return result;
	return null;
}*/

function get_CLosestDatesByType(date, type) {
	let select = db.prepare(`select betNumber from bets where date>'${date}' and type='${type}' limit 14`);
	let result = select.all();
	if (result) return result;
	return null;
}

function get_Country(betNumber) {
	let select = db.prepare(`SELECT country FROM Bets WHERE betNumber = '${betNumber}'`);
	let result = select.get();
	if (result) return result.country;

	return null;
}

function get_ScoreHome(betNumber) {
	let select = db.prepare(`SELECT scoreHome FROM Bets WHERE betNumber = '${betNumber}'`);
	let result = select.get();
	if (result) return result.scoreHome;

	return null;
}
function get_ScoreAway(betNumber) {
	let select = db.prepare(`SELECT scoreAway FROM Bets WHERE betNumber = '${betNumber}'`);
	let result = select.get();
	if (result) return result.scoreAway;

	return null;
}
function get_Status(betNumber) {
	let select = db.prepare(`SELECT status FROM Bets WHERE betNumber = '${betNumber}'`);
	let result = select.get();
	if (result) return result.status;

	return null;
}
function get_League(betNumber) {
	let select = db.prepare(`SELECT league FROM Bets WHERE betNumber = '${betNumber}'`);
	let result = select.get();
	if (result) return result.league;

	return null;
}

function get_idAPI(betNumber) {
	let select = db.prepare(`SELECT idAPI FROM Bets WHERE betNumber = '${betNumber}'`);
	let result = select.get();
	if (result) return result.idAPI;

	return null;
}
function get_CLosestDates(date) {
	let select = db.prepare(`select betNumber from bets where date>'${date}' limit 14`);
	let result = select.all();
	if (result) return result;
	return null;
}
function get10MaxScore() {
	let select = db.prepare(`SELECT * FROM Players order by score desc limit 10;`);
	let result = select.all();
	//console.log(result)
	if (result) return result;
}
function getTodayMatches() {
	let timeNow = new Date().getTime() - 10800;
	timeNow = new Date(timeNow);
	//console.log(timeNow)
	let arrayIndex = get_CLosestDates(Math.floor(timeNow.getTime() / 1000));
	//arrayIndex.push({ betNumber: 15 })
	//console.log(arrayIndex)
	let matches = { matches: [] }
	let opt = arrayIndex.length;
	for (let i = 0; i < opt; i++) {
		let match = {}
		match["betNumber"] = arrayIndex[i]["betNumber"]
		match["name"] = get_Name(arrayIndex[i]["betNumber"])
		match["date"] = timeConverter(get_Date(arrayIndex[i]["betNumber"]))
		match["type"] = get_Type(arrayIndex[i]["betNumber"]) === 'football' ? '⚽' : '🏀'
		match["country"] = get_Country(arrayIndex[i]["betNumber"]) === "USA" ? "🇺🇸" : "🌍"
		matches.matches.push(match)
	}
	//console.log(matches)
	return (matches)
}
async function getTopBets() {
	let timeNow = new Date().getTime() - 10800;
	timeNow = new Date(timeNow);
	//console.log(timeNow)
	let arrayIndex = get_CLosestDates(Math.floor(timeNow.getTime() / 1000));
	//console.log(arrayIndex)
	let matches = { matches: [] }
	let list = ''
	let opt = arrayIndex.length;
	try {
		for (let i = 0; i < opt; i++) {
			let match = {}
			match["betNumber"] = arrayIndex[i]["betNumber"]
			match["name"] = get_Name(arrayIndex[i]["betNumber"])
			match["date"] = timeConverter(get_Date(arrayIndex[i]["betNumber"]))
			match["type"] = get_Type(arrayIndex[i]["betNumber"]) === 'football' ? '⚽' : '🏀'
			await multiBetContract.methods.getTotalMoneyBet(arrayIndex[i]["betNumber"]).call()
				.then(function (result) {
					//console.log(i)
					//console.log(result)
					match["moneyBetted"] = parseInt(result)
				})
			matches.matches.push(match)
		}
		matches.matches.sort((a, b) => (BigInt(a.moneyBetted) > BigInt(b.moneyBetted) ? -1 : 1))
		//console.log({ matches: [matches.matches[0], matches.matches[1], matches.matches[2]] })
		return ({ matches: [matches.matches[0], matches.matches[1], matches.matches[2]] })
	}
	catch (e) {
		console.log(e);
		//return "error" 
	}

}
function getMatchInfo(id) {
	let optionsArray = get_List(id)
	let date = get_Date(id)
	let type = get_Type(id)
	let country = get_Country(id)
	let league = get_League(id)
	let status = get_Status(id)
	let scoreHome = get_ScoreHome(id)
	let scoreAway = get_ScoreAway(id)
	let matchInfos = {
		optionsArray: optionsArray,
		date: date,
		type: type,
		country: country,
		league: league,
		status: status,
		scoreHome: scoreHome,
		scoreAway
	}
	return matchInfos
}
function getMyScore(address) {
	let select = db.prepare(`select address,position,score,pseudo from(select row_number() over (order by score desc) as position,address,score,pseudo from players )  where address='${address}'`);
	let result = select.all();
	if (result) return result;

	return null;
}
async function getMyBets(listMatches) {
	let toReturn = []
	for (let m in listMatches) {
		//console.log(m)
		toReturn.push(getMatchInfo(listMatches[m]))
		toReturn[m].id = listMatches[m]
	}
	return toReturn
}

async function getMyRecentsBets(listMatches) {
	toReturn = []
	date = new Date
	date = Math.ceil(date.getTime() / 1000) - 86400
	console.log(date)
	for (let m in listMatches) {
		let matchInfos = getMatchInfo(listMatches[m])
		console.log(matchInfos)
		if (date <= matchInfos.date) {
			toReturn.push(matchInfos)
			toReturn[m].id = listMatches[m]
		}
	}
	return toReturn
}

async function getMyP2PBets(address) {
	let listMatches;
	await multiBetContract.methods.seeMyP2PBetsUser(address).call()
		.then(function (result) {
			console.log(result)
			listMatches = result

		}
		)
	let toReturn = []
	let numBet = 0
	let compteur = 0
	for (let m in listMatches) {
		//console.log(m)
		if (numBet === parseInt(listMatches[m])) {
			compteur++
		}
		else {
			numBet = parseInt(listMatches[m])
		}
		console.log("numBet " + numBet + " compteur " + compteur)
		//console.log(m)
		toReturn.push(getMatchInfo(listMatches[m]))
		toReturn[m].id = listMatches[m]
		await multiBetContract.methods.seeMyP2PBetsDetail(address, numBet).call()
			.then((res) => {
				toReturn[m].p2pNum = res[compteur]
			})
	}
	return toReturn
}

function getMyRequests(address, maxDate = 0) {
	//console.log(maxDate)
	if (maxDate === 0) {
		let select = db.prepare(`select address1,address2,header,body,dateRequest,read,pseudo,id from friendsRequests,Players where address2='${address}' and address=address1;`);
		let result = select.all();
		//console.log(result)
		if (result) return result;
	}
}

function getMyRequestsUnread(address) {
	let select = db.prepare(`SELECT COUNT(*) as unread FROM friendsRequests where read=0 and address2='${address}'`);
	let result = select.get();
	//console.log(result)
	if (result) return result;
}

function getMyFriends(address) {
	let select = db.prepare(`select address2,pseudo from friendsLinks,Players where address1='${address}' and address2=address`);
	let result = select.all();
	//console.log(result)
	if (result) return result;
}

function setMyRequestsRead(address) {
	let update = db.prepare(`UPDATE friendsRequests
	SET read=1
	WHERE
		read=0 and address2='${address}'`)
	update.run()
}

export default {
	getTodayMatches: getTodayMatches,
	getMatchInfo: getMatchInfo,
	get10MaxScore: get10MaxScore,
	getMyScore: getMyScore,
	getMyBets: getMyBets,
	getTopBets: getTopBets,
	getMyRequests: getMyRequests,
	getMyFriends: getMyFriends,
	getMyP2PBets: getMyP2PBets,
	getMyRecentsBets: getMyRecentsBets,
	newNonce: newNonce,
	getMyRequestsUnread: getMyRequestsUnread,
	setMyRequestsRead: setMyRequestsRead
}
