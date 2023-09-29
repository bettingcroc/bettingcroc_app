import React from "react";
import OptionPool from "../OptionPool/OptionPool";
import P2PBetOption from "../P2PBetOption/P2PBetOption";
import P2PBetCreator from "../P2PBetCreator/P2PBetCreator";
import P2PFinder from "../P2PFinder/P2PFinder";
import Jauge from "../Jauge/Jauge";
import FriendInviter from "../FriendInviter/FriendInviter";
import "./BetComplet.css"


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
                .getAmountInPool(this.props.betNumber, i)
                .call()
                .then((result) => {
                  moneyInPoolsLet[i] += 1
                  //console.log("money in pool " + i + " " + result)
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
    //console.log(this.props.status)
    __mounted = true
    __moneyCalculated = 0;
    //console.log("mount BetComplet")
    if (this.props.logged) {
      let link = "https://testnet.bettingcroc.com/api/myfriends/"
      fetch(link, { method: "GET" }).then((res) => {
        res.json().then((data) => {
          //console.log(data)
          this.setState({ friends: data });
        });
      });
    }
    this.props.joinBetRoom(this.props.betNumber)

    this.props.socket.on('scoreBetReception', (update) => {
      //console.log("scoreBetReception : " + update)
      this.setState({scoreHome:update[0]})
      this.setState({scoreAway:update[1]})
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.betNumber !== this.props.betNumber) {
      __moneyCalculated = 0;
    }
    //console.log("update betComplet")

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
                    .getAmountInPool(this.props.betNumber, i)
                    .call()
                    .then((result) => {
                      moneyInPoolsLet[i] += 1
                      //console.log("money in pool " + i + " " + result)
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
    //console.log("unmount betComplet")
    this.props.leaveBetRoom(this.props.betNumber)

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