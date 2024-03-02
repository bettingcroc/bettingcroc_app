/* global BigInt */
import React, { useState, useEffect } from 'react';
import "./OptionPool.css"


function OptionPool(props) {
  const [moneyInPool, setMoneyInPool] = useState()
  const [moneyIgot, setMoneyIgot] = useState()

  useEffect(() => {
    try {
      if (props.status !== 2) {
        props.betContract.methods
          .getAmountInPool(props.betNumber, props.optionNumber)
          .call()
          .then((result) => {
            try {
              setMoneyInPool(result)

            } catch (error) { }
          });
      }
      else {
        props.betContract.methods
          .getAmountInPoolEnd(props.betNumber, props.optionNumber)
          .call()
          .then((result) => {
            try {
              setMoneyInPool(result)

            } catch (error) { }
          })
          .catch((e) => { console.log(e) })
      }


    } catch (error) { }

  }, [props.moneyInOtherPools])

  useEffect(() => {
    try {
      props.betContract.methods
        .getAmountInPoolFromUserEnd(props.betNumber, props.optionNumber, props.address)
        .call()
        .then((result) => {
          console.log(result)
          try {
            setMoneyIgot(result)

          } catch (error) { }
        });
    } catch (error) { }
  }, [props.address, props.betNumber, props.amountToBet])

  function setBet() {
    props.setTypeBet(1);
    props.setBetArgs({
      betNumber: props.betNumber,
      optionNumber: props.optionNumber,
      amountToBet: weiconvert(props.amountToBet),
      optionName: props.team,
      betName: props.betName,
      toWin: props.moneyInOtherPools === null ? null : (parseFloat(props.amountToBet) * (((parseFloat(props.amountToBet) * props.moneyInOtherPools[props.optionNumber]) / ((parseFloat(moneyInPool) / decimalsConverter(10)) + parseFloat(props.amountToBet))) / parseFloat(props.amountToBet) + 1)).toFixed(2),
      cote: props.moneyInOtherPools === null ? null : (((parseFloat(props.amountToBet) * props.moneyInOtherPools[props.optionNumber]) / ((parseFloat(moneyInPool) / decimalsConverter(10)) + parseFloat(props.amountToBet))) / parseFloat(props.amountToBet) + 1).toFixed(2),
      league: props.betLeague //!== undefined? props.betLeague:null
    });
  }

  return (
    <div className="optionPool">
      {props.status === 0 ?
        <button className="buttonTeamTitle" onClick={(event) => { setBet(event); }}>
          <p className='teamTitle'>{props.team}</p>
          <p className='teamTitle'>{props.moneyInOtherPools === null ? null : (((parseFloat(props.amountToBet) * props.moneyInOtherPools[props.optionNumber]) / ((parseFloat(moneyInPool) / decimalsConverter(10)) + parseFloat(props.amountToBet))) / parseFloat(props.amountToBet) + 1).toFixed(2)}</p>
        </button> :
        <div className="buttonTeamTitleDiv"><p className='teamTitle'>{props.team}</p></div>}

      <div className='tableOptionPool'>
        {props.status === 0 ?

          <p className={props.theme === "light" ? "blackP cellOptionPool1" : "lightGreyP cellOptionPool1"}>To win : {props.moneyInOtherPools === null ? null : ((parseFloat(props.amountToBet) * props.moneyInOtherPools[props.optionNumber]) / ((parseFloat(moneyInPool) / decimalsConverter(10)) + parseFloat(props.amountToBet))).toFixed(2)} USDT</p>
          : null}


        <p className={props.theme === "light" ? "blackP cellOptionPool2" : "lightGreyP cellOptionPool2"}>
          Money in the pool : {parseFloat(moneyInPool) / decimalsConverter(10)} USDT
        </p>


        {props.moneyInOtherPools === null ? null : props.address !== undefined && moneyIgot > 0 ? <p className={props.theme === "light" ? "blackP cellOptionPool2" : "lightGreyP cellOptionPool2"}>I betted  {parseFloat(moneyIgot) / decimalsConverter(10)}  USDT and can win {(parseFloat(moneyIgot / moneyInPool * props.moneyInOtherPools[props.optionNumber]) + parseFloat(moneyIgot) / decimalsConverter(10)).toFixed(2)} USDT</p>
          : null}

      </div>


    </div>
  );
}


export default OptionPool;

function decimalsConverter(numberToConvert) {
  return Math.pow(numberToConvert, 18)
}
function weiconvert(number) { return BigInt(number * decimalsConverter(10)); }