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
    this.betOnThisOption = this.betOnThisOption.bind(this);
    this.approveUSDT = this.approveUSDT.bind(this);
  }
  componentDidMount() {
    __mounted = true;
    this.searchCote(0);
  }
  componentWillUnmount(){
    __mounted=false
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
            if (__mounted)
            {this.setState({ bestCote: "indispo", bettable: "indispo" });}
          }
        });
    } catch (error) {
      console.log(error);
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
  betOnThisOption(amount) {
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
  }
  render() {
    return (
      <div className="P2POption">
        <h5>{this.props.team}</h5>
        <input
          className="css-input"
          id="minBet"
          type="number"
          value={this.state.minBet}
          onChange={(e) => this.setState({ minBet: e.target.value })}
        ></input>
        <button
          className="button"
          onClick={(event) => {
            this.searchCote(weiconvert(this.state.minBet));
          }}
        >
          Search Cote
        </button>
        <h5>best cote : {this.state.bestCote}</h5>
        <h5>amount bettable : {this.state.bettable}</h5>
        <input
          className="css-input"
          id="amountToBetOnP2POptionPool"
          type="number"
          value={this.state.amountToBet}
          onChange={(e) => this.setState({ amountToBet: e.target.value })}
        ></input>
        <button
          className="button"
          onClick={(event) => {
            this.approveUSDT(this.state.amountToBet);
          }}
        >
          APPROVE USDT
        </button>
        <button
          className="button"
          onClick={(event) => {
            this.betOnThisOption(this.state.amountToBet);
          }}
        >
          BET
        </button>
        <button
          className="button"
          onClick={(event) => {
            this.orderBook(weiconvert(this.state.minBet));
          }}
        >
          orderBook
        </button>
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
