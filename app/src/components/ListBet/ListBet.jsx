import React from "react";
import { Link } from "react-router-dom";
import bettingCrocImage from "./bettingCrocTransparent.png"
var _mounted
class ListBet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [],
      topMatches: []
    };
    this.props.vueSetter("listBets")
    //console.log("state.matches " + this.state.matches);
  }
  componentDidMount() {
    _mounted = true
    fetch("https://testnet.bettingcroc.com/api/lastbets", { method: "GET" }).then((res) => {
      res.json().then((data) => {
        if (_mounted) {
          this.setState({ matches: data.matches });
        }
        //console.log("state.matches then " + this.state.matches);
      });
    });
    fetch("https://testnet.bettingcroc.com/api/topbets", { method: "GET" }).then((res) => {
      res.json().then((data) => {
        if (_mounted) {
          this.setState({ topMatches: data.matches });
        }
        //console.log("state.matches then " + this.state.matches);
      });
    });
  }
  componentWillUnmount() {
    _mounted = false
  }
  render() {
    return (
      <div className="listBets">
        <div id="box1ListBets"><img src={bettingCrocImage} alt="bettingCrocImage" id="bettingCrocImage"></img></div>
        <div id="box2ListBets">
          {this.state.topMatches.map(function (item, index) {
            if (item) {
              return (
                <Link key={item.betNumber} to={"/bet/numBet?n=" + item.betNumber} >

                  <div id={"topBetsBox" + (index + 1)} key={item.betNumber}>
                    <div className="topBetsMiniBox1"><p>{parseFloat(item.moneyBetted) / decimalsConverter(10)} USDT Locked 🔥</p></div>
                    <div className="topBetsMiniBox2">
                      <div className="topBetsMiniMiniBox1"><p>{item.type}</p></div>
                      <div className="topBetsMiniMiniBox2">
                        <p>{item.name.split('-')[0]}</p>
                        <p>{item.name.split('-')[1]}</p>


                      </div>
                    </div>


                  </div>
                </Link>
              )
            }


          })}
        </div>
        <div id="box3ListBets">
          <div id="underBox3ListBets">
            {this.state.matches.map(function (item) {
              return (
                <div key={item.betNumber}>
                  <Link to={"/bet/numBet?n=" + item.betNumber} >
                    <div className="betLineListBets">
                      <p>{item.name}</p>
                      <p>{item.type}</p>
                    </div>
                  </Link>
                </div>
              )
            })
            }
          </div>
        </div>
      </div>
    );
  }
}

export default ListBet;
/*{this.state.matches.map(function (item) {
          return <div>{item.betNumber}</div>;
        })}
        {this.state.matches[0].betNumber}
        */
function decimalsConverter(numberToConvert) {
  return Math.pow(numberToConvert, 18)
}