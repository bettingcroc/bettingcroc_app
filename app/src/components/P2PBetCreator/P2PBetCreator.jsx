/* global BigInt */

import React from "react";
import PropTypes from "prop-types";

class P2PBetCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amountToBet: undefined,
      cote: undefined,
      P2PBetCreatorSwitcher: "public",
      selectedOption: 0,
      authorized: undefined,
    };
    this.switchButton = this.switchButton.bind(this);
    this.approveUSDT = this.approveUSDT.bind(this);
    this.approveMBT = this.approveMBT.bind(this);
    this.createP2PBet = this.createP2PBet.bind(this);
    this.seeP2PBets=this.seeP2PBets.bind(this)
  }
  componentDidMount() {
    this.setState({ authorized: undefined });
    console.log(this.state.authorized);
  }
  switchButton() {
    if (this.state.P2PBetCreatorSwitcher === "public") {
      this.setState({ P2PBetCreatorSwitcher: "friends only" });
    } else {
      this.setState({ P2PBetCreatorSwitcher: "public" });
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
  approveMBT(amount) {
    this.props.mbtContract.methods
      .approve("0xD90531a9234A38dfFC8493c0018ad17cB5F7A867", weiconvert(amount))
      .send({ from: this.props.address })
      .once("receipt", (receipt) => {
        console.log("approve success");
      });
  }
  createP2PBet(amount, cote, option, authorized) {
    if (authorized === undefined) {
      authorized = [];
    }
    else {
      authorized=authorized.split(',')
    }
    console.log(amount, cote, option, authorized);
    let amountToEnter = (cote - 1) * amount;
    amountToEnter = weiconvert(parseFloat(amountToEnter.toPrecision(7)));
    this.props.betContract.methods
      .createP2PBet(
        weiconvert(amount),
        amountToEnter,
        this.props.betNumber,
        option,
        authorized
      )
      .send({ from: this.props.address })
      .once("receipt", (receipt) => {
        console.log("new bet Created");
      });
  }
  seeP2PBets(){
    try{this.props.betContract.methods.seeP2PBets(this.props.betNumber).call()
    .then(console.log)}
    catch(error){
      console.log(error)
    }
  }
  render() {
    return (
      <div>
        <h3>Create a new Bet</h3>
        <h5>amountTOBet :</h5>
        <input 
         className="css-input"
          placeholder="amountTOBet"
          id="amountToBet"
          type="number"
          value={this.state.amountToBet || ""}
          onChange={(e) => this.setState({ amountToBet: e.target.value })}
        ></input>
        <h5>cote :</h5>
        <input
        className="css-input"
          placeholder="cote"
          id="cote"
          type="number"
          value={this.state.cote || ""}
          onChange={(e) => this.setState({ cote: e.target.value })}
        ></input>
        <select
          value={this.state.selectedOption}
          onChange={(e) => {
            this.setState({ selectedOption: e.target.value });
            console.log(e.target.value);
          }}
        >
          {this.props.optionsArray == null
            ? null
            : this.props.optionsArray.split(",").map((item, index) => {
                return (
                  <option key={index} value={index}>
                    {item}
                  </option>
                );
              })}
        </select>
        <br></br>
        <button className="button" onClick={this.switchButton}>
          {this.state.P2PBetCreatorSwitcher}
        </button>
        <input
          type="text"
          className={
            this.state.P2PBetCreatorSwitcher === "public" ? "hidden" : undefined
          }
          value={this.state.authorized ||''}
          onChange={(e) => {this.setState({ authorized: e.target.value });console.log(this.state.authorized)}}
        ></input>
        <h3>
          will cost you {this.state.amountToBet} USDT and{" "}
          {this.state.amountToBet} MBT
        </h3>
        <button className="button"
          onClick={(event) => {
            this.approveUSDT(this.state.amountToBet);
          }}
        >
          APPROVE USDT
        </button>
        <button className="button"
          onClick={(event) => {
            this.approveMBT(this.state.amountToBet);
          }}
        >
          APPROVE MBT
        </button>
        <button className="button"
          onClick={(event) => {
            console.log(this.state.selectedOption);
            this.createP2PBet(
              this.state.amountToBet,
              this.state.cote,
              this.state.selectedOption,
              this.state.authorized
            );
          }}
        >
          CREATE BET
        </button>
        <button className="button" onClick={this.seeP2PBets}>seeP2PBets</button>
      </div>
    );
  }
}

export default P2PBetCreator;
function decimalsConverter(numberToConvert) {
  return Math.pow(numberToConvert, 18);
}
function weiconvert(number) {
  return BigInt(number * decimalsConverter(10));
}
