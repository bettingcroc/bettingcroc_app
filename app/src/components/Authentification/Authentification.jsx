import React from "react";
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
      logged:"not logged"
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
    await getNonce(this.props.address)
    .then(async (nonce)=>{await requestLogin(nonce.nonce, this.props.web3, this.props.address)
      .then((ew)=>{console.log(ew);this.testLoginReact()})
    })
    
  }
  async testLoginReact(){
    await testLogin().then((res)=>{
      console.log("res "+res)
      if(res.isLogged===true){this.setState({logged:"logged"})}
      else{this.setState({logged:"not logged"})}
    })
  }
  async logoutReact(){
    await logout().then((lol)=>{this.testLoginReact()})
  }
  render() {
    return (
      <div className="mainContent">
        <h3> Authentification Component</h3>
        {/*<button
          onClick={(event) => {
            this.getNonceReact(this.props.address);
          }}
        >
          Request my nonce
        </button>
        <button onClick={this.signNonceReact}>Sign Nonce</button>
        <button onClick={this.testLoginReact}>testLogin</button>
      */}
        <button onClick={this.requestLoginReact}>Login</button>
        <button onClick={this.logoutReact}>LogOut</button>
        <h4>{this.state.logged}</h4>
      </div>
    );
  }
  componentDidMount() {
    __mounted = true;
    this.testLoginReact();
  }
}

export default Authentification;

/*async function changePseudo(newPseudo) {
	let url = 'api/nonce/' + myaddress;
	options = { 'method': 'GET' }
	fetch(url, options).then(
	  (res) => {
		res.json().then((data) => {
		  console.log("address: "+myaddress)
		  console.log("Nonce: "+ data.nonce)
		  web3.eth.personal.sign(web3.utils.sha3(data.nonce), myaddress, function (err, result) {
			console.log("signedNonce: ", result)
			//web3.eth.personal.ecRecover(web3.utils.sha3(data.nonce),result).then((result2)=>console.log("signer: "+result2))
			//.then((result2)=>console.log("signer: "+result2))
			let url2= 'api/setUpPseudo/'+myaddress+"&"+result+"&"+newPseudo
			let options2 = { 'method': 'POST' }
			fetch(url2,options2)
			.then(
			  //console.log('done')
			)

		  })
	
		  setTimeout(closeForm,1000)
		}
		)
	  },
	  (error) => { console.log(error) }
	)
  }*/

async function getNonce(address) {
  console.log("trying request nonce");
  let toReturn="ewe"
  if (__mounted && address !== "") {
    let url = "https://app.bettingcroc.com/api/nonce/" + address;
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
  var toReturn="ew";
  await web3.eth.personal.sign(
    web3.utils.sha3(nonce),
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
    let url = "https://app.bettingcroc.com/login";
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
    let url = "https://app.bettingcroc.com/api/testlogin";
    
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
    let url = "https://app.bettingcroc.com/logout";
    
    console.log(url);
    let options = {
      method: "POST",
    };
    fetch(url, options).then((res) => {
      console.log("done");
    });
  }
}