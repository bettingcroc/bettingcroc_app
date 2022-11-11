import React from "react";
import { Link, Outlet } from "react-router-dom";
var __mounted;

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      myPseudo: undefined,
      dataPerso: undefined,
      newPseudo: ""
    };
    this.setPseudoReact = this.setPseudoReact.bind(this)
  }
  render() {
    return (
      <div className="mainContent">
        <h4>Account Component</h4>
        <h3>
          my pseudo is {this.state.loaded ? this.state.dataPerso[0].pseudo : ""}
        </h3>
        <input type="text" value={this.state.newPseudo} onChange={(e) => this.setState({ newPseudo: e.target.value })}></input>
        <button onClick={(event) => { this.setPseudoReact(this.state.newPseudo) }}>change Pseudo</button>
        <Link to="/mybets"><h3>myBets</h3></Link>
        <Link to="/authentification"><h3>authentification</h3></Link>
      </div>
    );
  }
  setPseudoReact(newPseudo) {
    setPseudo(newPseudo)
  }
  componentDidMount() {
    /*if (this.props.address !== "") {
      this.setState({ address: this.props.address.toLowerCase() });
      let link = "https://testnet.bettingcroc.com/api/score/" + this.props.address;
      console.log(link);
      fetch(link, { method: "GET" }).then((res) => {
        res.json().then((data) => {
          console.log(data[0].position);
          this.setState({ loaded: true, dataPerso: data }); // todo mettre le claseement de laddresse connectée
        });
      });
    }*/

    __mounted = true;

  }
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props && this.state.loaded === false) {
      if (this.props.address !== "") {
        this.setState({ address: this.props.address.toLowerCase() });
        let link = "https://testnet.bettingcroc.com/api/score/" + this.props.address;
        console.log(link);
        fetch(link, { method: "GET" }).then((res) => {
          res.json().then((data) => {
            console.log(data[0]);
            this.setState({ loaded: true, dataPerso: data }); // todo mettre le claseement de laddresse connectée
          });
        });
      }
    }
  }

}

async function setPseudo(newPseudo) {
  if (__mounted) {
    let url = "https://testnet.bettingcroc.com/api/setUpPseudo/";
    let bodyToSend = JSON.stringify({
      "newPseudo": newPseudo,
    });
    let options = {
      method: "POST",
      body: bodyToSend,
      headers: {
        "Content-Type": "application/json",
      },
    };
    await new Promise(next => {
      fetch(url, options).then((res) => {
        console.log("done " + res.status);
        next()
      });
    })
    console.log("end function")
    return ("done2")
  }
}

export default Account;