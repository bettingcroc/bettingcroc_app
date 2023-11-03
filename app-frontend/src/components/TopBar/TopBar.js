import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { APP_NAME, APP_LOGO_URL, DEFAULT_ETH_JSONRPC_URL, DEFAULT_CHAIN_ID, cssIdentifiers, chainId } from "../../consts"
import { Link } from 'react-router-dom';
import { homeImage, titleImage, accountImage, accountImageWhite } from "../../images"
import Connecter from '../Connecter/Connecter';
import "./TopBar.css"
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import { toast, ToastContainer } from 'react-toastify';
import NotificationCenter from "../NotificationCenter/NotificationCenter";
import { MY_SERVER } from "../../consts"

function TopBar(props) {


  function notif() {
    toast.success("Success Notification !", {
      position: toast.POSITION.TOP_CENTER,
      data: { "inCenter": true }
    });
  }

  function login_unsecure() {
    let url = MY_SERVER + "/api/login_unsecure";
    let bodyToSend = JSON.stringify({
      address: props.defaultAccount
    })
    let options = {
      method: "POST",
      body: bodyToSend,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include'
    };
    fetch(url, options).then((res) => {
      let url = MY_SERVER + "/api/testlogin";
      let options = {
        method: "GET",
        credentials: 'include'

      };
      let result
      fetch(url, options).then((res) => {
        res.json().then((data) => {
          if (data.isLogged === true) { props.setLogged(true) }
          else { props.setLogged(false) }
        })
      });
    })
  }

  return (
    <div id="topBar" className={props.theme === "light" ? "whiteDiv" : "blackDiv"}>
      <div id="topLeft">
        <Link to="/" id="logo">

          <img id="crocoImage" src={homeImage} alt="homeImage"></img>
          <img id="bettingCrocTitle" src={titleImage} alt="titleImage"></img>

        </Link>
        <div id="links">
          <Link to="/basketball"><p id="listBetsTitle" className={props.vueTopBar === "listBets" ? props.theme === "light" ? "blackP" : "lightGreyP" : "titleInactive"}>Sport Bets</p></Link>
          <Link to="/decentrabet"><p id="decentraBetTitle" className={props.vueTopBar === "decentraBet" ? cssIdentifiers[props.theme]["titleActive"] : "titleInactive"}>Decentrabet</p></Link>
          <Link to="/rankings"><p id="rankingsLink" className={props.vueTopBar === "rankings" ? cssIdentifiers[props.theme]["titleActive"] : "titleInactive"}>Rankings</p></Link>
          {props.defaultAccount !== undefined ? <Link to="/account" id="accountLink"><p id="accountLink" className={props.vueTopBar === "account" ? cssIdentifiers[props.theme]["titleActive"] : "titleInactive"}>Account</p></Link> : null}
        </div>
        {/*<button onClick={notif}>toast</button>
        <button onClick={login_unsecure}>login_unsecure</button>*/}
      </div>
      <div id="topRight">
        <NotificationCenter unread={props.unread} setUnread={props.setUnread} notifications={props.notifications} setAllNotifsRead={props.setAllNotifsRead} theme={props.theme}></NotificationCenter>


        <ThemeSwitcher theme={props.theme} switchTheme={props.switchTheme} id={"themeSwitcherTopBar"}></ThemeSwitcher>
        <Connecter accountChangedHandler={props.accountChangedHandler} theme={props.theme} overlayClass={props.overlayClass} closeOverlay={props.closeOverlay} switchOverlayMode={props.switchOverlayMode} disconnect={props.disconnect} connectWalletHandler={props.connectWalletHandler} defaultAccount={props.defaultAccount} errorMessage={props.errorMessage} connButtonText={props.connButtonText} connectCoinBaseHandler={props.connectCoinBase} web3={props.web3} logged={props.logged} setLogged={props.setLogged}></Connecter>
      </div>


    </div>
  );
}

TopBar.propTypes = {};

TopBar.defaultProps = {};

export default TopBar;
