import React from "react";
//import PropTypes from "prop-types";

class ConnectButton extends React.Component {
  // constructor(props){
  //   super(props);
  // }
  render() {
    return (
      <div id="connectButton">
        <div id="metamaskButton">
          <button className="button" onClick={this.props.connectWalletHandler}>
            {this.props.connButtonText}
          </button>
        </div>

        <p className="accountDisplay">Address: {this.props.defaultAccount}</p>

        {this.props.errorMessage}
      </div>
    );
  }
}

ConnectButton.propTypes = {};

ConnectButton.defaultProps = {};

export default ConnectButton;
