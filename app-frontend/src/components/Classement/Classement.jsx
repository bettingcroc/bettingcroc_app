import React, { useState, useEffect } from "react";
import "./Classement.css"
import { MY_SERVER } from "../../consts"

function Classement(props) {
  const [classement, setClassement] = useState()
  const [classementFriends, setClassementFriends] = useState()
  const [dataPerso, setDataPerso] = useState()
  const [loaded, setLoaded] = useState(false)
  const [addressSearch, setAddressSearch] = useState("")
  const [dataAddressSearch, setDataAddressSearch] = useState()
  useEffect(() => {
    props.vueSetter("rankings")
    props.mainVueSetter("rankings")
    fetch(MY_SERVER + "/api/classement/", { method: "GET" }).then((res) => {
      res.json().then((data) => {
        setClassement(data)
      });
    });
  }, [])
  useEffect(() => {
    if (props.address !== "" && props.address !== undefined) {
      fetch(MY_SERVER + "/api/score/" + props.address, { method: "GET" }).then((res) => {
        res.json().then((data) => {
          if (loaded === false && props.address !== undefined && data.length > 0) {
            setLoaded(true)
            setDataPerso(data)
          }
        });
      });
    }
  }, [props.address])
  useEffect(() => {
    if (props.logged) {
      fetch(MY_SERVER + "/api/classementFriends/" + props.address, { method: "GET" }).then((res) => {
        res.json().then((data) => {
          setClassementFriends(data)
        });
      });
    }
  }, [props.logged])

  function searchScore() {
    if (addressSearch !== undefined && addressSearch != "") {
      fetch(MY_SERVER + "/api/score/" + addressSearch, { method: "GET" }).then((res) => {
        res.json().then((data) => {
          if (data.length > 0) {
            setDataAddressSearch(data)
          }
          else {
            setDataAddressSearch(
              [{ "address": null, "position": null, "score": null, "pseudo": null }]
            )
          }
        });
      });
    }
  }

  return (
    <div id="mainContentClassement">

      <p id="rankingsTitle" className={props.theme === "light" ? "blackP" : "whiteP"}>Rankings</p>
      {classementFriends !== undefined ? <p className={props.theme === "light" ? "blackP" : "whiteP"}>Friends rankings</p> : null}
      {classementFriends !== undefined ? <table id={props.theme === "light" ? "classementTable" : "classementTableDark"}>
        <thead>
          <tr>
            <th id="addressRankingColumn">Address</th>
            <th>Pseudo</th>
            <th>Score</th>
            <th>Rank</th>
          </tr>
        </thead>
        <tbody>
          {classementFriends === undefined ? null : classementFriends.map((item, index) => {
            //console.log("item "+index)

            //console.log(item)
            if (item === null) { return null }
            return <tr key={index}>
              <td className="addressRankingCell">{item.address}</td>
              <td>{item.pseudo}</td>
              <td>{item.score}</td>
              <td>{index + 1}</td>
            </tr>
          })}
          {loaded === false ? null : <tr>
            <td className="addressRankingCell">{props.address}</td>
            <td>{loaded && dataPerso[0].pseudo !== undefined ? dataPerso[0].pseudo : "-"}</td>
            <td>{loaded ? dataPerso[0].score : ""}</td>
            <td>{loaded ? dataPerso[0].position : ""}</td>
          </tr>}
        </tbody>
      </table> : <p className={props.theme === "light" ? "blackP" : "whiteP"}>Connect your wallet and login to start bet with your friends</p>}
      <p className={props.theme === "light" ? "blackP" : "whiteP"}>World Rankings</p>
      <table id={props.theme === "light" ? "classementTable" : "classementTableDark"}>
        <thead>
          <tr>
            <th id="addressRankingColumn">Address</th>
            <th>Pseudo</th>
            <th>Score</th>
            <th>Rank</th>
          </tr>
        </thead>
        <tbody>
          {classement === undefined ? null : classement.map((item, index) => {
            //console.log("item "+index)

            //console.log(item)
            if (item === null) { return null }
            return <tr key={index}>
              <td className="addressRankingCell">{item.address}</td>
              <td>{item.pseudo}</td>
              <td>{item.score}</td>
              <td>{index + 1}</td>
            </tr>
          })}
          {loaded === false ? null : <tr>
            <td className="addressRankingCell">{props.address}</td>
            <td>{loaded && dataPerso[0].pseudo !== undefined ? dataPerso[0].pseudo : "-"}</td>
            <td>{loaded ? dataPerso[0].score : ""}</td>
            <td>{loaded ? dataPerso[0].position : ""}</td>
          </tr>}
        </tbody>
      </table>
      <div>
        <div>
          <input placeholder="Type an address here" className="settingsInput" type="text" value={addressSearch} onChange={(e) => setAddressSearch(e.target.value)}></input>
          <button onClick={searchScore}>Seach address</button>

        </div>

        {dataAddressSearch === undefined ? null : dataAddressSearch[0].address === null ? <p className={props.theme === "light" ? "blackP" : "whiteP"}>addressSearch not a betting croc yet</p> :
          <table id={props.theme === "light" ? "classementTable" : "classementTableDark"}>

            <thead>
              <tr>
                <th id="addressRankingColumn">Address</th>
                <th>Pseudo</th>
                <th>Score</th>
                <th>Rank</th>
              </tr>
            </thead>
            <tbody>
              <tr id={props.theme === "light" ? "classementTable" : "classementTableDark"}>
                <td className="addressRankingCell">{addressSearch}</td>
                <td>{dataAddressSearch[0].pseudo !== null ? dataPerso[0].pseudo : "-"}</td>
                <td>{dataAddressSearch[0].score !== null ? dataAddressSearch[0].score : "-"}</td>
                <td>{dataAddressSearch[0].position !== null ? dataAddressSearch[0].position : "-"}</td>
              </tr>
            </tbody>
          </table>}
      </div>
    </div>

  )
}


export default Classement;
