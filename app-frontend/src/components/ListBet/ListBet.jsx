import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { homeImage, titleImage, accountImage, accountImageWhite } from "../../images"
import "./ListBet.css"
import { MY_SERVER } from "../../consts"


function ListBet(props) {
  const [matches, setMatches] = useState([])
  const [topMatches, setTopMatches] = useState([])
  const [dates, setDates] = useState([])
  const [matchesSorted, setMatchesSorted] = useState([])

  useEffect(() => {
    props.vueSetter("listBets")
    props.mainVueSetter("bet")
    fetch(MY_SERVER + "/api/lastbets", { method: "GET" }).then(
      (res) => {
        res.json().then((data) => {
          setMatches(data.matches);
          let dates = []
          for (let m = 0; m < data.matches.length; m++) {
            let arr = data.matches[m].date.split(' ')
            let d = arr[0] + " " + arr[1] + " " + arr[2]
            if (!dates.includes(d)) { dates.push(d) }
          }
          setDates(dates);
          let index = 0
          let matchesSorted = []
          for (let d = 0; d < dates.length; d++) {
            matchesSorted.push([])
            for (let m in data.matches) {
              let arr = data.matches[m].date.split(' ')
              let dat = arr[0] + " " + arr[1] + " " + arr[2]
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
      res.json().then((data) => {
        setTopMatches(data.matches);

      });
    });
  }, []);

  return (
    <div className="listBets">
      <div id="box1ListBets"><img src={titleImage} alt="titleImage" id="titleImageListBets"></img></div>
      <div id="box2ListBets">
        {topMatches.map((item, index) => {
          if (item) {
            return (
              <div className={props.theme === "light" ? "fireLight" : "fireDark"} key={item.betNumber}>
                <Link className="topBetsBox" to={"/bet?n=" + item.betNumber} >
                  <div id={"topBetsBox" + (index + 1)} className={props.theme === "light" ? "whiteDiv" : "blackDiv"}>
                    <div className="topBetsMiniBox1"><p className={props.theme === "light" ? "blackP" : "lightGreyP"}>{parseFloat(item.moneyBetted) / decimalsConverter(10)} USDT Locked 🔥</p></div>
                    <div className="topBetsMiniBox2">
                      <div className="topBetsMiniMiniBox1"><p>{item.type}</p></div>
                      <div className="topBetsMiniMiniBox2">
                        <p id="nameBetTopBetsP" className={props.theme === "light" ? "blackP" : "whiteP"}>{item.name.split('-')[0]}</p>
                        <p id="nameBetTopBetsP" className={props.theme === "light" ? "blackP" : "whiteP"}>{item.name.split('-')[1]}</p>
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
                <p className="greyP">{convertToReadableTime(item2.date.split(' ')[3])}</p>
                <p  className="emojiBetline">{item2.type} {item2.country}</p>


                <p id="nameBetListBetsP" className={props.theme === "light" ? "blackP" : "whiteP"}>{item2.name}</p>
              </Link>
            )}
          </div>)
      }
      )}
    </div>
  );

}

export default ListBet;

function decimalsConverter(numberToConvert) {
  return Math.pow(numberToConvert, 18)
}

function convertToReadableTime(time) {
  const [hours, minutes, seconds] = time.split(':').map(num => num.padStart(2, '0'));
  return `${hours}:${minutes}`;
}