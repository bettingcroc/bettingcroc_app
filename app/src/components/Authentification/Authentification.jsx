import React from "react";
import loggedImage from "../Authentification/logged.png"
var __mounted;
class Authentification extends React.Component {
  constructor(props) {
    super(props);
    this.getNonceReact = this.getNonceReact.bind(this);
    this.signNonceReact = this.signNonceReact.bind(this);
    this.requestLoginReact = this.requestLoginReact.bind(this);
    this.testLoginReact = this.testLoginReact.bind(this);
    this.logoutReact=this.logoutReact.bind(this);
    this.state={
      logged:false
    }
  }
  async getNonceReact(address) {
    console.log("trying request 1");
    await getNonce(address).then(console.log)
    console.log("/|")
  }
  async signNonceReact() {
    await signNonce("ewww", this.props.web3, this.props.address); //FINIR AUTHENTIFICATION VIA NONCE SIGNED
  }
  async requestLoginReact() {
    console.log(this.props.address)
    await getNonce(this.props.address)
    .then(async (nonce)=>{await requestLogin(nonce.nonce, this.props.web3, this.props.address)
      .then((ew)=>{console.log(ew);this.testLoginReact()})
    })
    
  }
  async testLoginReact(){
    await testLogin().then((res)=>{
      console.log("res "+res)
      if(res.isLogged===true){this.props.setLogged(true)}
      else{this.props.setLogged(false)}
    })
  }
  async logoutReact(){
    await logout().then((lol)=>{this.testLoginReact()})
  }
  render() {
    return (
      <div className="mainContent">
        {!this.props.logged?<button className='generalsButton' onClick={this.requestLoginReact}><p className="buttonP">Login</p></button>:<img src={loggedImage} alt="loggedImage" id="loggedImage"></img>}
        
        {/*<button onClick={this.logoutReact}>LogOut</button> <h4>{this.props.logged}</h4>*/}
        
      </div>
    );
  }
  componentDidMount() {
    __mounted = true;
    this.testLoginReact();
  }
}

export default Authentification;


async function getNonce(address) {
  console.log("trying request nonce");
  let toReturn="ewe"
  if (__mounted && address !== "") {
    let url = "http://localhost:4000/api/nonce/" + address;
    //console.log(url);
    let options = { method: "GET" };
    await new Promise(next =>{ fetch(url, options).then((res) => {
      res.json().then((data) => {
        //console.log(data);
        toReturn= data;
        next()
      });
    });
  })
}
  return toReturn
}
async function signNonce(nonce, web3, address) {
  var hex = ''
      for (var i = 0; i < nonce.length; i++) {
        hex += '' + nonce.charCodeAt(i).toString(16)
      }
  var hexMessage = "0x" + hex
  console.log(hexMessage)
  var toReturn="";
  await web3.eth.personal.sign(
    hexMessage,
    address,
    
  ).then((result)=>{console.log("signedNonce: ", result);
  toReturn= result;})
  console.log("before sign "+web3.utils.sha3(nonce)+" signed "+toReturn)
  return toReturn
}

async function requestLogin(nonce, web3, address) {
  let signedNonce = await signNonce(nonce, web3, address);
  console.log("trying login request with "+signedNonce);
  if (__mounted && address !== "") {
    let url = "http://localhost:4000/login";
    let bodyToSend = JSON.stringify({
      signedNonce: signedNonce,
      address: address,
    });
    console.log(url);
    let options = {
      method: "POST",
      body: bodyToSend,
      headers: {
        "Content-Type": "application/json",
      },
    };
    await new Promise(next =>{
    fetch(url, options).then((res) => {
      console.log("done");
      next()
    });})
    console.log("end function")
    return("done2")
  }
}
async function testLogin(){
  if (__mounted) {
    let url = "http://localhost:4000/api/testlogin";
    
    console.log(url);
    let options = {
      method: "GET",
    };
    let result
    await new Promise(next =>{fetch(url, options).then((res) => {
      res.json().then((data) => {
        console.log(data)
        result=data
        next()
      })
      
      
    });})
    
    return result
  }
}
async function logout(){
  if (__mounted) {
    let url = "http://localhost:4000/logout";
    
    console.log(url);
    let options = {
      method: "POST",
    };
    fetch(url, options).then((res) => {
      console.log("done");
    });
  }
}