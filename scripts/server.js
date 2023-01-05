const express = require('express')
const model = require('./model')
var cors = require('cors')
const users = require('./users')
const apiServer = require('./apiServer')
const app = express()
const port = process.env.PORT || 4000;
const session = require('express-session')
var topBets = {};
updateTopBets()
function updateTopBets() {
  //console.log("update")
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

app.listen(port, () => {
  console.log(`Bettingcroc application listening on port ${port}`)
})

app.get('/api/position/:address', (req, res) => {
  address = req.params.address.toLowerCase()
  console.log(address)
  let position = users.get_Classement_address(address);
  if (position === undefined) {
    users.addUser(address);
    position = users.get_Classement_address(address);
    console.log("position request " + position)
    res.send({ address: 'unknown', score: 'unknown', position: 'unknown' })

  }
  else {
    res.send(position);
  }
})


app.get('/api/nonce/:address', async (req, res) => {
  req.session.nonce = users.newNonce(req.params.address)
  res.send({ 'nonce': req.session.nonce })
})

app.post('/login', (req, res) => {
  console.log("nonce signed " + req.body.signedNonce)
  console.log("address " + req.body.address)
  let nonce = req.session.nonce
  console.log("nonce " + nonce)
  console.log("signer : " + users.recover(nonce, req.body.signedNonce))
  if (users.recover(nonce, req.body.signedNonce).toLowerCase() === req.body.address.toLowerCase()) {
    console.log("logging in " + req.body.address)
    req.session.logged = true
    req.session.address = users.recover(nonce, req.body.signedNonce).toLowerCase()
  }
  let position = users.get_Classement_address(req.params.address.toLowerCase());
  if (position === undefined) {
    users.addUser(req.params.address);
  }
  res.send("login")
})

app.post('/logout', (req, res) => {
  req.session.logged = false
  req.session.address = undefined
  res.send("ok")
})
app.get('/api/testLogin', (req, res) => {
  res.send({ isLogged: req.session.logged })
})
app.post('/api/setUpPseudo/', (req, res) => {
  if (req.session.logged === true) {
    console.log(req.body.newPseudo, " ", req.session.address)
    users.setPseudo(req.body.newPseudo, req.session.address)
    res.status(200).send()
  }
  else {
    console.log("not logged")
    res.status(401).send()
  }
})

app.post('/api/sendFriendRequest/', (req, res) => {
  if (req.session.logged === true) {
    if (req.body.head === "newFriend") {
      if (users.areUsersFriends(req.session.address, req.body.newFriend.toLowerCase())) {
        console.log("already friends")
        res.status(401).send()
      }
      else {
        console.log(req.body, " from ", req.session.address)
        users.newFriendRequest(req.body, req.session.address)
        res.status(200).send()
      }
    }
    else {
      if (users.areUsersFriends(req.session.address, req.body.newFriend.toLowerCase())) {
        console.log(req.body, " from ", req.session.address)
        users.newFriendRequest(req.body, req.session.address)
        res.status(200).send()
      }
      else {
        console.log("not friends")
        res.status(401).send()
      }
    }
    /*console.log(req.body, " from ", req.session.address)
    users.newFriendRequest(req.body, req.session.address)
    res.status(200).send()*/
  }
  else {
    console.log("not logged")
    res.status(401).send()
  }
})

app.post('/api/answerRequest/', (req, res) => {
  if (req.session.logged === true) {
    console.log(req.body, " from ", req.session.address)
    users.answerRequest(req.body, req.session.address)
    res.status(200).send()
  }
  else {
    console.log("not logged")
    res.status(401).send()
  }
})

app.post('/api/removeFriend/', (req, res) => { //
  if (req.session.logged === true) {
    console.log(req.body, " from ", req.session.address)
    users.removeFriend(req.body, req.session.address)
    res.status(200).send()
  }
  else {
    console.log("not logged")
    res.status(401).send()
  }
})

app.get('/api/myrequests', (req, res) => {
  if (req.session.logged === true) {
    res.send(apiServer.getMyRequests(req.session.address))
  }
  else {
    console.log("not logged")
    res.status(401).send()
  }
})

app.get('/api/myfriends', (req, res) => {
  if (req.session.logged === true) {
    res.send(apiServer.getMyFriends(req.session.address))
  }
  else {
    console.log("not logged")
    res.status(401).send()
  }
})

app.get('/api/lastbets', (req, res) => {
  res.send(apiServer.getTodayMatches())
})
app.get('/api/topBets', async (req, res) => {
  console.log(topBets)
  res.send(topBets)
})
app.get('/api/infoMatch/:id', (req, res) => {
  res.send(apiServer.getMatchInfo(req.params.id))
})
app.get('/api/classement', (req, res) => {
  res.send(apiServer.get10MaxScore())
})
app.get('/api/score/:address', (req, res) => {
  address = req.params.address.toLowerCase()
  console.log(address)
  let position = users.get_Classement_address(address);
  console.log(position)
  if (position === undefined) {
    users.addUser(address);
    position = users.get_Classement_address(address);
    console.log("position request " + position)
    score = apiServer.getMyScore(req.params.address.toLowerCase())
    console.log(score)
    res.send(score)

  }
  else {
    score = apiServer.getMyScore(req.params.address.toLowerCase())
    console.log(score)
    res.send(score)
  }
})
app.get('/api/myBets/:address', async (req, res) => {
  res.send(await apiServer.getMyBets(req.params.address))
})
app.get('/api/myP2PBets/:address', async (req, res) => {
  res.send(await apiServer.getMyP2PBets(req.params.address))
})


app.use(express.static("./app/build/"))

app.get('/static/:dir/:file', (req, res) => {
  res.sendFile(__dirname + "/app/build/static/" + req.params.dir + "/" + req.params.file)
})



app.get('/*', (req, res) => {
  res.sendFile(__dirname + "/app/build/index.html");
});
