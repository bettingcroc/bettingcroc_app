import React from 'react';
import PropTypes from 'prop-types';


class BetMaker extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div id="betMaker">
        <div id="line1">
          <p>{this.props.betArgs.betName.split(',')[0]} - {this.props.betArgs.betName.split(',')[this.props.betArgs.betName.split(',').length - 1]} </p>
          <button onClick={(event) => { this.props.setTypeBet(0); this.props.setBetArgs(null) }}>X</button>

        </div>
        <div id="line2">
          <p>{this.props.betArgs.optionName}</p>
          <p>{this.props.betArgs.cote}</p>
        </div>

        {/*<p>{parseFloat(this.props.betArgs.amountToBet) / decimalsConverter(10)} USDT</p>*/}
      </div>)
  }
}

BetMaker.propTypes = {};

BetMaker.defaultProps = {};

export default BetMaker;
function decimalsConverter(numberToConvert) {
  return Math.pow(numberToConvert, 18)
}