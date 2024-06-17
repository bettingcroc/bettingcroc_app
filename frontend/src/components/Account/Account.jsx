import React, { useState, useEffect } from "react";
import Authentification from "../Authentification/Authentification";
import { Link, useNavigate } from "react-router-dom";
import MyFriends from "../MyFriends/MyFriends";
import MyRequests from "../MyRequests/MyRequests";
import MyBets from "../MyBets/MyBets";
import "./Account.css"
import { MY_SERVER } from "../../consts"
import CircularProgress from '@mui/material/CircularProgress';


function Account(props) {
  const [loaded, setLoaded] = useState(false)
  const [dataPerso, setDataPerso] = useState()
  const [newPseudo, setNewPseudo] = useState("")
  const [newFriend, setNewFriend] = useState("")
  const [requests, setRequests] = useState()
  const [logged, setLogged] = useState(false)
  const [friends, setFriends] = useState()
  const [messageAddFriend, setMessageAddFriend] = useState()
  const [cssmessageAddFriend, setCssMessageAddFriend] = useState()
  const [betsType, setBetsType] = useState("default")
  const [betsToDisplay, setBetsToDisplay] = useState()
  const navigate = useNavigate();
  useEffect(() => {
    props.mainVueSetter("account")
    props.vueSetter("account")
    console.log("account")
  }, [])
  useEffect(() => {
    testLogin().then((res) => {
      if (res.isLogged === true) {
        setLogged(true)
        props.setLogged(true);
        if (props.logged) {
          let link2 = MY_SERVER + "/api/myrequests"
          fetch(link2, { method: "GET", credentials: 'include' }).then((res) => {
            res.json().then((data) => {
              if (requests === undefined) { setRequests(data) }
            });
          });
          let link3 = MY_SERVER + "/api/myfriends/"
          fetch(link3, { method: "GET", credentials: 'include' }).then((res) => {
            res.json().then((data) => {
              if (friends === undefined) {
                setFriends(data)
              }
            });
          });
        }
      }
      else { setLogged(false); props.setLogged(false);navigate('/')
    }
    })
  }, [])
  useEffect(() => {
    if (betsType === "p2p" && props.myP2PBets.length > 0) { setBetsToDisplay(props.myP2PBets) }
    if (betsType === "default" && props.myBets.length > 0) { setBetsToDisplay(props.myBets) }
  }, [props.myBets, props.myP2PBets])
  useEffect(() => {
    if (props.logged) {
      updateRequests()
    }
  }, [props.requestUpdater])
  useEffect(() => {
    if (props.logged) {
      console.log("friends update")
      updateFriends()
    }
  }, [props.friendsUpdater])
  useEffect(() => {
    if (props.logged) {
      updateFriends()
      updateRequests()
    }
  }, [props.logged])
  useEffect(() => {
    if (props.address !== undefined) {
      let link = MY_SERVER + "/api/score/" + props.address.toLowerCase();
      fetch(link, { method: "GET" }).then((res) => {
        res.json().then((data) => {
          setDataPerso(data)
        });
      })
    }
  }, [props.address])
  async function setPseudo(newPseudo) {
    let url = MY_SERVER + "/api/setUpPseudo/";
    let bodyToSend = JSON.stringify({
      "newPseudo": newPseudo,
    });
    let options = {
      method: "POST",
      body: bodyToSend,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include'
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
  async function sendFriendRequest(newFriend) {
    if (newFriend.length !== 42) {
      setMessageAddFriend("Bad address format")
      setCssMessageAddFriend("messageAddFriend1")
      return
    }
    for (let add in friends) {
      if (newFriend === friends[add].address2) {
        setMessageAddFriend("Already friend with " + newFriend)
        setCssMessageAddFriend("messageAddFriend1")
        return
      }
    }
    let url = MY_SERVER + "/api/sendFriendRequest/";
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
      credentials: 'include'
    };
    fetch(url, options)
      .then((res) => {
        console.log("done " + res.status);
        if (res.status === 200) {
          props.socket.emit("sendFriendRequest", { fromAddress: props.address, toAddress: newFriend })
          setMessageAddFriend("Invitation sent to " + newFriend)
          setCssMessageAddFriend("messageAddFriend2")
        }
        else {
          setMessageAddFriend("Something went wrong ")
          setCssMessageAddFriend("messageAddFriend1")
        }
      })


    return

  }

  async function testLogin() {
    let url = MY_SERVER + "/api/testlogin";

    let options = {
      method: "GET", credentials: 'include'
    };
    let result
    await new Promise(next => {
      fetch(url, options).then((res) => {
        res.json().then((data) => {
          result = data
          next()
        })
      });
    })
    return result
  }
  function updateRequests() {
    console.log("update requests")
    let link2 = MY_SERVER + "/api/myrequests"
    fetch(link2, { method: "GET", credentials: 'include' }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setRequests(data)
        });
      }
    });
  }
  function updateFriends() {
    console.log("updateFriends")
    let link = MY_SERVER + "/api/myfriends/"
    fetch(link, { method: "GET", credentials: 'include' }).then((res) => {
      res.json().then((data) => {
        setFriends(data)
      });
    });
  }
  return (
    <div className={props.theme === "light" ? "mainContentAccountLight" : "mainContentAccountDark"}>
      <div id="myBetsAccountDiv" className={props.theme === "light" ? "whiteDiv" : "blackDiv"}>
              <p id="rankingsTitle" className={props.theme === "light" ? "blackP" : "whiteP"}>Account</p>
              </div>

      <div id="myBetsAccountDiv" className={props.theme === "light" ? "whiteDiv" : "blackDiv"}>
        <div id="divMyBetsAccountButtons">
          <button onClick={(e) => { setBetsType("default"); setBetsToDisplay(props.myBets); }} className="accountButton"><p className={props.theme === "light" ? "blackP" : "lightGreyP"} id={betsType === "default" ? "accountBetsTypeActive" : "accountBetsTypeInactive"}>My Bets</p></button>
          <button onClick={(e) => { setBetsType("p2p"); setBetsToDisplay(props.myP2PBets); }} className="accountButton"><p className={props.theme === "light" ? "blackP" : "lightGreyP"} id={betsType === "p2p" ? "accountBetsTypeActive" : "accountBetsTypeInactive"}>My P2P Bets</p></button>
        </div>
        <div id="superMyBetsAccountDiv2">
          {betsToDisplay===undefined?<CircularProgress></CircularProgress> :betsToDisplay.map(function (item, index) {
            if (item.optionsArray === null) {
              console.log("ERROR DB => missing bet")
              return null
            }
            return (
              <div key={index} className="myBetsAccountDiv2">
                <Link to={"/bet?n=" + item.id}>
                  <div className={props.theme === "light" ? "myBetsAccountDiv3" : " myBetsAccountDiv3 myBetsAccountDiv3Dark"}>
                    <p className={props.theme === "light" ? "titleBetAccount blackP" : " titleBetAccount whiteP"}>{item.optionsArray.split(",")[0] + " - " + item.optionsArray.split(",")[item.optionsArray.split(",").length - 1]}</p>
                    <p className={props.theme === "light" ? "dateBetAccount blackP" : " dateBetAccount whiteP"}>{timeConverterDate(item.date)}</p>
                    {<div className="divMisesAccount">
                      {item.mise && item.mise.map((mise, index) => { if (mise != 0) { return <p key={index} className={props.theme === "light" ? "miseBetAccount blackP" : " miseBetAccount whiteP"}>{parseFloat(mise) / decimalsConverter(10) + " USDC on " + item.optionsArray.split(",")[index]}</p> } else return null }
                      )}
                    </div>}
                    <p className={props.theme === "light" ? "blackP" : "whiteP"}>{item.betState}</p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

      </div>
      {/*<div id="galleryDiv" className={props.theme === "light" ? "whiteDiv" : "blackDiv"}>
        <p className={props.theme === "light" ? "headerTitle accountP" : "headerTitleDark accountP"} >Gallery</p>

        </div>*/}
      {/*!props.logged && <div id="needToLoginAccountDiv" className={props.theme === "light" ? "whiteDiv" : "blackDiv"}><Authentification web3={props.web3} address={props.address} setLogged={props.setLogged} logged={props.logged}></Authentification> <p className={props.theme === "light" ? "blackP" : "whiteP"}>now to get access to full features of Bettingcroc.</p></div>*/}


      {props.logged ? <div id="friendsDiv" className={props.theme === "light" ? "whiteDiv" : "blackDiv"}>
        <p className={props.theme === "light" ? "headerTitle accountP" : "headerTitleDark accountP"} >Friends</p>
        <div id="friendAdder">
          <input id="inputFriendAdder" placeholder="Type an address here" className="settingsInput" type="text" value={newFriend} onChange={(e) => setNewFriend(e.target.value)}></input>
          <button className='generalsButton settingsButton' onClick={(event) => { sendFriendRequest(newFriend) }}><p className="buttonP">Add friend</p></button>
        </div>

        <p id={cssmessageAddFriend}>{messageAddFriend}</p>
        <MyFriends updateNotificationsFromServer={props.updateNotificationsFromServer} theme={props.theme} updateFriends={updateFriends} myFriends={friends} address={props.address} logged={props.logged} setFriendsList={setFriends}></MyFriends>
      </div> : null}
      {props.logged ? <div id="requestSuperDiv" className={props.theme === "light" ? "whiteDiv" : "blackDiv"}>
        <p className={props.theme === "light" ? "headerTitle accountP" : "headerTitleDark accountP"}>Notifications</p>

        <MyRequests theme={props.theme} socket={props.socket} updateRequests={updateRequests} requests={requests} updateFriends={updateFriends} address={props.address} logged={props.logged}></MyRequests>
      </div> : null}
      {props.logged ?
        <div id="settingsAccount" className={props.theme === "light" ? "whiteDiv" : "blackDiv"}>
          <p className={props.theme === "light" ? "headerTitle accountP" : "headerTitleDark accountP"}>Settings</p>

          <div id="changePseudoDiv">
            <input id="inputPseudoSetter" placeholder="Type your new pseudo here" className="settingsInput" type="text" value={newPseudo} onChange={(e) => setNewPseudo(e.target.value)}></input>
            <button className='generalsButton settingsButton' onClick={(event) => { setPseudo(newPseudo) }}><p className="buttonP" >Change Pseudo</p></button>
          </div>
        </div> : null}
    </div>
  );
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