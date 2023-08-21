import React from 'react';
import PropTypes from 'prop-types';
import "./BetterBottomRight.css"

class BetterBottomRight extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id="bottomRightBar">
        <div id="underBottomRightBar">
          <div id="inputLine">
            <p id="inputP">Input</p>
            <p id="inputP2">{this.props.betArgs === null ? null : parseFloat(this.props.betArgs.amountToBet) / decimalsConverter(10) + " USDT"}</p>
          </div>
          <div id="gainsLine">
            <p id="gainsP">Gains</p>
            <p id="gainsP2">{this.props.betArgs === null ? null : this.props.betArgs === null ? null : this.props.betArgs.toWin + " USDT"} </p>
          </div>
        </div>
        {this.props.address === undefined ? <p id="noAdressPBottomRight">Connect your wallet to start betting !</p> : <div id='buttonsBottomRightBar'>
          <button id="buttonApprover" onClick={(event) => { this.props.approve() }}><p id="approveP">APPROVE</p></button>
          <button id="buttonBetter" onClick={(event) => { this.props.betFunction(this.props.betArgs) }}><p id="betP">BET</p></button>
        </div>}

      </div>
    );
  }
}
function decimalsConverter(numberToConvert) {
  return Math.pow(numberToConvert, 18)
}
BetterBottomRight.propTypes = {};

BetterBottomRight.defaultProps = {};

export default BetterBottomRight;
