const express = require('express')
const logger = require('./logger.js')
const model = require('./model')
var cors = require('cors')
const users = require('./users')
const apiServer = require('./apiServer')
const app = express()
var useragent = require('express-useragent');
const port = process.env.PORT || 4000;
const session = require('express-session')
app.use(useragent.express());
const socketIo = require("socket.io")
const http = require("http")
const server = http.createServer(app)
const io = socketIo(server, {
    cors: {
        origin: "https://testnet.bettingcroc.com"
    }
}) //in case server and client run on different urls
io.on("connection", (socket) => {
    console.log("client connected: ", socket.id)
    socket.on("joinRoom",(address)=>{
      console.log(address)
      console.log(socket.id+" joined room "+address)
      socket.join(address)
    })
    socket.on("sendFriendRequest",(args)=>{
      //console.log("socket")
      console.log("sendFriendRequest : "+args.toAddress+" from "+args.fromAddress)
      io.to(args.toAddress.toLowerCase()).emit("ReceivedFriendRequest",args.fromAddress)
      //console.log("socket")
    })
    socket.on("newFriendAccepted",(args)=>{
      //console.log("socket")
      console.log("newFriendAccepted : "+args.toAddress+" from "+args.fromAddress)
      io.to(args.toAddress.toLowerCase()).emit("newFriendAcceptedToSender",args.fromAddress)
      //console.log("socket")
    })
    socket.on("sendBetInvitation",(args)=>{
      //console.log("socket")
      console.log("sendBetInvitation : "+args.toAddress+" from "+args.fromAddress)
      io.to(args.toAddress.toLowerCase()).emit("ReceivedBetInvitation",args.fromAddress)
      //console.log("socket")
    })

    socket.join("clock-room")

    socket.on("disconnect", (reason) => {
        console.log(reason)
    })
})


var topBets = {};
updateTopBets()
function updateTopBets() {
  console.log("updateTopBets")
  apiServer.getTopBets().then((result) => {

    if (result === "error") { setTimeout(updateTopBets, 60000) }
    else {
      topBets = result;
      setTimeout(updateTopBets, 180000)
    }
  })
}




app.use(session({
  "secret": "zgkijngzjigizg244515FGFG"
}))

app.use(cors())
app.use(express.json())

/*app.listen(port, () => {
  console.log(`Bettingcroc application listening on port ${port}`)
})*/
server.listen(port, err => {
  if (err) console.log(err)
  console.log("Server running on Port ", port)
})

app.get('/api/position/:address', (req, res) => {
  console.log('GET /api/position/'+req.params.address)

  address = req.params.address.toLowerCase()
  //console.log(address)
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
  console.log('GET /api/nonce/'+req.params.address)

  req.session.nonce = users.newNonce(req.params.address)
  res.send({ 'nonce': req.session.nonce })
})

app.post('/login', (req, res) => {
  console.log('POST /login')

  //console.log("nonce signed " + req.body.signedNonce)
  //console.log("address " + req.body.address)
  let nonce = req.session.nonce
  //console.log("nonce " + nonce)
  //console.log("signer : " + users.recover(nonce, req.body.signedNonce))
  if (users.recover(nonce, req.body.signedNonce).toLowerCase() === req.body.address.toLowerCase()) {
    //console.log("logging in " + req.body.address)
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
  console.log('GET /testLogin')

  res.send({ isLogged: req.session.logged })
})
app.post('/api/setUpPseudo/', (req, res) => {
  console.log('POST /api/setUpPseudo/')

  if (req.session.logged === true) {
    //console.log(req.body.newPseudo, " ", req.session.address)
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
   //console.log(req.body)
    if (req.body.head === "newFriend") {
      if (users.areUsersFriends(req.session.address, req.body.newFriend.toLowerCase())) {
        console.log("already friends")
        res.status(401).send()
      }
      else {
        //console.log(req.body, " from ", req.session.address)
        users.newFriendRequest(req.body, req.session.address)
        res.status(200).send()
      }
    }
    if (req.body.head === "betInvitation") {
      if (users.areUsersFriends(req.session.address, req.body.address.toLowerCase())) {
        users.newBetInvitation(req.body,req.session.address)
        res.status(200).send()
      }
      else {
        console.log("users aren't friends")
        res.status(401).send()
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
    //console.log(req.body, " from ", req.session.address)
    users.answerRequest(req.body, req.session.address)
    res.status(200).send()
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
  console.log('GET /api/lastbets/')

  res.send(apiServer.getTodayMatches())
})
app.get('/api/topBets', async (req, res) => {
  console.log('GET /api/topBets/')

  //console.log(topBets)
  res.send(topBets)
})
app.get('/api/infoMatch/:id', (req, res) => {
  console.log('GET /api/infoMatch/'+req.params.id)

  res.send(apiServer.getMatchInfo(req.params.id))
})
app.get('/api/classement', (req, res) => {
  console.log('GET /api/classement')

  res.send(apiServer.get10MaxScore())
})
app.get('/api/score/:address', (req, res) => {
  console.log('GET /api/score/'+req.params.address)
  //console.log('GET /api/score/'+req.params.address)
  address = req.params.address.toLowerCase()
  //console.log(address)
  let position = users.get_Classement_address(address);
  //console.log(position)
  if (position === undefined) {
    users.addUser(address);
    position = users.get_Classement_address(address);
    //console.log("position request " + position)
    score = apiServer.getMyScore(req.params.address.toLowerCase())
    //console.log(score)
    res.send(score)

  }
  else {
    score = apiServer.getMyScore(req.params.address.toLowerCase())
    //console.log(score)
    res.send(score)
  }
})


app.post('/api/myBets', async (req, res) => {
  console.log('POST /api/myBets')
  console.log(req.body)
  betsInfos=await apiServer.getMyBets(req.body.listBets)
  console.log(betsInfos)
  res.send(betsInfos)
})

app.post('/api/myRecentsBets', async (req, res) => {
  console.log('POST /api/myRecentsBets')

  res.send(await apiServer.getMyRecentsBets(req.body.listBets))
})

app.get('/api/myP2PBets/:address', async (req, res) => {
  console.log('GET /api/myP2PBets/'+req.params.address)

  res.send(await apiServer.getMyP2PBets(req.params.address))
})


app.use(express.static("./app/build/"))

app.get('/static/:dir/:file', (req, res) => {
  console.log('GET /static/'+ req.params.dir + "/" + req.params.file)

  res.sendFile(__dirname + "/app/build/static/" + req.params.dir + "/" + req.params.file)
})



app.get('/*', (req, res) => {
  logger.red('GET /')
  console.log(req.useragent.isMobile)
  if(req.useragent.isMobile){
    res.sendFile(__dirname + "/app/mobile.html")
  }
  res.sendFile(__dirname + "/app/build/index.html");
});

