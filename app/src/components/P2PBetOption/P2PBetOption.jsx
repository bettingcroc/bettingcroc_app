/* global BigInt */

import React from "react";
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
    this.searchCote = this.searchCote.bind(this);
    //this.betOnThisOption = this.betOnThisOption.bind(this);
    this.approveUSDT = this.approveUSDT.bind(this);
  }
  componentDidMount() {
    __mounted = true;
    this.searchCote(0);
  }
  componentWillUnmount() {
    __mounted = false
  }
  searchCote(minToEnter) {
    try {
      this.props.betContract.methods
        .getMaxCote(this.props.betNumber, this.props.optionNumber, minToEnter)
        .call()
        .then((result) => {
          if (parseInt(result) !== 0) {
            this.props.betContract.methods
              .seeP2PBet(this.props.betNumber, result)
              .call()
              .then((result2) => {
                //console.log(result2)
                if (__mounted) {
                  this.setState({
                    bestCote: parseFloat(
                      1 + Object.values(result2)[2] / Object.values(result2)[3]
                    ).toFixed(2),
                  });
                  this.setState({
                    bettable: (
                      parseFloat(Object.values(result2)[4]) /
                      decimalsConverter(10)
                    ).toFixed(2),
                  });
                  this.setState({ betNumberP2P: result });
                }
              });
          } else {
            if (__mounted) { this.setState({ bestCote: "indispo", bettable: "indispo" }); }
          }
        });
    } catch (error) {
      //console.log(error);
    }
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
  approveUSDT(amount) {
    this.props.usdtContract.methods
      .approve("0xD90531a9234A38dfFC8493c0018ad17cB5F7A867", weiconvert(amount))
      .send({ from: this.props.address })
      .once("receipt", (receipt) => {
        console.log("approve success");
      });
  }
  /*betOnThisOption(amount) {
    try {
      this.props.betContract.methods
        .joinP2PBet(
          this.props.betNumber,
          this.state.betNumberP2P,
          weiconvert(amount)
        )
        .send({ from: this.props.address })
        .once("receipt", (receipt) => {
          console.log("bet success");
        });
    } catch (error) {
      console.log(error);
    }
  }*/
  render() {
    return (
      <div id="p2p2">
        <div id="myP2P">
          <div id="p2p2Box1">
            <p id="line1P2POption">P2P Bets {this.props.optionsArray === null ? null : this.props.args === null ? null : " against " + this.props.optionsArray.split(",")[this.props.args[0]['6']]}</p>
          </div>
          <div id="p2p2Box2">
            <div id="line2P2POption">
              <p>Best cote : </p>
              <button
              id="buttonCoteP2P"
                className="button"
                onClick={(event) => {
                  if (this.props.args !== null) {
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
                <div id="buttonDiveCoteP2P"><p id="coteP2P">{this.props.args === null ? "-" : this.props.args[1]}</p></div>
              </button>
            </div>
            <div id="line3P2POption">
              <p>Amount bettable : </p>
              <p id="amountBettableP">{this.props.args === null ? null : this.props.args[2]+" USDT"} </p>
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
