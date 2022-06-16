const express = require('express')
const model = require('./model')
var cors = require('cors')
const users = require('./users')
const apiServer = require('./apiServer')
const app = express()
const port = process.env.PORT || 4000;
const session = require('express-session')
app.use(session({
  "secret": "zgkijngzjigizg244515FGFG"
  }))

app.use(cors())
app.use(express.json())

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/classement/api/position/:address', (req,res)=>{ //TODO inclure rank dans react
  let position=users.get_Classement_address(req.params.address);
  //console.log(position===undefined)
  if(position===undefined){
    users.addUser(req.params.address);
    position=users.get_Classement_address(req.params.address);
    console.log("position request "+ position)
    res.send({address:'unknown',score:'unknown',position:'unknown'})

  }
  else{
    res.send(position);
  }
})

/*app.get('/api/position/:address', (req,res)=>{
  let position=model.get_Classement_address(req.params.address);
  console.log("position"+position);
  res.send(position);
})*/

app.get('/api/users/:address',(req,res)=>{
  console.log("requesting a nonce")
  let nonce=users.getNonce(req.params.address);
  if(nonce===0){
    users.addUser(req.params.address);
    console.log("user not registered")
  }
  nonce=users.getNonce(req.params.address);
  console.log(nonce)
  res.send({'nonce':nonce})
})

app.post('/login',(req,res)=>{
  console.log("nonce signed "+req.body.signedNonce)
  console.log("address "+req.body.address)
  let nonce=users.getNonce(req.body.address)
  console.log("nonce "+nonce)
  console.log("signer : "+users.recover(nonce,req.body.signedNonce))
  if(users.recover(nonce,req.body.signedNonce).toLowerCase()===req.body.address.toLowerCase()){
    console.log("logging in "+req.body.address)
    req.session.logged=true
    req.session.address=users.recover(nonce,req.body.signedNonce)
  }
  res.send("login")
})
app.post('/logout',(req,res)=>{
  req.session.logged=false
  req.session.address=undefined
  res.send("ok")
})
app.get('/testLogin',(req,res)=>{
  if(req.session.logged===true){
    res.send("logged")
  }
  else{
    res.send(req.session.logged,807)
  }
})

app.post('/classement/api/setUpPseudo/:address&:signedData&:pseudo',(req,res)=>{
  console.log('new pseudo')
  console.log("params address: ",req.params.address)
  console.log("params signedData : ",req.params.signedData)
  users.verifySignature(req.params.address,req.params.signedData,req.params.pseudo)
  res.redirect('/classement')
})

app.get('/lastbets',(req,res)=>{
  res.send(apiServer.getTodayMatches())
})
app.get('/infoMatch/:id',(req,res)=>{
  res.send(apiServer.getMatchInfo(req.params.id))
})
app.get('/classementApi',(req,res)=>{
  res.send(apiServer.get10MaxScore())
})
app.get('/scoreApi/:address',(req,res)=>{
  res.send(apiServer.getMyScore(req.params.address))
})
app.get('/myBets/:address',async (req,res)=>{
  res.send(await apiServer.getMyBets(req.params.address))
})

app.use(express.static("./app/build/"))

app.get('/static/:dir/:file',(req,res)=>{
    res.sendFile(__dirname +"/app/build/static/"+req.params.dir+"/"+req.params.file)
})



app.get('/*', (req, res) => {
    res.sendFile(__dirname + "/app/build/index.html");
});