import React from "react";
import { Link } from "react-router-dom";


function MyP2PBets(props) {

  return (
    <div className="myBetsDiv">
      {props.myBets.length === 0 ? null : props.myBets.map(function (item, index) {
        console.log(item)
        return (
          <Link to={"/bet?n=" + item.id + "&p2p=" + item.p2pNum + "#myP2P"} key={index} className="myBetSuperDiv">

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

MyP2PBets.propTypes = {};

MyP2PBets.defaultProps = {};

export default MyP2PBets;

function timeConverterDate(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var year = a.getFullYear();
  var month = a.getMonth();
  var date = a.getDate();
  var time = date + '/' + (month + 1) + '/' + year;
  return time;
}