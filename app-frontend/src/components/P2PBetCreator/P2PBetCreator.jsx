/* global BigInt */

import React, { useState, useEffect } from "react";
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import "./P2PBetCreator.css"


function P2PBetCreator(props) {
  const [amountToBet, setAmountToBet] = useState(1)
  const [cote, setCote] = useState()
  const [P2PBetCreatorSwitcher, setP2PBetCreatorSwitcher] = useState("Public")
  const [selectedOption, setSelectedOption] = useState(0)
  const [authorized, setAuthorized] = useState()
  const [error, setError] = useState()
  const [classTag, setClassTag] = useState()
  const [modal, setModal] = useState("collapse")
  useEffect(() => {
    setAmountToBet(props.amountToBet)
  }, [props.amountToBet])

  function switchButton() {
    if (P2PBetCreatorSwitcher === "Public") {
      setP2PBetCreatorSwitcher("Friends only");
    } else {
      setP2PBetCreatorSwitcher("Public");
    }
  }
  function changeClass() {
    setClassTag(null)
  }
  function switchModal() {
    if (modal === "collapse") {
      setModal(null)
    }
    else {
      setModal("collapse")
    }
  }
  function handleClickAwayEvent() {
    setModal("collapse")
  }
  return (
    <div id="p2pcreator" className={props.theme === "light" ? "whiteDiv" : "blackDiv"}>


      <div id="superNewP2P">

        <p id="newP2PP" className={props.theme === "light" ? "blackP" : "whiteP"}>New P2P</p>

      </div>
      <div id="inputsP2P">
        <input
          className="css-input"
          placeholder="cote"
          id="cote"
          type="number"
          min="1.01"
          value={cote || ""}
          onChange={(e) => setCote(e.target.value)}
        ></input>
        <ClickAwayListener onClickAway={handleClickAwayEvent}>

          <div id="superinputLine1P2PFinder">
            <div id="selectCreateNewP2P" onClick={(e) => switchModal()}>
              <p>{props.optionsArray !== null ? props.optionsArray.split(",")[selectedOption] : null}</p>
            </div>
            <div id="modalinputLine1P2PFinder" className={modal}>
              {props.optionsArray === null
                ? null
                : props.optionsArray.split(",").map((item, index) => {
                  return (
                    <div key={index} className="lineModalP2PFinder" onClick={() => { setSelectedOption(index); switchModal() }}>
                      <p>{item}</p>
                    </div>
                  );
                })}
            </div>
          </div>
        </ClickAwayListener>
        <button id="publicSwitchButton" className="button" onClick={switchButton}>
          {P2PBetCreatorSwitcher}
        </button>

        <input
          type="text"
          className={
            P2PBetCreatorSwitcher === "Public" ? "hidden" : undefined
          }
          id="adressAuthorizedInput"
          value={authorized || ''}
          onChange={(e) => { setAuthorized(e.target.value); console.log(authorized) }}
        ></input>
        <button className="button"
          id="buttonCreateP2Pbutton"
          onClick={(event) => {
            if (cote <= 1 || cote === null || cote === undefined) {
              setError("Cote must be > 1 !"); setClassTag("horizontal-shake"); setTimeout(changeClass, 1000);
            }
            else {
              setError(null)
              console.log(selectedOption);
              props.setTypeBet(2)
              props.setBetArgs({
                betNumber: props.betNumber,
                betName: props.optionsArray,
                amountToBet: weiconvert(amountToBet),
                cote: cote,
                selectedOption: selectedOption,
                authorized: authorized,
                optionName: props.optionsArray.split(",")[selectedOption],
                toWin: amountToBet * cote
              })
            }
          }}
        >
          <p id="buttonCreateP2PP">Create bet</p>
        </button>
        <div id="errorCoteDiv"><p id="errorP" className={classTag}>{error}</p></div>
      </div>
    </div>
  );

}

export default P2PBetCreator;
function decimalsConverter(numberToConvert) {
  return Math.pow(numberToConvert, 18);
}
function weiconvert(number) {
  console.log(number)
  console.log(typeof number)
  return BigInt(number * decimalsConverter(10));
}
