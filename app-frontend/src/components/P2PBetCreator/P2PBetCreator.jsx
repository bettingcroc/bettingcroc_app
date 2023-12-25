/* global BigInt */

import React, { useState, useEffect } from "react";
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import "./P2PBetCreator.css"
import Tooltip from '@mui/material/Tooltip';
import { helpDark } from '../../images';



function P2PBetCreator(props) {
  const [amountToBet, setAmountToBet] = useState(1)
  const [cote, setCote] = useState()
  const [privacyBet, setPrivacyBet] = useState("Public")
  const [selectedOption, setSelectedOption] = useState(0)
  const [authorized, setAuthorized] = useState()
  const [error, setError] = useState()
  const [classTag, setClassTag] = useState()
  const [modal, setModal] = useState("collapse")
  useEffect(() => {
    setAmountToBet(props.amountToBet)
  }, [props.amountToBet])

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

        <p id="newP2PP" className={props.theme === "light" ? "blackP" : "whiteP"}>Create my P2P bet</p>
      </div>
      <div id="inputsP2P">
        <div className="lineP2PCreator">
          <p className={props.theme === "light" ? "blackP" : "whiteP"}>Bet on</p>


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
        </div>
        <div className="lineP2PCreator">
          <p className={props.theme === "light" ? "blackP" : "whiteP"}>With an odds of</p>

          <input
            className="css-input"
            placeholder="Odds"
            id="cote"
            type="number"
            min="1.01"
            value={cote || ""}
            onChange={(e) => setCote(e.target.value)}
          ></input>

        </div>
        <div className="lineP2PCreator">

          <div className='switchButtons'>
            <button id="buttonRefreshP2PFinderButton" className={privacyBet === "Public" ? "activeButtonSwitch" : "inactiveButtonSwitch"} onClick={(event) => { setPrivacyBet("Public") }}>Public</button>
            <button id="buttonRefreshP2PFinderButton" className={privacyBet === "Friends only" ? "activeButtonSwitch" : "inactiveButtonSwitch"} onClick={(event) => { setPrivacyBet("Friends only") }}>Private</button>
          </div>
          <Tooltip title="Set the privacy of the bet. If private, only the addresses authorized will be able to join the bet.">
            <img className='helpImage' src={helpDark}></img>
          </Tooltip>
        </div>
        <input
          placeholder="Addresses authorized"
          type="text"
          className={
            privacyBet === "Public" ? "hidden" : undefined
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
      <a className="needMoreHelpP" href="/docs">Need help with this ? Check this.</a>

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
