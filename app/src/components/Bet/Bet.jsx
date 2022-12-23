import React from "react";
import BetComplet from "../BetComplet/BetComplet";
import { useSearchParams } from "react-router-dom";

const Bet = (props)=>{
  
  let [searchParams, setSearchParams] = useSearchParams();
  console.log("searchParams")
  console.log(searchParams)
  console.log(searchParams.get("n"))
  console.log(searchParams.get("p2p"))

  console.log("searchParams")
  return <div>{<BetComplet betNumber={searchParams.get("n")} p2pLink={searchParams.get("p2p")===undefined?undefined:searchParams.get("p2p")} betContract={props.betContract} usdtContract={props.usdtContract} mbtContract={props.mbtContract} address={props.address} amountToBet={props.amountToBet} setTypeBet={props.setTypeBet} setBetArgs={props.setBetArgs} balanceUSDT={props.balanceUSDT} setAmountBet={props.setAmountBet}></BetComplet>}</div>;
}
  

  


Bet.propTypes = {};

Bet.defaultProps = {};

export default Bet;
