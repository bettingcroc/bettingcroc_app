import React from 'react';
import walletconnectImage from "./walletconnect.png"

class ConnectWc extends React.Component {
  render() {
    return (
      <div className="connectButton">
        <button className="buttonTransparent buttonTransparentModal" onClick={this.props.connectWalletHandler}>
          <img src={walletconnectImage} alt="walletconnectImage" id="walletconnectImage"></img>
          <p>WalletConnect</p>

        </button>
      </div>
    );
  }
}
ConnectWc.propTypes = {};

ConnectWc.defaultProps = {};

export default ConnectWc;
