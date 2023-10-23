/* global BigInt */
import React, { useState } from "react";

function ViewADecentrabet(props) {
  const [idBetToView, setIdBetToView] = useState()
  const [amountToBet, setAmountToBet] = useState()
  const [stateBet, setStateBet] = useState()
  const [winnerToSet, setWinnerToSet] = useState()

  function approveUSDT(amount) {
    amount = weiconvert(amount)
    console.log(amount)
    props.usdtContract.methods
      .approve("0x7e46BA7F5228a7B531B07AD939C921d5ea48a552", amount)
      .send({ from: props.address })
      .once("receipt", (receipt) => {
        console.log("approve success");
      });
  }

  function viewBet() {
    props.decentrabetContract.methods.viewADecentrabet(idBetToView).call()
      .then(result => {

        console.log(result);
        setAmountToBet(Object.values(result)[1] / decimalsConverter(10))
        setStateBet(Object.values(result)[4] === false ? "alive" : "dead")
        props.decentrabetContract.methods.infoSpecBet(idBetToView).call()
          .then(result => {
            console.log(result)
          })
      })
  }

  function joinBet() {
    props.decentrabetContract.methods.joinBet(idBetToView).send({ from: props.address })
      .once("receipt", (receipt) => {
        console.log("bet join success");
      });
  }

  function endBet() {
    console.log(idBetToView, winnerToSet)
    props.decentrabetContract.methods.endBet(idBetToView, winnerToSet)
      .send({ from: props.address })
      .once("receipt", (receipt) => {
        console.log("bet ending success");
      });
  }

  return (
    <div className={props.theme === "light" ? "viewADecentraBet" : "viewADecentraBetDark"}>
      <p className={props.theme === "light" ? "headerTitle" : "headerTitleDark"}>Find a Decentrabet</p>
      <div id="line1viewADecentraBet" className="lineviewADecentraBet">
        <input
          id="inputidBetToView"
          className="inputDecentraBet"
          placeholder="Decentrabet number"
          type="number"
          value={idBetToView || ""}
          onChange={(e) => setIdBetToView(e.target.value)}
        ></input>

        <button className="buttonViewDecentraBet" onClick={viewBet}>
          Find bet
        </button>
        <div id="divStateDecentraBet">
          <p id="decentraStateP" className={props.theme === "light" ? "blackP" : "lightGreyP"}>State:{stateBet}</p>
        </div>
      </div>

      <div id="line2viewADecentraBet" className="lineviewADecentraBet">
        <p className={props.theme === "light" ? "blackP" : "lightGreyP"}>Bet n° {idBetToView}</p>

      </div>
      <div id="blockviewADecentraBet" className="lineviewADecentraBet">
        <div id="line3viewADecentraBet" className="lineviewADecentraBetColumn">
          <p className={props.theme === "light" ? "blackP" : "lightGreyP"}>Amount to Bet : {amountToBet} USDT </p>
          <div id="line3viewADecentraBet2">
            <button className="buttonViewDecentraBet" onClick={(event) => { approveUSDT(amountToBet) }}>Approve USDT</button>

            <button className="buttonViewDecentraBet" onClick={joinBet}>Join Bet</button>
          </div>
        </div>

        <div id="line4viewADecentraBet" className="lineviewADecentraBetColumn">
          <p className={props.theme === "light" ? "blackP" : "lightGreyP"}>I'm the oracle !</p>
          <input
            id="addressWinnerDecentraBet"
            type="text"
            className="inputDecentraBet"
            value={winnerToSet || ""}
            onChange={(e) => {
              setWinnerToSet(e.target.value);
            }}
            placeholder="winner"
          ></input>
          <button className="buttonViewDecentraBet" onClick={endBet}>endBet</button>
        </div>
      </div>


    </div>
  );

}

export default ViewADecentrabet;

function decimalsConverter(numberToConvert) {
  return Math.pow(numberToConvert, 18)
}

function weiconvert(number) { return BigInt(number * decimalsConverter(10)); }