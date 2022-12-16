import React from 'react';
import PropTypes from 'prop-types';
import ConnectButton from '../ConnectButton/ConnectButton';
import ConnectWc from '../ConnectWC/ConnectWC';
class Connecter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      connected: false,
      modalState: "closed"
    }
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)

    if (this.props.defaultAccount !== undefined) {
      this.setState({ connected: true })
    }
  }
  openModal() {
    this.setState({ modalState: "open" })
  }
  closeModal() {
    this.setState({ modalState: "closed" })
  }
  render() {
    return (
      <div >
        {this.state.connected ?
          <p className="accountDisplay">{this.props.defaultAccount}</p> :
          this.state.modalState === "closed" ?
            <button onClick={this.openModal}>Connect Your Wallet</button> :
            <div id="connecterDiv">
              <div id="line1Modal">
                <p id="chooseYourProvider">Choose your provider !</p>
                <button onClick={this.closeModal}>X</button>

              </div>
              <div id="line2Modal">
                <div>
                  <ConnectButton connectWalletHandler={this.props.connectWalletHandler} defaultAccount={this.props.defaultAccount} errorMessage={this.props.errorMessage} connButtonText={this.props.connButtonText}></ConnectButton>

                </div>
                <div>
                  <ConnectWc connectWalletHandler={this.props.connectWalletConnectHandler}></ConnectWc>
                </div>
              </div>
            </div>
        }

      </div>
    );
  }
}

Connecter.propTypes = {};

Connecter.defaultProps = {};

export default Connecter;
