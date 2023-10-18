import React, { useEffect, useState } from 'react';
import { useNotificationCenter } from "react-toastify/addons/use-notification-center"
import "./NotificationCenter.css"
import { ClickAwayListener } from '@mui/base';
import { MY_SERVER } from "../../consts"

const NotificationCenter = (props) => {
  const [unread, setUnread] = useState(0)
  const [modalOpened, setModalOpened] = useState(false)
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
    let unread = 0
    for (let n = 0; n < notifications.length; n++) {
      let notif = notifications[n]
      if (notif.data.read === "0") {
        unread++
      }
    }
    setUnread(unread)
    console.log("newNOtif " + notifications.length)
  }, [notifications])


  useEffect(() => {
    fetch(MY_SERVER + "/api/myrequests_unread", { method: "GET", credentials: 'include' }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setUnread(data.unread)
        })
      }
    })
  }, [props.logged])
  useEffect(() => {
    console.log("constructor")
    updateNotificationsFromServer()
  }, [props.logged])

  function handleButtonNotif() {
    setModalOpened(true)
    if (unread > 0) {
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
          setUnread(0)
          setAllNotifsRead()
          //updateNotificationsFromServer()
        }
      })
    }
  }
  function setAllNotifsRead() {
    setTimeout(() => {
      for (let n = 0; n < notifications.length; n++) {
        let notif = notifications[n]
        notif.data.read = "1"
      }
      console.log("setAllNotifsRead")
    }, 5000);


  }
  function updateNotificationsFromServer() {
    fetch(MY_SERVER + "/api/myrequests", { method: "GET", credentials: 'include' }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          for (let n = 0; n < data.length; n++) {
            let notif = data[n]
            let body = JSON.parse(notif.body)
            let content = notif.header === "newFriend" ? notif.address1 + " wants to be your friend" : notif.pseudo !== undefined && notif.header === "betInvitation" ? notif.pseudo + " invited you to bet on " + body.argsBet.title.split(",")[0] + " vs " + body.argsBet.title.split(",")[body.argsBet.title.split(",").length - 1] : null
            add({ "id": notif.id, "content": content, "data": { "inCenter": true, "body": body, "read": notif.read } })
          }
        });
      }
    });
  }
  return (
    <div id='notificationBox'>
      <button id='notificationButton' onClick={(e) => handleButtonNotif()}>Notifications ({unread})</button>
      <div className={modalOpened ? "alignStart" : "alignCenter"} id='notificationCenter'>
        {modalOpened ?
          <ClickAwayListener onClickAway={() => { setModalOpened(false) }} touchEvent={false}>
            <div className={props.theme === "light" ? "whiteDiv" : "blackDiv"} id="notificationsBox">{notifications.map((notif, index) => {
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
