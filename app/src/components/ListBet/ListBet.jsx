import React from "react";
import { Link } from "react-router-dom";
var _mounted
class ListBet extends React.Component {
  constructor(props) {
    super(props);
    this.state = { matches: [] };

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
  }
  componentWillUnmount() {
    _mounted = false
  }
  render() {
    return (
      <div className="listBets">
        <div id="box1ListBets"></div>
        <div id="box2ListBets">
          {this.state.matches.map(function (item) {
            return <div key={item.betNumber}><Link to={"/bet/numBet?n=" + item.betNumber} ><h5>{item.type + " Bet " + item.betNumber + " : " + item.name}</h5></Link><br /></div>;
          })}
        </div>
        <div id="box3ListBets">
          {this.state.matches.map(function (item) {
            return <div key={item.betNumber}><Link to={"/bet/numBet?n=" + item.betNumber} ><h5>{item.type + " Bet " + item.betNumber + " : " + item.name}</h5></Link><br /></div>;
          })}
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
