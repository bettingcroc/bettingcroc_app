/* global BigInt */
import React, { useState } from "react";
import "./ViewADecentrabet.css"
import { DECENTRABET_ADDRESS } from "../../configWebApp"
import { MY_SERVER } from "../../consts"

function ViewADecentrabet(props) {
  const [idBetToView, setIdBetToView] = useState()
  const [amountToBet, setAmountToBet] = useState()
  const [stateBet, setStateBet] = useState()
  const [winnerToSet, setWinnerToSet] = useState()
  const [oracle, setOracle] = useState()
  const [description, setDescription] = useState()
  const [link, setLink] = useState()

  function approveUSDT(amount) {
    amount = weiconvert(amount)
    props.usdtContract.methods
      .approve(DECENTRABET_ADDRESS, amount)
      .send({ from: props.address })
      .once("receipt", (receipt) => {
        console.log("approve success");
      });
  }

  function viewBet() {
    if (idBetToView < 1) {
      return
    }
    props.decentrabetContract.methods.getDecentraBetLastNumber().call().then(result => {
      if (parseInt(idBetToView) >= parseInt(result)) {
        setAmountToBet(-1)
        return
      }
      else {
        props.decentrabetContract.methods.viewADecentrabet(idBetToView).call()
          .then(result => {
            fetch(MY_SERVER + "/api/infoDecentrabet/" + idBetToView, { method: "GET", }).then((res) => {
              res.json().then(data => {
                console.log(data[0])
                if (data[0] === undefined) {
                  console.log("no decentrabets data in db")
                  setLink("Missing in db")
                  setDescription("Missing in db")
                }
                else {
                  setLink(data[0].link)
                  setDescription(data[0].description)
                }

              }
              )

            });
            console.log(result);
            setAmountToBet(Object.values(result)[1] / decimalsConverter(10))
            setStateBet(Object.values(result)[4] === false ? "alive" : "dead")
            setOracle(Object.values(result)[0])
            props.decentrabetContract.methods.infoSpecBet(idBetToView).call()
              .then(result => {
                console.log(result)
              })
          })
      }
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
    <div className={props.theme === "light" ? "decentraBetDiv" : "decentraBetDivDark"
}>      <p className={props.theme === "light" ? "headerTitle" : "headerTitleDark"}>Find a Decentrabet</p>
      <p className={props.theme === "light" ? "blackP" : "lightGreyP"}>Search a decentraBet from its number</p>

      <div id="line1viewADecentraBet" className="lineviewADecentraBet">
        <input
          min="1"
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
      </div>
      {amountToBet !== undefined ? amountToBet === -1 ? <div id="decentraBetViewer"><p className="whiteP">Decentrabet does not exist yet</p></div> : oracle !== "0x0000000000000000000000000000000000000000" ? <div id="decentraBetViewer">
        <div id="line2viewADecentraBet" >
          <p className="line1DecentraBetViewerP">Bet n° {idBetToView}</p>
          <p className="line1DecentraBetViewerP">State : {stateBet}</p>
        </div>
        <div className="lineviewADecentraBetColumnBig">
          <div id="line3viewADecentraBet" className="lineviewADecentraBetColumn">
            <p className={props.theme === "light" ? "blackP" : "lightGreyP"}>Amount to Bet : <span className="cyanP">{amountToBet} USDT</span> </p>
            <div id="line3viewADecentraBet2">
              <button className="buttonViewDecentraBet" onClick={(event) => { approveUSDT(amountToBet) }}>Approve USDT</button>

              <button className="buttonViewDecentraBet" onClick={joinBet}>Join Bet</button>
            </div>
          </div>

          <div id="line4viewADecentraBet" className="lineviewADecentraBetColumn">
            <p className="whiteP">{description}</p>
            <a className="whiteP" id="linkDecentrabet" href={link} target="_blank" rel="noopener">Click here for more</a>
          </div>
          <div className="lineviewADecentraBetColumn">
            <p className="whiteP">The oracle of this decentrabet is <span className="cyanP">{oracle}</span>.</p>
            {oracle === props.address &&
              <div className="lineviewADecentraBetColumn">
                <p className="whiteP">You are the oracle, you can set the winner enterring the address of the winner below.</p>
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
                <button className="buttonViewDecentraBet" onClick={endBet}>endBet</button>          </div>
            }
          </div>
        </div>
      </div> : <div id="decentraBetViewer"><p className="whiteP">Decentrabet unavailable (oracle is zero address)</p></div> : <div id="decentraBetViewer"><p className="whiteP">Search for a decentraBet</p></div>}


      <a className="needMoreHelpP" href="/docs">Need help with this ? Check this.</a>

    </div>
  );

}

export default ViewADecentrabet;

function decimalsConverter(numberToConvert) {
  return Math.pow(numberToConvert, 18)
}

function weiconvert(number) { return BigInt(number * decimalsConverter(10)); }