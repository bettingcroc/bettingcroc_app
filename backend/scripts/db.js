import Sqlite from 'better-sqlite3'
import { Web3 } from 'web3'
import { NODE_URL_BSCTESTNET, NODE_URL_POLYGON, decentraBetAddress, decentraBetABI } from "./config.js"
import { __dirname } from './config.js'

const web3 = new Web3(new Web3.providers.HttpProvider(NODE_URL_BSCTESTNET))
const decentraBetContract = new web3.eth.Contract(decentraBetABI, decentraBetAddress);
const db = new Sqlite(__dirname + '/db.sqlite');


db.prepare('CREATE TABLE IF NOT EXISTS Bets (betNumber INTEGER PRIMARY KEY, options INTEGER, optionsArray TEXT, date INTEGER, status INTEGER, type TEXT, country TEXT, league TEXT, idAPI INTEGER, scoreHome INTEGER, scoreAway INTEGER)').run();
db.prepare('CREATE TABLE IF NOT EXISTS Decentrabets (betNumber INTEGER PRIMARY KEY, description TEXT, link TEXT)').run();


function add_bet(betNumber, option, list, date, type, country, league, idAPI) {
	if (!betNumber || !option || !list || !date || !type || !country || !league) { console.log(!betNumber, " ", !option, " ", !list, " ", !date, " ", !type, " ", !country, " ", !league, " ", idAPI, "error params"); return -1; }
	try {
		let insert = db.prepare(`INSERT INTO Bets (betNumber,options,optionsArray,date,status,type,country,league,idAPI,scoreHome,scoreAway) VALUES (?,?,?,?,?,?,?,?,?,?,?)`);
		let result = insert.run(betNumber, option, list, date, 0, type, country, league, idAPI, null, null);
		console.log(betNumber, " ", option, " ", list, " ", date, " ", 0, " ", type, " ", country, " ", league, " ", idAPI, " ", null, " ", null, " added to DataBase");
		return db.prepare('SELECT betNumber FROM Bets where ROWID=(?)').get(result.lastInsertRowid)['betNumber'];
	} catch (e) {
		console.log("error adding a bet to database => ", e.code);
		if (e.code === 'SQLITE_CONSTRAINT_PRIMARYKEY') return -1;
		throw e;
	}
}


function get_Name(betNumber) {
	//console.log("betNumber to print",betNumber);
	let select = db.prepare(`SELECT optionsArray FROM Bets WHERE betNumber = '${betNumber}'`);
	let result = select.get();
	array = result.optionsArray.split(',');
	if (result) return array[0] + " vs " + array[array.length - 1];
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
	let select = db.prepare(`SELECT betNumber from bets where date>='${date1}' and date<'${date2}' and status=0`);
	let result = select.all();
	if (result) return result;
}


function get_UnderDate(date) {
	let select = db.prepare(`SELECT betNumber from bets where date<'${date}' and status=0`);
	let result = select.all();
	if (result) return result;
}


function get_Type(betNumber) {
	let select = db.prepare(`SELECT type FROM Bets WHERE betNumber = '${betNumber}'`);
	let result = select.get();
	if (result) return result.type;
	return null;
}


function get_CLosestDates(date) {
	let select = db.prepare(`select betNumber from bets where date>'${date}' limit 14`);
	let result = select.all();
	if (result) return result;
	return null;
}


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


function getFromIDAPI(idAPI){
	let select = db.prepare(`SELECT betNumber FROM Bets WHERE idAPI = '${idAPI}'`);
	let result = select.get();
	if (result) return result.betNumber;
}


function get_CLosestDatesByTypeAndCountry(date, type, country) {
	//console.log(date,type,country);
	var param;
	if (country === "england") { param = 'England' }
	if (country === "spain") { param = 'Spain' }
	if (country === "usa") { param = 'USA' }
	if (country === "italy") { param = 'Italy' }
	if (country === "france") { param = 'France' };
	let select = db.prepare(`select betNumber from bets where date>'${date}' and type='${type}' and country='${param}' limit 14`);
	let result = select.all();
	if (result) return result;
	return null;
}


function get_CLosestDatesByTypeAndLeague(date, type, league) {
	//console.log(date,type,country);
	var param;
	if (league === "gleague") { param = 'NBA - G League' }
	if (league === "nba") { param = 'NBA' }
	if (league === "lnb") { param = 'LNB' }
	let select = db.prepare(`select betNumber from bets where date>'${date}' and type='${type}' and league='${param}' limit 14`);
	let result = select.all();
	if (result) return result;
	return null;
}


function initTest() {
	let del = db.prepare(`DELETE from bets`);
	let result = del.run();

	if (result) return result;
}


function closeBets(betNumbers) {
	for (let bN in betNumbers) {
		bN = betNumbers[bN]
		let update = db.prepare('update bets set status=1 where betNumber=' + bN)
		update.run()
		//console.log('update bets set status=1 where betNumber='+bN)
	}
}


function deleteBet(betNumber) {
	let deleteRequest = db.prepare('delete from bets where betNumber=' + betNumber)
	deleteRequest.run()
}


function updateBetLabel(betNumbers,column,value) {
	//console.log(`update bets set ${column}='${value}' where betNumber in (${betNumbers})`)
	let update = db.prepare(`update bets set ${column}='${value}' where betNumber in (${betNumbers})`)
	update.run()
}


function sqlToInject() {
	let command = 'ALTER TABLE bets ADD COLUMN label1 TEXT;'
	db.prepare(command).run()
	console.log("runned " + command)
}


function getTable(table,args) {
	//console.log(args.status)
	let options=""
	if (args.status !==null && args.status !==undefined){
		options = " where status = "+args.status
	}
	let select = db.prepare(`select * from ` + table+options);
	let result = select.all();
	if (result) return result;
	return result;
}


function add_decentraBet(betNumber, description, link) {
	console.log(betNumber, description, link)
	try {
		let insert = db.prepare(`INSERT INTO Decentrabets (betNumber,description,link) VALUES (?,?,?)`);
		let result = insert.run(betNumber, description, link);
		console.log(`${betNumber} ${description} ${link} added to db`);
		return true
	} catch (e) {
		console.log(e)
		return false
	}
}

//add_decentraBet(1,"desc","link")

export default {
	add_bet: add_bet,
	get_Name: get_Name,
	get_Options: get_Options,
	get_List: get_List,
	get_Date: get_Date,
	get_MaxBet: get_MaxBet,
	get_BetBetween2dates: get_BetBetween2dates,
	initTest: initTest,
	get_CLosestDates: get_CLosestDates,
	get_CLosestDatesByType: get_CLosestDatesByType,
	get_Type: get_Type,
	get_Country: get_Country,
	get_CLosestDatesByTypeAndCountry: get_CLosestDatesByTypeAndCountry,
	get_idAPI: get_idAPI,
	get_League: get_League,
	get_CLosestDatesByTypeAndLeague: get_CLosestDatesByTypeAndLeague,
	closeBets: closeBets,
	sqlToInject: sqlToInject,
	getTable: getTable,
	get_UnderDate: get_UnderDate,
	add_decentraBet: add_decentraBet,
	deleteBet:deleteBet,
	getFromIDAPI:getFromIDAPI,
	updateBetLabel:updateBetLabel
}