import React from 'react';
import PropTypes from 'prop-types';
import cross from './cross.png'
import "./betMaker.css"


function BetMaker(props) {

  return (
    <div id="betMaker">
      <div id="line1">
        <p id="betMakerLine1P">{props.typeBet === 1 ? "Bet on" : props.typeBet === 2 ? "Create a new bet" : props.typeBet === 3 ? "Join a bet" : null}</p>

        <button id="crossButton" onClick={(event) => { props.setTypeBet(0); props.setBetArgs(null) }}><img id="cross" src={cross} alt="cross"></img></button>

      </div>
      <div id="line3">
        <p>{props.betArgs.betName.split(',')[0]} - {props.betArgs.betName.split(',')[props.betArgs.betName.split(',').length - 1]} </p>
      </div>
      <div id="line2">
        <p>{props.typeBet === 1 || props.typeBet === 2 ? props.betArgs.optionName : props.typeBet === 3 ? "against " + props.betArgs.optionName : null}</p>
        <p>{props.betArgs.cote}</p>
      </div>
      {props.typeBet === 2 ? props.betArgs.authorized === undefined ? <p id="line4">Public bet</p> : <p id="line4">{"Private for : " + props.betArgs.authorized}</p> : null}
    </div>)

}

BetMaker.propTypes = {};

BetMaker.defaultProps = {};

export default BetMaker;
function decimalsConverter(numberToConvert) {
  return Math.pow(numberToConvert, 18)
}