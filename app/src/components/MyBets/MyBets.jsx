import React from "react";
import { Link } from "react-router-dom";
var __mounted;
class MyBets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myBets: [],
    };
    console.log("contrsuction");
  }
  componentDidMount() {
    __mounted = true;
    if (this.props.address !== undefined) {
      try {
        console.log(this.props.address);
        this.props.betContract.methods.seeMyBets(this.props.address).call().then(result=>{
          fetch("https://testnet.bettingcroc.com/api/mybets/", { method: "GET" ,body:result}).then(
            (res) => {
              res.json().then((data) => {
                console.log(data)
  
                if (__mounted) {
                  this.setState({ myBets: data });
                }
              });
            }
          );
        })
        
      } catch (error) {
        console.log(error);
      }
    }
  }
  componentDidUpdate(prevProps) {
    console.log("update myBets");
    if (this.props.address !== undefined && this.props !== prevProps && __mounted) {
      try {
        console.log(this.props.address);
        this.props.betContract.methods.seeMyBets(this.props.address).call().then(result=>{
          fetch("https://testnet.bettingcroc.com/api/mybets/", { method: "GET" ,body:result}).then(
            (res) => {
              res.json().then((data) => {
                console.log(data)
  
                if (__mounted) {
                  this.setState({ myBets: data });
                }
              });
            }
          );
        })
        
      } catch (error) {
        console.log(error);
      }
    }
  }
  componentWillUnmount() {
    __mounted = false;
  }

  render() {
    return (
      <div className="myBetsDiv">
        {this.state.myBets.map(function (item) {
          return (
            <div key={item.id} className="myBetDiv">
              <Link to={"/bet/numBet?n=" + item.id}>
                <div className="myBetSuperDiv">
                  <div className="myBetUnderDiv">
                    <p className="lineMyBetsPTitle">{item.status===0? item.optionsArray.split(",")[0] + " - " + item.optionsArray.split(",")[item.optionsArray.split(",").length - 1]:item.optionsArray.split(",")[0]+" "+item.scoreHome + " - " + item.scoreAway+" "+item.optionsArray.split(",")[item.optionsArray.split(",").length - 1]}</p>
                  <p className="lineMyBetsPDate">{timeConverterDate(item.date)}</p>
                  </div>
                  
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}

MyBets.propTypes = {};

MyBets.defaultProps = {};

export default MyBets;

function timeConverterDate(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var year = a.getFullYear();
  var month = a.getMonth();
  var date = a.getDate();
  var time = date + '/' + month + '/' + year;
  return time;
}