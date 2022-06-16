import React from "react";
import BetComplet from "../BetComplet/BetComplet";
import { useSearchParams } from "react-router-dom";

const Bet = (props)=>{
  
  let [searchParams, setSearchParams] = useSearchParams();

  return <div>{<BetComplet betNumber={searchParams.get("n")} betContract={props.betContract} usdtContract={props.usdtContract} mbtContract={props.mbtContract} address={props.address}></BetComplet>}</div>;
}
  

  


Bet.propTypes = {};

Bet.defaultProps = {};

export default Bet;
