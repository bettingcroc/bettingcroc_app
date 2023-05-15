const io = require('socket.io-client')
const Sqlite = require('better-sqlite3');

let db = new Sqlite('db.sqlite');

const socket = io('http://localhost:4000')
socket.on('connect', () => console.log("connected to server with " + socket.id))



socket.on('connect_error', () => {
    setTimeout(() => socket.connect(), 5000)
})
socket.on('disconnect', () => console.log('server disconnected'))


function get_betClosed() {
    let select = db.prepare(`select betNumber from bets where status=1`);
    let result = select.all();
    if (result) return result;
}

function get_betClosed_byType(type) {
    let select = db.prepare(`select betNumber from bets where status=1 and type='${type}'`);

    let result = select.all();
    if (result) return result;
}

function get_leagueClosed_byType(type){
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
        socket.emit('update_score', {betNumber:betNumber, scoreHome:scoreHome, scoreAway:scoreAway})

	}
	catch (e) {
		console.log("error update_score")
		console.log(e)
	}
}


module.exports = {
    get_betClosed_byType: get_betClosed_byType,
    get_betClosed: get_betClosed,
    get_leagueClosed_byType:get_leagueClosed_byType,
    get_idAPI:get_idAPI,
    update_score: update_score,


}