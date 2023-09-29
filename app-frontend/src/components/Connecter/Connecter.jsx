import React, { useEffect, useState } from 'react';
import ConnectMetamask from '../ConnectMetamask/ConnectMetamask';
import ConnectWc from '../ConnectWC/ConnectWC';
import ConnectCb from '../ConnectCB/ConnectCB';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import Authentification from "../Authentification/Authentification";
import "./Connecter.css"
import { closeImage } from "../../images"

function Connecter(props) {
  const [connected, setConnected] = useState(props.defaultAccount !== undefined ? true : false)
  const [modalState, setModalState] = useState("closed")
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
    setModalState("closed")
    props.closeOverlay()
    document.body.style.overflow = '';
  }
  return (
    <div >
      {connected === true && props.defaultAccount !== undefined ?
        <div id="connecterConnected">
          <p id="accountDisplay" className={props.theme === "light" ? "blackP" : "lightGreyP"}>{props.defaultAccount.substring(0, 5) + "..." + props.defaultAccount.substring(39)}</p>
          <Authentification web3={props.web3} address={props.defaultAccount} setLogged={props.setLogged} logged={props.logged}></Authentification>

          <button className='generalsButton' onClick={props.disconnect}>
            <p className="buttonP">Disconnect</p>
          </button>
        </div>
        :
        modalState === "closed" ?
          <button className='generalsButton' onClick={openModal}><p className="buttonP">Connect Your Wallet</p></button> : <div>
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
