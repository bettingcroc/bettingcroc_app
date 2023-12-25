import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { crocodileRight, homeImage, tutorialsDark, tutorialsLight, rankingLandingDark, rankingLandingLight } from "../../images"

import "./Landing.css"

function LandingComponent(props) {
  useEffect(() => {
    props.mainVueSetter("landing")
  }, [])

  return (
    <div id="landingComponent">
      <Link to="/basketball" className='linkLanding'>
        <div className={props.theme === "light" ? "landingSquare1Light" : "landingSquare1Dark"} id="landingDivListBets">
          <div className='landingLinkTextBox'>
            <p className={props.theme === "light" ? "landingP blackP" : "landingP whiteP"}>Sport Bets</p>
            <p className={props.theme === "light" ? "landingP2 blackP" : "landingP2 whiteP"}>Come see how bigs odds are today, or craft your own destiny with P2P bets! Challenge your friends, prove your prowess, and reign supreme in every wager. The game is on, your victory awaits!.</p>
          </div>

          <img className='imagesLanding' src={crocodileRight}></img>
        </div>
      </Link>
      <Link to="/decentrabet" className='linkLanding'>
        <div className={props.theme === "light" ? "landingSquare2Light" : "landingSquare2Dark"} id="landingDivDecentraBet">
          <img className='imagesLanding' src={homeImage}></img>

          <div className='landingLinkTextBox'>
            <p className={props.theme === "light" ? "landingP blackP" : "landingP whiteP"} id='landingPBis'>DecentraBet</p>
            <p className={props.theme === "light" ? "landingP2 blackP" : "landingP2 whiteP"} id='landingP2Bis'> Quisque aliquam velit id ipsum sollicitudin sagittis. Mauris tincidunt, mauris quis blandit mollis, mi mauris lacinia lectus, sit amet pretium massa mauris a dui. </p>
          </div>
        </div>
      </Link>

      <Link to="/rankings" className='linkLanding2'>
        <div className={props.theme === "light" ? "landingSquare3Light" : "landingSquare3Dark"} id="landingDivRanking">
          <p className={props.theme === "light" ? "landingP blackP" : "landingP whiteP"}>Rankings</p>
          <img className='imagesLanding' src={props.theme === "light" ? rankingLandingLight : rankingLandingDark}></img>

        </div>
      </Link>
      <Link to="/docs" className='linkLanding2'>
        <div className={props.theme === "light" ? "landingSquare3Light" : "landingSquare3Dark"} id="landingDivDocs">
          <p className={props.theme === "light" ? "landingP blackP" : "landingP whiteP"}>Docs and tutos</p>
          <img className='imagesLanding' src={props.theme === "light" ? tutorialsLight : tutorialsDark}></img>

        </div>
      </Link>
    </div>
  )
}


LandingComponent.propTypes = {};

LandingComponent.defaultProps = {};

export default LandingComponent;
