import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import "./GetGains.css"

function GetGains(props) {
  const [gains, setGains] = useState(0)
  const [gainsFromGeneral, setGainsFromGeneral] = useState(0)
  const [gainsFromP2P, setGainsFromP2P] = useState(0)
  const [won, setWon] = useState(0)

  useEffect(() => {
    if (props.address !== undefined && props.betContract !== undefined) {
      try {
        props.betContract.methods.totalMoneyWonFromUser(props.address).call().then(result => {
          setGainsFromGeneral(parseFloat(result) / decimalsConverter(10))
          props.betContract.methods.totalMoneyWonFromUserP2P(props.address).call().then(result2 => {
            setGainsFromP2P(parseFloat(result2) / decimalsConverter(10))
            setGains(parseFloat(result) / decimalsConverter(10) + parseFloat(result2) / decimalsConverter(10))
            console.log("gains " + gains)
            if (gains > 0) {
              setWon(true)
            }
            else {
              setWon(false)
            }
          })
        })
      }
      catch (e) { console.log(e) }
    }
  }, [props.address, props.betContract])

  function getGains() {
    //console.log(gainsFromGeneral+" "+gainsFromP2P)
    if (gainsFromGeneral > 0 && gainsFromP2P > 0) {
      props.betContract.methods.claimTotalMoney().send({ from: props.address })
        .once('receipt', (receipt) => {
          console.log("all gains recupered success")
        })
    }
    else if (gainsFromGeneral > 0 && gainsFromP2P === 0) {
      props.betContract.methods.claimMoney().send({ from: props.address })
        .once('receipt', (receipt) => {
          console.log("all gains from general recupered success")
        })
    }
    else if (gainsFromGeneral === 0 && gainsFromP2P > 0) {
      props.betContract.methods.claimMoneyFromP2P().send({ from: props.address })
        .once('receipt', (receipt) => {
          console.log("all gains from P2P recupered success")
        })
    }
    else { console.log("Bet first !") }
  }
  return (
    <div id="getGainsDiv">
      {props.address === undefined ? null : <button onClick={getGains} id="getGainsButton" className={won ? "goldButton" : "greyButton"}><p>{won ? "Get " + gains + " USDT !" : "Waiting for some money"}</p></button>}
    </div>
  );

}


GetGains.defaultProps = {};

export default GetGains;

function decimalsConverter(numberToConvert) {
  return Math.pow(numberToConvert, 18)
}