import React from "react";
import OptionPool from "../OptionPool/OptionPool";
import P2PBetOption from "../P2PBetOption/P2PBetOption";
import P2PBetCreator from "../P2PBetCreator/P2PBetCreator";
import P2PFinder from "../P2PFinder/P2PFinder";
import Jauge from "../Jauge/Jauge";
import FriendInviter from "../FriendInviter/FriendInviter";

var __mounted;
var __moneyCalculated = 0;
class BetComplet extends React.Component {
  constructor(props) {
    //this.props.mainVueSetter("bet")
    //console.log("p2pToDisplay "+this.props.p2pToDisplay)

    super(props);
    this.state = {
      optionsArray: null,
      date: null,
      type: null,
      country: null,
      league: null,
      moneyInPools: null,
      p2pdisplayArgs: null,
      friends: null
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
        let sizeBet = 0
        try { sizeBet = this.state.optionsArray.split(",").length }
        catch (error) { }
        let moneyInPoolsLet = []
        for (let i = 0; i < sizeBet; i++) {
          moneyInPoolsLet.push(-1)
        }

        if (__mounted && this.props.betContract !== undefined && __moneyCalculated === 0) {
          __moneyCalculated = 1
          for (let i = 0; i < sizeBet; i++) {
            try {
              this.props.betContract.methods
                .getOptionMoney(this.props.betNumber, i)
                .call()
                .then((result) => {
                  moneyInPoolsLet[i] += 1
                  console.log("money in pool " + i + " " + result)
                  try {
                    if (__mounted) {
                      for (let a = 0; a < sizeBet; a++) {
                        if (a !== i) { moneyInPoolsLet[a] += parseFloat(result) / decimalsConverter(10); }
                      }
                    }
                  } catch (error) { }
                });
            } catch (error) { }
          }
          try {
            //console.log("!!!!!!!!!!!!!! " + moneyInPoolsLet[0])
            if (moneyInPoolsLet[0] === -1) {
            }
            else {
              //console.log(moneyInPoolsLet)
              this.setState({ moneyInPools: moneyInPoolsLet })
              //console.log("setting " + this.state.moneyInPools)
            }
            //console.log("!!!!!!!!!!!!!! " + moneyInPoolsLet)
            this.setState({ moneyInPools: moneyInPoolsLet })
            //console.log("setting " + this.state.moneyInPools)
          } catch (error) { }
        }
      });
    });
    this.setP2PdisplayArgs = this.setP2PdisplayArgs.bind(this)
    this.openModalInviter = this.openModalInviter.bind(this)
    this.closeModalInviter = this.closeModalInviter.bind(this);
  }
  componentDidMount() {
    console.log(this.props.status)
    __mounted = true
    __moneyCalculated = 0;
    console.log("mount BetComplet")
    if (this.props.logged) {
      let link = "https://testnet.bettingcroc.com/api/myfriends/"
      fetch(link, { method: "GET" }).then((res) => {
        res.json().then((data) => {
          console.log(data)
          this.setState({ friends: data });
        });
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.betNumber !== this.props.betNumber) {
      __moneyCalculated = 0;
    }
    console.log("update betComplet")

    if (this.props !== prevProps) {
      fetch("https://testnet.bettingcroc.com/api/infoMatch/" + this.props.betNumber, { method: "GET" }).then((res) => {
        res.json().then((data) => {
          if (__mounted) {
            this.setState({
              optionsArray: data.optionsArray,
              date: data.date,
              type: data.type,
              country: data.country,
              league: data.league,
              status: data.status,
              scoreHome: data.scoreHome,
              scoreAway: data.scoreAway
            });
            let sizeBet = 0
            try { sizeBet = this.state.optionsArray.split(",").length }
            catch (error) { }
            let moneyInPoolsLet = []
            for (let i = 0; i < sizeBet; i++) {
              moneyInPoolsLet.push(-1)
            }

            if (prevProps.amountToBet === this.props.amountToBet && __mounted && this.props.betContract !== undefined && __moneyCalculated === 0) {
              __moneyCalculated = 1
              for (let i = 0; i < sizeBet; i++) {
                try {
                  this.props.betContract.methods
                    .getOptionMoney(this.props.betNumber, i)
                    .call()
                    .then((result) => {
                      moneyInPoolsLet[i] += 1
                      console.log("money in pool " + i + " " + result)
                      try {
                        if (__mounted) {
                          for (let a = 0; a < sizeBet; a++) {
                            if (a !== i) { moneyInPoolsLet[a] += parseFloat(result) / decimalsConverter(10); }
                          }
                        }
                      } catch (error) { }
                    });
                } catch (error) { }
              }
              try {
                console.log("!!!!!!!!!!!!!! " + moneyInPoolsLet[0])
                if (moneyInPoolsLet[0] === -1) {
                }
                else {
                  console.log(moneyInPoolsLet)
                  this.setState({ moneyInPools: moneyInPoolsLet })
                  console.log("setting " + this.state.moneyInPools)
                }
                console.log("!!!!!!!!!!!!!! " + moneyInPoolsLet)
                this.setState({ moneyInPools: moneyInPoolsLet })
                console.log("setting " + this.state.moneyInPools)
              } catch (error) { }
            }
          }
        });
      });
    }
    if (this.props.logged === true && prevProps.logged === false) {
      let link = "https://testnet.bettingcroc.com/api/myfriends/"
      fetch(link, { method: "GET" }).then((res) => {
        res.json().then((data) => {
          console.log(data)
          this.setState({ friends: data });
        });
      });
    }
  }

  componentWillUnmount() {
    __mounted = false
    console.log("unmount betComplet")
  }
  setP2PdisplayArgs(newArgs) {
    this.setState({ p2pdisplayArgs: newArgs })
  }
  openModalInviter() {
    this.setState({ modalInviterOpened: true })
  }
  closeModalInviter() {
    this.setState({ modalInviterOpened: false })
  }
  render() {
    return (
      <div id="superBetComplet">
        {this.state.status === 0 ? <Jauge balanceUSDT={this.props.balanceUSDT} amountToBet={this.props.amountToBet} setAmountBet={this.props.setAmountBet}></Jauge> : null}
        <div className={this.state.status === 0 ? "betCompletOpen" : "betComplet"}>
          <div id="nameBet">
            <div id="underNameBet">
              <div id="countryLeagueDate">
                <p className="headerTitle">{this.state.country} / {this.state.league}</p>
                <p className="headerTitle">{this.state.status === 0 ? timeConverterDate(this.state.date) : this.state.status === 2 ? null : "chrono"}</p>
              </div>
              <div id="optionsSchedule">
                <div id={this.state.status === 2 && this.state.scoreHome > this.state.scoreAway ? "optionWinner" : "option1"} className="optionDiv">

                  <p id={this.state.status === 2 && this.state.scoreHome > this.state.scoreAway ? "optionPWinner" : "option1P"} className="optionP">{this.state.optionsArray == null ? null : this.state.optionsArray.split(",")[0]}</p>

                </div>
                {this.state.status === 0 ? <div id="schedule">
                  <p id="scheduleP" className="scheduleTitle"> {timeConverterSchedule(this.state.date)}</p>
                </div> :
                  <div id="scoreDiv">
                    <div id="schedule">
                      <p id="scheduleP" className="scheduleTitle"> {this.state.scoreAway !== undefined ? this.state.scoreHome + " - " + this.state.scoreAway : null}</p>
                    </div>

                  </div>}
                <div id={this.state.status === 2 && this.state.scoreHome < this.state.scoreAway ? "optionWinner" : "option2"} className="optionDiv">

                  <p id={this.state.status === 2 && this.state.scoreHome < this.state.scoreAway ? "optionPWinner" : "option2P"} className="optionP">{this.state.optionsArray == null ? null : this.state.optionsArray.split(",")[this.state.optionsArray.split(",").length - 1]}</p>
                </div>
              </div>
            </div>
          </div>
          <div id="superOptionPool">
            <div id="optionsPool">
              <div id="gameResults">
                <p id="gameResultsP">Game Results</p>
                {this.props.logged && this.state.status===0 ? <div className="friendInviterTrigger">
                  <button className="buttonInviter" onClick={this.openModalInviter}>Invite a friend</button>
                  <FriendInviter address={this.props.address} socket={this.props.socket} typeBet="general" friends={this.state.friends} modalCloser={this.closeModalInviter} active={this.state.modalInviterOpened} argsBet={{ betNumber: this.props.betNumber, title: this.state.optionsArray }}></FriendInviter>
                </div> : null}
              </div>
              <div id="optionsBox">
                {this.state.optionsArray == null ? null : this.state.optionsArray.split(",").map((item, index) => {
                  return <OptionPool key={item} team={item} status={this.state.status} moneyInOtherPools={this.state.moneyInPools === null ? null : this.state.moneyInPools} betNumber={this.props.betNumber} optionNumber={index} betContract={this.props.betContract} usdtContract={this.props.usdtContract} address={this.props.address} amountToBet={this.props.amountToBet} setTypeBet={this.props.setTypeBet} setBetArgs={this.props.setBetArgs} betName={this.state.optionsArray}></OptionPool>
                })}
              </div>
            </div>
          </div>

          <div id="p2p1" style={this.state.status!==0?{marginBottom:"30px"}:null}>
            <P2PFinder id={this.props.p2pLink !== undefined ? this.props.p2pLink : undefined} optionsArray={this.state.optionsArray} betContract={this.props.betContract} betNumber={this.props.betNumber} setP2PdisplayArgs={this.setP2PdisplayArgs}></P2PFinder>

            {this.state.status === 0 ? <P2PBetCreator status={this.state.status} betContract={this.props.betContract} usdtContract={this.props.usdtContract} address={this.props.address} mbtContract={this.props.mbtContract} optionsArray={this.state.optionsArray} betNumber={this.props.betNumber} amountToBet={this.props.amountToBet} setTypeBet={this.props.setTypeBet} setBetArgs={this.props.setBetArgs} ></P2PBetCreator>
              : <P2PBetOption status={this.state.status} logged={this.props.logged} socket={this.props.socket} friends={this.state.friends} args={this.state.p2pdisplayArgs} betNumber={this.props.betNumber} betContract={this.props.betContract} usdtContract={this.props.usdtContract} address={this.props.address} optionsArray={this.state.optionsArray} amountToBet={this.props.amountToBet} setTypeBet={this.props.setTypeBet} setBetArgs={this.props.setBetArgs}></P2PBetOption>
            }

          </div>

          {this.state.status === 0 ? <P2PBetOption status={this.state.status} logged={this.props.logged} socket={this.props.socket} friends={this.state.friends} args={this.state.p2pdisplayArgs} betNumber={this.props.betNumber} betContract={this.props.betContract} usdtContract={this.props.usdtContract} address={this.props.address} optionsArray={this.state.optionsArray} amountToBet={this.props.amountToBet} setTypeBet={this.props.setTypeBet} setBetArgs={this.props.setBetArgs}></P2PBetOption>
            : null}
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
  //console.log("len "+hour.toString().length)
  if (hour.toString().length === 1) { hour = '0' + hour }
  if (min.toString().length === 1) { min = '0' + min }

  var time = hour + ':' + min
  //+ ':' + sec;
  return time;
}

function decimalsConverter(numberToConvert) {
  return Math.pow(numberToConvert, 18)
}