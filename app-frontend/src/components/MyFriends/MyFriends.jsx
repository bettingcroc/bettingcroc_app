import React from 'react';
import PropTypes from 'prop-types';
var __mounted;

class MyFriends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      myFriends: undefined,
    };
    this.removeFriendReact = this.removeFriendReact.bind(this)
  }
  componentDidMount() {
    __mounted = true;
    console.log("mount myFriends")
  }
  componentDidUpdate(prevProps) {
    /*console.log("from myFriends")
    try {
      console.log(this.props.myFriends)

    }
    catch (e) {
      console.log(e)
    }
    console.log("from myFriends")*/

  }

  removeFriendReact(args) {
    removeFriend(args)
    this.props.updateFriends()
  }
  render() {
    return (
        <div className="accountContainer">
          {this.props.myFriends !== undefined ?
            this.props.myFriends.map((item) => {
              return (
                <div key={item.address2} className="requestDiv">
                  <p>{item.pseudo}</p>

                  <p>{item.address2}</p>
                  <button className='generalsButton' onClick={(event) => { //e is undefined
                    this.removeFriendReact(
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


}

async function removeFriend(args) {
  console.log(__mounted)
  if (__mounted) {
    let url = "https://testnet.bettingcroc.com/api/removeFriend/";
    console.log(args)
    console.log(args.head)

    let bodyToSend = JSON.stringify(
      args
    );
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

MyFriends.propTypes = {};

MyFriends.defaultProps = {};

export default MyFriends;
