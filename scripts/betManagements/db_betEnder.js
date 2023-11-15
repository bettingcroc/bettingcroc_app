import { io } from "socket.io-client"; import Sqlite from 'better-sqlite3'

const db = new Sqlite('db.sqlite');
const socket = io('https://testnet.bettingcroc.com')


socket.on('connect', () => console.log("connected to server with " + socket.id))
socket.on('connect_error', () => {
	setTimeout(() => socket.connect(), 5000)
})
socket.on('disconnect', () => console.log('server disconnected'))


function get_betClosed() {
	let select = db.prepare(`select betNumber from bets where status=1`).all();
	let betsClosed = [];
	for (let i = 0; i < select.length; i++) {
		betsClosed.push(select[i]["betNumber"]);
	}
	if (select) return betsClosed;
}


function get_betClosed_byType(type) {
	let select = db.prepare(`select betNumber from bets where status=1 and type='${type}'`);

	let result = select.all();
	if (result) return result;
}


function get_leagueClosed_byType(type) {
	let select = db.prepare(`select distinct league from bets where status=1 and type='${type}'`);
	let result = select.all();
	if (result) return result;
	return null;
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
export default {
	get_betClosed_byType: get_betClosed_byType,
	get_betClosed: get_betClosed,
	get_leagueClosed_byType: get_leagueClosed_byType,
	get_idAPI: get_idAPI,
	update_score: update_score, endBets: endBets,

}