/* global BigInt */

import React from "react";
import FriendInviter from "../FriendInviter/FriendInviter";

var __mounted;

class P2PBetOption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minBet: 0,
      bestCote: null,
      bettable: null,
      amountToBet: 0,
      betNumberP2P: null,
    };
    this.openModalInviter = this.openModalInviter.bind(this)
    this.closeModalInviter = this.closeModalInviter.bind(this);
  }
  componentDidMount() {
    //console.log(this.props.status)

    __mounted = true;
    //this.searchCote(0);
  }
  componentDidUpdate() {
    //console.log(this.props)
  }
  componentWillUnmount() {
    __mounted = false
  }

  orderBook(minToEnter) {
    try {
      this.props.betContract.methods
        .getorderBook(this.props.betNumber, this.props.optionNumber, minToEnter)
        .call()
        .then((result) => {
          console.log(result);
        });
    } catch (error) {
      console.log(error);
    }
  }

  openModalInviter() {
    this.setState({ modalInviterOpened: true })
  }
  closeModalInviter() {
    this.setState({ modalInviterOpened: false })
  }
  render() {
    return (
      <div id={this.props.status === 0 ? "p2p2Open" : "p2p2"} className={this.props.theme === "light" ? "whiteDiv" : "blackDiv"}>
        <div id="p2p2Box1">
          <p id="line1P2POption" className={this.props.theme === "light" ? "blackP" : "whiteP"}>P2P Bets {this.props.optionsArray === undefined ? null : this.props.args === undefined ? null : " against " + this.props.optionsArray.split(",")[this.props.args[0]['6']]}</p>
          {this.props.logged && this.props.status === 0 ? <div className="friendInviterTrigger">
            <button className="buttonInviter" onClick={this.openModalInviter}>Invite a friend</button>
            <FriendInviter address={this.props.address} socket={this.props.socket} typeBet="p2p" argsBet={{ betNumber: this.props.betNumber, title: this.props.optionsArray, p2pnumber: this.props.args }} friends={this.props.friends} modalCloser={this.closeModalInviter} active={this.state.modalInviterOpened}></FriendInviter>
          </div> : null}

        </div>
        <div id="p2p2Box2">
          <div id="line2P2POption">
            <p className={this.props.theme === "light" ? "blackP" : "whiteP"}>Best cote : </p>
            {this.props.status === 0 ? <button
              id="buttonCoteP2P"
              className="button"
              onClick={(event) => {
                if (this.props.args !== undefined) {
                  this.props.setTypeBet(3)
                  this.props.setBetArgs({
                    betNumber: this.props.betNumber,
                    betName: this.props.optionsArray,
                    amountToBet: weiconvert(this.props.amountToBet),
                    cote: this.props.args[1],
                    optionName: this.props.optionsArray.split(",")[this.props.args[0]['6']],
                    toWin: this.props.amountToBet * this.props.args[1],
                    betNumberP2P: this.props.args[0]['0']

                  }
                  )
                }

                //this.betOnThisOption(this.props.amountToBet);
              }}
            >
              <p id="coteP2P">{this.props.args === undefined ? "-" : this.props.args[1] === "indispo" ? "Nothing :/" : this.props.args[1]}</p>
            </button> : <div id="buttonCoteP2P"
              className="button">                <p id="coteP2P">{this.props.args === undefined ? "-" : this.props.args[1] === "indispo" ? "Nothing :/" : this.props.args[1]}</p>
            </div>}
          </div>
          <div id="line3P2POption">
            <p className={this.props.theme === "light" ? "blackP" : "whiteP"}>Amount bettable : </p>
            <p id="amountBettableP">{this.props.args !== undefined ? this.props.args[2] === "indispo" ? "Nothing :/" : this.props.args[2] + " USDT" : null} </p>
          </div>

        </div>



        {/*<button
            className="button"
            onClick={(event) => {
              this.orderBook(weiconvert(this.state.minBet));
            }}
          >
            orderBook
          </button>*/}
      </div>
    );
  }
}

P2PBetOption.propTypes = {};

P2PBetOption.defaultProps = {};

export default P2PBetOption;
function decimalsConverter(numberToConvert) {
  return Math.pow(numberToConvert, 18);
}
function weiconvert(number) {
  return BigInt(number * decimalsConverter(10));
}
