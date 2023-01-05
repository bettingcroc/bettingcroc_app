/* global BigInt */
import React from 'react';
var __mounted


class OptionPool extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      moneyInPool: null,
      moneyIgot: null,
      loaded:false
    }
    //this.betOnThisOption = this.betOnThisOption.bind(this)
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
          //console.log(result)
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
  componentDidUpdate(prevProps,prevState) {
    console.log("update OptionPool")
    /*console.log(this.state)
    console.log(prevState)
    if(prevState!==this.state){
      console.log("stateChanged")
    }
    if(prevProps!==this.props){
      console.log("propsChanged")
    }
    console.log("update OptionPool "+true)
    //console.log(this.props.address)
    console.log("propsMovement "+(prevProps !==this.props))
    for(let v in Object.values(prevProps)){
      if(Object.values(prevProps)[v]!==Object.values(this.props)[v]){
        console.log("COUPABLE "+v)
      }
    }
    console.log(Object.values(prevProps))
    console.log(Object.values(this.props))
    console.log(prevProps.address !== this.props.address)
    console.log(prevProps.amountToBet !== this.props.amountToBet)
    console.log(prevProps.betContract !== this.props.betContract)
    console.log(prevProps.betName !== this.props.betName)
    console.log(prevProps.betNumber !== this.props.betNumber)
    console.log(prevProps.moneyInOtherPools !== this.props.moneyInOtherPools)
    console.log(prevProps.optionNumber !== this.props.optionNumber)
    console.log(prevProps.setBetArgs !== this.props.setBetArgs)
    console.log(prevProps.setTypeBet !== this.props.setTypeBet)

    console.log(prevProps.team !== this.props.team)
    console.log(prevProps.usdtContract !== this.props.usdtContract)


    console.log(this.props)
    console.log("update OptionPool2")
    */
    if (prevProps !== this.props && __mounted) {
      try {
        this.props.betContract.methods
          .getOptionMoney(this.props.betNumber, this.props.optionNumber)
          .call()
          .then((result) => {
            //console.log(result)
            try {
              if (__mounted && this.state.loaded===false) { this.setState({ moneyInPool: result }); }

            } catch (error) { }
          });
      } catch (error) { }
      try {
        this.props.betContract.methods
          .howMuchIGotOnAnOption(this.props.betNumber, this.props.optionNumber, this.props.address)
          .call()
          .then((result) => {
            try {
              if (__mounted && this.state.loaded===false) { this.setState({ moneyIgot: result }) ;this.setState({loaded:true})}

            } catch (error) { }
          });
      } catch (error) { }
      //console.log(prevProps.moneyInOtherPools !== this.props.moneyInOtherPools)
      

    }
  }
  componentWillUnmount() {
    __mounted = false
    console.log("unmount OptionPool "+this.props.team)
  }
  approveUSDT(amount) {
    this.props.usdtContract.methods.approve("0xD90531a9234A38dfFC8493c0018ad17cB5F7A867", weiconvert(amount)).send({ from: this.props.address })
      .once('receipt', (receipt) => {
        console.log("approve success")
      })
  }
  /*betOnThisOption(amount) {
    console.log("bet Try")
    this.props.betContract.methods.betOn(this.props.betNumber, this.props.optionNumber, weiconvert(amount)).send({ from: this.props.address })
      .once('receipt', (receipt) => {
        console.log("bet success")
      })
  }*/
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
        <button className="buttonTeamTitle" onClick={(event) => { /*this.betOnThisOption(this.state.amountToBet)*/  this.setBet(); }}><div className='teamTitle'>{this.props.team}</div></button>

        <p>To win : {this.props.moneyInOtherPools == null ? null : ((parseFloat(this.props.amountToBet) * this.props.moneyInOtherPools[this.props.optionNumber]) / ((parseFloat(this.state.moneyInPool) / decimalsConverter(10)) + parseFloat(this.props.amountToBet))).toFixed(2)}</p>
        <p>Cote : {this.props.moneyInOtherPools == null ? null : (((parseFloat(this.props.amountToBet) * this.props.moneyInOtherPools[this.props.optionNumber]) / ((parseFloat(this.state.moneyInPool) / decimalsConverter(10)) + parseFloat(this.props.amountToBet))) / parseFloat(this.props.amountToBet) + 1).toFixed(2)}</p>

        <p>{parseFloat(this.state.moneyInPool) / decimalsConverter(10)} USDT (got {parseFloat(this.state.moneyIgot) / decimalsConverter(10)} USDT)</p>
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