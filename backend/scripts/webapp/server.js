import express from 'express'
import db from '../db.js'
import cors from 'cors'
import users from '../users.js'
import apiServer from './apiServer.js'
import session from 'express-session'
import { Server } from 'socket.io';
import http from "http"
import { __dirname } from '../config.js'
import fs from 'fs';

const app = express()
const port = process.env.PORT || 4000;
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3001", "https://testnet.bettingcroc.com"]
  }
}) //in case server and client run on different urls
const leaguebets = JSON.parse(fs.readFileSync(__dirname + '/webapp/leaguebets.json'));


io.on("connection", (socket) => {
  //console.log("client connected: ", socket.id)
  socket.on("joinRoom", (nameRoom) => {
    //console.log(socket.id + " joined room " + nameRoom)
    socket.join(nameRoom)
  })

  socket.on("leaveRoom", (nameRoom) => {
    //console.log(socket.id + " left room " + nameRoom)
    socket.leave(nameRoom)
  })

  socket.on("sendFriendRequest", (args) => {
    //console.log("sendFriendRequest : " + args.toAddress.toLowerCase() + " from " + args.fromAddress)
    io.to(args.toAddress.toLowerCase()).emit("ReceivedFriendRequest", args.fromAddress)
  })

  socket.on("newFriendAccepted", (args) => {
    console.log("newFriendAccepted : " + args.toAddress + " from " + args.fromAddress)
    io.to(args.toAddress.toLowerCase()).emit("newFriendAcceptedToSender", args.fromAddress)
  })

  socket.on("sendBetInvitation", (args) => {
    console.log(args)
    //console.log("sendBetInvitation : " + args.toAddress + " from " + args.fromAddress)
    io.to(args.toAddress.toLowerCase()).emit("ReceivedBetInvitation", args.fromAddress, users.getPseudo(args.fromAddress))
  })

  socket.on("update_score", (updates) => {
    //console.log("update_score : " + updates.betNumber)
    io.to("scoreBet" + updates.betNumber).emit("scoreBetReception", [updates.scoreHome, updates.scoreAway])
  })

  socket.on("disconnect", (reason) => {
    //console.log(reason)
  })
})


var topBets = { matches: [] };
updateTopBets()
function updateTopBets() {
  //console.log("updateTopBets")
  apiServer.getTopBets().then((result) => {
    if (result === "error") { setTimeout(updateTopBets, 60000) }
    else {
      topBets = result;
      setTimeout(updateTopBets, 600000)
    }
  })
}


app.use(session({
  "secret": "zgkijngzjigizg244515FGFG",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use(cors({
  origin: 'http://localhost:3001', // replace with your frontend URL
  credentials: true
}));

app.use(express.json())

server.listen(port, err => {
  if (err) console.log(err)
  console.log("Server running on Port ", port)
})

app.get('/api/position/:address', (req, res) => {
  console.log('GET /api/position/' + req.params.address)
  address = req.params.address.toLowerCase()
  let position = users.get_Classement_address(address);
  if (position === undefined) {
    users.addUser(address);
    position = users.get_Classement_address(address);
    //console.log("position request " + position)
    res.send({ address: 'unknown', score: 'unknown', position: 'unknown' })

  }
  else {
    res.send(position);
  }
})


app.get('/api/nonce/:address', async (req, res) => {
  console.log('GET /api/nonce/' + req.params.address)

  req.session.nonce = apiServer.newNonce(req.params.address)
  res.send({ 'nonce': req.session.nonce })
})

app.post('/api/login_unsecure', (req, res) => {
  console.log('POST /login_unsecure')
  if (req.body.address === undefined) {
    console.log("trying to log without address")
    res.status(401).send()
  }
  else {
    req.session.logged = true
    req.session.address = req.body.address.toLowerCase()
    let position = users.get_Classement_address(req.body.address.toLowerCase());
    if (position === undefined) {
      users.addUser(req.body.address);
    }
    req.session.save()
    res.send("login")
  }
})

app.post('/login', (req, res) => {
  console.log('POST /login')
  let nonce = req.session.nonce
  console.log("nonce " + nonce)
  if (users.recover(nonce, req.body.signedNonce).toLowerCase() === req.body.address.toLowerCase()) {
    req.session.logged = true
    req.session.address = users.recover(nonce, req.body.signedNonce).toLowerCase()
  }
  let position = users.get_Classement_address(req.body.address.toLowerCase());
  if (position === undefined) {
    users.addUser(req.body.address);
  }
  res.send("login")
})

app.post('/logout', (req, res) => {
  console.log('POST /logout')

  req.session.logged = false
  req.session.address = undefined
  res.send("ok")
})
app.get('/api/testLogin', (req, res) => {
  console.log('GET /api/testLogin')
  res.send({ isLogged: req.session.logged, address: req.session.address })
})
app.post('/api/setUpPseudo/', (req, res) => {
  console.log('POST /api/setUpPseudo/')
  if (req.session.logged === true) {
    users.setPseudo(req.body.newPseudo, req.session.address)
    res.status(200).send()
  }
  else {
    console.log("not logged")
    res.status(401).send()
  }
})

app.post('/api/sendFriendRequest/', (req, res) => {
  console.log('POST /api/sendFriendRequest/')

  if (req.session.logged === true) {
    if (users.requestAlreadyExists(req.body.head, req.body, req.session.address)) {
      console.log("request already exists")
      res.status(401).send()
    }
    else {
      if (req.body.head === "newFriend") {
        if (req.body.newFriend.toLowerCase() === undefined || req.body.newFriend.toLowerCase() === null) {
          res.status(401).send()
        }
        else
          if (req.body.newFriend.toLowerCase().length !== 42) {
            res.status(401).send()
          }
          else {
            if (users.areUsersFriends(req.session.address, req.body.newFriend.toLowerCase())) {
              console.log("already friends")
              res.status(401).send()
            }
            else {
              users.newFriendRequest(req.body, req.session.address)
              res.status(200).send()
            }
          }
      }
      if (req.body.head === "betInvitation") {
        console.log(req.body)
        if (users.areUsersFriends(req.session.address, req.body.address.toLowerCase())) {
          users.newBetInvitation(req.body, req.session.address)
          res.status(200).send()
        }
        else {
          console.log("users aren't friends")
          res.status(401).send()
        }
      }
    }
  }
  else {
    console.log("not logged")
    res.status(401).send()
  }
})

app.post('/api/answerRequest/', (req, res) => {
  console.log('POST /api/answerRequest/')

  if (req.session.logged === true) {
    if (users.answerRequest(req.body, req.session.address)) {
      res.status(200).send()
    }
    else {
      console.log("users already friends")
      res.status(401).send()
    }
  }
  else {
    console.log("not logged")
    res.status(401).send()
  }
})

app.post('/api/removeFriend/', (req, res) => { //
  console.log('POST /api/removeFriend/')

  if (req.session.logged === true) {
    //console.log(req.body, " from ", req.session.address)
    users.removeFriend(req.body, req.session.address)
    res.status(200).send()
  }
  else {
    console.log("not logged")
    res.status(401).send()
  }
})

app.get('/api/myrequests', (req, res) => {
  console.log('GET /api/myrequests/')
  if (req.session.logged === true) {
    res.send(apiServer.getMyRequests(req.session.address))
  }
  else {
    console.log("not logged")
    res.status(401).send()
  }
})

app.post('/api/setmyrequests_read', (req, res) => {
  console.log('POST /api/setmyrequests_read/')
  if (req.session.logged === true) {
    apiServer.setMyRequestsRead(req.session.address)
    res.status(200).send()
  }
  else {
    console.log("not logged")
    res.status(401).send()
  }
})

app.get('/api/myrequests_unread', (req, res) => {
  console.log('GET /api/myrequests_unread/')
  if (req.session.logged === true) {
    res.send(apiServer.getMyRequestsUnread(req.session.address))
  }
  else {
    console.log("not logged")
    res.status(401).send()
  }
})

app.get('/api/myfriends', (req, res) => {
  console.log('GET /api/myfriends/')
  if (req.session.logged === true) {
    res.send(apiServer.getMyFriends(req.session.address))
  }
  else {
    console.log("not logged")
    res.status(401).send()
  }
})

app.get('/api/lastbets', (req, res) => {
  console.log('GET /api/lastbets')
  console.log(req.query.sport + " " + req.query.league)
  res.send(apiServer.getTodayMatches(req.query.sport, req.query.league))
})
app.get('/api/leaguebet', (req, res) => {
  console.log('GET /api/leaguebet')
  console.log(req.query.league)
  res.json(leaguebets[req.query.league])
})
app.get('/api/topBets', async (req, res) => {
  console.log('GET /api/topBets')

  console.log(topBets)
  res.send(topBets)
})
app.get('/api/infoMatch/:id', (req, res) => {
  console.log('GET /api/infoMatch/' + req.params.id)

  res.send(apiServer.getMatchInfo(req.params.id))
})
app.get('/api/classement', (req, res) => {
  console.log('GET /api/classement')

  res.send(apiServer.get10MaxScore())
})

app.get('/api/classementFriends/:address', (req, res) => {
  console.log('GET /api/classementFriends/' + req.params.address)
  if (req.session.logged === true) {
    res.send(users.getFriendsClassement(req.params.address))
  }
  else {
    console.log("not logged")
    res.status(401).send()
  }
})


app.get('/api/score/:address', (req, res) => {
  console.log('GET /api/score/' + req.params.address)
  let score = apiServer.getMyScore(req.params.address.toLowerCase())
  res.send(score)
})


app.post('/api/myBets', async (req, res) => {
  console.log('POST /api/myBets')
  let betsInfos = await apiServer.getMyBets(req.body.listBets)
  res.send(betsInfos)
})

/*app.post('/api/myRecentsBets', async (req, res) => {
  console.log('POST /api/myRecentsBets')
  res.send(await apiServer.getMyRecentsBets(req.body.listBets))
})

app.get('/api/myP2PBets/:address', async (req, res) => {
  console.log('GET /api/myP2PBets/' + req.params.address)
  res.send(await apiServer.getMyP2PBets(req.params.address))
})*/

app.get('/api/infoDecentrabet/:betNumber', async (req, res) => {
  console.log('GET /api/infoDecentrabet/' + req.params.betNumber)
  res.send(apiServer.getDecentrabet(req.params.betNumber))
})

app.post('/add_decentrabet', async (req, res) => {
  console.log('POST /add_decentrabet')
  let betNumber = req.body.betNumber
  let description = req.body.description
  let link = req.body.link
  if (db.add_decentraBet(betNumber, description, link)) {
    res.status(200).send()
  }
  res.status(500).send()
})

app.use(express.static("./app/build/"))

app.get('/static/:dir/:file', (req, res) => {
  //console.log('GET /static/' + req.params.dir + "/" + req.params.file)
  res.sendFile(__dirname + "/app/build/static/" + req.params.dir + "/" + req.params.file)
})

app.get('/favicon.ico', (req, res) => {
  console.log('GET /favicon.ico')
  res.sendFile(__dirname + "/app/build/favicon.ico");
});


app.get('/*', (req, res) => {
  console.log('GET /')
  res.sendFile(__dirname + "/app/build/index.html");
});

