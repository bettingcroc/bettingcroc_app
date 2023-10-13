import React from "react";
import { Link } from "react-router-dom";
import "./MyBets.css"
var __mounted;

class MyBets extends React.Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    __mounted = true;
    if (this.props.address !== undefined) {
      //this.props.setMyBets()
    }
  }
  componentDidUpdate(prevProps) {
    console.log("update myBets");
    //this.props.setMyBets()

  }
  componentWillUnmount() {
    __mounted = false;
  }

  render() {
    return (
      <div className="myBetsDiv">
        {this.props.myBets.length === 0 ? null : this.props.myBets.map(function (item) {
          return (
            <Link key={item.id} to={"/bet?n=" + item.id} className="myBetSuperDiv">
              <div className="myBetUnderDiv">
                <p className="lineMyBetsPTitle">{item.status === 0 ? item.optionsArray.split(",")[0] + " - " + item.optionsArray.split(",")[item.optionsArray.split(",").length - 1] : item.optionsArray.split(",")[0] + " " + item.scoreHome + " - " + item.scoreAway + " " + item.optionsArray.split(",")[item.optionsArray.split(",").length - 1]}</p>
                <p className="lineMyBetsPDate">{timeConverterDate(item.date)}</p>
              </div>
              <div className="myBetUnderDiv2">
                <p className="betStateP">{item.betState}</p>
              </div>

            </Link>
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
  var time = date + '/' + (month + 1) + '/' + year;
  return time;
}
