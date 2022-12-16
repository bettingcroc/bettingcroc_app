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
import basketBallImage from './basketball.png'
import footballImage from './football.png'
import financeImage from './finance.png'
import tennisImage from './tennis.png'
import accountImage from './account.jpg'
import DecentraBet from "./components/DecentraBet/DecentraBet";
import Classement from "./components/Classement/Classement";
import MyBets from "./components/MyBets/MyBets";
import Authentification from "./components/Authentification/Authentification";
import Account from "./components/Account/Account";
import BetMaker from "./components/betMaker/betMaker";
import ComingSoon from "./components/ComingSoon/ComingSoon";
import LandingComponent from "./components/LandingComponent/LandingComponent"
import WalletConnectProvider from "@walletconnect/web3-provider";
import ConnectWc from "./components/ConnectWC/ConnectWC";
import Connecter from "./components/Connecter/Connecter";
//  Create WalletConnect Provider
var provider = new WalletConnectProvider({
  infuraId: "f5ba98b6c0c040d69338b06f9b270b3b",
  rpc: {
    97: "https://rpc.ankr.com/bsc_testnet_chapel"
    // ...
  },
});



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
    /*//  Enable session (triggers QR Code modal)
    await provider.enable();
    //const web3 = new Web3(Web3.givenProvider);
    const web3 = new Web3(provider);
    console.log(web3)
    //  Get Accounts
    const accounts = await web3.eth.getAccounts();
    
    console.log(accounts)
    // Sign Typed Data
    let nonce = "ewww"
    var hex = ''
    for (var i = 0; i < nonce.length; i++) {
      hex += '' + nonce.charCodeAt(i).toString(16)
    }
    var hexMessage = "0x" + hex
    console.log(hexMessage)
    const signedTypedData = await web3.eth.personal.sign(hexMessage, accounts[0]);
    console.log(signedTypedData)
    //const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });*/
    const web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545");
    console.log(web3.givenProvider)
    console.log("testEth")
    //console.log(web3.givenProvider.isWalletSelected)
    //console.log(window.ethereum.isWalletSelected)
    console.log("testEth")
    if (web3.givenProvider) {
      web3.setProvider(Web3.givenProvider)
    }
    if (localStorage.getItem("walletconnect") !== null) {
      await provider.enable();
      web3.setProvider(provider)
      web3.eth.getAccounts().then((res) => { this.accountChangedHandler(res[0]) })
    }

    console.log("provider")
    console.log(provider)
    console.log(provider.accounts)
    console.log("provider")
    const accounts = await web3.eth.getAccounts();
    console.log("accounts")
    console.log(accounts)
    console.log("accounts")
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
    this.accountChangedHandler(accounts[0])
    /*window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((result) => {
        this.accountChangedHandler(result[0]);
      });*/
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
      defaultAccount: undefined,
      connButtonText: "Connect Wallet",
      usdtAllowed: null,
      mbtAllowed: null,
      showPopup: false,
      switchChainPending: false,
      amountToBet: 1,
      rightBar: "betMaker",
      typeBet: 0,
      betArgs: null,
      vue: null,
      vueRightBar: "betMaker"
    };
    this.accountChangedHandler = this.accountChangedHandler.bind(this);
    this.loadBlockchainData();
    this.allowancesSetter = this.allowancesSetter.bind(this)
    this.togglePopup = this.togglePopup.bind(this)
    this.goPanier = this.goPanier.bind(this)
    this.goMyBets = this.goMyBets.bind(this)
    this.setTypeBet = this.setTypeBet.bind(this)
    this.setBetArgs = this.setBetArgs.bind(this)
    this.approveUSDT = this.approveUSDT.bind(this)
    this.betFunction = this.betFunction.bind(this)
    this.betOnThisOption = this.betOnThisOption.bind(this)
    this.createP2PBet = this.createP2PBet.bind(this);
    this.approve = this.approve.bind(this)
    this.approveMBT = this.approveMBT.bind(this);
    this.betOnThisOptionP2P = this.betOnThisOptionP2P.bind(this)
    this.setAmountBet = this.setAmountBet.bind(this)
    this.setVue = this.setVue.bind(this)
    this.setVueRightBar = this.setVueRightBar.bind(this)
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
    console.log("update index")
    if (window.ethereum) {
      if (window.ethereum.networkVersion != 97) {
        console.log("bad chain : " + window.ethereum.networkVersion)
        //if (this.state.showPopup == false && this.state.switchChainPending == false) { this.togglePopup(); this.setState({ switchChainPending: true }); }
        //if (this.state.switchChainPending == false) { this.chainChanger(); this.setState({ switchChainPending: true }); }
      }
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
    //console.log(window.ethereum.networkVersion)

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
          this.state.web3.setProvider(Web3.givenProvider)
          this.accountChangedHandler(result[0]);
          console.log(result[0])
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
  connectWalletConnect = async () => {
    try {
      await provider.enable();
      this.state.web3.setProvider(provider)
      this.state.web3.eth.getAccounts().then((res) => { this.accountChangedHandler(res[0]) })
      console.log("provider2")
      console.log(provider)
      console.log("provider2")
    }
    catch (e) {
      provider = new WalletConnectProvider({
        infuraId: "f5ba98b6c0c040d69338b06f9b270b3b",
        rpc: {
          97: "https://rpc.ankr.com/bsc_testnet_chapel"
          // ...
        },
      });
    }
  }
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
  goMyBets() {
    this.setState({ rightBar: "myBets" })
  }
  goPanier() {
    this.setState({ rightBar: "betMaker" })
  }
  setTypeBet(newTypeBet) {
    this.setState({ typeBet: newTypeBet })
    console.log(this.state.typeBet)
    if (newTypeBet !== 0) { this.goPanier() }
  }
  setBetArgs(newBetArgs) {
    this.setState({ betArgs: newBetArgs })
  }
  setAmountBet(newAmount) {
    this.setState({ amountToBet: newAmount })
  }
  setVue(newVue) {
    this.setState({ vue: newVue })
  }
  setVueRightBar(newVue) {
    this.setState({ vueRightBar: newVue })
  }
  approve() {
    if (this.state.typeBet === 1 || this.state.typeBet === 3) {
      this.approveUSDT(this.state.betArgs.amountToBet)
    }
    if (this.state.typeBet === 2) {
      this.approveUSDT(this.state.betArgs.amountToBet)
      this.approveMBT(this.state.betArgs.amountToBet)
    }
  }
  approveUSDT(amount) {
    this.state.USDTContract.methods.approve("0xD90531a9234A38dfFC8493c0018ad17cB5F7A867", amount).send({ from: this.state.defaultAccount })
      .once('receipt', (receipt) => {
        console.log("approve success")
      })
  }
  approveMBT(amount) {
    this.state.mbtContract.methods
      .approve("0xD90531a9234A38dfFC8493c0018ad17cB5F7A867", amount)
      .send({ from: this.state.defaultAccount })
      .once("receipt", (receipt) => {
        console.log("approve success");
      });
  }
  betFunction(args) {
    console.log("bet")
    if (this.state.typeBet === 1) {
      this.betOnThisOption(this.state.betArgs.amountToBet)
    }
    if (this.state.typeBet === 2) {
      this.createP2PBet(
        this.state.betArgs.amountToBet,
        this.state.betArgs.cote,
        this.state.betArgs.selectedOption,
        this.state.betArgs.authorized
      );
    }
    if (this.state.typeBet === 3) {
      this.betOnThisOptionP2P(this.state.betArgs.amountToBet)
    }
  }
  betOnThisOption(amount) {
    console.log("bet Try")
    this.state.multiBetContract.methods.betOn(this.state.betArgs.betNumber, this.state.betArgs.optionNumber, amount).send({ from: this.state.defaultAccount })
      .once('receipt', (receipt) => {
        console.log("bet success")
      })
  }
  betOnThisOptionP2P(amount) {
    try {
      this.state.multiBetContract.methods
        .joinP2PBet(
          this.state.betArgs.betNumber,
          this.state.betArgs.betNumberP2P,
          amount
        )
        .send({ from: this.state.defaultAccount })
        .once("receipt", (receipt) => {
          console.log("bet success");
        });
    } catch (error) {
      console.log(error);
    }
  }
  createP2PBet(amount, cote, option, authorized) {
    if (authorized === undefined) {
      authorized = [];
    }
    else {
      authorized = authorized.split(',')
    }
    console.log(amount, cote, option, authorized);
    let amountToEnter = (cote - 1) * (parseFloat(amount) / decimalsConverter(10));
    amountToEnter = weiconvert(parseFloat(amountToEnter.toPrecision(7)));
    this.state.multiBetContract.methods
      .createP2PBet(
        amount,
        amountToEnter,
        this.state.betArgs.betNumber,
        option,
        authorized
      )
      .send({ from: this.state.defaultAccount })
      .once("receipt", (receipt) => {
        console.log("new bet Created");
      });
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
                      <Link to="/basketball"><p id="listBetsTitle" className={this.state.vue === "listBets" ? "titleActive" : "titleInactive"}>List Bets</p></Link>
                      <Link to="/decentrabet"><p id="decentraBetTitle" className={this.state.vue === "decentraBet" ? "titleActive" : "titleInactive"}>Decentrabet</p></Link>
                      <Link to="/rankings"><p id="rankingsTitle" className={this.state.vue === "rankings" ? "titleActive" : "titleInactive"}>Rankings</p></Link>
                    </div>
                  </div>
                  <div id="topRight">

                    {this.state.defaultAccount === undefined ? <Connecter connectWalletHandler={this.connectWalletHandler} defaultAccount={this.state.defaultAccount} errorMessage={this.state.errorMessage} connButtonText={this.state.connButtonText} connectWalletConnectHandler={this.connectWalletConnect}></Connecter> : <p className="accountDisplay">{this.state.defaultAccount}</p>}


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
                        <p className="titleLeftBar">Popular</p>
                        <Link to="/basketball">
                          <div className="optionsLeftBar">
                            <img src={basketBallImage} alt="basketBallImage" className="logoImage"></img>
                            <p className="optionsLeftBarP">Basketball</p></div>
                        </Link>
                        <Link to="/football">
                          <div className="optionsLeftBar">
                            <img src={footballImage} alt="footballImage" className="logoImage"></img>
                            <p className="optionsLeftBarP">Football</p>
                          </div>
                        </Link>
                        <Link to="/finance">
                          <div className="optionsLeftBar">
                            <img src={financeImage} alt="financeImage" className="logoImage"></img>
                            <p className="optionsLeftBarP">Finance</p>
                          </div>
                        </Link>
                        <Link to="/tennis">
                          <div className="optionsLeftBar">
                            <img src={tennisImage} alt="tennisImage" className="logoImage"></img>
                            <p className="optionsLeftBarP">Tennis</p>
                          </div>
                        </Link>
                      </div>
                      <div id="categories">
                        <p className="titleLeftBar">All categories</p>
                        <Link to="/basketball">
                          <div className="optionsLeftBar">
                            <img src={basketBallImage} alt="basketBallImage" className="logoImage"></img>
                            <p className="optionsLeftBarP">Basketball</p></div>
                        </Link>
                        <Link to="/football">
                          <div className="optionsLeftBar">
                            <img src={footballImage} alt="footballImage" className="logoImage"></img>
                            <p className="optionsLeftBarP">Football</p>
                          </div>
                        </Link>
                        <Link to="/finance">
                          <div className="optionsLeftBar">
                            <img src={financeImage} alt="financeImage" className="logoImage"></img>
                            <p className="optionsLeftBarP">Finance</p>
                          </div>
                        </Link>
                        <Link to="/tennis">
                          <div className="optionsLeftBar">
                            <img src={tennisImage} alt="tennisImage" className="logoImage"></img>
                            <p className="optionsLeftBarP">Tennis</p>
                          </div>
                        </Link>
                      </div>
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
                  <div id="topRightBar">
                    <div id="underTopRightBar">
                      <button onClick={this.goPanier} className="topRightButton" id="panierP"><div id={this.state.rightBar === "betMaker" ? "activeRightBar" : "inactiveRightBar"} className="topRightDiv">Bet maker</div></button>
                      <button onClick={this.goMyBets} className="topRightButton" id="myBetsP"><div id={this.state.rightBar === "myBets" ? "activeRightBar" : "inactiveRightBar"} className="topRightDiv">My Bets</div></button>
                    </div>
                  </div>
                  <div id="superMidRightBar">
                    <div id="midRightBar">
                      {this.state.rightBar === "betMaker" ? this.state.typeBet === 0 ? null : <BetMaker setTypeBet={this.setTypeBet} setBetArgs={this.setBetArgs} betArgs={this.state.betArgs} typeBet={this.state.typeBet}></BetMaker> : <MyBets betContract={this.state.multiBetContract} address={this.state.defaultAccount}></MyBets>
                      }

                    </div>
                  </div>

                </div>
                <div id="bottomRightBar">
                  <div id="underBottomRightBar">
                    <div id="inputLine">
                      <p id="inputP">Input</p>
                      <p id="inputP2">{this.state.betArgs === null ? null : parseFloat(this.state.betArgs.amountToBet) / decimalsConverter(10) + " USDT"}</p>
                    </div>
                    <div id="gainsLine">
                      <p id="gainsP">Gains</p>
                      <p id="gainsP2">{this.state.betArgs === null ? null : this.state.betArgs === null ? null : this.state.betArgs.toWin + " USDT"} </p>
                    </div>
                  </div>
                  <button id="buttonApprover" onClick={(event) => { this.approve() }}><div id="approveButton"><p id="approveP">APPROVE</p></div></button>
                  <button id="buttonBetter" onClick={(event) => { this.betFunction(this.state.betArgs) }}><div id="betButton"><p id="betP">BET</p></div></button>
                </div>

              </div>}
            >
              <Route path="/" element={<LandingComponent vueSetter={this.setVue}></LandingComponent>} />
              <Route path="/basketball" element={<ListBet vueSetter={this.setVue}></ListBet>} />
              <Route path="/football" element={<ComingSoon ></ComingSoon>} />
              <Route path="/tennis" element={<ComingSoon ></ComingSoon>} />
              <Route path="/finance" element={<ComingSoon ></ComingSoon>} />
              <Route path="/bet/:id" element={<Bet betContract={this.state.multiBetContract} usdtContract={this.state.USDTContract} address={this.state.defaultAccount} mbtContract={this.state.mbtContract} amountToBet={this.state.amountToBet} setTypeBet={this.setTypeBet} setBetArgs={this.setBetArgs} balanceUSDT={this.state.balanceUSDT} setAmountBet={this.setAmountBet}></Bet>} />
              <Route path="/decentrabet" element={<DecentraBet vueSetter={this.setVue} decentrabetContract={this.state.decentrabetContract} usdtContract={this.state.USDTContract} address={this.state.defaultAccount}></DecentraBet>} />
              <Route path="/rankings" element={<Classement vueSetter={this.setVue} address={this.state.defaultAccount}></Classement>}></Route>
              <Route path="/mybets" element={<MyBets betContract={this.state.multiBetContract} address={this.state.defaultAccount}></MyBets>}></Route>
              <Route path="/authentification" element={<Authentification web3={this.state.web3} address={this.state.defaultAccount}></Authentification>}></Route>
              <Route path="/account" element={<Account address={this.state.defaultAccount}></Account>}></Route>
              <Route path="/docs" element={<ComingSoon></ComingSoon>}></Route>
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