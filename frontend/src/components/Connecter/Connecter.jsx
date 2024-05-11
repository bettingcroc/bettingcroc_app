import React, { useEffect, useState } from 'react';
import ConnectMetamask from '../ConnectMetamask/ConnectMetamask';
import ConnectWc from '../ConnectWC/ConnectWC';
import ConnectCb from '../ConnectCB/ConnectCB';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import Authentification from "../Authentification/Authentification";
import "./Connecter.css"
import { closeImage, walletDark, walletLight } from "../../images"
import { MY_SERVER } from "../../consts"

function Connecter(props) {
  const [connected, setConnected] = useState(props.defaultAccount !== undefined ? true : false)
  const [modalState, setModalState] = useState("closed")
  const [walletModalState, setWalletModalState] = useState("closed")

  useEffect(() => {
    if (props.defaultAccount === undefined) {
      setConnected(false)
    }
    console.log(props.defaultAccount)
    if (props.defaultAccount !== undefined && props.defaultAccount !== "") {
      setConnected(true)
      testLogin()
      if (!props.logged && modalState === "open") {
        setModalState("login")
      } else {
        setModalState("closed")
      }
    }
    return () => {
      document.body.style.overflow = '';
    }
  }, [props.defaultAccount])
  useEffect(() => {
    console.log(props.logged)
    if (props.logged) {
      closeModal()
    }
  }, [props.logged])
  async function testLogin() {
    let url = MY_SERVER + "/api/testlogin";
    let options = {
      method: "GET",
      credentials: 'include'
    };
    fetch(url, options).then((res) => {
      res.json().then((data) => {
        if (data.isLogged === true) { props.setLogged(true) }
        else { props.setLogged(false) }
      })
    });
  }

  useEffect(() => {
    console.log(modalState)
  }, [modalState])
  function openModal() {
    setModalState("open")
    props.switchOverlayMode()
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    if (modalState === "login" && !props.logged) {
      props.disconnect()
    }
    closeWalletModal()
    setModalState("closed")
    props.closeOverlay()
    document.body.style.overflow = '';

  }
  function switchWalletModal() {
    if (walletModalState === 'closed') {
      setWalletModalState("open")
    } else {
      setWalletModalState("closed")
    }
  }
  function closeWalletModal() {
    setWalletModalState("closed")
  }
  return (
    <div id='connecterBigBox'>
      {connected === true && props.defaultAccount !== undefined && props.logged ?
        <div id="connecterConnected">
          <Authentification web3={props.web3} address={props.defaultAccount} setLogged={props.setLogged} logged={props.logged}></Authentification>
          <div id='walletTopBarDiv'>
            <button className='accountButton' id='walletButton' onClick={switchWalletModal}>
              <p className={props.theme === "light" ? "blackP" : "whiteP"}>{props.defaultAccount.substring(0, 5) + "..." + props.defaultAccount.substring(39)}</p>
            </button>
            {walletModalState === "open" ?
              <ClickAwayListener onClickAway={closeWalletModal} touchEvent={false}>
                <div id={props.theme === "light" ? "walletUnderDivLight" : "walletUnderDivDark"}>
                  <p id="accountDisplay" className={props.theme === "light" ? "blackP" : "whiteP"}>Connected as {props.defaultAccount.substring(0, 5) + "..." + props.defaultAccount.substring(39)}</p>
                  <p className={props.theme === "light" ? "blackP" : "whiteP"}>{props.balanceUSDT} USDT</p>
                  <p className={props.theme === "light" ? "blackP" : "whiteP"}>{props.balanceMBT} MBT</p>

                  <button className='generalsButton' onClick={props.disconnect}>
                    <p className="buttonP">Disconnect</p>
                  </button>
                </div>
              </ClickAwayListener> : null}
          </div>
        </div>
        :
        modalState === "closed" ?
          <button className='generalsButton' onClick={openModal} id='connectYourWalletButton'><p className="buttonP" >Connect Your Wallet</p></button> : <div>
            <ClickAwayListener onClickAway={closeModal} touchEvent={false}>

              <div id="connecterDiv">

                <p id="chooseYourProvider">{modalState === "login" ? "Sign a message to login" : "Connect your wallet"}</p>

                {modalState === "open" ? <div id="line2Modal">

                  <ConnectWc web3={props.web3} accountChangedHandler={props.accountChangedHandler}></ConnectWc>
                  <ConnectMetamask web3={props.web3} accountChangedHandler={props.accountChangedHandler} ></ConnectMetamask>
                  <ConnectCb connectWalletHandler={props.connectCoinBaseHandler}></ConnectCb>
                </div> : <Authentification web3={props.web3} address={props.defaultAccount} setLogged={props.setLogged} logged={props.logged}></Authentification>}
                <button id="closeConnecter" onClick={closeModal}><img id='closeImage' src={closeImage}></img></button>

              </div>
            </ClickAwayListener>
            <div id="overlay" className={props.overlayClass}></div>

          </div>
      }

    </div>
  );
}


export default Connecter;
