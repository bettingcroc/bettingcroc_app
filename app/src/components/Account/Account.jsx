import React from "react";
import Authentification from "../Authentification/Authentification";
import { Link, Outlet } from "react-router-dom";
import MyFriends from "../MyFriends/MyFriends";
import MyRequests from "../MyRequests/MyRequests";
import MyBets from "../MyBets/MyBets";
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
      newFriend: "",
      requests: undefined,
      logged: false,
      friends: undefined,
      messageAddFriend: null,
      cssmessageAddFriend: null,
    };
    this.setPseudoReact = this.setPseudoReact.bind(this);
    this.sendFriendRequestReact = this.sendFriendRequestReact.bind(this);
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
        <div id="myBetsAccountDiv">
          <p className="headerTitle accountP">My Bets</p>

          {this.props.myBets !== null ? this.props.myBets.map(function (item) {
            console.log(item)
            return (
              <div key={item.id} className="myBetsAccountDiv2">
                <Link to={"/bet/numBet?n=" + item.id}>
                  <div className="myBetsAccountDiv3">
                    <p className="titleBetAccount">{item.optionsArray.split(",")[0] + " - " + item.optionsArray.split(",")[item.optionsArray.split(",").length - 1]}</p>
                    <p className="dateBetAccount">{timeConverterDate(item.date)}</p>
                    {item.mise.map((mise,index) => {if(mise!=0) {return <p key={index} className="miseBetAccount">{parseFloat(mise) / decimalsConverter(10)+" USDT on "+item.optionsArray.split(",")[index]}</p> }else return null})}
                    <p className="stateBetAccount">{item.betState}</p>
                  </div>
                </Link>
              </div>
            );
          }) : null}

        </div>
        <div id="friendsDiv">
          <p className="headerTitle accountP">Friends</p>
          <div id="friendAdder">
            <input placeholder="Type an address here" className="settingsInput" type="text" value={this.state.newFriend} onChange={(e) => this.setState({ newFriend: e.target.value })}></input>
            <button className='generalsButton settingsButton' onClick={(event) => { this.sendFriendRequestReact(this.state.newFriend) }}><p className="buttonP">Add friend</p></button>
          </div>

          <p id={this.state.cssmessageAddFriend}>{this.state.messageAddFriend}</p>
          <MyFriends updateFriends={this.updateFriends} myFriends={this.state.friends} address={this.props.address} logged={this.props.logged} setFriendsList={this.setFriendsList}></MyFriends>
        </div>
        <div id="requestSuperDiv">
          <p className="headerTitle accountP">Notifications</p>

          <MyRequests socket={this.props.socket} updateRequests={this.updateRequests} requests={this.state.requests} updateFriends={this.updateFriends} address={this.props.address} logged={this.props.logged}></MyRequests>
        </div>
        <div id="settingsAccount">
          <p className="headerTitle accountP">Settings</p>

          <div id="changePseudoDiv">
            <input placeholder="Type your new pseudo here" className="settingsInput" type="text" value={this.state.newPseudo} onChange={(e) => this.setState({ newPseudo: e.target.value })}></input>
            <button className='generalsButton settingsButton' onClick={(event) => { this.setPseudoReact(this.state.newPseudo) }}><p className="buttonP" >Change Pseudo</p></button>
          </div>
        </div>
      </div>
    );
  }
  setPseudoReact(newPseudo) {
    setPseudo(newPseudo)
  }
  sendFriendRequestReact(newFriend) {
    this.props.socket.emit("sendFriendRequest", { fromAddress: this.props.address, toAddress: newFriend })
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

  componentDidMount() {
    __mounted = true;
    this.props.mainVueSetter("account")

    testLogin().then((res) => {
      console.log("res " + res)
      if (res.isLogged === true) {

        this.setState({ logged: true });
        this.props.setLogged(true);
        if (this.props.logged) {
          let link2 = "https://testnet.bettingcroc.com/api/myrequests"
          console.log(link2)
          fetch(link2, { method: "GET" }).then((res) => {
            res.json().then((data) => {
              console.log(data)
              if (this.state.requests === undefined) { this.setState({ requests: data }); }
            });
          });
          let link3 = "https://testnet.bettingcroc.com/api/myfriends/"
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
      else { this.setState({ logged: false }); this.props.setLogged(false) }
    })

  }
  setFriendsList(friends) {
    this.setState({ friends: friends })
  }
  updateRequests() {
    console.log("update requests")
    let link2 = "https://testnet.bettingcroc.com/api/myrequests"
    fetch(link2, { method: "GET" }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          console.log(data)
          this.setState({ requests: data });
        });
      }
    });
  }
  updateFriends() {
    console.log("updateFriends")
    let link = "https://testnet.bettingcroc.com/api/myfriends/"
    fetch(link, { method: "GET" }).then((res) => {
      res.json().then((data) => {
        console.log(data)
        this.setState({ friends: data });
      });
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if ((prevProps.address !== this.props.address && this.state.dataPersoloaded === false && this.props.address !== undefined)) {
      let link = "https://testnet.bettingcroc.com/api/score/" + this.props.address.toLowerCase();
      fetch(link, { method: "GET" }).then((res) => {
        res.json().then((data) => {
          if (this.state.dataPersoloaded !== true) { this.setState({ dataPerso: data, loaded: true }); }
        });
      });
    }

    if ((prevProps !== this.props && this.props.address !== undefined) || (prevProps.logged !== this.props.logged && this.props.address !== undefined)) {


      if (this.props.logged) {
        let link2 = "https://testnet.bettingcroc.com/api/myrequests"
        console.log(link2)
        fetch(link2, { method: "GET" }).then((res) => {
          res.json().then((data) => {
            console.log(data)
            if (this.state.requests === undefined) { this.setState({ requests: data }); }
          });
        });
        let link3 = "https://testnet.bettingcroc.com/api/myfriends/"
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
    if (this.props.requestUpdater !== prevProps.requestUpdater) {
      this.updateRequests()
    }
    if (this.props.friendsUpdater !== prevProps.friendsUpdater) {
      this.updateFriends()
    }
    if (this.props.address !== undefined && this.props.address !== prevProps.address && __mounted) {
      try {
        console.log(this.props.address);
        fetch("https://testnet.bettingcroc.com/api/mybets/" + this.props.address, { method: "GET" }).then(
          (res) => {
            console.log(res.status)
            res.json().then((data) => {
              console.log(data)
              console.log("mybets")

              if (__mounted) {
                this.setState({ myBets: data });
              }
            });
          }
        );
      } catch (error) {
        console.log(error);
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

async function sendFriendRequest(newFriend) {
  if (__mounted) {
    let url = "https://testnet.bettingcroc.com/api/sendFriendRequest/";
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

async function testLogin() {
  if (__mounted) {
    let url = "https://testnet.bettingcroc.com/api/testlogin";

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
function timeConverterDate(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var time = date + ' ' + month + ' ' + year;
  return time;
}
function decimalsConverter(numberToConvert) {
  return Math.pow(numberToConvert, 18)
}