/* global BigInt */
import React, { useState } from 'react';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import Tooltip from '@mui/material/Tooltip';
import "./P2PFinder.css"
import { helpDark } from '../../images';


function P2PFinder(props) {
  const [selectedOption, setSelectedOption] = useState(0)
  const [p2pFinderInput, setP2pFinderInput] = useState(0)
  const [modeSearch, setModeSearch] = useState("minToBet")
  const [modal, setModal] = useState("collapse")


  function searchCote(minToEnter) {
    console.log("try search cote")
    try {
      //console.log("try search cote2")
      props.betContract.methods
        .getMaxCoteP2PBet(props.betNumber, selectedOption, minToEnter)
        .call()
        .then((result) => {
          //console.log("maxCote " + result)
          if (parseInt(result) !== 0) {
            props.betContract.methods
              .getP2PBet(props.betNumber, result)
              .call()
              .then((result2) => {
                //console.log(result2)
                props.setP2PdisplayArgs([result2, parseFloat(
                  1 + Object.values(result2)[2] / Object.values(result2)[3]
                ).toFixed(2), (
                  parseFloat(Object.values(result2)[4]) /
                  decimalsConverter(10)
                ).toFixed(2)])
              });
          } else {
            props.setP2PdisplayArgs([{ 6: selectedOption }, "indispo", "indispo"])
          }
        });
    } catch (error) {
      console.log(error);
    }
  }
  async function searchById(id) {
    console.log("try search id")
    try {
      console.log("try search id2 with ", props.betNumber, id)
      let result2 = await props.betContract.methods.getP2PBet(props.betNumber, id).call()
      try {
        console.log(result2)
        props.setP2PdisplayArgs([result2, parseFloat(
          1 + Object.values(result2)[2] / Object.values(result2)[3]
        ).toFixed(2), (
          parseFloat(Object.values(result2)[4]) /
          decimalsConverter(10)
        ).toFixed(2)])
      } catch (e) { }


    } catch (error) {
      console.log(error);
    }
  }
  function switchModal() {
    if (modal === "collapse") {
      setModal(null)
    }
    else {
      setModal("collapse")
    }
  }

  return (

    <div id="p2pfinder" className={props.theme === "light" ? "whiteDiv" : "blackDiv"}>
      <div id="titleP2pFinder">

        <p className={props.theme === "light" ? "blackP" : "whiteP"} id="findp2pP">Find a P2P bet</p>


      </div>
      <div id="inputP2pFinder">
        <div className='line1P2PFinder'>
          <p className={props.theme === "light" ? "blackP" : "whiteP"}>Bet against</p>

          <ClickAwayListener onClickAway={(e) => { setModal("collapse") }}>
            <div id="superinputLine1P2PFinder">
              <div id="inputLine1P2PFinder" onClick={switchModal}>
                <p>{props.optionsArray !== undefined ? props.optionsArray.split(",")[selectedOption] : null}</p>
              </div>
              <div id="modalinputLine1P2PFinder" className={modal}>
                {props.optionsArray === undefined
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
          <Tooltip title="Select the team that you would bet AGAINST. You will win only if the team selected will lose.">
            <img className='helpImage' src={helpDark}></img>
          </Tooltip>
        </div>
        <div id='line2P2PFinder'>
          <p className={props.theme === "light" ? "blackP" : "whiteP"}>Search by</p>
          <div className='switchButtons'>
            <button id="buttonRefreshP2PFinderButton" className={modeSearch === "minToBet" ? "activeButtonSwitch" : "inactiveButtonSwitch"} onClick={(event) => { setModeSearch("minToBet") }}>Minimum amount bettable</button>
            <button id="buttonRefreshP2PFinderButton" className={modeSearch === "byId" ? "activeButtonSwitch" : "inactiveButtonSwitch"} onClick={(event) => { setModeSearch("byId") }}>Bet number</button>
          </div>
          <Tooltip title="You can search a P2P bet from bet id if you want to bet on a specific bet or by minimum amount bettable to be sure you can bet the amount you want.">
            <img className='helpImage' src={helpDark}></img>
          </Tooltip>
        </div>
        <input
          className="css-input"
          id="p2pFinderInput"
          type="number"
          min="0"
          value={p2pFinderInput}
          onChange={(e) => setP2pFinderInput(e.target.value)}
          placeholder={modeSearch === "minToBet" ? "Minimum amount to bet" : "Bet number"}
        ></input>


        <button id="buttonSearchP2P" onClick={(event) => { modeSearch === "minToBet" ? searchCote(weiconvert(p2pFinderInput)) : searchById(p2pFinderInput) }}><p id="searchP">Search !</p></button>

      </div>
      <a className="needMoreHelpP" href="/docs">Need help with this ? Check this.</a>

    </div>
  );

}

P2PFinder.propTypes = {};

P2PFinder.defaultProps = {};

export default P2PFinder;
function decimalsConverter(numberToConvert) {
  return Math.pow(numberToConvert, 18)
}
function weiconvert(number) {
  return BigInt(number * decimalsConverter(10));
}
