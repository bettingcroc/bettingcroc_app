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
  }
  componentDidUpdate(prevProps) {
    console.log("update");
    if (this.props.address !== undefined && this.props !== prevProps && __mounted) {
      try {
        console.log(this.props.address);
        fetch("https://testnet.bettingcroc.com/api/mybets/" + this.props.address, { method: "GET" }).then(
          (res) => {
            res.json().then((data) => {
              console.log(data)

              if (__mounted) {
                this.setState({ myBets: data });
              }
            });
          }
        );
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
                <span className="myBetUnderDiv">
                  <p className="lineMyBetsPTitle">{item.optionsArray.split(",")[0] + " - " + item.optionsArray.split(",")[item.optionsArray.split(",").length - 1]}</p>
                  <p className="lineMyBetsPDate">{timeConverterDate(item.date)}</p>
                </span>
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