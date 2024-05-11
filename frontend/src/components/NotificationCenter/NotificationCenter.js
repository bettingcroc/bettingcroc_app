import React, { useEffect, useState } from 'react';
import "./NotificationCenter.css"
import { ClickAwayListener } from '@mui/base';
import { MY_SERVER } from "../../consts"
import { homeImage, titleImage, accountImage, accountImageWhite, notificationsLight, notificationsDark, notificationsLightPop, notificationsDarkPop, chevronDroitLight, chevronDroitDark } from "../../images"
import { Link, Outlet } from "react-router-dom";
import Tooltip from '@mui/material/Tooltip';


const NotificationCenter = (props) => {
  const [modalOpened, setModalOpened] = useState(false)


  function answerRequest(args) {
    let url = MY_SERVER + "/api/answerRequest/";
    let options = {
      method: "POST",
      body: JSON.stringify(args),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include'
    };
    fetch(url, options).then((res) => {
      console.log("done answerRequest " + res.status);
      if (res.status === 200) {
        props.socket.emit("newFriendAccepted", { fromAddress: props.address, toAddress: args.newFriend })
        props.updateNotificationsFromServer()
        props.setFriendsUpdater(Math.random())

      }
    });

  }

  function handleButtonNotif() {
    setModalOpened(true)
    if (props.unread > 0) {
      let url = MY_SERVER + "/api/setmyrequests_read";
      let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include'
      };
      fetch(url, options).then((res) => {
        console.log(res.status)
        if (res.status === 200) {
          props.setUnread(0)
          props.setAllNotifsRead()
        }
      })
    }
  }

  return (
    <div id='notificationBox'>
      <button id={props.theme === "light" ? "notificationButtonLight" : "notificationButtonDark"} onClick={(e) => handleButtonNotif()}><img id='notificationsImg' src={props.theme === "light" ? props.unread > 0 ? notificationsLightPop : notificationsLight : props.unread > 0 ? notificationsDarkPop : notificationsDark}></img></button>
      <div className={modalOpened ? "alignStart" : "alignCenter"} id='notificationCenter'>
        {modalOpened ?
          <ClickAwayListener onClickAway={() => { setModalOpened(false) }} touchEvent={false}>
            <div className={props.theme === "light" ? "whiteDiv" : "blackDiv"} id="notificationsBox">{props.notifications.map((notif, index) => {
              return (
                <div key={index} className={notif.read === "0" ? props.theme === "light" ? 'notificationLine newNotificationLight' : 'notificationLine newNotificationDark' : 'notificationLine'}>
                  {JSON.parse(notif.body).head === "betInvitation" ?
                    <Link className='betInvitationNotif' to={`/bet?n=${JSON.parse(notif.body).argsBet.betNumber}`}>
                      <div className='betInvitationNotifLines'>
                        <Tooltip placement='left' title={JSON.parse(notif.body).address}><p className={props.theme === "light" ? "miseBetAccount blackP" : " miseBetAccount whiteP"}>{notif.pseudo} shared a bet :</p></Tooltip>
                        <p className={props.theme === "light" ? "miseBetAccount blackP" : " miseBetAccount whiteP"}>{JSON.parse(notif.body).argsBet.title.split(",")[0] + " - " + JSON.parse(notif.body).argsBet.title.split(",")[1]}</p>
                      </div>
                      <img className='chevronImg' src={props.theme === "light" ? chevronDroitLight : chevronDroitDark}></img>
                    </Link>
                    : JSON.parse(notif.body).head === "newFriend" ?
                      <div className='newFriendRequestDiv'>
                        <p className={props.theme === "light" ? "miseBetAccount blackP" : " miseBetAccount whiteP"}>{notif.address1} wants to be your friend</p>
                        <div className='buttonsAnswerRequest'>
                          <button className='notifButton' onClick={(event) => {
                            answerRequest({ "head": "newFriend", "id": notif.id, "newFriend": notif.address1 })
                          }}>
                            Accept</button>
                          <button className='notifButton'  onClick={(event) => {
                            answerRequest({ "head": "newFriendDenied", "id": notif.id, "newFriend": notif.address1 })
                          }}>Ignore</button>
                        </div>
                      </div>
                      : notif.header === "newFriendAccepted" ? <div><p className={props.theme === "light" ? "miseBetAccount blackP" : " miseBetAccount whiteP"}>You are now friend with {notif.pseudo}</p></div> : null}
                </div>
              )
            })}
            </div>
          </ClickAwayListener>
          : null
        }
      </div>    </div>

  );
}

NotificationCenter.propTypes = {};

NotificationCenter.defaultProps = {};

export default NotificationCenter;
