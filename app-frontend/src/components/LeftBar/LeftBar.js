import React, { useState, useEffect } from 'react';
import { basketBallImage, footballImage, financeImage, tennisImage } from "../../images"
import { Link } from 'react-router-dom';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import "./LeftBar.css"


const LeftBar = (props) => {
  const [classP, setClassP] = useState(props.theme === "light" ? "optionsLeftBarP" : "optionsLeftBarPDark")
  useEffect(() => {
    props.theme === "light" ? setClassP("optionsLeftBarP") : setClassP("optionsLeftBarPDark")
  })
  return (
    <div id="leftBar" className={props.theme === "light" ? "whiteDiv" : "blackDiv"}>
      {props.mainVue === "bet" || props.mainVue === "rankings" ?
        <div id="under2leftBar">
          <div id="categories">
            <p id="titleLeftBar" className={props.theme === "light" ? "blackP" : "lightGreyP"}>Popular</p>
            <Link className="optionsLeftBar" to="/football">
              <img src={footballImage} alt="footballImage" className="logoImage"></img>
              <p className={classP}>Champions League</p>
            </Link>
            <Link className="optionsLeftBar" to="/football">
              <img src={footballImage} alt="footballImage" className="logoImage"></img>
              <p className={classP}>Ligue 1</p>
            </Link>
            <Link className="optionsLeftBar" to="/football">
              <img src={footballImage} alt="footballImage" className="logoImage"></img>
              <p className={classP}>Premier League</p>

            </Link>
            <Link className="optionsLeftBar" to="/football">
              <img src={footballImage} alt="footballImage" className="logoImage"></img>
              <p className={classP}>Liga</p>
            </Link>

            <Link className="optionsLeftBar" to="/football">
              <img src={footballImage} alt="footballImage" className="logoImage"></img>
              <p className={classP}>Bundesliga</p>
            </Link>

            <Link className="optionsLeftBar" to="/football">
              <img src={footballImage} alt="footballImage" className="logoImage"></img>
              <p className={classP}>Serie A</p>
            </Link>
            <Link className="optionsLeftBar" to="/basketball">
              <img src={basketBallImage} alt="basketBallImage" className="logoImage"></img>
              <p className={classP}>NBA</p>
            </Link>
          </div>
          <div id="categories">
            <p id="titleLeftBar" className={props.theme === "light" ? "blackP" : "lightGreyP"}>Categories</p>
            <Link className="optionsLeftBar" to="/basketball">
              <img src={basketBallImage} alt="basketBallImage" className="logoImage"></img>
              <p className={classP}>Basketball</p>
            </Link>
            <Link className="optionsLeftBar" to="/football">
              <img src={footballImage} alt="footballImage" className="logoImage"></img>
              <p className={classP}>Football</p>
            </Link>
            <Link className="optionsLeftBar" to="/decentrabet">
              <img src={financeImage} alt="financeImage" className="logoImage"></img>
              <p className={classP}>DecentraBet</p>
            </Link>
            <Link className="optionsLeftBar" to="/tennis">
              <img src={tennisImage} alt="tennisImage" className="logoImage"></img>
              <p className={classP}>Tennis</p>
            </Link>
          </div>
        </div> : props.mainVue === "decentraBet" ?
          <div id="under2leftBar">
            <div id="categoriesD">
              <p id="titleLeftBar" className={props.theme === "light" ? "blackP" : "lightGreyP"}>Featured events</p>
              <Link className="optionsLeftBarD" to="/decentrabet">
                <p className={classP}>Community Event</p>
              </Link>
              <Link className="optionsLeftBarD" to="/basketball">
                <p className={classP}>Community Event</p>
              </Link>
              <Link className="optionsLeftBarD" to="/football">
                <p className={classP}>Community Event</p>

              </Link>
              <Link className="optionsLeftBarD" to="/football">
                <p className={classP}>Community Event</p>
              </Link>

              <Link className="optionsLeftBarD" to="/football">
                <p className={classP}>Community Event</p>
              </Link>

              <Link className="optionsLeftBarD" to="/tennis">
                <p className={classP}>Community Event</p>
              </Link>
              <Link className="optionsLeftBarD" to="/basketball">
                <p className={classP}>Community Event</p>
              </Link>
            </div>
          </div> :
           <TwitterTimelineEmbed
           sourceType="timeline"
           screenName="NBA"
           theme={props.theme}
         />
      }
    </div>
  );
}


export default LeftBar;
