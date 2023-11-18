import Sqlite from 'better-sqlite3'
import { Web3 } from 'web3';
import { multiBetAddress, NODE_URL_BSCTESTNET, NODE_URL_POLYGON, multiBetABI,__dirname } from "./config.js"

const db = new Sqlite(__dirname+'/db.sqlite');
const web3 = new Web3(new Web3.providers.HttpProvider(NODE_URL_BSCTESTNET)); // new web3 object
const multiBetContract = new web3.eth.Contract(multiBetABI, multiBetAddress);

db.prepare('CREATE TABLE IF NOT EXISTS Players (address TEXT PRIMARY KEY, score INTEGER, pseudo TEXT)').run();
db.prepare('create TABLE IF NOT EXISTS friendsLinks (address1 TEXT,address2 text)').run();
db.prepare('create TABLE IF NOT EXISTS friendsRequests (id INTEGER PRIMARY KEY,address1 TEXT,address2 text,header text,body text,dateRequest date)').run();


function getPseudo(address) {
	address = address.toLowerCase();
	let select = db.prepare(`SELECT pseudo FROM Players WHERE address = '${address}'`);
	let result = select.get();
	if (result) return result.pseudo;
	return null;
}
function setPseudo(newPseudo, address) {
	address = address.toLowerCase();
	db.prepare(` update Players set pseudo='${newPseudo}' where address='${address}'`).run()


}

function requestAlreadyExists(type, body, sender) {
	if (type === "newFriend") {
		let request = db.prepare(`select count(*) as "exists"  from friendsRequests where address1='${sender}' and address2='${body.newFriend.toLowerCase()}' and header='newFriend'`).get();
		if (request.exists > 0) { return true }
		else {
			return false
		}
	}
	if (type === "betInvitation") {
		let requests = db.prepare(`select body from friendsRequests where address1='${sender}' and address2='${body.address.toLowerCase()}' and header='betInvitation'`).all();
		for (let r = 0; r < requests.length; r++) {
			let bodyRequest = JSON.parse(requests[r].body)
			if (JSON.stringify(bodyRequest.argsBet) === JSON.stringify(body.argsBet)) {
				return true
			}
		}
		return false
	}
}

function newFriendRequest(args, address) {
	//console.log(args)
	//console.log(address)
	let insert = db.prepare(`INSERT INTO friendsRequests (address1,address2,header,body,dateRequest,read) VALUES (?,?,?,?,?,?)`);
	let timeNow = new Date().toLocaleTimeString();
	let dateNow = new Date().toLocaleDateString();
	//console.log(address,args.newFriend,args.head, JSON.stringify(args),dateNow+" "+timeNow)
	insert.run(address, args.newFriend.toLowerCase(), args.head, JSON.stringify(args), dateNow + " " + timeNow, "0");
}

function newBetInvitation(args, address) {
	//console.log(args)
	//console.log(address)
	let insert = db.prepare(`INSERT INTO friendsRequests (address1,address2,header,body,dateRequest,read) VALUES (?,?,?,?,?,?)`);
	let timeNow = new Date().toLocaleTimeString();
	let dateNow = new Date().toLocaleDateString();
	//console.log(address, args.address.toLowerCase(), args.head, JSON.stringify(args), dateNow + " " + timeNow)
	insert.run(address, args.address.toLowerCase(), args.head, JSON.stringify(args), dateNow + " " + timeNow, "0");
}

function areUsersFriends(address1, address2) {
	let select = db.prepare(`select * from friendsLinks where address1='${address1}' and address2='${address2}'`);
	let result = select.get();
	if (result) return true

	else return false
}

function answerRequest(args, address) {
	if (args.head === "newFriend") {
		if (!areUsersFriends(address.toLowerCase(), args.newFriend.toLowerCase())) {
			let insert = db.prepare(`INSERT INTO friendsLinks (address1,address2) VALUES (?,?)`);
			insert.run(address.toLowerCase(), args.newFriend.toLowerCase());
			insert.run(args.newFriend.toLowerCase(), address.toLowerCase());
			let del = db.prepare('DELETE FROM friendsRequests WHERE id=' + args.id)
			del.run()
			del = db.prepare(`DELETE FROM friendsRequests where address1='${address.toLowerCase()}' and address2='${args.newFriend.toLowerCase()}'`)
			del.run()
			return true
		}
		else {
			return false
		}
	}
}
function removeFriend(args, address) {
	let del = db.prepare(`DELETE from friendsLinks where address1='` + address.toLowerCase() + `' and address2='` + args.oldFriend.toLowerCase() + `'`);
	del.run();
	let del2 = db.prepare(`DELETE from friendsLinks where address1='` + args.oldFriend.toLowerCase() + `' and address2='` + address.toLowerCase() + `'`);
	del2.run();
}


function get10MaxScore() {
	let select = db.prepare(`SELECT * FROM Players order by score desc limit 10;`);
	let result = select.all();
	if (result) return result;
}
function getFriendsClassement(address) {
	address = address.toLowerCase()
	let request = `SELECT * FROM players where address in (select address2 from friendsLinks where address1='${address}' union SELECT distinct address1 from friendsLinks where address1='${address}') order by score desc;`
	let select = db.prepare(request);
	let result = select.all();
	if (result) return result;
}

function update_Scores() {
	let taille = db.prepare('SELECT COUNT(*) as taille FROM Players').get();
	taille = taille.taille;
	for (i = 0; i < taille; i++) {
		let address = get_addresses()[i].address;
		multiBetContract.methods.getScoreUser(address).call()
			.then((result) => {
				update_Score(address, result);
			})
	}
}
function update_Score(address, score) {
	let update = db.prepare(`UPDATE players SET score = '${score}' WHERE address= '${address}'`)
	update.run();
}
function update_WeekScores() {
	let taille = db.prepare('SELECT COUNT(*) as taille FROM Players').get();
	taille = taille.taille;
	//console.log("from users.js "+taille);
	console.log(get_addresses())
	for (i = 0; i < taille; i++) {
		let address = get_addresses()[i].address;
		multiBetContract.methods.getScoreUser(address).call()
			.then((result) => {
				console.log("result " + result)
				update_WeekScore(address, result);
			})
	}
}


function update_WeekScore(address, score) {
	db.prepare(`UPDATE players SET oldWeek = (select week from players where address = '${address}' ) WHERE address= '${address}'`).run()
	let oldScore = db.prepare(`select week from players where address ='${address}'`).get()
	let scoreUpdated = score - oldScore.week
	let update = db.prepare(`UPDATE players SET week = '${scoreUpdated}' WHERE address= '${address}'`)
	update.run();
}


function get_addresses() {
	let result = db.prepare('select address from Players').all();
	return result;
}



async function addUser(address) {
	if (!address) { console.log("pas d'address" + !address); return; }
	address = address.toLowerCase();
	try {
		let insert = db.prepare(`INSERT INTO Players (address,score) VALUES (?,?)`);
		await multiBetContract.methods.getScoreUser(address.toLowerCase()).call()
			.then((result) => {
				console.log("new user score :" + result)
				insert.run(address, result);
				console.log(address, " added to DataBase with ", address, " ", result);
			})

	}
	catch (e) {
		console.log(e)
		//console.log("error adding a player to database => ", e.code);
		if (e.code === 'SQLITE_CONSTRAINT_PRIMARYKEY') return -1;
		throw e;
	}

}

function get_Classement_address(address) {
	let select = db.prepare(`select position,score,pseudo from(select row_number() over (order by score desc) as position,address,score,pseudo from players )  where address='${address}'`);
	let result = select.get();
	if (result) return result;
}




function recover(nonsigned, signed) {
	let hex = ''
	for (let i = 0; i < nonsigned.length; i++) {
		hex += '' + nonsigned.charCodeAt(i).toString(16)
	}
	let hexMessage = "0x" + hex
	return web3.eth.accounts.recover(hexMessage, signed);
}



export default {
	addUser: addUser,
	update_Scores: update_Scores,
	update_Scores: update_Scores,
	get10MaxScore: get10MaxScore,
	get_Classement_address: get_Classement_address,
	update_WeekScores: update_WeekScores,
	recover: recover,
	setPseudo: setPseudo,
	newFriendRequest: newFriendRequest,
	answerRequest: answerRequest,
	removeFriend: removeFriend,
	areUsersFriends: areUsersFriends,
	newBetInvitation: newBetInvitation,
	getFriendsClassement: getFriendsClassement,
	requestAlreadyExists: requestAlreadyExists,
	getPseudo: getPseudo
}
