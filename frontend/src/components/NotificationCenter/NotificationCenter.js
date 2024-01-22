import React, { useEffect, useState } from 'react';
import "./NotificationCenter.css"
import { ClickAwayListener } from '@mui/base';
import { MY_SERVER } from "../../consts"
import { homeImage, titleImage, accountImage, accountImageWhite,notificationsLight } from "../../images"


const NotificationCenter = (props) => {
  const [modalOpened, setModalOpened] = useState(false)
  



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
      <button id='notificationButton' onClick={(e) => handleButtonNotif()}><img id='notificationsImg' src={notificationsLight}></img></button>
      <div className={modalOpened ? "alignStart" : "alignCenter"} id='notificationCenter'>
        {modalOpened ?
          <ClickAwayListener onClickAway={() => { setModalOpened(false) }} touchEvent={false}>
            <div className={props.theme === "light" ? "whiteDiv" : "blackDiv"} id="notificationsBox">{props.notifications.map((notif, index) => {
              if (notif.data.inCenter) {
                return (<div key={index} className={notif.data.read === "0" ? props.theme === "light" ? 'notificationLine newNotificationLight' : 'notificationLine newNotificationDark' : 'notificationLine'}><p className={props.theme === "light" ? "miseBetAccount blackP" : " miseBetAccount whiteP"}>{notif.content}</p></div>
                )
              }
              else {
                return null
              }
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
