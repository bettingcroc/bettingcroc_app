import React from "react";
import metamaskImage from "./metamask.png"
//import PropTypes from "prop-types";

class ConnectButton extends React.Component {
  // constructor(props){
  //   super(props);
  // }
  render() {
    return (
      <div className="connectButton">
          <button className="buttonTransparent buttonTransparentModal" onClick={this.props.connectWalletHandler}>
            <img src={metamaskImage} alt="metamaskImage" id="metamaskImage"></img>
            <p>Metamask Web Extension</p>
          </button>
      </div>
    );
  }
}

ConnectButton.propTypes = {};

ConnectButton.defaultProps = {};

export default ConnectButton;
