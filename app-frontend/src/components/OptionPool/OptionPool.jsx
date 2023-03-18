/* global BigInt */
import React from 'react';
var __mounted


class OptionPool extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      moneyInPool: null,
      moneyIgot: null,
      loaded: false
    }
    //this.betOnThisOption = this.betOnThisOption.bind(this)
    this.setBet = this.setBet.bind(this)
  }
  componentDidMount() {
    //console.log("address"+this.props.address)
    console.log("mount OptionPool " + this.props.optionNumber)
    __mounted = true
    try {
      if (this.props.status !== 2) {
        this.props.betContract.methods
          .getOptionMoney(this.props.betNumber, this.props.optionNumber)
          .call()
          .then((result) => {
            //console.log(result)
            try {
              if (__mounted && this.state.loaded === false) { this.setState({ moneyInPool: result }); }

            } catch (error) { }
          });
      }
      else {
        this.props.betContract.methods
          .getMoneyInPoolEnd(this.props.betNumber, this.props.optionNumber)
          .call()
          .then((result) => {
            //console.log(result)
            try {
              if (__mounted && this.state.loaded === false) { this.setState({ moneyInPool: result }); }

            } catch (error) { }
          });
      }


    } catch (error) { }
    try {
      this.props.betContract.methods
        .getMiseBettersOnEnd(this.props.betNumber, this.props.optionNumber, this.props.address)
        .call()
        .then((result) => {
          try {
            if (__mounted) { this.setState({ moneyIgot: result }); }

          } catch (error) { }
        });
    } catch (error) { }
  }
  componentDidUpdate(prevProps, prevState) {
    console.log("update OptionPool")
    if (prevProps !== this.props && __mounted) {
      try {
        if (this.props.status !== 2) {
          this.props.betContract.methods
            .getOptionMoney(this.props.betNumber, this.props.optionNumber)
            .call()
            .then((result) => {
              //console.log(result)
              try {
                if (__mounted && this.state.loaded === false) { this.setState({ moneyInPool: result }); }

              } catch (error) { }
            });
        }
        else {
          this.props.betContract.methods
            .getMoneyInPoolEnd(this.props.betNumber, this.props.optionNumber)
            .call()
            .then((result) => {
              //console.log(result)
              try {
                if (__mounted && this.state.loaded === false) { this.setState({ moneyInPool: result }); }

              } catch (error) { }
            });
        }


      } catch (error) { }
      try {
        this.props.betContract.methods
          .getMiseBettersOnEnd(this.props.betNumber, this.props.optionNumber, this.props.address)
          .call()
          .then((result) => {
            try {
              if (__mounted) { this.setState({ moneyIgot: result }); }

            } catch (error) { }
          });
      } catch (error) { }

    }
    console.log(this.props.address)
  }
  componentWillUnmount() {
    __mounted = false
    console.log("unmount OptionPool " + this.props.team)
  }

  setBet() {
    this.props.setTypeBet(1);
    this.props.setBetArgs({
      betNumber: this.props.betNumber,
      optionNumber: this.props.optionNumber,
      amountToBet: weiconvert(this.props.amountToBet),
      optionName: this.props.team,
      betName: this.props.betName,
      toWin: this.props.moneyInOtherPools == null ? null : (parseFloat(this.props.amountToBet) * (((parseFloat(this.props.amountToBet) * this.props.moneyInOtherPools[this.props.optionNumber]) / ((parseFloat(this.state.moneyInPool) / decimalsConverter(10)) + parseFloat(this.props.amountToBet))) / parseFloat(this.props.amountToBet) + 1)).toFixed(2),
      cote: this.props.moneyInOtherPools == null ? null : (((parseFloat(this.props.amountToBet) * this.props.moneyInOtherPools[this.props.optionNumber]) / ((parseFloat(this.state.moneyInPool) / decimalsConverter(10)) + parseFloat(this.props.amountToBet))) / parseFloat(this.props.amountToBet) + 1).toFixed(2)
    });
  }
  render() {
    return (
      <div className="optionPool">
        {this.props.status === 0 ?
          <button className="buttonTeamTitle" onClick={(event) => { this.setBet(); }}><p className='teamTitle'>{this.props.team}</p></button> :
          <div className="buttonTeamTitleDiv"><p className='teamTitle'>{this.props.team}</p></div>}
        {this.props.status === 0 ? <div>
          <p>To win : {this.props.moneyInOtherPools == null ? null : ((parseFloat(this.props.amountToBet) * this.props.moneyInOtherPools[this.props.optionNumber]) / ((parseFloat(this.state.moneyInPool) / decimalsConverter(10)) + parseFloat(this.props.amountToBet))).toFixed(2)}</p>
          <p>Cote : {this.props.moneyInOtherPools == null ? null : (((parseFloat(this.props.amountToBet) * this.props.moneyInOtherPools[this.props.optionNumber]) / ((parseFloat(this.state.moneyInPool) / decimalsConverter(10)) + parseFloat(this.props.amountToBet))) / parseFloat(this.props.amountToBet) + 1).toFixed(2)}</p>
        </div> : null}
        <p>{parseFloat(this.state.moneyInPool) / decimalsConverter(10)} USDT {this.props.address !== undefined && this.state.moneyIgot > 0 && this.props.moneyInOtherPools[this.props.optionNumber]>0  ? "(I betted " + parseFloat(this.state.moneyIgot) / decimalsConverter(10) + " USDT and can win " + (parseFloat(this.state.moneyIgot / this.state.moneyInPool * this.props.moneyInOtherPools[this.props.optionNumber]) + parseFloat(this.state.moneyIgot) / decimalsConverter(10)).toFixed(2) + " USDT)" : null}</p>
      </div>
    );
  }
}



export default OptionPool;

function decimalsConverter(numberToConvert) {
  return Math.pow(numberToConvert, 18)
}
function weiconvert(number) { return BigInt(number * decimalsConverter(10)); }