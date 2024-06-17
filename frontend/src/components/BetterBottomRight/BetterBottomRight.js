import React from 'react';
import PropTypes from 'prop-types';
import "./BetterBottomRight.css"

function BetterBottomRight(props) {



  return (
    <div id="bottomRightBar">
      <div id="underBottomRightBar">
        <div id="inputLine">
          <p id="inputP">Input</p>
          <p id="inputP2">{props.betArgs === null ? null : parseFloat(props.betArgs.amountToBet) / decimalsConverter(10) + " USDC"}</p>
        </div>
        <div id="gainsLine">
          <p id="gainsP">Gains</p>
          <p id="gainsP2">{props.betArgs === null ? null : props.betArgs === null ? null : props.betArgs.toWin + " USDC"} </p>
        </div>
      </div>
      {props.address === undefined ? <p id="noAdressPBottomRight">Connect your wallet to start betting !</p> : <div id='buttonsBottomRightBar'>
        <button id="buttonApprover" onClick={(event) => { props.approve() }}><p id="approveP">APPROVE</p></button>
        <button id="buttonBetter" onClick={(event) => { props.betFunction(props.betArgs) }}><p id="betP">BET</p></button>
      </div>}

    </div>
  );

}
function decimalsConverter(numberToConvert) {
  return Math.pow(numberToConvert, 18)
}
BetterBottomRight.propTypes = {};

BetterBottomRight.defaultProps = {};

export default BetterBottomRight;
