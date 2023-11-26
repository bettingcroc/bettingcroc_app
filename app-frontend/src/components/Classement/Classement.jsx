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
    fetch(MY_SERVER + "/api/classement/", { method: "GET", credentials: 'include' }).then((res) => {
      res.json().then((data) => {
        setClassement(data)
      });
    });
  }, [])
  useEffect(() => {
    if (props.address !== "" && props.address !== undefined) {
      fetch(MY_SERVER + "/api/score/" + props.address, { method: "GET", credentials: 'include' }).then((res) => {
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
      fetch(MY_SERVER + "/api/classementFriends/" + props.address, { method: "GET", credentials: 'include' }).then((res) => {
        res.json().then((data) => {
          setClassementFriends(data)
        });
      });
    }
  }, [props.logged])

  function searchScore() {
    if (addressSearch !== undefined && addressSearch != "") {
      fetch(MY_SERVER + "/api/score/" + addressSearch, { method: "GET", credentials: 'include' }).then((res) => {
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
      <div id="rankingsIntro" className={props.theme === "light" ? "classementDiv" : "classementDivDark"}>
        <p id="rankingsTitle" className={props.theme === "light" ? "blackP" : "whiteP"}>Rankings</p>
        <p id='introRankingsP' className={props.theme === "light" ? "blackP" : "lightGreyP"}> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam viverra tellus libero, dapibus dapibus nibh mattis id. Cras eu lacinia mauris. In sed aliquet ante, ac rhoncus velit. Aliquam et elit turpis. Duis sit amet cursus justo, a condimentum justo. Integer neque ipsum, tristique sit amet odio nec, pulvinar accumsan elit. Cras tincidunt lobortis tortor, vel luctus felis porta et. Phasellus vel risus ac erat pretium dapibus. </p>

      </div>
      {classementFriends !== undefined ? <div className={props.theme === "light" ? "classementDiv" : "classementDivDark"}>
        <p className={props.theme === "light" ? "headerTitle" : "headerTitleDark"}>Friends rankings</p>
        <p className={props.theme === "light" ? "blackP" : "lightGreyP"}> </p>
        <div id={props.theme === "light" ? "classementTable" : "classementTableDark"}>
          <tr>
            <th id="addressRankingColumn">Address</th>
            <th>Pseudo</th>
            <th>Score</th>
            <th>Rank</th>
          </tr>
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
        </div>
      </div> : <p className={props.theme === "light" ? "blackP" : "whiteP"}>Connect your wallet and login to start bet with your friends</p>}
      <div className={props.theme === "light" ? "classementDiv" : "classementDivDark"}>
        <p className={props.theme === "light" ? "headerTitle" : "headerTitleDark"}>World Rankings</p>
        <p className={props.theme === "light" ? "blackP" : "lightGreyP"}> Look out for the best betters of the world </p>

        <div id={props.theme === "light" ? "classementTable" : "classementTableDark"}>
          <tr>
            <th id="addressRankingColumn">Address</th>
            <th>Pseudo</th>
            <th>Score</th>
            <th>Rank</th>
          </tr>
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
        </div>
      </div>
      <div className={props.theme === "light" ? "classementDiv" : "classementDivDark"}>
      <p id="findAPlayerDiv" className={props.theme === "light" ? "headerTitle" : "headerTitleDark"}>Find a player</p>

        <div id="line1FindAPlayer">
          <input placeholder="Type an address here" id="addressPlayerFinder" type="text" value={addressSearch} onChange={(e) => setAddressSearch(e.target.value)}></input>
          <button id="searchAddressClassement" onClick={searchScore}>Seach address</button>

        </div>

        {dataAddressSearch === undefined ? null : dataAddressSearch[0].address === null ? <p className={props.theme === "light" ? "blackP" : "whiteP"}>addressSearch not a betting croc yet</p> :
          <div id={props.theme === "light" ? "classementTable" : "classementTableDark"}>

            <tr>
              <th id="addressRankingColumn">Address</th>
              <th>Pseudo</th>
              <th>Score</th>
              <th>Rank</th>
            </tr>
            <tbody>
              <tr id={props.theme === "light" ? "classementTable" : "classementTableDark"}>
                <td className="addressRankingCell">{dataAddressSearch[0].pseudo !== null ? dataAddressSearch[0].address : "-"}</td>
                <td>{dataAddressSearch[0].pseudo !== null ? dataAddressSearch[0].pseudo : "-"}</td>
                <td>{dataAddressSearch[0].score !== null ? dataAddressSearch[0].score : "-"}</td>
                <td>{dataAddressSearch[0].position !== null ? dataAddressSearch[0].position : "-"}</td>
              </tr>
            </tbody>
          </div>}
      </div>
    </div>

  )
}


export default Classement;
