import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { homeImage, titleImage, accountImage, accountImageWhite, celticsJersey, lakersJersey } from "../../images"
import "./ListBet.css"
import { MY_SERVER } from "../../consts"
import { CircularProgress } from "@mui/material";
import teams from "../../teams.json"
import { useSearchParams } from "react-router-dom";
import flags from '../../assets/emojis.json';
const emojis = {
  "basketball": "🏀",
  "football": "⚽",
  "USA": "🇺🇸",
  "England": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  "Italy": '🇮🇹',
  "eurocups": "🇪🇺",
  "Spain": "🇪🇸"
}
const leaguesNames = {
  "nba": "NBA"
}
function ListBet(props) {
  const [leaguebetNumber, setLeaguebetNumber] = useState()
  const [leaguebetTimestamp, setLeaguebetTimestamp] = useState()
  const [leagueName, setLeagueName] = useState()
  const [matches, setMatches] = useState([])
  const [topMatches, setTopMatches] = useState([])
  const [dates, setDates] = useState([])
  const [matchesSorted, setMatchesSorted] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [timer, setTimer] = useState(0)
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    props.vueSetter("listBets")
    props.mainVueSetter("bet")
    console.log(flags["Hungary"])
  }, []);
  useEffect(() => {
    let league = searchParams.get("league")
    let sport = searchParams.get("sport")
    let url = "/api/lastbets"
    if (league) {
      url += `?league=${league}`
      setLeagueName(leaguesNames[league])
    } else if (sport) {
      url += `?sport=${sport}`
    }
    setIsLoading(true)
    fetch(MY_SERVER + url, { method: "GET" }).then(
      (res) => {
        res.json().then((data) => {
          setMatches(data.matches);
          let dates = []
          for (let m = 0; m < data.matches.length; m++) {
            const date = new Date(data.matches[m].timestamp * 1000);
            const day = date.getDate();
            const month = date.toLocaleString('en-GB', { month: 'long' });
            const year = date.getFullYear();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const seconds = date.getSeconds().toString().padStart(2, '0'); // Ensure double digits for seconds
            const formattedDate = `${day} ${month} ${year} ${hours}:${minutes}:${seconds}`;
            let arr = formattedDate.split(' ') //data.matches[m].date.split(' ')
            let d = arr[0] + " " + arr[1] + " " + arr[2]
            d = d.split(',').join('');
            if (!dates.includes(d)) { dates.push(d) }
          }
          dates.sort((a, b) => {
            return new Date(a) - new Date(b);
          });
          setDates(dates);
          let matchesSorted = []
          for (let d = 0; d < dates.length; d++) {
            matchesSorted.push([])
            for (let m in data.matches) {
              const date = new Date(data.matches[m].timestamp * 1000);
              const day = date.getDate();
              const month = date.toLocaleString('en-GB', { month: 'long' });
              const year = date.getFullYear();
              let dat = `${day} ${month} ${year}`
              if (dat === dates[d]) {
                matchesSorted[d].push(data.matches[m])
              }
            }
          }
          setMatchesSorted(matchesSorted)
        })
      })
    fetch(MY_SERVER + "/api/topbets", { method: "GET" }).then((res) => {
      res.json().then((data) => {
        setTopMatches(data.matches);
        setIsLoading(false)
        if (league !== null) {
          fetch(MY_SERVER + "/api/leaguebet?league=" + league, { method: "GET" }).then((res) => {
            res.json().then((data) => {
              console.log(data)
              setLeaguebetNumber(data.betNumber)
              setLeaguebetTimestamp(data.timestamp)
              console.log(Date.now())
              let time = data.timestamp * 1000 - Date.now()
              console.log(time)
              time = Math.floor(time / 1000)
              console.log(time)
              setTimer(time)
              let days1 = Math.floor(time / (24 * 3600));
              let hours1 = Math.floor((time % (24 * 3600)) / 3600);
              let minutes1 = Math.floor((time % 3600) / 60);
              let remainingSeconds1 = time % 60;
              console.log(`${days1} days, ${hours1} hours, ${minutes1} minutes, ${remainingSeconds1} seconds`)
            })
          })
        }
      })
        .catch((e) => {
          console.log(e)
          setIsLoading(false)
        })
    });
  }, [searchParams])
  function updateTimer() { }

  return (
    <div id="listBets" className={props.theme === "light" ? "backgroundLight" : "backgroundDark"} >
      <div id="box1ListBets"><img src={titleImage} alt="titleImage" id="titleImageListBets"></img></div>
      {!isLoading ?
        <div id="underListBets">
          <div id="box2ListBets">
            {topMatches.map((item, index) => {
              if (item) {
                return (
                  <div className={props.theme === "light" ? "fireLight" : "fireDark"} key={item.betNumber}>
                    <Link className="topBetsBox" to={"/bet?n=" + item.betNumber} >
                      <div id={"topBetsBox" + (index + 1)} className={props.theme === "light" ? "whiteDiv" : "blackDiv"}>
                        <div className="topBetsMiniBox1"><p className="gold">{parseFloat(item.moneyBetted) / decimalsConverter(10)} USDT LOCKED</p></div>
                        <div className="topBetsMiniBox2">
                          <div className="topBetsMiniMiniBox1"><p>{emojis[item.type]} {emojis[item.country]}</p></div>
                          <div className="topBetsMiniMiniBox2">
                            <div className="lineTopBetsMiniMiniBox2">
                              <p id="nameBetTopBetsP" className={props.theme === "light" ? "blackP" : "whiteP"}>
                                {item.league === "UEFA European Championship - Group Stage" ? flags[item.name.split('-')[0].replace(" ", "")] : null}
                                {" "}
                                {item.name.split('-')[0]}
                              </p>
                              {item.league === "NBA" && <img className="jerseyImg" src={require("../../assets/jerseys/" + teams["NBA"][item.name.split("-")[0].replaceAll(' ', '')])}></img>}
                            </div>
                            <div className="lineTopBetsMiniMiniBox2">
                              <p id="nameBetTopBetsP" className={props.theme === "light" ? "blackP" : "whiteP"}>
                                {item.league === "UEFA European Championship - Group Stage" ? flags[item.name.split('-')[1].replace(" ", "")] : null}
                                {" "}
                                {item.name.split('-')[1]}
                              </p>
                              {item.league === "NBA" && <img className="jerseyImg" src={require("../../assets/jerseys/" + teams["NBA"][item.name.split("-")[1].replaceAll(' ', '')])}></img>}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                )
              }
            })}
          </div>
          {leaguebetNumber && <Link to={"/leaguebet?n=" + leaguebetNumber} id="leagueBetLink" className={props.theme === "light" ? "whiteDiv" : "blackDiv"}><p id="leagueBetLinkP" className={props.theme === "light" ? "blackP" : "whiteP"}>Bet on the {leagueName} winner</p>
            <p className={props.theme === "light" ? "blackP" : "whiteP"}>{`closing in ${Math.floor(timer / (24 * 3600))} days ${Math.floor((timer % (24 * 3600)) / 3600)} hours ${Math.floor((timer % 3600) / 60)} minutes ${timer % 60} seconds`}</p> </Link>}
          {matchesSorted.length === 0 ? null : dates.map((item, index) => {
            return (
              <div key={item} id="box3ListBets" className={props.theme === "light" ? "whiteDiv" : "blackDiv"}>
                <p id="dateListBet" className={props.theme === "light" ? "blackP" : "whiteP"}>{item}</p>
                {matchesSorted[index].map((item2, index2) =>
                  <Link to={"/bet?n=" + item2.betNumber} key={item2.betNumber} className={props.theme === "light" ? "betLineListBets" : "betLineListBets"} >
                    <p className="scheduleBetLine">{convertToReadableTime(item2.timestamp)}</p>

                    {item2.league === "NBA" && <img className="jerseyImgList" src={require("../../assets/jerseys/" + teams["NBA"][item2.name.split("-")[0].replaceAll(' ', '')])}></img>}
                    <p id="nameBetListBetsP" className={props.theme === "light" ? "blackP" : "whiteP"}>
                    {item2.league === "UEFA European Championship - Group Stage" ? flags[item2.name.split('-')[0].replace(" ", "")]+" " : null}
                      {item2.name}
                      {item2.league === "UEFA European Championship - Group Stage" ? " "+flags[item2.name.split('-')[1].replace(" ", "")] : null}
                      </p>
                    {item2.league === "NBA" && <img className="jerseyImgList" src={require("../../assets/jerseys/" + teams["NBA"][item2.name.split("-")[1].replaceAll(' ', '')])}></img>}

                    <p className="emojiBetline">{emojis[item2.type]} {emojis[item2.country]}</p>

                  </Link>
                )}
              </div>)
          }
          )}
        </div>
        : <CircularProgress id='loadingCircleBet'></CircularProgress>
      }
    </div>
  );

}

export default ListBet;

function decimalsConverter(numberToConvert) {
  return Math.pow(numberToConvert, 18)
}

function convertToReadableTime(timestamp) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
}