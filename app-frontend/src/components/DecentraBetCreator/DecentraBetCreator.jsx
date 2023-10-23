/* global BigInt */

import React, { useState } from "react";

function DecentraBetCreator(props) {
  const [oracle, setOracle] = useState()
  const [amountToBet, setAmountToBet] = useState()
  const [authorized, setAuthorized] = useState()
  const [P2PBetCreatorSwitcher, setP2PBetCreatorSwitcher] = useState("public")
  const [playersNumber, setPlayersNumber] = useState()
  const [privateBet, setPrivateBet] = useState(false)

  function switchButton() {
    if (P2PBetCreatorSwitcher === "public") {
      setP2PBetCreatorSwitcher("friends only");
    } else {
      setP2PBetCreatorSwitcher("public");
    }
  }
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
    if (playersNumber === null) {
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
    <div className={props.theme === "light" ? "DecentraBetCreator" : "DecentraBetCreatorDark"}>
      <p className={props.theme === "light" ? "headerTitle" : "headerTitleDark"}>Create a Decentrabet</p>
      <div id="line3createADecentraBet1">
        <input
          type="text"
          className="inputDecentraBet"
          placeholder="oracle"
          onChange={(e) => setOracle(e.target.value)}
        />
        <input
          className="inputDecentraBet"
          placeholder="amountToBet"
          type="number"
          value={amountToBet || ""}
          onChange={(e) => setAmountToBet(e.target.value)}
        />
      </div>
      <div id="line3createADecentraBet">
        <button className="buttonViewDecentraBet" onClick={switchButton}>
          {P2PBetCreatorSwitcher}
        </button>
        {
          P2PBetCreatorSwitcher === "public" ?
            <div id="divDecentraBetPublic"><input
              className="inputDecentraBet"
              id="inputPlayersNumber"
              value={playersNumber || ""}
              onChange={(e) => {
                setPlayersNumber(e.target.value);
                console.log(playersNumber);
              }}
              placeholder="playersNumber"
            ></input><input
                type="checkbox"
                className="css-input"
                onChange={(e) => { setPrivateBet(privateBet === false ? true : false); }}
                value="checked"
              /></div>
            : <input
              type="text"
              className="inputDecentraBet"
              value={authorized || ""}
              onChange={(e) => {
                setAuthorized(e.target.value);
              }}
              placeholder="addresses authorized"
            ></input>
        }
      </div>


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

    </div>
  );

}

export default DecentraBetCreator;
function decimalsConverter(numberToConvert) {
  return Math.pow(numberToConvert, 18);
}
function weiconvert(number) {
  return BigInt(number * decimalsConverter(10));
}
