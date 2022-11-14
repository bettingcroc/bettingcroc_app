/* global BigInt */
//lire les-freres-karamazov
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import ListBet from "./components/ListBet/ListBet"
import Bet from "./components/Bet/Bet.jsx"

import React, { Component } from "react";
import Web3 from "web3";
import "./App.css";
import { DECENTRABET_ABI, DECENTRABET_ADDRESS, MBT_ABI, MBT_ADDRESS, MULTIBET_ABI, MULTIBET_ADDRESS, USDT_ABI, USDT_ADDRESS } from "./config";
import { Link, Outlet } from "react-router-dom";
import ConnectButton from "./components/ConnectButton/ConnectButton";
import homeImage from './home.png'
import titleImage from './bettingCrocTitle.png'
import accountImage from './account.jpg'
import DecentraBet from "./components/DecentraBet/DecentraBet";
import Classement from "./components/Classement/Classement";
import MyBets from "./components/MyBets/MyBets";
import Authentification from "./components/Authentification/Authentification";
import Account from "./components/Account/Account";
const chainId = 97;
class Popup extends React.Component {
  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <h1>{this.props.text}</h1>
          <button onClick={this.props.closePopup}>GOT IT !</button>
          <img src="https://dynamic-assets.coinbase.com/36f266bc4826775268588346777c84c1ae035e7de268a6e124bcc22659f0aa2bf4f66dcad89b2ac978cfdb4d51c2d9f63cf7157769efb500b20ca16a6d5719c7/asset_icons/7deb6ff58870072405c0418d85501c4521c3296e33ef58452be98e4ca592ed19.png"></img>
        </div>
      </div>
    );
  }
}
class App extends Component {
  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider);
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    const multiBetContract = new web3.eth.Contract(MULTIBET_ABI, MULTIBET_ADDRESS);
    const USDTContract = new web3.eth.Contract(USDT_ABI, USDT_ADDRESS);
    const mbtContract = new web3.eth.Contract(MBT_ABI, MBT_ADDRESS);
    const decentrabetContract = new web3.eth.Contract(DECENTRABET_ABI, DECENTRABET_ADDRESS);
    this.setState({ multiBetContract });
    this.setState({ USDTContract });
    this.setState({ mbtContract });
    this.setState({ decentrabetContract });
    this.setState({ web3 })
    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((result) => {
        this.accountChangedHandler(result[0]);
      });
    this.setState({ loading: false });
    this.setState({ balanceUSDT: null })


  }
  constructor(props) {
    super(props);
    this.state = {
      account: "",
      taskCount: 0,
      tasks: [],
      loading: true,
      errorMessage: "",
      defaultAccount: "",
      connButtonText: "Connect Wallet",
      usdtAllowed: null,
      mbtAllowed: null,
      showPopup: false,
      switchChainPending: false,
      amountToBet:0
    };
    this.accountChangedHandler = this.accountChangedHandler.bind(this);
    this.loadBlockchainData();
    this.allowancesSetter = this.allowancesSetter.bind(this)
    this.togglePopup = this.togglePopup.bind(this)

  }
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }
  async chainChanger() {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: Web3.utils.toHex(chainId) }]
      });
      console.log("sending chain switch request")
    } catch (err) {
      // This error code indicates that the chain has not been added to MetaMask
      if (err.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainName: 'BSC Testnet',
              chainId: Web3.utils.toHex(chainId),
              nativeCurrency: { name: 'BSC Testnet', decimals: 18, symbol: 'BNB' },
              //rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/']
              rpcUrls: ['https://rpc.ankr.com/bsc_testnet_chapel']

            }
          ]
        });
      }
    }
  }
  componentDidUpdate() {
    if (window.ethereum.networkVersion != 97) {
      console.log("bad chain : " + window.ethereum.networkVersion)
      if (this.state.showPopup == false && this.state.switchChainPending == false) { this.togglePopup(); this.setState({ switchChainPending: true }); }
      if (this.state.switchChainPending == false) { this.chainChanger(); this.setState({ switchChainPending: true }); }
    }
    if (window.ethereum) {
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      })
      window.ethereum.on('accountsChanged', () => {
        let url = "https://testnet.bettingcroc.com/logout";

        console.log(url);
        let options = {
          method: "POST",
        };
        fetch(url, options).then((res) => {
          console.log("request logout with res: " + res);
          window.location.reload();
        });

      })
    }
    console.log(window.ethereum.networkVersion)

  }
  accountChangedHandler = (newAccount) => {
    this.setState({ defaultAccount: newAccount });
    this.allowancesSetter()
  };
  connectWalletHandler = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      console.log("MetaMask Here!");

      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          this.accountChangedHandler(result[0]);
          //console.log(result[0])
          this.setState({ connButtonText: "Wallet Connected" });
          //getAccountBalance(result[0]);
        })
        .catch((error) => {
          this.setState({ errorMessage: error.message });
        });
    } else {
      console.log("Need to install MetaMask");
      this.setState({
        errorMessage: "Please install MetaMask browser extension to interact",
      });
    }
  };
  allowancesSetter() {
    try {
      console.log(this.state.defaultAccount)
      this.state.USDTContract.methods.allowance(this.state.defaultAccount, MULTIBET_ADDRESS).call().then((result) => { this.setState({ usdtAllowed: parseFloat(result) / decimalsConverter(10) }); console.log("usdt allowed " + result) })
    }
    catch (error) {
      console.log(error)
    }
    try {
      console.log(this.state.defaultAccount)
      this.state.mbtContract.methods.allowance(this.state.defaultAccount, MULTIBET_ADDRESS).call().then((result) => { this.setState({ mbtAllowed: parseFloat(result) / decimalsConverter(10) }); console.log("mbt allowed " + result) })
    }
    catch (error) {
      console.log(error)
    }
    try {
      console.log(this.state.defaultAccount)
      this.state.USDTContract.methods.balanceOf(this.state.defaultAccount).call().then((result) => { this.setState({ balanceUSDT: parseFloat(result) / decimalsConverter(10) }); console.log("usdt balance " + result) })
    }
    catch (error) {
      console.log(error)
    }
  }
  render() {
    return (
      <div id="bettingcroc">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <div>
                <div id="topBar">
                  <div id="topLeft">
                    <div id="logo">
                      <Link to="/">

                        <img id="crocoImage" src={homeImage} alt="homeImage"></img><img id="bettingCrocTitle" src={titleImage} alt="titleImage"></img>

                      </Link>
                    </div>
                    <div id="links">
                      <Link to="/basketball"><p id="listBetsTitle">ListBets</p></Link>
                      <Link to="/decentrabet"><p id="decentraBetTitle">Decentrabet</p></Link>
                      <Link to="/classement"><p id="classementTitle">Classement</p></Link>
                    </div>
                  </div>
                  <div id="topRight">

                    <ConnectButton connectWalletHandler={this.connectWalletHandler} defaultAccount={this.state.defaultAccount} errorMessage={this.state.errorMessage} connButtonText={this.state.connButtonText}></ConnectButton>

                    <div id="allowancesMain">
                      <p>usdt allowed: {this.state.usdtAllowed}</p>
                      <p> mbt allowed: {this.state.mbtAllowed}</p>
                    </div>
                    <div id="accountLink">
                      <Link to="/account"><img className="accountLogo" src={accountImage} alt="accountImage"></img></Link>
                    </div>
                  </div>


                </div>
                <div id="leftBar">
                  <div id="underLeftBar">
                    <div id="under2leftBar">
                      <div id="searchBar">
                        <input type="text"></input>
                      </div>
                      <div id="popular">
                        <p>Popular</p>
                        <Link to="/basketball"><h3>Basketball</h3></Link>
                        <Link to="/football"><h3>Football</h3></Link>
                        <Link to="/finance"><h3>Finance</h3></Link>
                        <Link to="/baseball"><h3>Baseball</h3></Link>
                      </div>
                      <div id="categories">
                        <p>All categories</p>
                        <Link to="/basketball"><h3>Basketball</h3></Link>
                        <Link to="/football"><h3>Football</h3></Link>
                        <Link to="/finance"><h3>Finance</h3></Link>
                        <Link to="/baseball"><h3>Baseball</h3></Link>
                      </div>
                    </div>
                  </div>
                </div>


                <div id="stakeJauge">
                  <div id="stakeTitle">
                    <div id="underStakeTitle">
                      <div id="under2StakeTitle">
                        <p id="stakeTitleP">Stake</p>
                      </div>
                    </div>
                  </div>
                  <div id="stakeBox">
                    <div id="jaugeDiv">
                      <div id="graduation">
                        <p id="zeroRange">1 USDT</p>
                        <p id="midRange">50%</p>
                        <p id="maxRange">Max ({Math.round(this.state.balanceUSDT * 10) / 10})</p>
                      </div>
                      <div id="range">
                        <input type="range" min="1" step="1" max={this.state.balanceUSDT} id="rangeInput" value={this.state.amountToBet} onChange={e => this.setState({amountToBet: e.target.value})}></input>
                      </div>
                    </div>
                    <div>
                    <input type="number" id="inputStake" value={this.state.amountToBet} onChange={e => this.setState({amountToBet: e.target.value})}></input>
                    <button id="enterStakeButtonB">
                      <div id="enterStakeButton">
                        Enter stake
                      </div>
                    </button>
                    </div>
                  </div>
                </div>
                <div id="mainVue">
                  {this.state.showPopup ?
                    <Popup
                      text='Change chain to BSC Testnet to use app !'
                      closePopup={this.togglePopup}

                    />
                    : null
                  }
                  <Outlet></Outlet>
                </div>
                <div id="rightBar">
                  <MyBets betContract={this.state.multiBetContract} address={this.state.defaultAccount}></MyBets>
                </div>


              </div>}
            >
              <Route path="/basketball" element={<ListBet ></ListBet>} />
              <Route path="/football" element={<ListBet ></ListBet>} />
              <Route path="/bet/:id" element={<Bet betContract={this.state.multiBetContract} usdtContract={this.state.USDTContract} address={this.state.defaultAccount} mbtContract={this.state.mbtContract} amountToBet={this.state.amountToBet}></Bet>} />
              <Route path="/decentrabet" element={<DecentraBet decentrabetContract={this.state.decentrabetContract} usdtContract={this.state.USDTContract} address={this.state.defaultAccount}></DecentraBet>} />
              <Route path="/classement" element={<Classement address={this.state.defaultAccount}></Classement>}></Route>
              <Route path="/mybets" element={<MyBets betContract={this.state.multiBetContract} address={this.state.defaultAccount}></MyBets>}></Route>
              <Route path="/authentification" element={<Authentification web3={this.state.web3} address={this.state.defaultAccount}></Authentification>}></Route>
              <Route path="/account" element={<Account address={this.state.defaultAccount}></Account>}></Route>
            </Route>

          </Routes>
        </BrowserRouter >
      </div >
    );
  }
}

ReactDOM.render(<App></App>
  ,
  document.getElementById("root")
);


function decimalsConverter(numberToConvert) {
  return Math.pow(numberToConvert, 18)
}
function weiconvert(number) { return BigInt(number * decimalsConverter(10)); }