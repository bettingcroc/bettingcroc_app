const express = require('express')
const model = require('./model')
var cors = require('cors')
const users = require('./users')
const apiServer = require('./apiServer')
const app = express()
const port = process.env.PORT || 4000;
const bodyParser = require('body-parser');
const session = require('express-session')
const generateurHTMLBet = require('./htmlGenerateur.js');
app.use(session({
  "secret": "zgkijngzjigizg244515FGFG"
  }))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
const cons = require('consolidate'); // template engine
app.engine('html', cons.mustache);
app.set('view engine', 'html');
app.set('views', __dirname + '\\html');
app.use(express.json())
const view = require('./view_templates');
app.use(express.static('../public'));
app.use(express.static('../node_modules/web3/dist'))
app.use(express.static('../node_modules/@metamask/detect-provider/dist'))

app.get('/' , async(req,res)=>{
    const indexHTML = await generateurHTMLBet.indexHTMLGenerator();
    res.send(indexHTML);
    console.log('index loaded');
});
//TODO add plyaer

app.get('/bet/:betNumber', async(req, res) => {
    
    if(req.params.betNumber>model.get_MaxBet()){
      res.redirect('/');
    }
    else{
    const betHTML= await generateurHTMLBet.betHTMLGenerator(req.params.betNumber,model.get_Name(req.params.betNumber),model.get_Options(req.params.betNumber),model.get_List(req.params.betNumber));
    res.send(betHTML);
    log("bet page "+req.params.betNumber+" loaded");}
});

app.get('/basketball' , async(req,res)=>{
  const basketballHTML= await generateurHTMLBet.typeHTMLGenerator('basketball');
  res.send(basketballHTML);
  console.log('basketball page loaded');
})

app.get('/basketball/:league' , async(req,res)=>{
  const basketballHTML= await generateurHTMLBet.typeLeagueHTMLGenerator('basketball',req.params.league);
  res.send(basketballHTML);
  console.log('basketball'+req.params.league+' page loaded');
})

app.get('/football/' , async(req,res)=>{
  const footballHTML= await generateurHTMLBet.typeHTMLGenerator('football');
  res.send(footballHTML);
  console.log('football page loaded');
})

app.get('/football/:league',async(req,res)=>{
  const footballHTML= await generateurHTMLBet.typeCountryHTMLGenerator('football',req.params.league);
  res.send(footballHTML);
  console.log('football '+req.params.league+' page loaded');
  
});

app.get('/admin', (req,res) => {
    view.render(res,'admin.html');
    log("admin loaded");
    model.update_Scores();
})

app.post('/add_bet',(req,res)=>{
    model.add_bet(req.body.lastBetToDB,req.body.nameBetToDB,req.body.optionToDB,req.body.listOptionToDB);
    console.log("ajout db");
    res.redirect('/admin');
})

app.post('/register',(req,res)=>{
  console.log("address= "+ req.body.addressPure);
  model.add_player(req.body.addressPure);
  res.redirect('/classement');
})

app.get('/p2p',(req,res)=>{
  view.render(res,'p2p.html');
})

app.get('/classement' , async(req,res)=>{
  const classementHTML= await generateurHTMLBet.classementHTMLGenerator();
  res.send(classementHTML);
  console.log('classement page loaded');
})

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
function log(log){console.log(log)}