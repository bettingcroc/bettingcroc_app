import React from 'react';
import PropTypes from 'prop-types';
import cross from './cross.png'

class BetMaker extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div id="betMaker">
        <div id="line1">
          <p id="betMakerLine1P">{this.props.typeBet === 1 ? "Bet on" : this.props.typeBet === 2 ? "Create a new bet" : this.props.typeBet === 3 ? "Join a bet" : null}</p>

          <button id="crossButton" onClick={(event) => { this.props.setTypeBet(0); this.props.setBetArgs(null) }}><img id="cross" src={cross} alt="cross"></img></button>

        </div>
        <div id="line3">
          <p>{this.props.betArgs.betName.split(',')[0]} - {this.props.betArgs.betName.split(',')[this.props.betArgs.betName.split(',').length - 1]} </p>
        </div>
        <div id="line2">
          <p>{this.props.typeBet === 1 || this.props.typeBet === 2 ? this.props.betArgs.optionName : this.props.typeBet === 3 ? "against " + this.props.betArgs.optionName : null}</p>
          <p>{this.props.betArgs.cote}</p>
        </div>
        {this.props.typeBet === 2 ? this.props.betArgs.authorized === undefined ? <p id="line4">Public bet</p> : <p id="line4">{"Private for : " + this.props.betArgs.authorized}</p> : null}
      </div>)
  }
}

BetMaker.propTypes = {};

BetMaker.defaultProps = {};

export default BetMaker;
function decimalsConverter(numberToConvert) {
  return Math.pow(numberToConvert, 18)
}