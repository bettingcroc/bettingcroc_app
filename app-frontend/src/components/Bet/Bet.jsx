import React, { useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import OptionPool from "../OptionPool/OptionPool";
import P2PBetOption from "../P2PBetOption/P2PBetOption";
import P2PBetCreator from "../P2PBetCreator/P2PBetCreator";
import P2PFinder from "../P2PFinder/P2PFinder";
import Jauge from "../Jauge/Jauge";
import FriendInviter from "../FriendInviter/FriendInviter";
import "./Bet.css"
import { MY_SERVER } from "../../consts"

const Bet = (props) => {
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
  useEffect(() => {
    props.mainVueSetter("bet")
  }, [])
  useEffect(() => {
    fetch(MY_SERVER + "/api/infoMatch/" + searchParams.get("n"), { method: "GET" }).then((res) => {
      res.json().then(async (data) => {
        setOptionArray(data.optionsArray)
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
  useEffect(() => {
    if (props.logged) {
      let link = MY_SERVER + "/api/myfriends/"
      fetch(link, { method: "GET", credentials: 'include' }).then((res) => {
        res.json().then((data) => {
          setFriends(data)
        });
      });
    }
  }, [props.logged])
  function openModalInviter() {
    setModalInviterOpened(true)
  }
  function closeModalInviter() {
    setModalInviterOpened(false)
  }
  return (
    <div id="superBetComplet">
      {status === 0 ? <Jauge balanceUSDT={props.balanceUSDT} amountToBet={props.amountToBet} setAmountBet={props.setAmountBet} theme={props.theme}></Jauge> : null}
      <div className={status === 0 ? "betCompletOpen" : "betComplet"}>
        <div id="underNameBet" className={props.theme === "light" ? "whiteDiv" : "blackDiv"}>
          <div id="countryLeagueDate">
            <p className={props.theme === "light" ? "headerTitle" : "headerTitleDark"}>{country} / {league}</p>
            <p className={props.theme === "light" ? "headerTitle" : "headerTitleDark"}>{status === 0 ? timeConverterDate(date) : status === 2 ? null : "chrono"}</p>
          </div>
          <div id="optionsSchedule">
            <div id={status === 2 && scoreHome > scoreAway ? "optionWinner" : "option1"} className="optionDiv">

              <p id={status === 2 && scoreHome > scoreAway ? "optionPWinner" : "option1P"} className={props.theme === "light" ? "blackP" : "lightGreyP"}>{optionsArray === undefined ? null : optionsArray.split(",")[0]}</p>

            </div>
            {status === 0 ?
              <div id="schedule">
                <p id="scheduleP" className="scheduleTitle"> {timeConverterSchedule(date)}</p>
              </div> :
              <div id="scoreDiv">
                <div id="schedule">
                  <p id="scheduleP" className="scheduleTitle"> {scoreAway !== undefined ? scoreHome + " - " + scoreAway : null}</p>
                </div>

              </div>}
            <div id={status === 2 && scoreHome < scoreAway ? "optionWinner" : "option2"} className="optionDiv">

              <p id={status === 2 && scoreHome < scoreAway ? "optionPWinner" : "option2P"} className={props.theme === "light" ? "blackP" : "lightGreyP"}>{optionsArray === undefined ? null : optionsArray.split(",")[optionsArray.split(",").length - 1]}</p>
            </div>
          </div>
        </div>
        <div id="optionsPool" className={props.theme === "light" ? "whiteDiv" : "blackDiv"}>
          <div id="gameResults">
            <p className={props.theme === "light" ? "blackP" : "whiteP"} id="gameResultsP">Game Results</p>
            {props.logged && status === 0 ? <div className="friendInviterTrigger">
              <button className="buttonInviter" onClick={openModalInviter}>Invite a friend</button>
              {modalInviterOpened ? <FriendInviter address={props.address} socket={props.socket} typeBet="general" friends={friends} modalCloser={closeModalInviter} argsBet={{ betNumber: searchParams.get("n"), title: optionsArray }}></FriendInviter> : null}
            </div> : null}
          </div>
          <div id="optionsBox">
            {
              optionsArray === undefined ?
                null :
                optionsArray.split(",").map((item, index) => {
                  return <OptionPool key={item} team={item} status={status} moneyInOtherPools={moneyInPools === undefined ? null : moneyInPools} betNumber={searchParams.get("n")} optionNumber={index} betContract={props.betContract} usdtContract={props.usdtContract} address={props.address} amountToBet={props.amountToBet} setTypeBet={props.setTypeBet} setBetArgs={props.setBetArgs} betName={optionsArray} theme={props.theme}></OptionPool>
                })}
          </div>
        </div>

        <div id="p2p1" style={status !== 0 ? { marginBottom: "30px" } : null}>
          <P2PFinder optionsArray={optionsArray} betContract={props.betContract} betNumber={searchParams.get("n")} setP2PdisplayArgs={setP2PdisplayArgs} theme={props.theme}></P2PFinder>

          {
            status === 0 ?
              <P2PBetCreator status={status} betContract={props.betContract} usdtContract={props.usdtContract} address={props.address} mbtContract={props.mbtContract} optionsArray={optionsArray} betNumber={searchParams.get("n")} amountToBet={props.amountToBet} setTypeBet={props.setTypeBet} setBetArgs={props.setBetArgs} theme={props.theme} ></P2PBetCreator>
              :
              <P2PBetOption status={status} logged={props.logged} socket={props.socket} friends={friends} args={p2pdisplayArgs} betNumber={searchParams.get("n")} betContract={props.betContract} usdtContract={props.usdtContract} address={props.address} optionsArray={optionsArray} amountToBet={props.amountToBet} setTypeBet={props.setTypeBet} setBetArgs={props.setBetArgs} theme={props.theme}></P2PBetOption>
          }

        </div>

        {
          status === 0 ?
            <P2PBetOption status={status} logged={props.logged} socket={props.socket} friends={friends} args={p2pdisplayArgs} betNumber={searchParams.get("n")} betContract={props.betContract} usdtContract={props.usdtContract} address={props.address} optionsArray={optionsArray} amountToBet={props.amountToBet} setTypeBet={props.setTypeBet} setBetArgs={props.setBetArgs} theme={props.theme}></P2PBetOption>
            :
            null
        }
      </div>

    </div>
  );
}

Bet.propTypes = {};

Bet.defaultProps = {};

export default Bet;


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