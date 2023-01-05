import React from "react";
import Authentification from "../Authentification/Authentification";
import { Link, Outlet } from "react-router-dom";
import MyFriends from "../MyFriends/MyFriends";
var __mounted;

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataPersoloaded: false,
      loaded: false,
      myPseudo: undefined,
      dataPerso: undefined,
      newPseudo: "",
      newFriend: undefined,
      requests: undefined,
      logged: false,
      friends: [{ "address2": "0xb215c8f61e33ec88b033670049417fa8258236de", "pseudo": "Account7" }, { "address2": "0x1c49a4b38422269c0315d42b03dee99929a4a1ce", "pseudo": "MetaMobile3" }, { "address2": "0xb2af31ce8c58adbfb29bcfe2cd1838b959d0cf7e", "pseudo": "CoinBase1" }],
      messageAddFriend: null,
      cssmessageAddFriend: null
    };
    this.setPseudoReact = this.setPseudoReact.bind(this);
    this.sendFriendRequestReact = this.sendFriendRequestReact.bind(this);
    this.answerRequestReact = this.answerRequestReact.bind(this);
    this.setLogged = this.setLogged.bind(this);
    this.setFriendsList = this.setFriendsList.bind(this);
    this.updateRequests = this.updateRequests.bind(this);
    this.updateFriends = this.updateFriends.bind(this);
  }
  render() {
    return (
      <div className="mainContentAccount">
        <p id="hiUser">
          Hi {this.state.loaded && this.state.dataPerso !== undefined ? this.state.dataPerso[0].pseudo : ""} !
        </p>
        <div id="friendsDiv">
          <p className="headerTitle accountP">Friends</p>
          <div id="friendAdder">
            <input id="addFriendInput" type="text" value={this.state.newFriend} onChange={(e) => this.setState({ newFriend: e.target.value })}></input>
            <button id="addFriendButton" onClick={(event) => { this.sendFriendRequestReact(this.state.newFriend) }}>Add friend</button>
          </div>

          <p id={this.state.cssmessageAddFriend}>{this.state.messageAddFriend}</p>
          <MyFriends updateFriends={this.updateFriends} myFriends={this.state.friends} address={this.props.address} logged={this.state.logged} setFriendsList={this.setFriendsList}></MyFriends></div>
        <div id="requestSuperDiv">
          <p className="headerTitle accountP">Notifications</p>

          <div>
            {this.state.requests !== undefined ?
              this.state.requests.map((item) => {
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
          </div>

        <div id="changePseudoDiv">
          <input type="text" value={this.state.newPseudo} onChange={(e) => this.setState({ newPseudo: e.target.value })}></input>
          <button onClick={(event) => { this.setPseudoReact(this.state.newPseudo) }}>change Pseudo</button>
        </div>
        <Authentification web3={this.props.web3} address={this.props.address} setLogged={this.setLogged}></Authentification>



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
    this.updateFriends()
  }
  componentDidMount() {
    __mounted = true;

    testLogin().then((res) => {
      console.log("res " + res)
      if (res.isLogged === true) { this.setState({ logged: true }) }
      else { this.setState({ logged: false }) }
    })

  }
  setLogged() {
    this.setState({ logged: true })
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
  updateFriends() {
    console.log("updateFriends")
    let link = "http://localhost:4000/api/myfriends/"
    fetch(link, { method: "GET" }).then((res) => {
      res.json().then((data) => {
        console.log(data)
        this.setState({ friends: data });
      });
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if ((prevProps !== this.props && this.state.dataPersoloaded === false && this.props.address !== undefined)) {
      let link = "http://localhost:4000/api/score/" + this.props.address.toLowerCase();
      fetch(link, { method: "GET" }).then((res) => {
        res.json().then((data) => {
          if (this.state.dataPersoloaded !== true) { this.setState({ dataPerso: data, loaded: true }); }
        });
      });
    }

    if ((prevProps !== this.props && this.props.address !== undefined) || (prevState.logged !== this.state.logged && this.props.address !== undefined)) {


      if (this.state.logged) {
        let link2 = "http://localhost:4000/api/myrequests"
        console.log(link2)
        fetch(link2, { method: "GET" }).then((res) => {
          res.json().then((data) => {
            console.log(data)
            if (this.state.requests === undefined) { this.setState({ requests: data }); }
          });
        });
        let link3 = "http://localhost:4000/api/myfriends/"
        console.log(link3)
        fetch(link3, { method: "GET" }).then((res) => {
          res.json().then((data) => {
            console.log(data)
            if (this.state.friends === undefined) { this.setState({ friends: data }); }
            console.log("this.state.friends")
            console.log(this.state.friends)
            console.log("this.state.friends")
          });
        });
      }
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