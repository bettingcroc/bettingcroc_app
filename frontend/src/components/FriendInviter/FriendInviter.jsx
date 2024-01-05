import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { MY_SERVER } from "../../consts"

var __mounted;

function FriendInviter(props) {
  const [selectedOption, setSelectedOption] = useState()
  const [message, setMessage] = useState("")
  const [friendToDisplay, setFriendToDisplay] = useState("")
  const [isASearchRequest, setIsASearchRequest] = useState(false)
  const [errorMessage, setErrorMessage] = useState()
  const [modal, setModal] = useState("collapse")

  function toggleModal() {
    if (modal === "collapse") {
      setModal(null)
    }
    else {
      setModal("collapse")
    }
  }
  function handleClickAwayEvent() {
    setModal("collapse")
  }
  function sendBetInvitation(address, message, argsBet, typeBet) {
    let url = MY_SERVER + "/api/sendFriendRequest/";
    let options = {
      method: "POST",
      body: JSON.stringify({
        "head": "betInvitation",
        "address": address,
        "message": message,
        "argsBet": argsBet,
        "typeBet": typeBet
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include'
    };
    fetch(url, options).then((res) => {
      console.log("done " + res.status);
      if (res.status === 200) {
        props.socket.emit("sendBetInvitation", { fromAddress: props.address, toAddress: address })
        setErrorMessage("Invitation sent !")
      }
      if (res.status === 401) {
        setErrorMessage("You already invited your friend !")
      }
    });
    return
  }
  return (
    <ClickAwayListener onClickAway={props.modalCloser}>

      <div className="friendInviter">
        <ClickAwayListener onClickAway={handleClickAwayEvent}>
          <div className="superinputLine1FriendInviter">
            <div className="inputLine1FriendInviter" onClick={toggleModal}>
              <input placeholder='Select a friend' onChange={(e) => { if (e.target.value === null) { setFriendToDisplay("") } else { setFriendToDisplay(e.target.value) }; setSelectedOption(undefined); setIsASearchRequest(true) }} className='inputAddressInviter' type='text' value={friendToDisplay}></input>
            </div>
            <div id="modalinputLine1FriendInviter" className={modal}>
              {props.friends === null
                ? null
                : props.friends.map((item, index) => {
                  if (!isASearchRequest) {
                    return (
                      <div key={index} className="lineModalFriendInviter" onClick={() => { setSelectedOption(index); if (item.pseudo === null) { setFriendToDisplay("") } else { setFriendToDisplay(item.pseudo) }; toggleModal(); setIsASearchRequest(false) }}>
                        <p className="lineModalFriendInviterP"> {item.pseudo}</p><p className="lineAddressModalFriendInviterP"> {addressReducer(item.address2)}</p>
                      </div>
                    );
                  } else {
                    if (item.pseudo === null) {
                      return null
                    }
                    if (item.pseudo.toLowerCase().includes(friendToDisplay.toLowerCase())) {
                      return (
                        <div key={index} className="lineModalFriendInviter" onClick={() => { setSelectedOption(index); if (item.pseudo === null) { setFriendToDisplay("") } else { setFriendToDisplay(item.pseudo) }; toggleModal(); setIsASearchRequest(false) }}>
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

            <input placeholder='Type something..' onChange={(e) => setMessage(e.target.value)}
              className='inputMessageFriendInviter' type='text'></input>
          </div>
        </div>
        <div className='lastLineDivFriendInviter'>
          <button className='sendInvitation' onClick={(event) => {
            if (selectedOption !== undefined) {
              if (props.argsBet.p2pnumber !== null && props.typeBet === "p2p" || props.typeBet === "general") {
                sendBetInvitation(props.friends[selectedOption].address2, message, props.argsBet, props.typeBet);
              } else {
                setErrorMessage("Select a bet !")

              }
            }
            else {
              setErrorMessage("Select a friend !")
            }
          }}>Send invitation</button>
          <p className='errorMessageFriendInviter'>{errorMessage}</p>
        </div>
      </div>
    </ClickAwayListener>
  )
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
