/* global BigInt */
import React from "react";

class ViewADecentrabet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idBetToView: null,
      amountToBet: null,
      stateBet: null,
      winnerToSet: null
    };
    this.viewBet = this.viewBet.bind(this);
    this.endBet = this.endBet.bind(this);
    this.joinBet = this.joinBet.bind(this);
    this.approveUSDT = this.approveUSDT.bind(this);
  }
  approveUSDT(amount) {
    amount = weiconvert(amount)
    console.log(amount)
    this.props.usdtContract.methods
      .approve("0x7e46BA7F5228a7B531B07AD939C921d5ea48a552", amount)
      .send({ from: this.props.address })
      .once("receipt", (receipt) => {
        console.log("approve success");
      });
  }
  viewBet() {
    this.props.decentrabetContract.methods.viewADecentrabet(this.state.idBetToView).call()
      .then(result => {

        console.log(result);
        this.setState({ amountToBet: Object.values(result)[1] / decimalsConverter(10) })
        this.setState({ stateBet: Object.values(result)[4] === false ? "alive" : "dead" })
        this.props.decentrabetContract.methods.infoSpecBet(this.state.idBetToView).call()
          .then(result => {
            console.log(result)
          })
      })
  }
  joinBet() {
    this.props.decentrabetContract.methods.joinBet(this.state.idBetToView).send({ from: this.props.address })
      .once("receipt", (receipt) => {
        console.log("bet join success");
      });
  }
  endBet() {
    console.log(this.state.idBetToView, this.state.winnerToSet)
    this.props.decentrabetContract.methods.endBet(this.state.idBetToView, this.state.winnerToSet)
      .send({ from: this.props.address })
      .once("receipt", (receipt) => {
        console.log("bet ending success");
      });
  }
  render() {
    return (
      <div className={this.props.theme == "light" ? "viewADecentraBet" : "viewADecentraBetDark"}>
        <p className={this.props.theme == "light" ? "headerTitle" : "headerTitleDark"}>Find a Decentrabet</p>
        <div id="line1viewADecentraBet" className="lineviewADecentraBet">
          <input
            id="inputidBetToView"
            className="inputDecentraBet"
            placeholder="Decentrabet number"
            type="number"
            value={this.state.idBetToView || ""}
            onChange={(e) => this.setState({ idBetToView: e.target.value })}
          ></input>

          <button className="buttonViewDecentraBet" onClick={this.viewBet}>
            Find bet
          </button>
          <div id="divStateDecentraBet">
            <p id="decentraStateP" className={this.props.theme == "light" ? "blackP" : "lightGreyP"}>State:{this.state.stateBet}</p>
          </div>
        </div>

        <div id="line2viewADecentraBet" className="lineviewADecentraBet">
          <p className={this.props.theme == "light" ? "blackP" : "lightGreyP"}>Bet n° {this.state.idBetToView}</p>

        </div>
        <div id="blockviewADecentraBet" className="lineviewADecentraBet">
          <div id="line3viewADecentraBet" className="lineviewADecentraBetColumn">
            <p className={this.props.theme == "light" ? "blackP" : "lightGreyP"}>Amount to Bet : {this.state.amountToBet} USDT </p>
            <div id="line3viewADecentraBet2">
              <button className="buttonViewDecentraBet" onClick={(event) => { this.approveUSDT(this.state.amountToBet) }}>Approve USDT</button>

              <button className="buttonViewDecentraBet" onClick={this.joinBet}>Join Bet</button>
            </div>
          </div>

          <div id="line4viewADecentraBet" className="lineviewADecentraBetColumn">
            <p className={this.props.theme == "light" ? "blackP" : "lightGreyP"}>I'm the oracle !</p>
            <input
              id="addressWinnerDecentraBet"
              type="text"
              className="inputDecentraBet"
              value={this.state.winnerToSet || ""}
              onChange={(e) => {
                this.setState({ winnerToSet: e.target.value });
              }}
              placeholder="winner"
            ></input>
            <button className="buttonViewDecentraBet" onClick={this.endBet}>endBet</button>
          </div>
        </div>


      </div>
    );
  }
}

export default ViewADecentrabet;
function decimalsConverter(numberToConvert) {
  return Math.pow(numberToConvert, 18)
}
function weiconvert(number) { return BigInt(number * decimalsConverter(10)); }