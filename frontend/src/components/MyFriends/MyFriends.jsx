import React from 'react';
import { MY_SERVER } from "../../consts"
import "./MyFriends.css"

function MyFriends(props) {


  function removeFriend(args) {
    let url = MY_SERVER + "/api/removeFriend/";
    let options = {
      method: "POST",
      body: JSON.stringify(
        args
      ),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include'
    };
    fetch(url, options).then((res) => {
      console.log("done " + res.status);
      if (res.status === 200) {
        props.updateFriends()
      }
    });
  }

  return (
    <div className="accountContainer">
      {props.myFriends !== undefined ?
        props.myFriends.map((item) => {
          return (
            <div key={item.address2} className="requestDiv">
              <p className={props.theme === "light" ? "blackP" : "lightGreyP"}>{item.pseudo}</p>

              <p className={props.theme === "light" ? "blackP friendsAddress" : "lightGreyP friendsAddress"}>{item.address2}</p>
              <button className='generalsButton' onClick={(event) => { //e is undefined
                removeFriend(
                  { "head": "removeFriend", "oldFriend": item.address2 }
                )
              }
              }
              >
                <p className="buttonP">Remove</p></button>
            </div>
          );
        }) : null}
    </div>
  );


}



MyFriends.propTypes = {};

MyFriends.defaultProps = {};

export default MyFriends;
