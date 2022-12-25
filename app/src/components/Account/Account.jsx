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
      requests: undefined,
      logged: "not logged",
      friends: undefined,
      messageAddFriend: null,
      cssmessageAddFriend: null
    };
    this.setPseudoReact = this.setPseudoReact.bind(this);
    this.sendFriendRequestReact = this.sendFriendRequestReact.bind(this);
    this.answerRequestReact = this.answerRequestReact.bind(this);
    this.setLogged = this.setLogged.bind(this);
    this.setFriendsList = this.setFriendsList.bind(this);
    this.updateRequests = this.updateRequests.bind(this)
  }
  render() {
    return (
      <div className="mainContent">
        <p>
          Hi {this.state.loaded ? this.state.dataPerso[0].pseudo : ""} !
        </p>
        <input type="text" value={this.state.newPseudo} onChange={(e) => this.setState({ newPseudo: e.target.value })}></input>
        <button onClick={(event) => { this.setPseudoReact(this.state.newPseudo) }}>change Pseudo</button>
        <Authentification web3={this.props.web3} address={this.props.address} setLogged={this.setLogged}></Authentification>
        <p>Friends</p>
        <input type="text" value={this.state.newFriend} onChange={(e) => this.setState({ newFriend: e.target.value })}></input>
        <button onClick={(event) => { this.sendFriendRequestReact(this.state.newFriend) }}>Add friend</button>
        <p id={this.state.cssmessageAddFriend}>{this.state.messageAddFriend}</p>
        <p>Requests</p>

        <div>
          {this.state.requests !== undefined ?
            this.state.requests.map( (item) =>{
              return (<div key={item.dateRequest} className="requestDiv">
                <p>From {item.address1}</p>
                <p>object {item.header}</p>
                <p>date {item.dateRequest}</p>
                <button onClick={(event) => { //e is undefined
                  this.answerRequestReact(
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
        <MyFriends address={this.props.address} logged={this.state.logged} setFriendsList={this.setFriendsList}></MyFriends>
      </div>
    );
  }
  setPseudoReact(newPseudo) {
    setPseudo(newPseudo)
  }
  sendFriendRequestReact(newFriend) {
    console.log(this.state.friends)
    for (let add in this.state.friends) {
      if (newFriend === this.state.friends[add].address2) {
        this.setState({ messageAddFriend: "Already friend with " + newFriend })
        this.setState({ cssmessageAddFriend: "messageAddFriend1" })
        return
      }
    }
    sendFriendRequest(newFriend)
    this.setState({ messageAddFriend: "Invitation sent to " + newFriend })
    this.setState({ cssmessageAddFriend: "messageAddFriend2" })
    return
  }
  answerRequestReact(args) {
    answerRequest(args)
    this.updateRequests()
  }
  componentDidMount() {
    __mounted = true;

    testLogin().then((res) => {
      console.log("res " + res)
      if (res.isLogged === true) { this.setState({ logged: "logged" }) }
      else { this.setState({ logged: "not logged" }) }
    })

  }
  setLogged() {
    this.setState({ logged: "logged" })
    console.log("loggin from authentification")
  }
  setFriendsList(friends) {
    this.setState({ friends: friends })
  }
  updateRequests() {
    console.log("update requests")
    let link2 = "http://localhost:4000/api/myrequests"
    fetch(link2, { method: "GET" }).then((res) => {
      res.json().then((data) => {
        console.log(data)
        this.setState({ requests: data });
      });
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if ((prevProps !== this.props && this.state.loaded === false && this.props.address !== undefined) || prevState.logged !== this.state.logged) {

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
      if (this.state.logged === "logged") {
        let link2 = "http://localhost:4000/api/myrequests"
        fetch(link2, { method: "GET" }).then((res) => {
          res.json().then((data) => {
            if (this.state.requests === undefined) { this.setState({ requests: data }); }
          });
        });
      }

    }
    if ((prevProps !== this.props && this.state.loaded === false && this.props.address !== undefined) || prevState.logged !== this.state.logged) {

      /*this.setState({ address: this.props.address.toLowerCase() });
      let link = "http://localhost:4000/api/myrequests"
      fetch(link, { method: "GET" }).then((res) => {
        res.json().then((data) => {
          if (this.state.requests === undefined) { this.setState({ requests: data }); }
        });
      });*/

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
async function testLogin() {
  if (__mounted) {
    let url = "http://localhost:4000/api/testlogin";

    console.log(url);
    let options = {
      method: "GET",
    };
    let result
    await new Promise(next => {
      fetch(url, options).then((res) => {
        res.json().then((data) => {
          console.log(data)
          result = data
          next()
        })


      });
    })

    return result
  }
}

export default Account;