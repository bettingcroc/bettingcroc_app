/* global BigInt */
import React from 'react';
import PropTypes from 'prop-types';
import refreshImage from "./refresh.png"
var __mounted;
class P2PFinder extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedOption: 0,
      minBet: 0,
      id:props.id===null?0:props.id,
      modeSearch: props.id===null?"minToBet":"byId",
      loaded:false
    }
    this.searchCote = this.searchCote.bind(this);
    this.searchById = this.searchById.bind(this);
    
  }
  componentDidMount() {
    __mounted = true
  }
  componentWillUnmount() {
    __mounted = false
    console.log("unmount P2P finder")
  }
  componentDidUpdate(prevProps){
    if(this.props.id!==undefined && prevProps !== this.props && this.props.betContract!==undefined  && (this.state.loaded===false || this.props.id!==prevProps.id)){
      console.log("id to set "+ this.state.id)
      this.searchById(this.props.id)
      this.setState({loaded:true})
    }
  }
  searchCote(minToEnter) {
    console.log("try search cote")
    try {
      console.log("try search cote2")
      this.props.betContract.methods
        .getMaxCote(this.props.betNumber, this.state.selectedOption, minToEnter)
        .call()
        .then((result) => {
          console.log("maxCote "+result)
          if (parseInt(result) !== 0) {
            this.props.betContract.methods
              .seeP2PBet(this.props.betNumber, result)
              .call()
              .then((result2) => {
                console.log(result2)
                this.props.setP2PdisplayArgs([result2, parseFloat(
                  1 + Object.values(result2)[2] / Object.values(result2)[3]
                ).toFixed(2), (
                  parseFloat(Object.values(result2)[4]) /
                  decimalsConverter(10)
                ).toFixed(2)])
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
            if (__mounted) { this.setState({ bestCote: "indispo", bettable: "indispo" }); this.props.setP2PdisplayArgs(["indispo", "indispo", "indispo"]) }
          }
        });
    } catch (error) {
      console.log(error);
    }
  }
  searchById(id) {
    console.log("try search id")
    try {
      console.log("try search id2 with ",this.props.betNumber, id)
      //if (parseInt(result) !== 0) {
      this.props.betContract.methods
        .seeP2PBet(this.props.betNumber, id)
        .call()
        .then((result2) => {
          console.log(result2)
          this.props.setP2PdisplayArgs([result2, parseFloat(
            1 + Object.values(result2)[2] / Object.values(result2)[3]
          ).toFixed(2), (
            parseFloat(Object.values(result2)[4]) /
            decimalsConverter(10)
          ).toFixed(2)])
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
            this.setState({ betNumberP2P: id });
          }
        });
      //} else {
      // if (__mounted) { this.setState({ bestCote: "indispo", bettable: "indispo" }); this.props.setP2PdisplayArgs(["indispo", "indispo", "indispo"]) }
      // }

    } catch (error) {
      console.log(error);
    }
  }
  render() {
    return (
      <div id="p2pfinder">
        <div id="underp2pfinder">
          <div id="titleP2pFinder">
            <div id="undertitleP2pFinder">
              <div id="under2titleP2pFinder">
                <p id="findp2pP">Find P2P</p>
              </div>
            </div>
          </div>
          <div id="inputP2pFinder">
            <div id="inputLine1P2PFinder">
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
            <div id="inputLine2P2PFinder">
              <div id="inputAmountP2PFinder"><input
                className="css-input"
                id="minBet"
                type="number"
                min="0"
                value={this.state.minBet}
                onChange={(e) => this.setState({ minBet: e.target.value })}
              ></input></div>
              <button id="buttonRefreshP2PFinderButton" onClick={(event) => { this.setState({ modeSearch: "minToBet" }) }}><div id="buttonRefreshP2PFinder"><img id="refreshImage" src={refreshImage}></img></div></button>
            </div>
            <p id='orP'>or search by bet id :</p>
            <div id="inputLine3P2PFinder">
              <div id="inputIdP2PFinder"><input
                className="css-input"
                id="minBet"
                type="number"
                min="0"
                value={this.state.id}
                onChange={(e) => this.setState({ id: e.target.value })}
              ></input></div>
              <button id="buttonRefreshP2PFinderButton" onClick={(event) => { this.setState({ modeSearch: "byId" }) }}><div id="buttonRefreshP2PFinder"><img id="refreshImage" src={refreshImage}></img></div></button>

            </div>
            <div id="superButtonSearchP2P">
              <button id="buttonSearchP2P" onClick={(event) => { this.state.modeSearch==="minToBet"?this.searchCote(weiconvert(this.state.minBet)): this.searchById(this.state.id)}}><div id="divSearchP2P"><p id="searchP">Search !</p></div></button>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

P2PFinder.propTypes = {};

P2PFinder.defaultProps = {};

export default P2PFinder;
function decimalsConverter(numberToConvert) {
  return Math.pow(numberToConvert, 18)
}
function weiconvert(number) {
  return BigInt(number * decimalsConverter(10));
}
