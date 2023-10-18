import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MY_SERVER } from "../../consts"

var __mounted;

function MyRequests(props) {

  function answerRequest(args) {
    let url = MY_SERVER + "/api/answerRequest/";
    let options = {
      method: "POST",
      body: JSON.stringify(args),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include'
    };
    fetch(url, options).then((res) => {
      console.log("done answerRequest " + res.status);
      if (res.status === 200) {
        props.socket.emit("newFriendAccepted", { fromAddress: props.address, toAddress: args.newFriend })
        props.updateRequests()
        props.updateFriends()
      }
    });

  }

  return (
    <div className="accountContainer">
      {props.requests !== undefined ?
        props.requests.map((item) => {
          return (
            <div key={item.dateRequest} className="requestDiv">
              <p className={props.theme === "light" ? "blackP" : "lightGreyP"}>{item.dateRequest} </p>
              <p className={props.theme === "light" ? "blackP" : "lightGreyP"}>{item.pseudo !== null ? item.pseudo : item.address1} {item.header === "newFriend" ? " wants to be your friend !" : item.header === "betInvitation" ? " wants you to bet on " : null}</p>

              {
                item.header === "newFriend" ?
                  <button className='generalsButton' onClick={(event) => { //e is undefined
                    answerRequest({ "head": "newFriend", "id": item.id, "newFriend": item.address1 })
                  }}>
                    <p className="buttonP">Accept</p>
                  </button>
                  :
                  item.header === "betInvitation" && JSON.parse(item.body).typeBet === "general" ?
                    <Link to={"/bet?n=" + JSON.parse(item.body).argsBet.betNumber}><p className={props.theme === "light" ? "blackP" : "lightGreyP"}>{JSON.parse(item.body).argsBet.title.split(",")[0]} - {JSON.parse(item.body).argsBet.title.split(",")[JSON.parse(item.body).argsBet.title.split(",").length - 1]}</p></Link>
                    :
                    item.header === "betInvitation" && JSON.parse(item.body).typeBet === "p2p" ?
                      <Link to={"/bet?n=" + JSON.parse(item.body).argsBet.betNumber + "&p2p=" + Object.values(JSON.parse(item.body).argsBet.p2pnumber[0])[0]}><p className={props.theme === "light" ? "blackP" : "lightGreyP"}>{JSON.parse(item.body).argsBet.title.split(",")[0]} - {JSON.parse(item.body).argsBet.title.split(",")[JSON.parse(item.body).argsBet.title.split(",").length - 1]}</p></Link>
                      :
                      null
              }
            </div>
          );
        }) : null}
    </div>
  );



}


MyRequests.propTypes = {};

MyRequests.defaultProps = {};

export default MyRequests;
