/* global BigInt */

import React from "react";
import PropTypes from "prop-types";
var __mounted;
class P2PBetCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amountToBet: undefined,
      cote: undefined,
      P2PBetCreatorSwitcher: "Public",
      selectedOption: 0,
      authorized: undefined,
      error: null,
      class: null
    };
    this.switchButton = this.switchButton.bind(this);
    this.approveUSDT = this.approveUSDT.bind(this);
    this.approveMBT = this.approveMBT.bind(this);
    this.createP2PBet = this.createP2PBet.bind(this);
    this.seeP2PBets = this.seeP2PBets.bind(this);
    this.changeClass=this.changeClass.bind(this);
  }
  componentDidMount() {
    this.setState({ authorized: undefined });
    console.log(this.state.authorized);
    __mounted = true
  }
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props && __mounted) {
      this.setState({ amountToBet: this.props.amountToBet })
    }
  }
  switchButton() {
    if (this.state.P2PBetCreatorSwitcher === "Public") {
      this.setState({ P2PBetCreatorSwitcher: "Friends only" });
    } else {
      this.setState({ P2PBetCreatorSwitcher: "Public" });
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
      authorized = authorized.split(',')
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
  seeP2PBets() {
    try {
      this.props.betContract.methods.seeP2PBets(this.props.betNumber).call()
        .then(console.log)
    }
    catch (error) {
      console.log(error)
    }
  }
  changeClass(){
    this.setState({class:null})
  }
  render() {
    return (
      <div id="p2pcreator">


        <div id="underp2pcreator">
          <div id="superNewP2P">
            <div id="newP2P">
              <div id="underNewP2P">
                <p id="newP2PP">New P2P</p>
              </div>
            </div>
          </div>
          <div id="inputsP2P">
            <input
              className="css-input"
              placeholder="cote"
              id="cote"
              type="number"
              min="1.01"
              value={this.state.cote || ""}
              onChange={(e) => this.setState({ cote: e.target.value })}
            ></input>
            <div id="selectCreateNewP2P">
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
            </div>

            <div id="authorizedDiv">
              <button id="publicSwitchButton" className="button" onClick={this.switchButton}>
                {this.state.P2PBetCreatorSwitcher}
              </button>
              <input
                type="text"
                className={
                  this.state.P2PBetCreatorSwitcher === "Public" ? "hidden" : undefined
                }
                id="adressAuthorizedInput"
                value={this.state.authorized || ''}
                onChange={(e) => { this.setState({ authorized: e.target.value }); console.log(this.state.authorized) }}
              ></input>
            </div>
            <div id="superButtonCreateP2Pbutton">
              <button className="button"
                id="buttonCreateP2Pbutton"
                onClick={(event) => {
                  if (this.state.cote <= 1 || this.state.cote === null || this.state.cote === undefined) { 
                    this.setState({ error: "Cote must be > 1 !" });this.setState({class:"horizontal-shake"}); setTimeout(this.changeClass, 1000); 
                  }
                  else {
                    this.setState({ error: null })
                    console.log(this.state.selectedOption);
                    this.props.setTypeBet(2)
                    this.props.setBetArgs({
                      betNumber: this.props.betNumber,
                      betName: this.props.optionsArray,
                      amountToBet: weiconvert(this.state.amountToBet),
                      cote: this.state.cote,
                      selectedOption: this.state.selectedOption,
                      authorized: this.state.authorized,
                      optionName: this.props.optionsArray.split(",")[this.state.selectedOption],
                      toWin: this.state.amountToBet * this.state.cote
                    })

                  }
                }}
              >
                <div id="buttonCreateP2P"><p id="buttonCreateP2PP">Create bet</p></div>
              </button>
            </div>
            <div id="errorCoteDiv"><p id="errorP" className={this.state.class}>{this.state.error}</p></div>
            {/*<h3>
              will cost you {this.state.amountToBet} USDT and{" "}
              {this.state.amountToBet} MBT
              </h3>*/}
          </div>





          {/*<button className="button" onClick={this.seeP2PBets}>seeP2PBets</button>*/}
        </div>
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
