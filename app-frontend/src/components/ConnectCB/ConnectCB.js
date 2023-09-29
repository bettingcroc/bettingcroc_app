import React from 'react';
import PropTypes from 'prop-types';
import coinbaseImage from "./coinbase.png"


class ConnectCb extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <button className="buttonTransparent buttonTransparentModal" onClick={this.props.connectWalletHandler}>
        <img src={coinbaseImage} alt="coinbaseImage" className='walletsImage'></img>
        <p>CoinBase Wallet</p>

      </button>
    )
  }

}

ConnectCb.propTypes = {};

ConnectCb.defaultProps = {};

export default ConnectCb;
