import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { crocodileRight, homeImage, tutorialsDark, tutorialsLight, rankingLandingDark,decentraBetWhite, rankingLandingLight, landingBackground, sportsLight,sportsDark, sportsWhite, decentraBetDark, rankingDark } from "../../images"

import "./Landing.css"

function LandingComponent(props) {
  useEffect(() => {
    props.vueSetter("landing")
    props.mainVueSetter("landing")
  }, [])

  return (
    <div id={ "landingComponentDark"}>
      <div id='landingTitlesDiv'>
        <p id="landingTitle1" className={"whiteP"}>Make Every Bet Count: <span className='greenP'>BettingCroc's</span> Winning Edge in Your Hands!</p>
        <p id="landingTitle2" className={"whiteP"}>At BettingCroc, we redefine the game, putting the winning edge firmly in
          your hands. Make every bet count as you navigate an immersive world of
          strategic plays and unparalleled excitement for unmatched victories.</p>
      </div>

      <div id='linksLanding'>
        <Link className='linkLanding' to="/sportbets" id='linkLanding1'>
          <img src={sportsWhite} className='imgLinkLanding'></img>
          <p className={'linklandingPDark'}>Sports Bets</p>
        </Link>
        {/*<Link className='linkLanding' to="/decentrabet">
          <img src={decentraBetWhite} className='imgLinkLanding'></img>
          <p className={'linklandingPDark'}>Decentrabet</p>
        </Link>*/}
        <Link className='linkLanding' to="/rankings">
          <img src={rankingLandingDark} className='imgLinkLanding'></img>
          <p className={ 'linklandingPDark'}>Rankings</p>
        </Link>
        <Link className='linkLanding' to="/docs" id='linkLanding4'>
          <img src={tutorialsDark} className='imgLinkLanding' ></img>
          <p className={ 'linklandingPDark'}>Docs and tutos</p>
        </Link>
      </div>
      <img id='backgroundLanding' src={landingBackground}></img>
    </div>
  )
}


LandingComponent.propTypes = {};

LandingComponent.defaultProps = {};

export default LandingComponent;
