import React from 'react';
import PropTypes from 'prop-types';


class ConnectWc extends React.Component {
  render() {
    return (
      <div>
        <button className="button" onClick={this.props.connectWalletHandler}>
            WC
          </button>
      </div>
    );
  }
}
ConnectWc.propTypes = {};

ConnectWc.defaultProps = {};

export default ConnectWc;
