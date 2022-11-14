import React from "react";
import OptionPool from "../OptionPool/OptionPool";
import P2PBetOption from "../P2PBetOption/P2PBetOption";
import P2PBetCreator from "../P2PBetCreator/P2PBetCreator";
class BetComplet extends React.Component {
  componentDidMount() {

  }
  componentDidUpdate(prevProps) {
    console.log("update betcomplet ")
  }
  constructor(props) {

    super(props);
    this.state = {
      optionsArray: null,
      date: null,
      type: null,
      country: null,
      league: null
    };
    fetch("https://testnet.bettingcroc.com/api/infoMatch/" + props.betNumber, { method: "GET" }).then((res) => {
      res.json().then((data) => {
        this.setState({
          optionsArray: data.optionsArray,
          date: data.date,
          type: data.type,
          country: data.country,
          league: data.league
        });
      });
    });
  }
  componentWillUnmount() {
    console.log("unmount BetComplet")
  }
  render() {
    return (
      <div className="betComplet">
        <div id="nameBet">
          <div id="underNameBet">
            <div id="countryLeagueDate">
              <p>{this.state.country} / {this.state.league}</p>
              <p>{timeConverterDate(this.state.date)}</p>
            </div>
            <div id="optionsSchedule">
              <p>{this.state.optionsArray == null ? null : this.state.optionsArray.split(",")[0]}</p>
              <p> {timeConverterSchedule(this.state.date)}</p>
              <p>{this.state.optionsArray == null ? null : this.state.optionsArray.split(",")[1]}</p>
            </div>
          </div>
        </div>
        <div className="optionsPool">
          {this.state.optionsArray == null ? null : this.state.optionsArray.split(",").map((item, index) => {
            return <OptionPool key={item} team={item} betNumber={this.props.betNumber} optionNumber={index} betContract={this.props.betContract} usdtContract={this.props.usdtContract} address={this.props.address} amountToBet={this.props.amountToBet}></OptionPool>
          })}
        </div>
        <div id="p2p1">
          <div id="p2pfinder">
            <div id="underp2pfinder">

            </div>
          </div>
          <div id="p2pcreator">
            <div id="underp2pcreator">
              <P2PBetCreator betContract={this.props.betContract} usdtContract={this.props.usdtContract} address={this.props.address} mbtContract={this.props.mbtContract} optionsArray={this.state.optionsArray} betNumber={this.props.betNumber}></P2PBetCreator>

            </div>
          </div>
        </div>
        <div id="p2p2">
          <div id="underp2p2">
            {this.state.optionsArray == null ? null : this.state.optionsArray.split(",").map((item, index) => {
              return <P2PBetOption key={item} team={item} betNumber={this.props.betNumber} optionNumber={index} betContract={this.props.betContract} usdtContract={this.props.usdtContract} address={this.props.address}></P2PBetOption>
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default BetComplet;
function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
  return time;
}
function timeConverterDate(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var time = date + ' ' + month + ' ' + year;
  return time;
}
function timeConverterSchedule(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = hour + ':' + min + ':' + sec;
  return time;
}

