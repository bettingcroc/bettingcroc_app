import React from "react";
import OptionPool from "../OptionPool/OptionPool";
import P2PBetOption from "../P2PBetOption/P2PBetOption";
import P2PBetCreator from "../P2PBetCreator/P2PBetCreator";
class BetComplet extends React.Component {
  componentDidMount(){
 
  }
  componentDidUpdate(prevProps) {
    console.log("update betcomplet ")
  }
  constructor(props) {

    super(props);
    this.state = {
       optionsArray:null,
       date:null,
       type:null,
       country:null,
       league:null
      };
    fetch("https://testnet.bettingcroc.com/api/infoMatch/"+props.betNumber, { method: "GET" }).then((res) => {
        res.json().then((data) => {
          this.setState({ 
            optionsArray: data.optionsArray,
            date:data.date,
            type:data.type,
            country:data.country,
            league:data.league
          });
        });
    });
  }
  componentWillUnmount(){
    console.log("unmount BetComplet")
  }
  render() {
    return (
      <div className="betComplet">
        <h1>{this.state.optionsArray} le {timeConverter(this.state.date)}</h1>
        <div className="optionsPool">
        {this.state.optionsArray==null ? null : this.state.optionsArray.split(",").map((item,index)=>{
          return <OptionPool key={item} team={item} betNumber={this.props.betNumber} optionNumber={index} betContract={this.props.betContract} usdtContract={this.props.usdtContract} address={this.props.address}></OptionPool>
          })}
        </div>
        <div className="p2pgames">
        <h2>P2P</h2>
        <P2PBetCreator betContract={this.props.betContract} usdtContract={this.props.usdtContract} address={this.props.address} mbtContract={this.props.mbtContract} optionsArray={this.state.optionsArray} betNumber={this.props.betNumber}></P2PBetCreator>
        {this.state.optionsArray==null ? null : this.state.optionsArray.split(",").map((item,index)=>{
          return <P2PBetOption key={item} team={item} betNumber={this.props.betNumber} optionNumber={index} betContract={this.props.betContract} usdtContract={this.props.usdtContract} address={this.props.address}></P2PBetOption>
          })}
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