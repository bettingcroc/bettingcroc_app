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

    if (this.props.address !== "") {
      try {
        console.log(this.props.address);
        fetch("https://testnet.bettingcroc.com/api/mybets/"+this.props.address, { method: "GET" }).then(
          (res) => {
            res.json().then((data) => {
              console.log("data "+data)
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
  componentDidUpdate(prevProps) {
    console.log("update");
    if (this.props.address !== "" && this.props !== prevProps && __mounted) {
      try {
        console.log(this.props.address);
        fetch("https://testnet.bettingcroc.com/api/mybets/"+this.props.address, { method: "GET" }).then(
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
      <div className="mainContent">
        {this.state.myBets.map(function (item) {
          return (
            <div key={item.id}>
              <Link to={"/bet/numBet?n=" + item.id}>
                <h5>{" Bet " + item.id+" : "+item.optionsArray.split(",")[0]+" - "+ item.optionsArray.split(",")[item.optionsArray.split(",").length-1]}</h5>
              </Link>
              <br />
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
