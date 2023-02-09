import React from "react";
import { Link } from "react-router-dom";
var __mounted;

//TODO pas de gains détectés mais W dans myBets
class MyBets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myBets: [],
    };
    console.log("contrsuction");
  }
  async componentDidMount() {
    __mounted = true;
    if (this.props.address !== undefined) {
      try {
        console.log(this.props.address);
        this.props.betContract.methods.seeMyBets(this.props.address).call().then(result => {
          fetch("https://testnet.bettingcroc.com/api/mybets/", {
            method: "POST"
            , body: JSON.stringify({ listBets: result })
            , headers: {
              "Content-Type": "application/json",
            }
          }).then(
            (res) => {
              res.json().then(async (data) => {
                console.log("data")
                console.log(data)

                console.log("data")
                for (let b in data) {
                  let bet = data[b]
                  if (bet.status === 0 || bet.status === 1) {
                    bet=Object.assign(bet,{betState:"🕗"})
                  }
                  else if (bet.status === 2) {
                    await this.props.betContract.methods.didIWinSmth(bet.id, this.props.address).call().then(
                      async (res1) => {
                        if (res1 === true) {
                          bet=Object.assign(bet,{betState:"W"})

                        }
                        else {
                          await this.props.betContract.methods.getHasUserWon(this.props.address, bet.id).call().then(
                            (res2) => {
                              if(res2===true){
                                bet=Object.assign(bet,{betState:"W"})

                              }
                              else{
                                bet=Object.assign(bet,{betState:"L"})
                              }
                          })
                        }
                      }
                    )
                  }
                  else {
                    console.log("canceled bet MyBets")
                    bet=Object.assign(bet,{betState:"✖️"})
                  }
                  console.log(bet)
                }
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
        this.props.betContract.methods.seeMyBets(this.props.address).call().then(result => {
          fetch("https://testnet.bettingcroc.com/api/mybets/", {
            method: "POST"
            , body: JSON.stringify({ listBets: result })
            , headers: {
              "Content-Type": "application/json",
            }
          }).then(
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
          console.log(item)
          console.log(item.scoreHome)
          console.log(item.betState)
          return (
            <div key={item.id} className="myBetDiv">
              <Link to={"/bet/numBet?n=" + item.id}>
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