import React from 'react';
import "./Jauge.css"

function Jauge(props) {

  return (
    <div id="jauge" className={props.theme === "light" ? "whiteDiv" : "blackDiv"}>
      <div id='line1Jauge'>
        <p className={props.theme === "light" ? "blackP" : "lightGreyP"} id="stakeTitleP">Stake</p>
        <input type="number" id="inputStake" min="1" value={props.amountToBet} onChange={e => props.setAmountBet(e.target.value)}></input>
        <p className={props.theme === "light" ? "blackP" : "lightGreyP"} id="stakeTitleP">USDT</p>
      </div>
      <div id="graduation">
        <p id="zeroRange" className={props.theme === "light" ? "blackP" : "whiteP"}>1 USDT</p>
        <p id="midRange" className={props.theme === "light" ? "blackP" : "whiteP"}>50%</p>
        <p id="maxRange" className={props.theme === "light" ? "blackP" : "whiteP"}>{props.address !== undefined ? "Max (" + Math.round(props.balanceUSDT * 10) / 10 + " USDT)" : "1000 USDT"}</p>
      </div>
      <input type="range" min="1" step="1" max={props.address !== undefined ? props.balanceUSDT : 1000} id="rangeInput" value={props.amountToBet} onChange={e => props.setAmountBet(e.target.value)}></input>
    </div>
  )
}

Jauge.propTypes = {};

Jauge.defaultProps = {};

export default Jauge;
