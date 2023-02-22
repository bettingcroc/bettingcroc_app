import React from "react";
import { Link } from "react-router-dom";
var __mounted;


class MyP2PBets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myBets: [],
    };
    console.log("constrsuction");
  }
  componentDidMount() {
    __mounted = true;
    if (this.props.address !== undefined) {
      try {
        this.props.betContract.methods.seeMyP2PBets(this.props.address).call().then(async result => {
          console.log(result)
          fetch("https://testnet.bettingcroc.com/api/mybets/", {
            method: "POST"
            , body: JSON.stringify({ listBets: result })
            , headers: {
              "Content-Type": "application/json",
            }
          }).then(
            (res) => {
              res.json().then(async (data) => {
                console.log(data)
                let listP2PBets = []
                for (let n = 0; n < result.length; n++) {

                  await new Promise(next => {
                    this.props.betContract.methods.seeMyP2PBetsDetail(this.props.address, result[n]).call().then(result2 => {
                      console.log(result2)
                      for (let n2 = 0; n2 < result2.length; n2++) {
                        console.log(n2)
                        listP2PBets.push(result2[n2])
                      }
                      next()
                    })
                  })
                }
                for (let n = 0; n < result.length; n++) {
                  data[n].p2pNum = listP2PBets[n]
                }
                for (let n = 0; n < data.length; n++) {
                  await new Promise(next => {
                    this.props.betContract.methods.didIWinSmthP2P(data[n].id, this.props.address, data[n].p2pNum).call().then(async result3 => {
                      console.log(result3)
                      if (result3 === true) {
                        data[n].betState = "W"
                      }
                      else {
                        this.props.betContract.methods.didIWinSmthP2P(data[n].id, this.props.address, data[n].p2pNum).call().then(result4 => {
                          if (result4 === true) {
                            data[n].betState = "W"
                          }
                          else {
                            data[n].betState = "L"

                          }
                        })
                      }
                      next()
                    })
                  })
                }
                this.setState({ myBets: data });

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
        this.props.betContract.methods.seeMyP2PBets(this.props.address).call().then(result => {
          //console.log("call2")
          //console.log(result)
          fetch("https://testnet.bettingcroc.com/api/mybets/", {
            method: "POST"
            , body: JSON.stringify({ listBets: result })
            , headers: {
              "Content-Type": "application/json",
            }
          }).then(
            (res) => {
              res.json().then((data) => {
                //console.log(data)

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
        {this.state.myBets.map(function (item, index) {
          console.log(item)
          return (
            <div key={index} className="myBetDiv">
              <Link to={"/bet/numBet?n=" + item.id + "&p2p=" + item.p2pNum + "#myP2P"}>
                <div className="myBetSuperDiv">

                  <div className="myBetUnderDiv">
                    <p className="lineMyBetsPTitle">{item.status === 0 ? item.optionsArray.split(",")[0] + " - " + item.optionsArray.split(",")[item.optionsArray.split(",").length - 1] : item.optionsArray.split(",")[0] + " " + item.scoreHome + " - " + item.scoreAway + " " + item.optionsArray.split(",")[item.optionsArray.split(",").length - 1]}</p>
                    <p className="lineMyBetsPDate">{timeConverterDate(item.date)}</p>
                  </div>
                  <div className="myBetUnderDiv2">
                    <p className="betStateP">{item.betState}</p>
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
MyP2PBets.propTypes = {};

MyP2PBets.defaultProps = {};

export default MyP2PBets;

function timeConverterDate(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var year = a.getFullYear();
  var month = a.getMonth();
  var date = a.getDate();
  var time = date + '/' + month + '/' + year;
  return time;
}