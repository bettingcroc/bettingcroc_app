/* global BigInt */

import React from "react";

class DecentraBetCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oracle: null,
      amountToBet: null,
      authorized: undefined,
      P2PBetCreatorSwitcher: "public",
      playersNumber: null,
      privated:false
    };
    this.switchButton = this.switchButton.bind(this);
    this.approveUSDT = this.approveUSDT.bind(this);
    this.createDecentraBet=this.createDecentraBet.bind(this)
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
      .approve("0x7e46BA7F5228a7B531B07AD939C921d5ea48a552", weiconvert(amount))
      .send({ from: this.props.address })
      .once("receipt", (receipt) => {
        console.log("approve success");
      });
  }
  createDecentraBet(oracle,amount,authorized,playersNumber,privated){
    if(authorized===undefined || this.state.P2PBetCreatorSwitcher==="public"){
      authorized=[];
    }
    else{
      authorized=authorized.split(",")
    }
    if(playersNumber===null){
      playersNumber=0;
    }
    console.log(oracle,amount,authorized,playersNumber,privated)
    this.props.decentrabetContract.methods
      .createDecentraBet(oracle,weiconvert(amount),authorized,playersNumber,privated)
      .send({ from: this.props.address })
      .once("receipt", (receipt) => {
        console.log("bet creation success");
      });
  }
  render() {
    return (
      <div className="DecentraBetCreator">
        <h3>create a DecentraBet</h3>
        <h5>oracle : </h5>
        <input
          type="text"
          className="css-input"
          placeholder="oracle"
          onChange={(e) => this.setState({ oracle: e.target.value })}
        />
        <h5>amountTOBet :</h5>
        <input
          className="css-input"
          placeholder="amountToBet"
          type="number"
          value={this.state.amountToBet || ""}
          onChange={(e) => this.setState({ amountToBet: e.target.value })}
        />
        <button className="button" onClick={this.switchButton}>
          {this.state.P2PBetCreatorSwitcher}
        </button>
        <input
          type="text"
          className={
            this.state.P2PBetCreatorSwitcher === "public" ? "hidden" : undefined
          }
          value={this.state.authorized || ""}
          onChange={(e) => {
            this.setState({ authorized: e.target.value });
            console.log(this.state.authorized);
          }}
          placeholder="addresses authorized"
        ></input>
        <input
          className={
            this.state.P2PBetCreatorSwitcher === "public" ? undefined : "hidden"
          }
          value={this.state.playersNumber || ""}
          onChange={(e) => {
            this.setState({ playersNumber: e.target.value });
            console.log(this.state.playersNumber);
          }}
          placeholder="playersNumber"
        ></input>
        <input
          type="checkbox"
          className="css-input"
          onChange={(e) => {this.setState({ privated: this.state.privated===false ? true : false });console.log(this.state.privated)}}
          value="checked"
        />
        <h3>amount to Bet :</h3>
        <button className="button"
          onClick={(event) => {
            this.approveUSDT(this.state.amountToBet);
          }}
        >
          APPROVE USDT
        </button>
        <button className="button" onClick={(event) => {
            this.createDecentraBet(this.state.oracle,this.state.amountToBet,this.state.authorized,this.state.playersNumber,this.state.privated);
          }}>Create a DecentraBet</button>
      </div>
    );
  }
}

export default DecentraBetCreator;
function decimalsConverter(numberToConvert) {
  return Math.pow(numberToConvert, 18);
}
function weiconvert(number) {
  return BigInt(number * decimalsConverter(10));
}
