import React, { useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import Jauge from '../Jauge/Jauge';
import FriendInviter from '../FriendInviter/FriendInviter';
import OptionPool from '../OptionPool/OptionPool';
import { CircularProgress } from '@mui/material';
import { MY_SERVER } from "../../consts"

const LeagueBet = (props) => {
  const [optionsArray, setOptionArray] = useState()
  const [date, setDate] = useState()
  const [type, setType] = useState()
  const [country, setCountry] = useState()
  const [league, setLeague] = useState()
  const [moneyInPools, setMoneyInPools] = useState()
  const [p2pdisplayArgs, setP2PdisplayArgs] = useState()
  const [friends, setFriends] = useState()
  const [searchParams, setSearchParams] = useSearchParams();
  const [status, setStatus] = useState()
  const [scoreHome, setScoreHome] = useState()
  const [scoreAway, setScoreAway] = useState()
  const [modalInviterOpened, setModalInviterOpened] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    props.mainVueSetter("bet")
  }, [])
  useEffect(() => {
    fetch(MY_SERVER + "/api/infoMatch/" + searchParams.get("n"), { method: "GET" }).then((res) => {
      res.json().then(async (data) => {
        let optionsArray = data.optionsArray.split(",")
        const newArray = [];
        const chunkSize = 3;

        for (let i = 0; i < optionsArray.length; i += chunkSize) {
          newArray.push(optionsArray.slice(i, i + chunkSize));
        }

        if (optionsArray.length % chunkSize !== 0) {
          newArray[newArray.length - 1] = optionsArray.slice(-1);
        }

        setOptionArray(newArray)
        setDate(data.date)
        setType(data.type)
        setCountry(data.country)
        setLeague(data.league)
        setStatus(data.status)
        setScoreHome(data.scoreHome)
        setScoreAway(data.scoreAway)
        let sizeBet = 0
        try { sizeBet = data.optionsArray.split(",").length }
        catch (error) { console.log(error) }
        let moneyInPoolsLet = []
        for (let i = 0; i < sizeBet; i++) {
          moneyInPoolsLet.push(-1)
        }
        setIsLoading(false)
        if (props.betContract !== undefined) {

          await new Promise(async next2 => {
            for (let i = 0; i < sizeBet; i++) {
              try {
                await new Promise(next => {
                  props.betContract.methods
                    .getAmountInPool(searchParams.get("n"), i)
                    .call()
                    .then((result) => {
                      moneyInPoolsLet[i] += 1
                      try {
                        for (let a = 0; a < sizeBet; a++) {
                          if (a !== i) {
                            moneyInPoolsLet[a] += parseFloat(result) / decimalsConverter(10);
                          }

                        }
                        next()

                      } catch (error) { }
                    });

                })
              } catch (error) { }
            }
            next2()
          })
          setMoneyInPools(moneyInPoolsLet)
        }
      });
    });
  }, [props.betContract, searchParams.get("n")]);
  function openModalInviter() {
    setModalInviterOpened(true)
  }
  function closeModalInviter() {
    setModalInviterOpened(false)
  }
  return (
    <div>
      {!isLoading ?
        <div id={props.theme === "light" ? "superBetCompletLight" : "superBetCompletDark"}>
          {status === 0 ?
            <Jauge address={props.address} balanceUSDT={props.balanceUSDT} amountToBet={props.amountToBet} setAmountBet={props.setAmountBet} theme={props.theme}></Jauge> : null}
          <div className={status === 0 ? "betCompletOpen" : "betComplet"}>
            <div id="underNameBet" className={props.theme === "light" ? "whiteDiv" : "blackDiv"}>
              <div id="countryLeagueDate">
                <p className={props.theme === "light" ? "headerTitle" : "headerTitleDark"}>{country} / {league}</p>
                <p className={props.theme === "light" ? "headerTitle" : "headerTitleDark"}>{status === 0 && timeConverterDate(date) +" "+timeConverterSchedule(date) }</p>
              </div>
  
            </div>
            <div id="optionsPool" className={props.theme === "light" ? "whiteDiv" : "blackDiv"}>
              <div id="gameResults">
                <p className={props.theme === "light" ? "blackP" : "whiteP"} id="gameResultsP">League Winner</p>
                {props.logged && status === 0 ? <div className="friendInviterTrigger">
                  <button className="buttonInviter" onClick={openModalInviter}>Invite a friend</button>
                  {modalInviterOpened ? <FriendInviter address={props.address} socket={props.socket} typeBet="general" friends={friends} modalCloser={closeModalInviter} argsBet={{ betNumber: searchParams.get("n"), title: optionsArray }}></FriendInviter> : null}
                </div> : null}
              </div>
              <div id="optionsBoxLeague">
                {
                  optionsArray === undefined ?
                    null :
                    optionsArray.map((item, index) => {
                      return <div className='optionLineLeague' key={index}>
                        {item.map((item2, index2) => {
                          return <OptionPool key={item2} team={item2} status={status} moneyInOtherPools={moneyInPools === undefined ? null : moneyInPools} betNumber={searchParams.get("n")} optionNumber={index2} betContract={props.betContract} usdtContract={props.usdtContract} address={props.address} amountToBet={props.amountToBet} setTypeBet={props.setTypeBet} setBetArgs={props.setBetArgs} betName={optionsArray} theme={props.theme} betLeague={league}></OptionPool>

                        })}
                      </div>
                    })}
              </div>
              <a className="needMoreHelpP" href="/docs">Need help with this ? Check this.</a>

            </div>


          </div>

        </div> : <div id={props.theme === "light" ? "superBetCompletLight" : "superBetCompletDark"}><CircularProgress id='loadingCircleBet'></CircularProgress></div>
      }
    </div>
  );
}


function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
  return time;
}
function timeConverterDate(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var time = date + ' ' + month + ' ' + year;
  return time;
}
function timeConverterSchedule(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  //console.log("len "+hour.toString().length)
  if (hour.toString().length === 1) { hour = '0' + hour }
  if (min.toString().length === 1) { min = '0' + min }

  var time = hour + ':' + min
  //+ ':' + sec;
  return time;
}

function decimalsConverter(numberToConvert) {
  return Math.pow(numberToConvert, 18)
}
export default LeagueBet;
