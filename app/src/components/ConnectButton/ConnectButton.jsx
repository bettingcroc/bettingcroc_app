import React from "react";
//import PropTypes from "prop-types";

class ConnectButton extends React.Component {
  // constructor(props){
  //   super(props);
  // }
  render() {
    return (
      <div>
        <button className="button" onClick={this.props.connectWalletHandler}>
          {this.props.connButtonText}
        </button>
        <div className="accountDisplay">
          <h5>Address: {this.props.defaultAccount}</h5>
        </div>
        {this.props.errorMessage}
      </div>
    );
  }
}

ConnectButton.propTypes = {};

ConnectButton.defaultProps = {};

export default ConnectButton;
