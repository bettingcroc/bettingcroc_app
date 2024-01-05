/* global BigInt */

import React, { useState } from "react";
import "./DecentraBetCreator.css"
import { MY_SERVER } from "../../consts";
import { DECENTRABET_ADDRESS } from "../../configWebApp"

function DecentraBetCreator(props) {
  const [oracle, setOracle] = useState()
  const [amountToBet, setAmountToBet] = useState()
  const [authorized, setAuthorized] = useState()
  const [P2PBetCreatorSwitcher, setP2PBetCreatorSwitcher] = useState("public")
  const [playersNumber, setPlayersNumber] = useState()
  const [privateBet, setPrivateBet] = useState(false)
  const [description, setDescription] = useState("")
  const [link, setLink] = useState("")

  function approveUSDT(amount) {
    let approveToast = props.toast.loading("Approving USDT...", { closeButton: true })
    props.usdtContract.methods
      .approve(DECENTRABET_ADDRESS, weiconvert(amount))
      .send({ from: props.address })
      .once("receipt", (receipt) => {
        console.log("approve success");
        props.toast.update(approveToast, { render: "USDT approved", type: "success", isLoading: false, closeButton: true, autoClose: 7000 });
      });
  }
  function createDecentraBet(oracle, amount, authorized, playersNumber, privateBet, description, link) {
    if (authorized === undefined || P2PBetCreatorSwitcher === "public") {
      authorized = [];
    }
    else {
      authorized = authorized.split(",")
    }
    if (playersNumber === null || playersNumber === undefined) {
      playersNumber = 0;
    }
    console.log(oracle, amount, authorized, playersNumber, privateBet, description, link)
    props.decentrabetContract.methods
      .createDecentraBet(oracle, weiconvert(amount), authorized, playersNumber, privateBet)
      .send({ from: props.address })
      .once("receipt", (receipt) => {
        let betNumber = receipt.events.newDecentrabetCreated.returnValues.betNumber

        console.log(receipt.events.newDecentrabetCreated.returnValues.betNumber)
        console.log(`decentrabet ${betNumber} creation success`);
        let url = MY_SERVER + "/add_decentrabet";
        let options = {
          method: "POST",
          body: JSON.stringify({
            betNumber: betNumber,
            description: description,
            link: link
          }),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include'
        };
        fetch(url, options).then((res) => {
          console.log("done");
        });
      });
  }
  return (
    <div className={props.theme === "light" ? "decentraBetDiv" : "decentraBetDivDark"}>
      <p className={props.theme === "light" ? "headerTitle" : "headerTitleDark"}>Create a Decentrabet</p>
      <div className="sectionDecentrabetCreator">
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
      </div>

      <div className="sectionDecentrabetCreator">
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
      </div>
      <div className="sectionDecentrabetCreator">

        <p className="lightGreyP">You can add a description to help players.</p>
        <input className="inputDecentraBet"
          type="text" placeholder="Your description" onChange={(e) => {
            setDescription(e.target.value);
            console.log(playersNumber);
          }}></input>
        <p className="lightGreyP">You can add a link to help players.</p>
        <input className="inputDecentraBet"
          type="text" placeholder="Your link" onChange={(e) => {
            setLink(e.target.value);
            console.log(playersNumber);
          }}>

        </input>
      </div>
      <div className="sectionDecentrabetCreator">

        <p className={props.theme === "light" ? "blackP" : "whiteP"}>Finally, approve and create your decentraBet !</p>

        <div id="lastLineDecentraBet">
          <button className="buttonViewDecentraBet"
            onClick={(event) => {
              approveUSDT(amountToBet);
            }}
          >
            Approve USDT
          </button>
          <button className="buttonViewDecentraBet" onClick={(event) => {
            createDecentraBet(oracle, amountToBet, authorized, playersNumber, privateBet, description, link);
          }}>Create a DecentraBet</button>
        </div>

      </div >
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
