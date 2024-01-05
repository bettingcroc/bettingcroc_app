import React, { useEffect } from "react";
import loggedImage from "../Authentification/logged.png"
import { MY_SERVER } from "../../consts"

function Authentification(props) {
  useEffect(() => { testLogin() }, [])

  async function getNonce(address) {
    console.log("trying request nonce");
    let nonce = ""
    if (address !== "") {
      let url = MY_SERVER + "/api/nonce/" + address;
      let options = { method: "GET" ,
      credentials: 'include'};
      await new Promise(next => {
        fetch(url, options).then((res) => {
          res.json().then((data) => {
            nonce = data;
            next()
          });
        });
      })
    }
    return nonce
  }

  async function testLogin() {
    let url = MY_SERVER + "/api/testlogin";
    let options = {
      method: "GET",
      credentials: 'include'
    };
    fetch(url, options).then((res) => {
      res.json().then((data) => {
        if (data.isLogged === true) { props.setLogged(true) }
        else { props.setLogged(false) }
      })
    });
  }

  async function login() {
    await getNonce(props.address)
      .then(async (nonce) => {
        await requestLogin(nonce.nonce, props.web3, props.address)
          .then((res) => { console.log(res); testLogin() })
      })

  }

  async function signNonce(nonce, web3, address) {
    var hex = ''
    for (var i = 0; i < nonce.length; i++) {
      hex += '' + nonce.charCodeAt(i).toString(16)
    }
    var hexMessage = "0x" + hex
    console.log(hexMessage)
    var toReturn = "";
    await web3.eth.personal.sign(
      hexMessage,
      address,

    ).then((result) => {
      console.log("signedNonce: ", result);
      toReturn = result;
    })
    console.log("before sign " + web3.utils.sha3(nonce) + " signed " + toReturn)
    return toReturn
  }

  async function requestLogin(nonce, web3, address) {
    let signedNonce = await signNonce(nonce, web3, address);
    console.log("trying login request with " + signedNonce);
    if (address !== "") {
      let url = MY_SERVER + "/login";
      let options = {
        method: "POST",
        body: JSON.stringify({
          signedNonce: signedNonce,
          address: address,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include'
      };
      await new Promise(next => {
        fetch(url, options).then((res) => {
          console.log("done");
          next()
        });
      })
      console.log("end function")
      return ("done2")
    }
  }

  return (
    <div>
      {!props.logged ?
        <button className='generalsButton' onClick={login}>
          <p className="buttonP">Login</p>
        </button> :
        <img src={loggedImage} alt="loggedImage" id="loggedImage"></img>}
    </div>
  )

}

export default Authentification;



