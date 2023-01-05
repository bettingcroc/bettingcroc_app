import React from 'react';
import PropTypes from 'prop-types';
import ConnectButton from '../ConnectButton/ConnectButton';
import ConnectWc from '../ConnectWC/ConnectWC';
import ConnectCb from '../ConnectCB/ConnectCB'
class Connecter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      connected: this.props.defaultAccount !== undefined ? true : false,
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
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      if (this.props.defaultAccount !== undefined && this.props.defaultAccount !== "") {
        this.setState({ connected: true })
      }
    }
    if (prevProps !== this.props) {
      if (this.props.defaultAccount === undefined) {
        this.setState({ connected: false })

      }
    }
  }
  render() {
    return (
      <div >
        {this.state.connected === true ?
          <div id="connecterConnected"><p id="accountDisplay">{this.props.defaultAccount}</p><button onClick={this.props.disconnect}>Disconnect</button></div>
          :
          this.state.modalState === "closed" ?
            <button onClick={this.openModal}>Connect Your Wallet</button> :
            <div id="connecterDiv">
              <div id="line1Modal">
                <p id="chooseYourProvider">Choose your provider !</p>
                <button onClick={this.closeModal}>X</button>

              </div>
              <div id="line2Modal">

                <div>
                  <ConnectWc connectWalletHandler={this.props.connectWalletConnectHandler}></ConnectWc>
                </div>
                <div>
                  <ConnectButton connectWalletHandler={this.props.connectWalletHandler} defaultAccount={this.props.defaultAccount} errorMessage={this.props.errorMessage} connButtonText={this.props.connButtonText}></ConnectButton>
                </div>
                <div>
                  <ConnectCb connectWalletHandler={this.props.connectCoinBaseHandler}></ConnectCb>
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
