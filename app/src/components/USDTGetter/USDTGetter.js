import React from 'react';
import PropTypes from 'prop-types';
const USDTGetterABI=[
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "getUsdt",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
const USDTGetterAddress="0x1A40a120E6cE31f26F8E9aBCB175b19DE68B3093"

class UsdtGetter extends React.Component {
  constructor(props){
    super(props)
    this.get5000USDT = this.get5000USDT.bind(this)
  }
  componentDidUpdate(prevProps){
    console.log(this.props)
    if (this.props.web3!==prevProps.web3 && this.props.web3!==undefined){
      this.setState({contract:new this.props.web3.eth.Contract(USDTGetterABI,USDTGetterAddress)})
      console.log("contract init")
    }
  }
  get5000USDT(){
    this.state.contract.methods.getUsdt().send({ from: this.props.address })
    .once('receipt', (receipt) => {
      console.log("approve success")
    })
  }
  render() {
    return(
      <div style={{display: "flex",flexDirection:"column",alignItems:"center",gap:"30px"}}>
        <p style={{fontSize:"20px"}}>Get 5000 USDT here</p>
        <button style={{backgroundColor: "#539B57",borderRadius:"10px",padding:"15px",border:"none",color:"white"}} onClick={this.get5000USDT}>GET 5000 USDT</button>
      </div>
    );
  }
}

UsdtGetter.propTypes = {};

UsdtGetter.defaultProps = {};

export default UsdtGetter;
