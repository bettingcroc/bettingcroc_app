/* global BigInt */

import React, { useState } from "react";
import FriendInviter from "../FriendInviter/FriendInviter";
import "./P2PBetOption.css"

function P2PBetOption(props) {
  const [modalInviterOpened, setModalInviterOpened] = useState(false)
  function closeModal() {
    setModalInviterOpened(false)
  }
  return (
    <div id={props.status === 0 ? "p2p2Open" : "p2p2"} className={props.theme === "light" ? "whiteDiv" : "blackDiv"}>
      <div id="p2p2Box1">
        <p id="line1P2POption" className={props.theme === "light" ? "blackP" : "whiteP"}>Join a P2P bet {props.optionsArray === undefined ? null : props.args === undefined ? null : " against " + props.optionsArray.split(",")[props.args[0]['6']]}</p>
        {props.logged && props.status === 0 ? <div className="friendInviterTrigger">
          <button className="buttonInviter buttonInviterReverse" onClick={(e) => { setModalInviterOpened(true) }}>Invite a friend</button>
          {modalInviterOpened ? <FriendInviter address={props.address} socket={props.socket} typeBet="p2p" argsBet={{ betNumber: props.betNumber, title: props.optionsArray, p2pnumber: props.args }} friends={props.friends} modalCloser={closeModal} ></FriendInviter> : null}
        </div> : null}

      </div>
      <div id="p2p2Box2">
        <div id="line2P2POption">
          <p className={props.theme === "light" ? "blackP" : "whiteP"}>Best cote : </p>
          {props.status === 0 ? <button
            id="buttonCoteP2P"
            className="button"
            onClick={(event) => {
              if (props.args !== undefined) {
                props.setTypeBet(3)
                props.setBetArgs({
                  betNumber: props.betNumber,
                  betName: props.optionsArray,
                  amountToBet: weiconvert(props.amountToBet),
                  cote: props.args[1],
                  optionName: props.optionsArray.split(",")[props.args[0]['6']],
                  toWin: props.amountToBet * props.args[1],
                  betNumberP2P: props.args[0]['0']

                }
                )
              }
            }}
          >
            <p id="coteP2P">{props.args === undefined ? "-" : props.args[1] === "indispo" ? "Nothing :/" : props.args[1]}</p>
          </button> : <div id="buttonCoteP2P"
            className="button">                <p id="coteP2P">{props.args === undefined ? "-" : props.args[1] === "indispo" ? "Nothing :/" : props.args[1]}</p>
          </div>}
        </div>
        <div id="line3P2POption">
          <p className={props.theme === "light" ? "blackP" : "whiteP"}>Amount bettable : </p>
          <p className={props.theme === "light" ? "blackP" : "whiteP"} id="amountBettableP">{props.args !== undefined ? props.args[2] === "indispo" ? "Nothing :/" : props.args[2] + " USDC" : null} </p>
        </div>

      </div>
    </div>
  );

}

P2PBetOption.propTypes = {};

P2PBetOption.defaultProps = {};

export default P2PBetOption;
function decimalsConverter(numberToConvert) {
  return Math.pow(numberToConvert, 18);
}
function weiconvert(number) {
  return BigInt(number * decimalsConverter(10));
}
