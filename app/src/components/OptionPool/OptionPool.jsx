/* global BigInt */
import React from 'react';
var __mounted


class OptionPool extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      moneyInPool: null,
      moneyIgot:null,
      amountToBet:0
    }
    this.betOnThisOption=this.betOnThisOption.bind(this)
    this.approveUSDT=this.approveUSDT.bind(this)
  }
  componentDidMount(){
    //console.log("address"+this.props.address)
    console.log("mount OptionPool "+this.props.optionNumber)
    __mounted=true
    try {
      this.props.betContract.methods
        .getOptionMoney(this.props.betNumber,this.props.optionNumber)
        .call()
        .then((result) => {
          console.log(result)
          try{          
            if(__mounted){this.setState({ moneyInPool: result });}
            
        }catch(error){}
        });
    } catch (error) {}
    try {
      this.props.betContract.methods
        .howMuchIGotOnAnOption(this.props.betNumber,this.props.optionNumber,this.props.address)
        .call()
        .then((result) => {
          try{          
            if(__mounted){this.setState({ moneyIgot: result });}
            
        }catch(error){}
        });
    } catch (error) {}
  }
  componentDidUpdate(prevProps) {
    console.log("update OptionPool")
    console.log(this.props.address)
    if(prevProps!==this.props && __mounted){
      try {
        this.props.betContract.methods
          .getOptionMoney(this.props.betNumber,this.props.optionNumber)
          .call()
          .then((result) => {
            console.log(result)
            try{          
              if(__mounted){this.setState({ moneyInPool: result });}
              
          }catch(error){}
          });
      } catch (error) {}
      try {
        this.props.betContract.methods
          .howMuchIGotOnAnOption(this.props.betNumber,this.props.optionNumber,this.props.address)
          .call()
          .then((result) => {
            try{          
              if(__mounted){this.setState({ moneyIgot: result });}
              
          }catch(error){}
          });
      } catch (error) {}
    }
    
    
  }
  componentWillUnmount(){
    __mounted=false
    console.log("unmount OptionPool")
  }
  approveUSDT(amount){
    this.props.usdtContract.methods.approve("0xD90531a9234A38dfFC8493c0018ad17cB5F7A867",weiconvert(amount)).send({from : this.props.address})
    .once('receipt', (receipt) => {
      console.log("approve success")
    })
  }
  betOnThisOption(amount){
    console.log("bet Try")
    this.props.betContract.methods.betOn(this.props.betNumber,this.props.optionNumber,weiconvert(amount)).send({from : this.props.address})
    .once('receipt', (receipt) => {
      console.log("bet success")
    })
  }
  render(){
    return (
      <div className="optionPool">

          <h3>{this.props.team}</h3> <br></br>
          <h4>{parseFloat(this.state.moneyInPool) / decimalsConverter(10)} USDT in {this.props.team} Pool !</h4>
          <h4>I got {parseFloat(this.state.moneyIgot) / decimalsConverter(10)} USDT on this option</h4>
          <input className="css-input" id="amountToBetOnOptionPool" type="number" value={this.state.amountToBet} onChange={e => this.setState({amountToBet: e.target.value})}></input>
          <button className="button" onClick={(event)=>{this.approveUSDT(this.state.amountToBet)}}>APPROVE USDT</button>
          <button className="button" onClick={(event)=>{this.betOnThisOption(this.state.amountToBet)}}>BET</button>
      </div>
    );
  }
} 



export default OptionPool;

function decimalsConverter(numberToConvert){
	return Math.pow(numberToConvert,18)
}
function weiconvert(number) { return BigInt(number * decimalsConverter(10)); }