/* global BigInt */

import React, { useState } from "react";
import "./DecentraBetCreator.css"
function DecentraBetCreator(props) {
  const [oracle, setOracle] = useState()
  const [amountToBet, setAmountToBet] = useState()
  const [authorized, setAuthorized] = useState()
  const [P2PBetCreatorSwitcher, setP2PBetCreatorSwitcher] = useState("public")
  const [playersNumber, setPlayersNumber] = useState()
  const [privateBet, setPrivateBet] = useState(false)

  function approveUSDT(amount) {
    props.usdtContract.methods
      .approve("0x7e46BA7F5228a7B531B07AD939C921d5ea48a552", weiconvert(amount))
      .send({ from: props.address })
      .once("receipt", (receipt) => {
        console.log("approve success");
      });
  }
  function createDecentraBet(oracle, amount, authorized, playersNumber, privateBet) {
    if (authorized === undefined || P2PBetCreatorSwitcher === "public") {
      authorized = [];
    }
    else {
      authorized = authorized.split(",")
    }
    if (playersNumber === null || playersNumber === undefined) {
      playersNumber = 0;
    }
    console.log(oracle, amount, authorized, playersNumber, privateBet)
    props.decentrabetContract.methods
      .createDecentraBet(oracle, weiconvert(amount), authorized, playersNumber, privateBet)
      .send({ from: props.address })
      .once("receipt", (receipt) => {
        console.log("bet creation success");
      });
  }
  return (
    <div className={props.theme === "light" ? "decentraBetDiv" : "decentraBetDivDark"}>
      <p className={props.theme === "light" ? "headerTitle" : "headerTitleDark"}>Create a Decentrabet</p>
      <p className={props.theme === "light" ? "blackP" : "lightGreyP"}>First, choose an oracle, the one that will tells us the winner of the decentraBet. </p>
      <input
        type="text"
        className="inputDecentraBet"
        placeholder="oracle"
        onChange={(e) => setOracle(e.target.value)}
      />
      <p className={props.theme === "light" ? "blackP" : "lightGreyP"}> Enter an amount to be betted on this decentraBet.</p>
      <input
        className="inputDecentraBet"
        placeholder="amountToBet"
        type="text"
        value={amountToBet || ""}
        onChange={(e) => setAmountToBet(e.target.value)}
      />
      <p className={props.theme === "light" ? "blackP" : "lightGreyP"}> Choose if you want your decentraBet playable by everyone or only some addresses you want. If you want to create a public bet, you can set up a maximum number of players.</p>
      <div className="decentraBetCreatorLine">
        <button id="publicButtonDecentraBetCreator" className={P2PBetCreatorSwitcher === "public" ? "activeDecentraBetCreatorButton" : "inactiveDecentraBetCreatorButton"} onClick={() => { setP2PBetCreatorSwitcher("public") }}>
          Public
        </button>
        <button id="privateButtonDecentraBetCreator" className={P2PBetCreatorSwitcher === "friends only" ? "activeDecentraBetCreatorButton" : "inactiveDecentraBetCreatorButton"} onClick={() => { setP2PBetCreatorSwitcher("friends only") }}>
          Private
        </button>
      </div>

      {
        P2PBetCreatorSwitcher === "public" ?
          <div id="divDecentraBetPublic">
            <div id="line1DivDecentraBetPublic">
              <p className={props.theme === "light" ? "blackP" : "lightGreyP"} >Limit maximum number of players ?</p>
              <input
                type="checkbox"
                className="css-input"
                onChange={(e) => { setPrivateBet(privateBet === false ? true : false); }}
                value="checked"
                defaultChecked={privateBet}
              />
            </div>
            {privateBet === true && <input
              className="inputDecentraBet"
              id="inputPlayersNumber"
              value={playersNumber || ""}
              onChange={(e) => {
                setPlayersNumber(e.target.value);
                console.log(playersNumber);
              }}
              placeholder="playersNumber"
            ></input>}

          </div>
          :
          <input
            type="text"
            className="inputDecentraBet"
            value={authorized || ""}
            onChange={(e) => {
              setAuthorized(e.target.value);
            }}
            placeholder="addresses authorized"
          ></input>
      }

      <p className={props.theme === "light" ? "blackP" : "whiteP"}>Finally, approve and create your decentraBet !</p>

      <div id="lastLineDecentraBet">
        <button className="buttonViewDecentraBet"
          onClick={(event) => {
            approveUSDT(amountToBet);
          }}
        >
          APPROVE USDT
        </button>
        <button className="buttonViewDecentraBet" onClick={(event) => {
          createDecentraBet(oracle, amountToBet, authorized, playersNumber, privateBet);
        }}>Create a DecentraBet</button>
      </div>
      <a className="needMoreHelpP" href="/docs">Need help with this ? Check this.</a>

    </div >
  );

}

export default DecentraBetCreator;
function decimalsConverter(numberToConvert) {
  return Math.pow(numberToConvert, 18);
}
function weiconvert(number) {
  return BigInt(number * decimalsConverter(10));
}
