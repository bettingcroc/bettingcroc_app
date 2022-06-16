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
    await getNonce(this.props.address).then(async (nonce)=>{await requestLogin(nonce.nonce, this.props.web3, this.props.address);})
  }
  async testLoginReact(){
    await testLogin()
  }
  async logoutReact(){
    await logout()
  }
  render() {
    return (
      <div>
        <h3> Authentification Component</h3>
        <button
          onClick={(event) => {
            this.getNonceReact(this.props.address);
          }}
        >
          Request my nonce
        </button>
        <button onClick={this.signNonceReact}>Sign Nonce</button>
        <button onClick={this.requestLoginReact}>Login</button>
        <button onClick={this.testLoginReact}>testLogin</button>
        <button onClick={this.logoutReact}>LogOut</button>
      </div>
    );
  }
  componentDidMount() {
    __mounted = true;
  }
}

export default Authentification;

/*async function changePseudo(newPseudo) {
	let url = 'api/users/' + myaddress;
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
    let url = "http://localhost:4000/api/users/" + address;
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
    fetch(url, options).then((res) => {
      console.log("done");
    });
  }
}
async function testLogin(){
  if (__mounted) {
    let url = "http://localhost:4000/testlogin";
    
    console.log(url);
    let options = {
      method: "GET",
    };
    fetch(url, options).then((res) => {
      console.log("done");
    });
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