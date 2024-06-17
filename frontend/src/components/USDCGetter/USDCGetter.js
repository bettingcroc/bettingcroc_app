import React, { useEffect, useState } from 'react';
const USDCGetterABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "getUsdc",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
const USDCGetterAddress = "0x1A40a120E6cE31f26F8E9aBCB175b19DE68B3093"

function UsdcGetter(props) {
  const [contract, setContract] = useState()
  useEffect(() => {
    if (props.web3 !== undefined) {
      setContract(new props.web3.eth.Contract(USDCGetterABI, USDCGetterAddress))
      console.log("contract init")
    }
  }, [props.web3])

  function get5000USDC() {
    contract.methods.getUsdc().send({ from: props.address })
      .once('receipt', (receipt) => {
        console.log("approve success")
      })
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "30px" }}>
      <p style={{ fontSize: "20px" }}>Get 5000 USDC here</p>
      <button style={{ backgroundColor: "#089334", borderRadius: "10px", padding: "15px", border: "none", color: "white" }} onClick={get5000USDC}>GET 5000 USDC</button>
    </div>
  );

}

UsdcGetter.propTypes = {};

UsdcGetter.defaultProps = {};

export default UsdcGetter;
