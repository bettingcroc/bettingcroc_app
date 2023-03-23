import React from "react";
import { NavLink,Link } from "react-router-dom";
import bettingCrocImage from "./bettingCrocTransparent.png"
var _mounted
class ListBet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [],
      topMatches: [],
      dates: [],
      matchesSorted:[]
    };
    this.props.vueSetter("listBets")

    //console.log("state.matches " + this.state.matches);
  }
  componentDidMount() {
    _mounted = true
    this.props.mainVueSetter("bet")

    fetch("https://testnet.bettingcroc.com/api/lastbets", { method: "GET" }).then((res) => {
      res.json().then((data) => {
        if (_mounted) {
          this.setState({ matches: data.matches });
        }
        let dates = []
        for (let m = 0; m < data.matches.length; m++) {
          let arr = data.matches[m].date.split(' ')
          let d = arr[0] + " " + arr[1] + " " + arr[2]
          //console.log(arr)
          if (!dates.includes(d)) {

            dates.push(d)
          }
        }
        this.setState({ dates: dates });

        let index=0
        let matchesSorted=[]
        for(let d=0;d<dates.length;d++){
          matchesSorted.push([])
          for(let m in data.matches){
            let arr = data.matches[m].date.split(' ')
            let dat = arr[0] + " " + arr[1] + " " + arr[2]

            if(dat===dates[d]){
              matchesSorted[d].push(data.matches[m])
            }
          }
        }
        this.setState({matchesSorted:matchesSorted})
        //console.log("state.matches then " + this.state.matches);
      });
    });
    fetch("https://testnet.bettingcroc.com/api/topbets", { method: "GET" }).then((res) => {
      res.json().then((data) => {
        if (_mounted) {
          this.setState({ topMatches: data.matches });
        }
        //console.log("state.matches then " + this.state.matches);
      });
    });
  }
  componentWillUnmount() {
    _mounted = false
  }
  render() {
    return (
      <div className="listBets">
        <div id="box1ListBets"><img src={bettingCrocImage} alt="bettingCrocImage" id="bettingCrocImage"></img></div>
        <div id="box2ListBets">
          {this.state.topMatches.map(function (item, index) {
            if (item) {
              return (
                <Link className="topBetsBox" key={item.betNumber} to={"/bet/numBet?n=" + item.betNumber} >
                  <div  id={"topBetsBox" + (index + 1)} key={item.betNumber}>
                    <div className="topBetsMiniBox1"><p>{parseFloat(item.moneyBetted) / decimalsConverter(10)} USDT Locked 🔥</p></div>
                    <div className="topBetsMiniBox2">
                      <div className="topBetsMiniMiniBox1"><p>{item.type}</p></div>
                      <div className="topBetsMiniMiniBox2">
                        <p>{item.name.split('-')[0]}</p>
                        <p>{item.name.split('-')[1]}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            }
          })}
        </div>
        <div id="box3ListBets">
          <div id="underBox3ListBets">
            {this.state.matchesSorted.length===0?null: this.state.dates.map( (item,index)=> 
                {return(<div key={item}>
                  <p className="dateListBet">{item}</p>
                  {this.state.matchesSorted[index].map( (item2,index2) =>
                    <div key={item2.betNumber}>
                    <Link to={"/bet/numBet?n=" + item2.betNumber} >
                      <div className="betLineListBets">
                        <p className="nameBetListBetsP">{item2.name}</p>
                        <p>{item2.date.split(' ')[3].split(":")[0]+":"+item2.date.split(' ')[3].split(":")[1]}</p>
                        <p>{item2.type}</p>
                      </div>
                    </Link>
                  </div>)}
                </div>)}
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ListBet;
/*{this.state.matches.map(function (item) {
          return <div>{item.betNumber}</div>;
        })}
        {this.state.matches[0].betNumber}
        */
function decimalsConverter(numberToConvert) {
  return Math.pow(numberToConvert, 18)
}