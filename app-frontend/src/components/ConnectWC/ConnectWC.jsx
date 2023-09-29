import React from 'react';
import walletconnectImage from "./walletconnect.png"
import { EthereumProvider } from '@walletconnect/ethereum-provider'

function ConnectWc(props) {
  async function connectWalletConnect() {
    console.log("trying to connect WC")
    try {
      console.log("trying connectWalletConnect()")
      let provider = await EthereumProvider.init({
        projectId: "ad6d1b7dc7e99024e7432f55a7c68f0c",
        infuraId: "f5ba98b6c0c040d69338b06f9b270b3b",
        chains: [97],
        rpcMap: {
          97: "https://rpc.ankr.com/bsc_testnet_chapel"
          // ...
        },
        showQrModal: true
      });
      await provider.enable();
      props.web3.setProvider(provider)
      props.web3.eth.getAccounts().then((res) => { props.accountChangedHandler(res[0]) })
      localStorage.setItem("walletType", "WC")
    }
    catch (e) {
      console.log(e)
    }
  }
  return (
    <button className="buttonTransparent buttonTransparentModal" onClick={connectWalletConnect}>
      <img src={walletconnectImage} alt="walletconnectImage" className='walletsImage'></img>
      <p>WalletConnect</p>

    </button>
  );

}
ConnectWc.propTypes = {};

ConnectWc.defaultProps = {};

export default ConnectWc;
