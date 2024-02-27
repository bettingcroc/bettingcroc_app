import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { homeImage, titleImage, accountImage, accountImageWhite, celticsJersey, lakersJersey } from "../../images"
import "./ListBet.css"
import { MY_SERVER } from "../../consts"
import { CircularProgress } from "@mui/material";
import teams from "../../teams.json"

function ListBet(props) {
  const [matches, setMatches] = useState([])
  const [topMatches, setTopMatches] = useState([])
  const [dates, setDates] = useState([])
  const [matchesSorted, setMatchesSorted] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    props.vueSetter("listBets")
    props.mainVueSetter("bet")
    fetch(MY_SERVER + "/api/lastbets", { method: "GET" }).then(
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
          //let index = 0
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
          //console.log("matches then " + matches);
        })
      })
    fetch(MY_SERVER + "/api/topbets", { method: "GET" }).then((res) => {
      console.log(res)
      res.json().then((data) => {
        console.log("data")
        setTopMatches(data.matches);
        setIsLoading(false)


      })
      .catch((e)=>{console.log(e)});
      setIsLoading(false)

    });
  }, []);

  return (
    <div id="listBets" className={props.theme === "light" ? "backgroundLight" : "backgroundDark"} >
      <div id="box1ListBets"><img src={titleImage} alt="titleImage" id="titleImageListBets"></img></div>
      {!isLoading ? <div id="underListBets">
        <div id="box2ListBets">
          {topMatches.map((item, index) => {
            if (item) {
              return (
                <div className={props.theme === "light" ? "fireLight" : "fireDark"} key={item.betNumber}>
                  <Link className="topBetsBox" to={"/bet?n=" + item.betNumber} >
                    <div id={"topBetsBox" + (index + 1)} className={props.theme === "light" ? "whiteDiv" : "blackDiv"}>
                      <div className="topBetsMiniBox1"><p className="gold">{parseFloat(item.moneyBetted) / decimalsConverter(10)} USDT LOCKED</p></div>
                      <div className="topBetsMiniBox2">
                        <div className="topBetsMiniMiniBox1"><p>{item.type}{item.country}</p></div>
                        <div className="topBetsMiniMiniBox2">
                          <div className="lineTopBetsMiniMiniBox2">
                            <p id="nameBetTopBetsP" className={props.theme === "light" ? "blackP" : "whiteP"}>{item.name.split('-')[0]}</p>
                            <img className="jerseyImg" src={require("../../assets/jerseys/"+teams["NBA"][item.name.split("-")[0].replaceAll(' ', '')])}></img>
                          </div>
                          <div className="lineTopBetsMiniMiniBox2">
                            <p id="nameBetTopBetsP" className={props.theme === "light" ? "blackP" : "whiteP"}>{item.name.split('-')[1]}</p>
                            <img className="jerseyImg" src={require("../../assets/jerseys/"+teams["NBA"][item.name.split("-")[1].replaceAll(' ', '')])}></img>
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
        {matchesSorted.length === 0 ? null : dates.map((item, index) => {
          return (
            <div key={item} id="box3ListBets" className={props.theme === "light" ? "whiteDiv" : "blackDiv"}>
              <p id="dateListBet" className={props.theme === "light" ? "blackP" : "whiteP"}>{item}</p>
              {matchesSorted[index].map((item2, index2) =>
                <Link to={"/bet?n=" + item2.betNumber} key={item2.betNumber} className={props.theme === "light" ? "betLineListBets" : "betLineListBets"} >
                  <p className="greyP">{convertToReadableTime(item2.timestamp)}</p>

                  <img className="jerseyImgList" src={require("../../assets/jerseys/"+teams["NBA"][item2.name.split("-")[0].replaceAll(' ', '')])}></img>
                  <p id="nameBetListBetsP" className={props.theme === "light" ? "blackP" : "whiteP"}>{item2.name}</p>
                  <img className="jerseyImgList" src={require("../../assets/jerseys/"+teams["NBA"][item2.name.split("-")[1].replaceAll(' ', '')])}></img>

                  <p className="emojiBetline">{item2.type} {item2.country}</p>

                </Link>
              )}
            </div>)
        }
        )}</div>
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