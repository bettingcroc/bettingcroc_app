import React from 'react';
import PropTypes from 'prop-types';
import coinbaseImage from "./coinbase.png"


function ConnectCb(props) {


  return (
    <button className="buttonTransparent buttonTransparentModal" onClick={props.connectWalletHandler}>
      <img src={coinbaseImage} alt="coinbaseImage" className='walletsImage'></img>
      <p>CoinBase Wallet</p>

    </button>
  )


}

ConnectCb.propTypes = {};

ConnectCb.defaultProps = {};

export default ConnectCb;
