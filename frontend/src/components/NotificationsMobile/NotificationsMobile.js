import React, { useEffect } from 'react';
import { MY_SERVER } from "../../consts"


function NotificationsMobile(props) {

  useEffect(() => {
    props.vueSetter("notifications")
    props.mainVueSetter("notifications")

    console.log("mount notifMobile  " + props.unread)
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
  }, [props.unread])
  return (
    <div className={props.theme === "light" ? "whiteDiv" : "blackDiv"} id="notificationsBoxMobile">{props.notifications.map((notif, index) => {
      if (notif.data.inCenter) {
        return (<div key={index} className={notif.data.read === "0" ? props.theme === "light" ? 'notificationLine newNotificationLight' : 'notificationLine newNotificationDark' : 'notificationLine'}><p className={props.theme === "light" ? "miseBetAccount blackP" : " miseBetAccount whiteP"}>{notif.content}</p></div>
        )
      }
      else {
        return null
      }
    })}
    </div>
  );
}

NotificationsMobile.propTypes = {};

NotificationsMobile.defaultProps = {};

export default NotificationsMobile;
