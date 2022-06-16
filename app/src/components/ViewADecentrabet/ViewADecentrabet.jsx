/* global BigInt */
import React from "react";

class ViewADecentrabet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idBetToView: null,
      amountToBet:null,
      stateBet:null,
      winnerToSet:null
    };
    this.viewBet=this.viewBet.bind(this);
    this.endBet=this.endBet.bind(this);
    this.joinBet=this.joinBet.bind(this);
    this.approveUSDT=this.approveUSDT.bind(this);
  }
  approveUSDT(amount) {
    amount=weiconvert(amount)
    console.log(amount)
    this.props.usdtContract.methods
      .approve("0x7e46BA7F5228a7B531B07AD939C921d5ea48a552", amount)
      .send({ from: this.props.address })
      .once("receipt", (receipt) => {
        console.log("approve success");
      });
  }
  viewBet(){
    this.props.decentrabetContract.methods.viewADecentrabet(this.state.idBetToView).call()
    .then(result => {

      console.log(result);
      this.setState({amountToBet:Object.values(result)[1]/ decimalsConverter(10)})
      this.setState({stateBet:Object.values(result)[4]===false?"alive":"dead"})
      this.props.decentrabetContract.methods.infoSpecBet(this.state.idBetToView).call()
      .then(result => {
        console.log(result)
      })
    })
  }
  joinBet(){
    this.props.decentrabetContract.methods.joinBet(this.state.idBetToView).send({ from: this.props.address })
    .once("receipt", (receipt) => {
      console.log("bet join success");
    });
  }
  endBet(){
    console.log(this.state.idBetToView,this.state.winnerToSet)
    this.props.decentrabetContract.methods.endBet(this.state.idBetToView,this.state.winnerToSet)
      .send({ from: this.props.address })
      .once("receipt", (receipt) => {
        console.log("bet ending success");
      });
  }
  render() {
    return (
      <div className="viewADecentraBet">
        <input
          className="css-input"
          placeholder="idBetToView"
          type="number"
          value={this.state.idBetToView || ""}
          onChange={(e) => this.setState({ idBetToView: e.target.value })}
        />

        <button className="button" onClick={this.viewBet}>
          viewBet
        </button>
        <h3>Bet n° {this.state.idBetToView}</h3>
        <h4>Amount to Bet : {this.state.amountToBet} USDT </h4>
        <button className="button" onClick={(event) => {this.approveUSDT(this.state.amountToBet)}}>Approve USDT</button>
        <h4>state:{this.state.stateBet}</h4>
        
        <button className="button" onClick={this.joinBet}>Join Bet</button>
        <h3>i'm oracle !</h3>
        <input
          type="text"
          className="css-input"
          value={this.state.winnerToSet || ""}
          onChange={(e) => {
            this.setState({ winnerToSet: e.target.value });
          }}
          placeholder="winner"
        ></input>
        <button className="button" onClick={this.endBet}>endBet</button>
      </div>
    );
  }
}

export default ViewADecentrabet;
function decimalsConverter(numberToConvert){
	return Math.pow(numberToConvert,18)
}
function weiconvert(number) { return BigInt(number * decimalsConverter(10)); }