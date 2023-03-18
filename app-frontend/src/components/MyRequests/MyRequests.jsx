import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
    this.props.socket.emit("newFriendAccepted", { fromAddress: this.props.address, toAddress: args.newFriend })
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
                <p>{item.dateRequest} </p>
                <p>{item.pseudo!==null?item.pseudo:item.address1} {item.header==="newFriend"? " wants to be your friend !":item.header==="betInvitation"?" wants you to bet on ":null}</p>
                
                {
                  item.header === "newFriend" ?
                    <button className='generalsButton' onClick={(event) => { //e is undefined
                      this.answerRequestReact({ "head": "newFriend", "id": item.id, "newFriend": item.address1 })
                    }}>
                      <p className="buttonP">Accept</p>
                    </button>
                    :
                    item.header === "betInvitation" && JSON.parse(item.body).typeBet === "general" ?
                      <Link to={"/bet/numBet?n=" + JSON.parse(item.body).argsBet.betNumber}><p>{JSON.parse(item.body).argsBet.title.split(",")[0]} - {JSON.parse(item.body).argsBet.title.split(",")[JSON.parse(item.body).argsBet.title.split(",").length]}</p></Link>
                      :
                      item.header === "betInvitation" && JSON.parse(item.body).typeBet === "p2p" ?
                        <Link to={"/bet/numBet?n=" + JSON.parse(item.body).argsBet.betNumber+"&p2p="+Object.values(JSON.parse(item.body).argsBet.p2pnumber[0])[0]}><p>{JSON.parse(item.body).argsBet.title.split(",")[0]} - {JSON.parse(item.body).argsBet.title.split(",")[JSON.parse(item.body).argsBet.title.split(",").length-1]}</p></Link>
                        :
                        null
                }
              </div>
            );
          }) : null}
      </div>
    );
  }


}

async function answerRequest(args) {
  if (__mounted) {
    let url = "https://testnet.bettingcroc.com/api/answerRequest/";
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
