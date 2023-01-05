import React from 'react';
import PropTypes from 'prop-types';
import coinbaseImage from "./coinbase.png"


class ConnectCb extends React.Component {

  constructor(props){
    super(props)
  }

  render() {
    return (
      <div>
        <button className="buttonTransparent" onClick={this.props.connectWalletHandler}>
          <img src={coinbaseImage} alt="coinbaseImage" id="coinbaseImage"></img>
          <p>CoinBase</p>

        </button>
      </div>
    )
  }

}

ConnectCb.propTypes = {};

ConnectCb.defaultProps = {};

export default ConnectCb;
