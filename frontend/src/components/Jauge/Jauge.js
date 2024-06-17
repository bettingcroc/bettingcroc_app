import React from 'react';
import "./Jauge.css"

function Jauge(props) {

  return (
    <div id="jauge" className={props.theme === "light" ? "whiteDiv" : "blackDiv"}>
      <div id='line1Jauge'>
        <p className={props.theme === "light" ? "blackP" : "lightGreyP"} id="stakeTitleP">Stake</p>
        <input type="text" id="inputStake" min="1" value={props.amountToBet} onChange={e => props.setAmountBet(!isNaN(Number(e.target.value))?e.target.value:1)}></input>
        <p className={props.theme === "light" ? "blackP" : "lightGreyP"} id="stakeTitleP">USDC</p>
      </div>
      <div id="graduation">
        <p id="zeroRange" className={props.theme === "light" ? "blackP" : "whiteP"}>1 USDC</p>
        <p id="midRange" className={props.theme === "light" ? "blackP" : "whiteP"}>50%</p>
        <p id="maxRange" className={props.theme === "light" ? "blackP" : "whiteP"}>{props.address !== undefined ? "Max (" + Math.round(props.balanceUSDC * 10) / 10 + " USDC)" : "1000 USDC"}</p>
      </div>
      <input type="range" min="1" step="1" max={props.address !== undefined ? props.balanceUSDC : 1000} id="rangeInput" value={props.amountToBet} onChange={e => props.setAmountBet(e.target.value)}></input>
    </div>
  )
}

Jauge.propTypes = {};

Jauge.defaultProps = {};

export default Jauge;
