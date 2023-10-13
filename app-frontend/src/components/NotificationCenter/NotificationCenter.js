import React, { useEffect, useState } from 'react';
import { useNotificationCenter } from "react-toastify/addons/use-notification-center"
import "./NotificationCenter.css"
import { ClickAwayListener } from '@mui/base';
import { MY_SERVER } from "../../consts"

const NotificationCenter = (props) => {
  const [requests, setRequests] = useState([])
  var {
    notifications,
    clear,
    markAllAsRead,
    markAsRead,
    add,
    update,
    remove,
    find,
    sort,
    unreadCount
  } = useNotificationCenter()
  useEffect(() => {
    console.log(notifications)
  }, [notifications])
  useEffect(() => {
    console.log("constructor")
    fetch(MY_SERVER + "/api/myrequests", { method: "GET" }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          for (let n = 0; n < data.length; n++) {
            let notif = data[n]
            let body = JSON.parse(notif.body)
            let content = notif.header === "newFriend" ? notif.address1 + " wants to be your friend" : notif.pseudo !== undefined && notif.header === "betInvitation" ? notif.pseudo + " invited you to bet on " + body.argsBet.title.split(",")[0] + " vs " + body.argsBet.title.split(",")[body.argsBet.title.split(",").length - 1] : null
            add({ "id": notif.id, "content": content, "data": { "inCenter": true, "body": body } })
          }
          console.log(data)
        });
      }
    });
  }, [])
  return (
    <div className={props.modalOpened ? "alignStart" : "alignCenter"} id='notificationCenter'>
      {props.modalOpened ?
        <ClickAwayListener onClickAway={() => { props.setModalOpened(false) }} touchEvent={false}>
          <div className={props.theme === "light" ? "whiteDiv" : "blackDiv"} id="notificationsBox">{notifications.map((notif, index) => {
            if (notif.data.inCenter) {
              return (<div key={index} ><p className={props.theme === "light" ? "miseBetAccount blackP" : " miseBetAccount whiteP"}>{notif.content}</p></div>
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
    </div>
  );
}

NotificationCenter.propTypes = {};

NotificationCenter.defaultProps = {};

export default NotificationCenter;
