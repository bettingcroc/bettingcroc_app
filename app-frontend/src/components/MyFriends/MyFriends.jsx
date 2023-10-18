import React from 'react';
import PropTypes from 'prop-types';
import { MY_SERVER } from "../../consts"

var __mounted;

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

              <p className={props.theme === "light" ? "blackP" : "lightGreyP"}>{item.address2}</p>
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
