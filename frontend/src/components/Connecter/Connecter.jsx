import React, { useEffect, useState } from 'react';
import ConnectMetamask from '../ConnectMetamask/ConnectMetamask';
import ConnectWc from '../ConnectWC/ConnectWC';
import ConnectCb from '../ConnectCB/ConnectCB';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import Authentification from "../Authentification/Authentification";
import "./Connecter.css"
import { closeImage, walletDark, walletLight } from "../../images"

function Connecter(props) {
  const [connected, setConnected] = useState(props.defaultAccount !== undefined ? true : false)
  const [modalState, setModalState] = useState("closed")
  const [walletModalState, setWalletModalState] = useState("closed")

  useEffect(() => {
    if (props.defaultAccount === undefined) {
      setConnected(false)

    }
    if (props.defaultAccount !== undefined && props.defaultAccount !== "") {
      setConnected(true)
      closeModal()
    }
    return () => {
      document.body.style.overflow = '';
    }
  }, [props.defaultAccount])
  function openModal() {
    setModalState("open")
    props.switchOverlayMode()
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
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
      {connected === true && props.defaultAccount !== undefined ?
        <div id="connecterConnected">
          <Authentification web3={props.web3} address={props.defaultAccount} setLogged={props.setLogged} logged={props.logged}></Authentification>
          <div id='walletTopBarDiv'>
            <button className='accountButton' id='walletButton' onClick={switchWalletModal}>
              <img src={props.theme === "light" ? walletLight : walletDark} id='walletImage'></img>
            </button>
            {walletModalState === "open" ?
              <ClickAwayListener onClickAway={closeWalletModal} touchEvent={false}>
                <div id='walletUnderDiv'>
                  <p id="accountDisplay" className={props.theme === "light" ? "blackP" : "lightGreyP"}>Connected as {props.defaultAccount.substring(0, 5) + "..." + props.defaultAccount.substring(39)}</p>
                  <p>{props.balanceUSDT} USDT</p>
                  <p>{props.balanceMBT} MBT</p>

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

                <p id="chooseYourProvider">Choose your provider below to connect your wallet</p>

                <div id="line2Modal">

                  <ConnectWc web3={props.web3} accountChangedHandler={props.accountChangedHandler}></ConnectWc>
                  <ConnectMetamask web3={props.web3} accountChangedHandler={props.accountChangedHandler} ></ConnectMetamask>
                  <ConnectCb connectWalletHandler={props.connectCoinBaseHandler}></ConnectCb>
                </div>
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
