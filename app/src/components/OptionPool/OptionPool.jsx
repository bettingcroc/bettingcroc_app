/* global BigInt */
import React from 'react';
var __mounted


class OptionPool extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      moneyInPool: null,
      moneyIgot: null,
      amountToBet: 0,
      moneyInOtherPools: null
    }
    this.betOnThisOption = this.betOnThisOption.bind(this)
    this.approveUSDT = this.approveUSDT.bind(this)
    this.setBet = this.setBet.bind(this)
  }
  componentDidMount() {
    //console.log("address"+this.props.address)
    console.log("mount OptionPool " + this.props.optionNumber)
    __mounted = true
    try {
      this.props.betContract.methods
        .getOptionMoney(this.props.betNumber, this.props.optionNumber)
        .call()
        .then((result) => {
          console.log(result)
          try {
            if (__mounted) { this.setState({ moneyInPool: result }); }

          } catch (error) { }
        });
    } catch (error) { }
    try {
      this.props.betContract.methods
        .howMuchIGotOnAnOption(this.props.betNumber, this.props.optionNumber, this.props.address)
        .call()
        .then((result) => {
          try {
            if (__mounted) { this.setState({ moneyIgot: result }); }

          } catch (error) { }
        });
    } catch (error) { }
  }
  componentDidUpdate(prevProps) {
    console.log("update OptionPool")
    //console.log(this.props.address)
    if (prevProps !== this.props && __mounted) {
      try {
        this.props.betContract.methods
          .getOptionMoney(this.props.betNumber, this.props.optionNumber)
          .call()
          .then((result) => {
            console.log(result)
            try {
              if (__mounted) { this.setState({ moneyInPool: result }); }

            } catch (error) { }
          });
      } catch (error) { }
      try {
        this.props.betContract.methods
          .howMuchIGotOnAnOption(this.props.betNumber, this.props.optionNumber, this.props.address)
          .call()
          .then((result) => {
            try {
              if (__mounted) { this.setState({ moneyIgot: result }); }

            } catch (error) { }
          });
      } catch (error) { }
      console.log("ewwwwwwwwwww")
      console.log(prevProps.moneyInOtherPools !== this.props.moneyInOtherPools)
      console.log("ewwwwwwwwwww")
      if (prevProps.amountToBet === this.props.amountToBet) { this.setState({ moneyInOtherPools: this.props.moneyInOtherPools }) }
      this.setState({ amountToBet: this.props.amountToBet })

    }
  }
  componentWillUnmount() {
    __mounted = false
    console.log("unmount OptionPool")
  }
  approveUSDT(amount) {
    this.props.usdtContract.methods.approve("0xD90531a9234A38dfFC8493c0018ad17cB5F7A867", weiconvert(amount)).send({ from: this.props.address })
      .once('receipt', (receipt) => {
        console.log("approve success")
      })
  }
  betOnThisOption(amount) {
    console.log("bet Try")
    this.props.betContract.methods.betOn(this.props.betNumber, this.props.optionNumber, weiconvert(amount)).send({ from: this.props.address })
      .once('receipt', (receipt) => {
        console.log("bet success")
      })
  }
  setBet() {
    this.props.setTypeBet(1);
    this.props.setBetArgs({
      betNumber: this.props.betNumber,
      optionNumber: this.props.optionNumber,
      amountToBet: weiconvert(this.state.amountToBet),
      optionName: this.props.team,
      betName: this.props.betName,
      toWin: this.props.moneyInOtherPools == null ? null : ((parseFloat(this.state.amountToBet) * this.props.moneyInOtherPools[this.props.optionNumber]) / ((parseFloat(this.state.moneyInPool) / decimalsConverter(10)) + parseFloat(this.state.amountToBet))).toFixed(2),
      cote: this.props.moneyInOtherPools == null ? null : (((parseFloat(this.state.amountToBet) * this.props.moneyInOtherPools[this.props.optionNumber]) / ((parseFloat(this.state.moneyInPool) / decimalsConverter(10)) + parseFloat(this.state.amountToBet))) / parseFloat(this.state.amountToBet) + 1).toFixed(2)
    });
  }
  render() {
    return (
      <div className="optionPool">
        <button className="button" onClick={(event) => { /*this.betOnThisOption(this.state.amountToBet)*/  this.setBet(); }}>{this.props.team}</button>

        <h5>{this.props.moneyInOtherPools == null ? null : ((parseFloat(this.state.amountToBet) * this.props.moneyInOtherPools[this.props.optionNumber]) / ((parseFloat(this.state.moneyInPool) / decimalsConverter(10)) + parseFloat(this.state.amountToBet))).toFixed(2)} to win</h5>
        <h5>cote : {this.props.moneyInOtherPools == null ? null : (((parseFloat(this.state.amountToBet) * this.props.moneyInOtherPools[this.props.optionNumber]) / ((parseFloat(this.state.moneyInPool) / decimalsConverter(10)) + parseFloat(this.state.amountToBet))) / parseFloat(this.state.amountToBet) + 1).toFixed(2)}</h5>

        <h5>{parseFloat(this.state.moneyInPool) / decimalsConverter(10)} USDT (got {parseFloat(this.state.moneyIgot) / decimalsConverter(10)} USDT)</h5>
        {/*<input className="css-input" id="amountToBetOnOptionPool" type="number" value={this.state.amountToBet} onChange={e => this.setState({amountToBet: e.target.value})}></input>*/}
        {/*<button className="button" onClick={(event) => { this.approveUSDT(this.state.amountToBet) }}>APPROVE USDT</button>*/}

      </div>
    );
  }
}



export default OptionPool;

function decimalsConverter(numberToConvert) {
  return Math.pow(numberToConvert, 18)
}
function weiconvert(number) { return BigInt(number * decimalsConverter(10)); }