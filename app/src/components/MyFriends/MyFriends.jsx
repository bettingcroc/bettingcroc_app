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
    this.updateFriends = this.updateFriends.bind(this)
    this.removeFriendReact=this.removeFriendReact.bind(this)
  }
  componentDidMount() {
    __mounted = true;
    console.log("mount myFriends")
  }
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props && this.state.loaded === false && this.props.address !== undefined && this.props.logged === "logged") {

      this.setState({ address: this.props.address.toLowerCase() });
      let link = "http://localhost:4000/api/myfriends/"
      fetch(link, { method: "GET" }).then((res) => {
        res.json().then((data) => {
          //console.log(data[0]);
          if (this.state.loaded !== true) {
            this.setState({ loaded: true, myFriends: data });
            this.props.setFriendsList(data)
          }
          // todo mettre le claseement de laddresse connectée
        });
      });

    }
  }
  updateFriends() {
    console.log("updateFriends")
    this.setState({ address: this.props.address.toLowerCase() });
    let link = "http://localhost:4000/api/myfriends/"
    fetch(link, { method: "GET" }).then((res) => {
      res.json().then((data) => {
        console.log(data)
        //console.log(data[0]);
        this.setState({ loaded: true, myFriends: data });
        this.props.setFriendsList(data)

        // todo mettre le claseement de laddresse connectée
      });
    });
  }
  removeFriendReact(args) {
    removeFriend(args)
    this.updateFriends()
  }
  render() {
    return (
      <div>
        <p>Friends</p>
        <div>
          {this.state.myFriends !== undefined ?
            this.state.myFriends.map(function (item) {
              return (
                <div key={item.address2} className="requestDiv">
                  <p>{item.address2}</p>
                  <button onClick={(event) => { //e is undefined
                    this.removeFriendReact(
                      { "head": "removeFriend", "oldFriend": item.address2 }
                    )
                  }
                  }
                  >
                    Remove</button>
                </div>
              );
            }) : null}
        </div>
      </div>
    );
  }


}

async function removeFriend(args) {
  console.log(__mounted)
  if (__mounted) {
    let url = "http://localhost:4000/api/removeFriend/";
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
