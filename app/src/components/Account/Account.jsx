import React from "react";
import Authentification from "../Authentification/Authentification";
import { Link, Outlet } from "react-router-dom";
import MyFriends from "../MyFriends/MyFriends";
var __mounted;

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      myPseudo: undefined,
      dataPerso: undefined,
      newPseudo: "",
      newFriend: undefined,
      requests: undefined
    };
    this.setPseudoReact = this.setPseudoReact.bind(this);
    this.sendFriendRequestReact = this.sendFriendRequestReact.bind(this);
    this.answerRequestReact = this.answerRequestReact.bind(this);
  }
  render() {
    return (
      <div className="mainContent">
        <p>
          Hi {this.state.loaded ? this.state.dataPerso[0].pseudo : ""} !
        </p>
        <input type="text" value={this.state.newPseudo} onChange={(e) => this.setState({ newPseudo: e.target.value })}></input>
        <button onClick={(event) => { this.setPseudoReact(this.state.newPseudo) }}>change Pseudo</button>
        <Authentification web3={this.props.web3} address={this.props.address}></Authentification>
        <p>Friends</p>
        <input type="text" value={this.state.newFriend} onChange={(e) => this.setState({ newFriend: e.target.value })}></input>
        <button onClick={(event) => { this.sendFriendRequestReact(this.state.newFriend) }}>Add friend</button>
        <p>Requests</p>

        <div>
          {this.state.requests !== undefined ?
            this.state.requests.map(function (item) {
              return (<div key={item.dateRequest} className="requestDiv">
                <p>From {item.address1}</p>
                <p>object {item.header}</p>
                <p>date {item.dateRequest}</p>
                <button onClick={(event) => { //e is undefined
                  answerRequest(
                    { "head": "newFriend", "id": item.id, "newFriend": item.address1 }
                  )
                }
                }
                >
                  Accept</button>
              </div>
              );
            }) : null}
        </div>
        <MyFriends address={this.props.address}></MyFriends>
      </div>
    );
  }
  setPseudoReact(newPseudo) {
    setPseudo(newPseudo)
  }
  sendFriendRequestReact(newFriend) {
    sendFriendRequest(newFriend)
  }
  answerRequestReact(args) {
    answerRequest(args)
  }
  componentDidMount() {
    __mounted = true;
  }
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props && this.state.loaded === false && this.props.address !== undefined) {

      this.setState({ address: this.props.address.toLowerCase() });
      let link = "http://localhost:4000/api/score/" + this.props.address.toLowerCase();
      console.log(link);
      fetch(link, { method: "GET" }).then((res) => {
        res.json().then((data) => {
          //console.log(data[0]);
          if (this.state.loaded !== true) { this.setState({ loaded: true, dataPerso: data }); }
          // todo mettre le claseement de laddresse connectée
        });
      });

    }
    if (prevProps !== this.props && this.state.loaded === false && this.props.address !== undefined) {

      this.setState({ address: this.props.address.toLowerCase() });
      let link = "http://localhost:4000/api/myrequests"
      fetch(link, { method: "GET" }).then((res) => {
        res.json().then((data) => {
          if (this.state.requests === undefined) { this.setState({ requests: data }); }
        });
      });

    }
  }

}

async function setPseudo(newPseudo) {
  if (__mounted) {
    let url = "http://localhost:4000/api/setUpPseudo/";
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

async function sendFriendRequest(newFriend) {
  if (__mounted) {
    let url = "http://localhost:4000/api/sendFriendRequest/";
    let bodyToSend = JSON.stringify({
      "head": "newFriend",
      "newFriend": newFriend,
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
async function answerRequest(args) {
  if (__mounted) {
    let url = "http://localhost:4000/api/answerRequest/";
    console.log(args)
    console.log(args.head)

    let bodyToSend = JSON.stringify(
      args
    );
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