import React from 'react';
import PropTypes from 'prop-types';
import ConnectButton from '../ConnectButton/ConnectButton';
import ConnectWc from '../ConnectWC/ConnectWC';
import ConnectCb from '../ConnectCB/ConnectCB';
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

class Connecter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      connected: this.props.defaultAccount !== undefined ? true : false,
      modalState: "closed"
    }
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.handleClickAwayEvent = this.handleClickAwayEvent.bind(this);

    if (this.props.defaultAccount !== undefined) {
      this.setState({ connected: true })
    }
  }
  openModal() {
    this.setState({ modalState: "open" })
    this.props.switchOverlayMode()
  }
  closeModal() {
    this.setState({ modalState: "closed" })
    this.props.closeOverlay()

  }
  handleClickAwayEvent(){
    this.closeModal()
  }
  componentDidUpdate(prevProps) {
    if (prevProps.defaultAccount !== this.props.defaultAccount) {
      if (this.props.defaultAccount !== undefined && this.props.defaultAccount !== "") {
        this.setState({ connected: true })
        this.closeModal()
      }
    }
    if (prevProps.defaultAccount !== this.props.defaultAccount) {
      if (this.props.defaultAccount === undefined) {
        this.setState({ connected: false })

      }
    }
  }
  render() {
    return (
      <div >
        {this.state.connected === true ?
          <div id="connecterConnected"><p id="accountDisplay">{this.props.defaultAccount.substring(0,5)+"..."+this.props.defaultAccount.substring(39)}</p><button className='generalsButton' onClick={this.props.disconnect}><p className="buttonP">Disconnect</p></button></div>
          :
          this.state.modalState === "closed" ?
            <button className='generalsButton' onClick={this.openModal}><p className="buttonP">Connect Your Wallet</p></button> :
            <ClickAwayListener onClickAway={this.handleClickAwayEvent}>

              <div id="connecterDiv">

                <div id="line1Modal">
                  <p id="chooseYourProvider">Choose your provider !</p>
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
                <button id="closeConnecter" onClick={this.closeModal}>X</button>

              </div>
            </ClickAwayListener>
        }

      </div>
    );
  }
}

Connecter.propTypes = {};

Connecter.defaultProps = {};

export default Connecter;
