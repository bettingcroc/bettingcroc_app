/* global BigInt */

import React from "react";
import PropTypes from "prop-types";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

var __mounted;
class P2PBetCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amountToBet: 1,
      cote: undefined,
      P2PBetCreatorSwitcher: "Public",
      selectedOption: 0,
      authorized: undefined,
      error: null,
      class: null,
      modal: "collapse"
    };
    this.switchButton = this.switchButton.bind(this);

    //this.createP2PBet = this.createP2PBet.bind(this);
    //this.seeP2PBets = this.seeP2PBets.bind(this);
    this.changeClass = this.changeClass.bind(this);
    this.setModal = this.setModal.bind(this);
    this.setSelectedOption = this.setSelectedOption.bind(this);
    this.handleClickAwayEvent = this.handleClickAwayEvent.bind(this);
  }
  componentDidMount() {
    this.setState({ authorized: undefined });
    console.log(this.state.authorized);
    __mounted = true
  }
  componentDidUpdate(prevProps) {
    console.log("update P2P Creator "+ this.props.amountToBet)
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
  changeClass() {
    this.setState({ class: null })
  }
  setModal() {
    if (this.state.modal === "collapse") {
      this.setState({ modal: null })
    }
    else {
      this.setState({ modal: "collapse" })
    }
  }
  handleClickAwayEvent(){
    this.setState({ modal: "collapse" })
  }
  setSelectedOption(option) {
    this.setState({ selectedOption: option })
  }
  render() {
    return (
      <div id="p2pcreator">


        <div id="underp2pcreator">
          <div id="superNewP2P">

            <p id="newP2PP">New P2P</p>

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
            <ClickAwayListener onClickAway={this.handleClickAwayEvent}>

              <div id="superinputLine1P2PFinder">
                <div id="selectCreateNewP2P" onClick={this.setModal}>
                  <p>{this.props.optionsArray !== null ? this.props.optionsArray.split(",")[this.state.selectedOption] : null}</p>
                </div>
                <div id="modalinputLine1P2PFinder" className={this.state.modal}>
                  {this.props.optionsArray == null
                    ? null
                    : this.props.optionsArray.split(",").map((item, index) => {
                      return (
                        <div key={index} className="lineModalP2PFinder" onClick={() => { this.setSelectedOption(index); this.setModal() }}>
                          <p>{item}</p>
                        </div>
                      );
                    })}
                </div>
              </div>
            </ClickAwayListener>
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
            <button className="button"
              id="buttonCreateP2Pbutton"
              onClick={(event) => {
                if (this.state.cote <= 1 || this.state.cote === null || this.state.cote === undefined) {
                  this.setState({ error: "Cote must be > 1 !" }); this.setState({ class: "horizontal-shake" }); setTimeout(this.changeClass, 1000);
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
              <p id="buttonCreateP2PP">Create bet</p>
            </button>
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
  console.log(number)
  console.log(typeof number)
  return BigInt(number * decimalsConverter(10));
}
