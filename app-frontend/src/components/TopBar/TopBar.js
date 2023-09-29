import React from 'react';
import PropTypes from 'prop-types';
import { APP_NAME, APP_LOGO_URL, DEFAULT_ETH_JSONRPC_URL, DEFAULT_CHAIN_ID, cssIdentifiers, chainId } from "../../consts"
import { Link } from 'react-router-dom';
import { homeImage, titleImage, accountImage, accountImageWhite } from "../../images"
import Connecter from '../Connecter/Connecter';
import { useEffect, useState } from "react"
import "./TopBar.css"
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';

function TopBar(props) {
  useEffect(() => {
  })

  return (
    <div id="topBar" className={props.theme === "light" ? "whiteDiv" : "blackDiv"}>
      <div id="topLeft">
        <Link to="/" id="logo">

          <img id="crocoImage" src={homeImage} alt="homeImage"></img>
          <img id="bettingCrocTitle" src={titleImage} alt="titleImage"></img>

        </Link>
        <div id="links">
          <Link to="/basketball"><p id="listBetsTitle" className={props.vueTopBar === "listBets" ? props.theme ==="light" ? "blackP" : "lightGreyP" : "titleInactive"}>Sport Bets</p></Link>
          <Link to="/decentrabet"><p id="decentraBetTitle" className={props.vueTopBar === "decentraBet" ? cssIdentifiers[props.theme]["titleActive"] : "titleInactive"}>Decentrabet</p></Link>
          <Link to="/rankings"><p id="rankingsTitle" className={props.vueTopBar === "rankings" ? cssIdentifiers[props.theme]["titleActive"] : "titleInactive"}>Rankings</p></Link>
        </div>
      </div>
      <div id="topRight">
        <ThemeSwitcher theme={props.theme} switchTheme={props.switchTheme} id={"themeSwitcherTopBar"}></ThemeSwitcher>
        <Connecter accountChangedHandler={props.accountChangedHandler} theme={props.theme} overlayClass={props.overlayClass} closeOverlay={props.closeOverlay} switchOverlayMode={props.switchOverlayMode} disconnect={props.disconnect} connectWalletHandler={props.connectWalletHandler} defaultAccount={props.defaultAccount} errorMessage={props.errorMessage} connButtonText={props.connButtonText} connectCoinBaseHandler={props.connectCoinBase} web3={props.web3} logged={props.logged} setLogged={props.setLogged}></Connecter>
        <Link to="/account" id="accountLink">
          <img className="accountLogo" src={props.theme === "light" ? accountImage : accountImageWhite} alt="accountImage"></img>
        </Link>
      </div>


    </div>
  );
}

TopBar.propTypes = {};

TopBar.defaultProps = {};

export default TopBar;
