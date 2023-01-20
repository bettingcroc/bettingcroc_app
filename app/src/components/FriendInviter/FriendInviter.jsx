import React from 'react';
import PropTypes from 'prop-types';
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
var __mounted;

class FriendInviter extends React.Component {
  constructor(props) {
    super(props)
    this.setModal = this.setModal.bind(this);
    this.setSelectedOption = this.setSelectedOption.bind(this);
    this.handleClickAwayEvent = this.handleClickAwayEvent.bind(this);
    this.sendInvitation = this.sendInvitation.bind(this);
    this.sendInvitation = this.sendInvitation.bind(this);
    this.state = {
      selectedOption: undefined,
      message: "",
      friendToDisplay: "",
      isASearchRequest: false,
      errorMessage: null
    }
  }
  componentDidMount() {
    this.setState({
      modal: "collapse"
    })
    __mounted=true;
  }
  setModal() {
    if (this.state.modal === "collapse") {
      this.setState({ modal: null })
    }
    else {
      this.setState({ modal: "collapse" })
    }
  }
  setSelectedOption(option) {
    this.setState({ selectedOption: option })
  }
  handleClickAwayEvent() {
    this.setState({ modal: "collapse" })
  }
  sendInvitation(address, message, argsBet) {
    console.log("sendingInvitation")
    console.log(this.props.friends)
    console.log(this.state.selectedOption)
    console.log(address, message, argsBet)

    sendBetInvitation(address, message, argsBet)
    
    return
  }
  render() {
    if (this.props.active) {
      return (
        <ClickAwayListener onClickAway={this.props.modalCloser}>

          <div className="friendInviter">
            <ClickAwayListener onClickAway={this.handleClickAwayEvent}>
              <div className="superinputLine1FriendInviter">
                <div className="inputLine1FriendInviter" onClick={this.setModal}>
                  <input placeholder='Select a friend' onChange={(e) => { this.setState({ friendToDisplay: e.target.value }); this.setSelectedOption(undefined); this.setState({ isASearchRequest: true }) }} className='inputAddressInviter' type='text' value={this.state.friendToDisplay}></input>
                </div>
                <div id="modalinputLine1FriendInviter" className={this.state.modal}>
                  {this.props.friends == null
                    ? null
                    : this.props.friends.map((item, index) => {
                      if (!this.state.isASearchRequest) {
                        return (
                          <div key={index} className="lineModalFriendInviter" onClick={() => { this.setSelectedOption(index); this.setState({ friendToDisplay: item.pseudo }); this.setModal(); this.setState({ isASearchRequest: false }) }}>
                            <p className="lineModalFriendInviterP"> {item.pseudo}</p><p className="lineAddressModalFriendInviterP"> {addressReducer(item.address2)}</p>
                          </div>
                        );
                      } else {
                        if (item.pseudo.toLowerCase().includes(this.state.friendToDisplay.toLowerCase())) {
                          return (
                            <div key={index} className="lineModalFriendInviter" onClick={() => { this.setSelectedOption(index); this.setState({ friendToDisplay: item.pseudo }); this.setModal(); this.setState({ isASearchRequest: false }) }}>
                              <p className="lineModalFriendInviterP"> {item.pseudo}</p><p className="lineAddressModalFriendInviterP"> {addressReducer(item.address2)}</p>
                            </div>
                          );
                        } else {
                          return null
                        }
                      }
                    })}
                </div>
              </div>
            </ClickAwayListener>
            <div className="superinputLine1FriendInviter">

              <div className="inputLine1FriendInviter">

                <input placeholder='Type something..' onChange={(e) => this.setState({ message: e.target.value })}
                  className='inputMessageFriendInviter' type='text'></input>
              </div>
            </div>
            <div className='lastLineDivFriendInviter'>
              <button className='sendInvitation' onClick={(event) => {
                if (this.state.selectedOption !== undefined) {
                  if (this.props.argsBet.p2pnumber !== null && this.props.typeBet === "p2p") {
                    this.sendInvitation(this.props.friends[this.state.selectedOption].address2, this.state.message, this.props.argsBet);
                    this.setState({ errorMessage: "Invitation sent !" })
                  }else{
                    this.setState({ errorMessage: "Select a bet !" })
                  }
                }
                else { this.setState({ errorMessage: "Select a friend !" }) }
              }}>Send invitation</button>
              <p className='errorMessageFriendInviter'>{this.state.errorMessage}</p>
            </div>
          </div>
        </ClickAwayListener>
      )
    }
    else {
      return null
    }
  }
}


FriendInviter.propTypes = {};

FriendInviter.defaultProps = {};

export default FriendInviter;

function addressReducer(address) {
  let addressReduced = ""
  for (let i = 0; i < 4; i++) {
    addressReduced += address[i]
  }
  addressReduced += "..."
  for (let i = 38; i < 42; i++) {
    addressReduced += address[i]
  }
  return addressReduced
}

async function sendBetInvitation(address, message, argsBet) {
  if (__mounted) {
    let url = "http://localhost:4000/api/sendFriendRequest/";
    let bodyToSend = JSON.stringify({
      "head": "betInvitation",
      "address": address,
      "message":message,
      "argsBet":argsBet
    });
    let options = {
      method: "POST",
      body: bodyToSend,
      headers: {
        "Content-Type": "application/json",
      },
    };
    await new Promise(next => {
      fetch(url, options).then((res) => {
        console.log("done " + res.status);
        next()
      });
    })
    console.log("end function")
    return ("done2")
  }
}