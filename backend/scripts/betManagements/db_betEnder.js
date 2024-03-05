import { io } from "socket.io-client"; import Sqlite from 'better-sqlite3'
import { __dirname } from "../config.js";

const db = new Sqlite(__dirname + '/db.sqlite');
const socket = io('https://testnet.bettingcroc.com')


socket.on('connect', () => console.log("connected to server with " + socket.id))
socket.on('connect_error', () => {
	setTimeout(() => socket.connect(), 5000)
})
socket.on('disconnect', () => console.log('server disconnected'))


function get_betClosed() {
	let select = db.prepare(`select betNumber from bets where status=1 and idAPI != 0`).all();
	let betsClosed = [];
	for (let i = 0; i < select.length; i++) {
		betsClosed.push(select[i]["betNumber"]);
	}
	if (select) return betsClosed;
}


function get_idAPI(betNumber) {
	let select = db.prepare(`SELECT idAPI FROM Bets WHERE betNumber = '${betNumber}'`);
	let result = select.get();
	if (result) return result.idAPI;

	return null;
}


function update_score(betNumber, scoreHome, scoreAway) {
	try {
		let update = db.prepare(`update  Bets set scoreHome='${scoreHome}' , scoreAway='${scoreAway}' where betNumber=` + betNumber)
		update.run()
		socket.emit('update_score', { betNumber: betNumber, scoreHome: scoreHome, scoreAway: scoreAway })

	}
	catch (e) {
		console.log("error update_score")
		console.log(e)
	}
}

function endBets(betNumbers) {
	for (let bN in betNumbers) {
		bN = betNumbers[bN]
		let update = db.prepare('update bets set status=2 where betNumber=' + bN)
		update.run()
	}
}

function cancelBet(betNumber) {
	let update = db.prepare('update bets set status=3 where betNumber=' + betNumber)
	update.run()
}

function get_Type(betNumber) {
	let select = db.prepare(`SELECT type FROM Bets WHERE betNumber = '${betNumber}'`);
	let result = select.get();
	if (result) return result.type;
	return null;
}
export default {
	get_betClosed: get_betClosed,
	get_idAPI: get_idAPI,
	update_score: update_score, endBets: endBets,
	cancelBet: cancelBet,
	get_Type: get_Type
}