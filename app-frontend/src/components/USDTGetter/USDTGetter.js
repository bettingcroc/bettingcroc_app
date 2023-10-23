import React, { useEffect, useState } from 'react';
const USDTGetterABI = [
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
const USDTGetterAddress = "0x1A40a120E6cE31f26F8E9aBCB175b19DE68B3093"

function UsdtGetter(props) {
  const [contract, setContract] = useState()
  useEffect(() => {
    if (props.web3 !== undefined) {
      setContract(new props.web3.eth.Contract(USDTGetterABI, USDTGetterAddress))
      console.log("contract init")
    }
  }, [props.web3])

  function get5000USDT() {
    contract.methods.getUsdt().send({ from: props.address })
      .once('receipt', (receipt) => {
        console.log("approve success")
      })
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "30px" }}>
      <p style={{ fontSize: "20px" }}>Get 5000 USDT here</p>
      <button style={{ backgroundColor: "#539B57", borderRadius: "10px", padding: "15px", border: "none", color: "white" }} onClick={get5000USDT}>GET 5000 USDT</button>
    </div>
  );

}

UsdtGetter.propTypes = {};

UsdtGetter.defaultProps = {};

export default UsdtGetter;
