import React from 'react';
import PropTypes from 'prop-types';
var __mounted;

class MyRequests extends React.Component {
  constructor(props) {
    super(props);
    this.answerRequestReact = this.answerRequestReact.bind(this);
  }
  componentDidMount() {
    __mounted = true;
    console.log("mount myRequests")
  }
  componentDidUpdate(prevProps) {

  }

  answerRequestReact(args) {
    answerRequest(args)
    this.props.updateRequests()
    this.props.updateFriends()
  }
  render() {
    return (
      <div className="accountContainer">
        {this.props.requests !== undefined ?
          this.props.requests.map((item) => {
            return (
              <div key={item.dateRequest} className="requestDiv">
                <p>From {item.address1}</p>
                <p>object {item.header}</p>
                <p>date {item.dateRequest}</p>
                {item.header==="newFriend"?<button className='generalsButton' onClick={(event) => { //e is undefined
                  this.answerRequestReact(
                    { "head": "newFriend", "id": item.id, "newFriend": item.address1 }
                  )
                }
                }
                >
                  <p className="buttonP">Accept</p>
                </button>:null}
              </div>
            );
          }) : null}
      </div>
    );
  }


}

async function answerRequest(args) {
  if (__mounted) {
    let url = "http://localhost:4000/api/answerRequest/";
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
MyRequests.propTypes = {};

MyRequests.defaultProps = {};

export default MyRequests;
