/* global BigInt */
//lire les-freres-karamazov
import ReactDOM from "react-dom";
import { io } from 'socket.io-client'

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
import MyP2PBets from "./components/MyP2PBets/MyP2PBets";
import CoinbaseWalletSDK from '@coinbase/wallet-sdk'
import USDTGetter from "./components/USDTGetter/USDTGetter"
import GetGains from "./components/GetGains/GetGains";

const APP_NAME = 'bettingcroc'
const APP_LOGO_URL = 'https://testnet.bettingcroc.com/static/media/home.de3a12ee.png'
const DEFAULT_ETH_JSONRPC_URL = `https://data-seed-prebsc-1-s3.binance.org:8545`
const DEFAULT_CHAIN_ID = 97
const coinbaseWallet = new CoinbaseWalletSDK({
  appName: APP_NAME,
  appLogoUrl: APP_LOGO_URL,
  darkMode: false
})
const ethereum = coinbaseWallet.makeWeb3Provider(DEFAULT_ETH_JSONRPC_URL, DEFAULT_CHAIN_ID)
//const ethereum = coinbaseWallet.makeWeb3Provider(DEFAULT_ETH_JSONRPC_URL, DEFAULT_CHAIN_ID)

// Initialize a Web3 object
//const web3CB = new Web3(ethereum)
//ethereum.request({ method: 'eth_requestAccounts' })
// Initialize Coinbase Wallet SDK


// Initialize a Web3 Provider object
//const ethereum = coinbaseWallet.makeWeb3Provider(DEFAULT_ETH_JSONRPC_URL, DEFAULT_CHAIN_ID)


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
  constructor(props) {
    super(props);
    this.state = {
      //account: "",
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
      vueTopBar: null,
      vueRightBar: "betMaker",
      logged: false,
      overlayClass: "inactiveOverlay",
      mainVue: null,
      myBets: [],
      myP2PBets: []
    };
    this.accountChangedHandler = this.accountChangedHandler.bind(this)
    this.loadBlockchainData()
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
    this.setTopVue = this.setTopVue.bind(this)
    this.setVueRightBar = this.setVueRightBar.bind(this)
    this.goMyP2PBets = this.goMyP2PBets.bind(this)
    this.connectCoinBase = this.connectCoinBase.bind(this)
    this.disconnect = this.disconnect.bind(this)
    this.logoutReact = this.logoutReact.bind(this)
    this.setLogged = this.setLogged.bind(this)
    this.switchOverlayMode = this.switchOverlayMode.bind(this);
    this.closeOverlay = this.closeOverlay.bind(this)
    this.setMainVue = this.setMainVue.bind(this);
    this.setMyBets = this.setMyBets.bind(this);
    this.setMyP2PBets = this.setMyP2PBets.bind(this);
  }


  async loadBlockchainData() {
    const web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545");
    if (web3.givenProvider) {
      web3.setProvider(Web3.givenProvider)
    }
    if (localStorage.getItem("walletconnect") !== null) {
      await provider.enable();
      web3.setProvider(provider)
      web3.eth.getAccounts().then((res) => { this.accountChangedHandler(res[0]) })
    }
    const accounts = await web3.eth.getAccounts();
    this.setState({ defaultAccount: accounts[0] });

    if (this.state.defaultAccount !== undefined) {
      const socket = io('https://testnet.bettingcroc.com')
      this.setState({ socket: socket })
      socket.on('connect', () => console.log("connected to server with " + socket.id))

      socket.on('ReceivedFriendRequest', (from) => {
        console.log("ReceivedFriendRequest from" + from)
        this.setState({
          requestUpdater: Math.random()
        })
      })

      socket.on('ReceivedBetInvitation', (from) => {
        console.log("ReceivedBetInvitation from" + from)
        this.setState({
          requestUpdater: Math.random()
        })
      })

      socket.on('newFriendAcceptedToSender', (from) => {
        console.log("newFriendAcceptedToSender from" + from)
        this.setState({
          friendsUpdater: Math.random()
        })
      })

      socket.on('connect_error', () => {
        setTimeout(() => socket.connect(), 5000)
      })
      socket.emit('joinRoom', this.state.defaultAccount.toLowerCase())
      socket.on('disconnect', () => console.log('server disconnected'))
    }


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
    this.setState({ loading: false });
    this.setState({ balanceUSDT: null })
    if (this.state.defaultAccount !== undefined) {
      this.setMyBets()
      this.setMyP2PBets()
    }
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
  componentDidMount() {

  }
  componentDidUpdate() {
    //console.log("update index")
    if (window.ethereum) {
      if (window.ethereum.networkVersion != 97) {
        //console.log("bad chain : " + window.ethereum.networkVersion)
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
      //console.log("MetaMask Here!");

      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          this.state.web3.setProvider(Web3.givenProvider)
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
  connectWalletConnect = async () => {
    try {
      await provider.enable();
      this.state.web3.setProvider(provider)
      this.state.web3.eth.getAccounts().then((res) => { this.accountChangedHandler(res[0]) })

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
  connectCoinBase = async () => {



    ethereum.request({ method: 'eth_requestAccounts' }).then((result) => {
      this.state.web3.setProvider(Web3.givenProvider)
      this.accountChangedHandler(result[0]);
      console.log(result[0])
      this.setState({ connButtonText: "Wallet Connected" });
      //getAccountBalance(result[0]);
    })
      .catch((error) => {
        this.setState({ errorMessage: error.message });
      });
    // Initialize a Web3 object
    this.state.web3.setProvider(ethereum)
  }
  async logoutReact() {
    await logout()
  }
  disconnect() {
    this.logoutReact()
    console.log("disconnecting wallet")
    this.setState({ defaultAccount: undefined })
    this.state.web3.setProvider("https://data-seed-prebsc-1-s1.binance.org:8545")
    localStorage.clear();

  }
  allowancesSetter() {
    try {
      this.state.USDTContract.methods.allowance(this.state.defaultAccount, MULTIBET_ADDRESS).call().then((result) => {
        this.setState({ usdtAllowed: parseFloat(result) / decimalsConverter(10) }); //console.log("usdt allowed " + result) 
      })
    }
    catch (error) {
      //console.log(error)
      console.log("no wallet connected")
    }
    try {
      this.state.mbtContract.methods.allowance(this.state.defaultAccount, MULTIBET_ADDRESS).call().then((result) => {
        this.setState({ mbtAllowed: parseFloat(result) / decimalsConverter(10) });// console.log("mbt allowed " + result)
      })
    }
    catch (error) {
      //console.log(error)
      console.log("no wallet connected")
    }
    try {
      this.state.USDTContract.methods.balanceOf(this.state.defaultAccount).call().then((result) => {
        this.setState({ balanceUSDT: parseFloat(result) / decimalsConverter(10) }); //console.log("usdt balance " + result)
      })
    }
    catch (error) {
      //console.log(error)
      console.log("no wallet connected")
    }
  }
  goMyBets() {
    this.setState({ rightBar: "myBets" })
  }
  goPanier() {
    this.setState({ rightBar: "betMaker" })
  }
  goMyP2PBets() {
    this.setState({ rightBar: "myP2PBets" })
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
  setTopVue(newVue) {
    this.setState({ vueTopBar: newVue })
  }
  setMainVue(newVue) {
    this.setState({ mainVue: newVue })
  }
  setVueRightBar(newVue) {
    this.setState({ vueRightBar: newVue })
  }
  setLogged(stateLog) {
    this.setState({ logged: stateLog })
  }
  switchOverlayMode() {
    this.state.overlayClass === "inactiveOverlay" ? this.setState({ overlayClass: "overlayActive" }) : this.setState({ overlayClass: "inactiveOverlay" })
  }
  closeOverlay() {
    this.setState({ overlayClass: "inactiveOverlay" })
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
  setMyBets() {
    try {
      this.state.multiBetContract.methods.seeMyBets(this.state.defaultAccount).call().then(result => {

        fetch("https://testnet.bettingcroc.com/api/mybets/", {
          method: "POST"
          , body: JSON.stringify({ listBets: result })
          , headers: {
            "Content-Type": "application/json",
          }
        }).then(
          (res) => {
            res.json().then(async (data) => {

              for (let b in data) {
                let bet = data[b]
                if (bet.status === 0 || bet.status === 1) {
                  bet = Object.assign(bet, { betState: "🕗" })
                }
                else if (bet.status === 2) {
                  try {
                    await this.state.multiBetContract.methods.didIWinSmth(bet.id, this.state.defaultAccount).call().then(
                      async (res1) => {
                        //console.log("call3")
                        if (res1 === true) {
                          bet = Object.assign(bet, { betState: "W" })
                        }
                        else {
                          await this.state.multiBetContract.methods.getHasUserWon(this.state.defaultAccount, bet.id).call().then(
                            (res2) => {
                              //console.log("call4")

                              if (res2 === true) {
                                bet = Object.assign(bet, { betState: "W" })

                              }
                              else {
                                bet = Object.assign(bet, { betState: "L" })
                              }
                            })
                        }
                      }
                    )
                  }
                  catch (e) {
                    console.log(e)
                  }
                }
                else {
                  console.log("canceled bet MyBets")
                  bet = Object.assign(bet, { betState: "✖️" })
                }
                await this.state.multiBetContract.methods.getNumberOfOptions(bet.id).call().then(async options => {
                  let mises = []
                  for (let o = 0; o < options; o++) {
                    await this.state.multiBetContract.methods.getMiseBettersOnEnd(bet.id, o, this.state.defaultAccount).call().then(mise => {
                      //console.log(bet.id)
                      mises.push(mise)
                      //console.log(mise)
                    }

                    )
                  }
                  bet = Object.assign(bet, { mise: mises })
                }
                );
                //console.log(bet)
              }
              this.setState({ myBets: data })
            });
          }
        );
      })

    } catch (error) {
      console.log(error);
    }
  }
  setMyP2PBets(){
    try {
      this.state.multiBetContract.methods.seeMyP2PBets(this.state.defaultAccount).call().then(async result => {
        console.log(result)
        fetch("https://testnet.bettingcroc.com/api/mybets/", {
          method: "POST"
          , body: JSON.stringify({ listBets: result })
          , headers: {
            "Content-Type": "application/json",
          }
        }).then(
          (res) => {
            res.json().then(async (data) => {
              console.log(data)
              //let listP2PBets = []
              for (let n = 0; n < result.length; n++) {

                await new Promise(next => {
                  this.state.multiBetContract.methods.seeMyP2PBetsDetail(this.state.defaultAccount, result[n]).call().then(result2 => {
                    //console.log(result2)
                    for (let n2 = 0; n2 < result2.length; n2++) {
                      //console.log(n2)
                      //listP2PBets.push(result2[n2])
                      let betLet=data[n]
                      betLet.p2pNum=result2[n2]
                      //listP2PBets.push(betLet)
                      console.log(n," ",result[n]," ",result2[n2])
                    }
                    next()
                  })
                })
              }
              //console.log(listP2PBets)

              /*for (let n = 0; n < result.length; n++) {
                data[n].p2pNum = listP2PBets[n]
              }*/
              console.log(data)
              for (let n = 0; n < data.length; n++) {
                await new Promise(next => {
                  console.log(n,data[n].id, this.state.defaultAccount, data[n].p2pNum)
                  this.state.multiBetContract.methods.didIWinSmthP2P(data[n].id, this.state.defaultAccount, data[n].p2pNum).call().then(async result3 => {
                    //console.log(result3)
                    console.log(result3)
                    if (result3 === true) {
                      data[n].betState = "W"
                    }
                    else {
                      this.state.multiBetContract.methods.didIWinSmthP2P(data[n].id, this.state.defaultAccount, data[n].p2pNum).call().then(result4 => {
                        if (result4 === true) {
                          data[n].betState = "W"
                        }
                        else {
                          data[n].betState = "L"

                        }
                      })
                    }
                    next()
                  })
                })
                await this.state.multiBetContract.methods.getNumberOfOptions(data[n].id).call().then(async options => {
                  //console.log(options)
                  let mises = []
                  for(let ind=0;ind<options;ind++){
                    mises.push(0)
                  }
                  //mises[1]="ezww"
                  //console.log(mises)

                  let optionCreator=0
                  await this.state.multiBetContract.methods.seeP2PBet(data[n].id, data[n].p2pNum).call().then(p2pBet => {
                    //console.log(bet.id)
                    //console.log(data[n].id, data[n].p2pNum)
                    optionCreator=parseInt(Object.values(p2pBet)[6])
                    //console.log(optionCreator)
                    if(Object.values(p2pBet)[1].toLowerCase()===this.state.defaultAccount.toLowerCase()){
                      mises[optionCreator]=Object.values(p2pBet)[2]
                      //console.log(Object.values(p2pBet)[2])
                      //console.log(mises)
                    }
                    else{mises[optionCreator]=0}
                    //console.log(mise)
                  }

                  )
                  for (let o = 0; o < options; o++) {
                    if(o===optionCreator){break}
                    //console.log(data[n].id, data[n].p2pNum,this.state.defaultAccount)
                    await this.state.multiBetContract.methods.getAmountBetted(data[n].id, data[n].p2pNum,this.state.defaultAccount).call().then(amountBetted=>
                      {
                        mises[o]=amountBetted
                      }
                      )
                  }
                  data[n] = Object.assign(data[n], { mise: mises })
                  //console.log(data[n])
                }
                );
              }
              this.setState({ myP2PBets: data });

            });
          }
        );
      })

    } catch (error) {
      console.log(error);
    }
  }
  approveUSDT(amount) {
    this.state.USDTContract.methods.approve("0x33844f8042D7980C7060067562a11b14F278018e", amount).send({ from: this.state.defaultAccount })
      .once('receipt', (receipt) => {
        console.log("approve success")
      })
  }
  approveMBT(amount) {
    this.state.mbtContract.methods
      .approve("0x33844f8042D7980C7060067562a11b14F278018e", amount)
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
                      <Link to="/basketball"><p id="listBetsTitle" className={this.state.vueTopBar === "listBets" ? "titleActive" : "titleInactive"}>List Bets</p></Link>
                      <Link to="/decentrabet"><p id="decentraBetTitle" className={this.state.vueTopBar === "decentraBet" ? "titleActive" : "titleInactive"}>Decentrabet</p></Link>
                      <Link to="/rankings"><p id="rankingsTitle" className={this.state.vueTopBar === "rankings" ? "titleActive" : "titleInactive"}>Rankings</p></Link>
                    </div>
                  </div>
                  <div id="topRight">

                    {//this.state.defaultAccount === undefined ? 
                    }
                    <Connecter closeOverlay={this.closeOverlay} switchOverlayMode={this.switchOverlayMode} disconnect={this.disconnect} connectWalletHandler={this.connectWalletHandler} defaultAccount={this.state.defaultAccount} errorMessage={this.state.errorMessage} connButtonText={this.state.connButtonText} connectWalletConnectHandler={this.connectWalletConnect} connectCoinBaseHandler={this.connectCoinBase}></Connecter>
                    {// : <p id="accountDisplay">{this.state.defaultAccount}</p>
                    }
                    <Authentification web3={this.state.web3} address={this.state.defaultAccount} setLogged={this.setLogged} logged={this.state.logged}></Authentification>


                    {/*<div id="allowancesMain">
                      <p>usdt allowed: {this.state.usdtAllowed}</p>
                      <p> mbt allowed: {this.state.mbtAllowed}</p>
                  </div>*/}
                    <div id="accountLink">
                      <Link to="/account"><img className="accountLogo" src={accountImage} alt="accountImage"></img></Link>
                    </div>
                  </div>


                </div>
                <div id="leftBar">
                  <div id="under2leftBar">
                    <div id="searchBar">
                      <input type="text"></input>
                    </div>
                    <div id="popular">
                      <p className="titleLeftBar">Popular</p>
                      <a className="leftBarA" href="/basketball">
                        <div className="optionsLeftBar">
                          <img src={basketBallImage} alt="basketBallImage" className="logoImage"></img>
                          <p className="optionsLeftBarP">Basketball</p></div>
                      </a>
                      <a className="leftBarA" href="/football">
                        <div className="optionsLeftBar">
                          <img src={footballImage} alt="footballImage" className="logoImage"></img>
                          <p className="optionsLeftBarP">Football</p>
                        </div>
                      </a>
                      <a className="leftBarA" href="/finance">
                        <div className="optionsLeftBar">
                          <img src={financeImage} alt="financeImage" className="logoImage"></img>
                          <p className="optionsLeftBarP">Finance</p>
                        </div>
                      </a>
                      <a className="leftBarA" href="/tennis">
                        <div className="optionsLeftBar">
                          <img src={tennisImage} alt="tennisImage" className="logoImage"></img>
                          <p className="optionsLeftBarP">Tennis</p>
                        </div>
                      </a>
                    </div>
                    <div id="categories">
                      <p className="titleLeftBar">All categories</p>
                      <a className="leftBarA" href="/basketball">
                        <div className="optionsLeftBar">
                          <img src={basketBallImage} alt="basketBallImage" className="logoImage"></img>
                          <p className="optionsLeftBarP">Basketball</p></div>
                      </a>
                      <a className="leftBarA" href="/football">
                        <div className="optionsLeftBar">
                          <img src={footballImage} alt="footballImage" className="logoImage"></img>
                          <p className="optionsLeftBarP">Football</p>
                        </div>
                      </a>
                      <a className="leftBarA" href="/finance">
                        <div className="optionsLeftBar">
                          <img src={financeImage} alt="financeImage" className="logoImage"></img>
                          <p className="optionsLeftBarP">Finance</p>
                        </div>
                      </a>
                      <a className="leftBarA" href="/tennis">
                        <div className="optionsLeftBar">
                          <img src={tennisImage} alt="tennisImage" className="logoImage"></img>
                          <p className="optionsLeftBarP">Tennis</p>
                        </div>
                      </a>
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
                  <div id={this.state.mainVue === "bet" ? "topRightBar" : "topRightBarElse"}>
                    {this.state.mainVue === "bet" ? <div id="underTopRightBar">
                      <button onClick={this.goPanier} className="topRightButton" id="panierP"><div id={this.state.rightBar === "betMaker" ? "activeRightBar" : "inactiveRightBar"} className="topRightDiv">Bet maker</div></button>
                      <button onClick={this.goMyBets} className="topRightButton" id="myBetsP"><div id={this.state.rightBar === "myBets" ? "activeRightBar" : "inactiveRightBar"} className="topRightDiv">My Bets</div></button>
                      <button onClick={this.goMyP2PBets} className="topRightButton" id="myP2PBetsP"><div id={this.state.rightBar === "myP2PBets" ? "activeRightBar" : "inactiveRightBar"} className="topRightDiv">My P2P Bets</div></button>

                    </div> : <p className="headerTitle">Hi young Crocodile !</p>}
                  </div>
                  <div id="superMidRightBar">
                    <div id="midRightBar">

                      {this.state.mainVue === "bet" ?
                        this.state.rightBar === "betMaker" ?
                          this.state.typeBet === 0 ? null
                            : <BetMaker setTypeBet={this.setTypeBet} setBetArgs={this.setBetArgs} betArgs={this.state.betArgs} typeBet={this.state.typeBet}></BetMaker>
                          : this.state.rightBar === "myBets" ?
                            <MyBets setMyBets={this.setMyBets} myBets={this.state.myBets} betContract={this.state.multiBetContract} address={this.state.defaultAccount}></MyBets>
                            : <MyP2PBets setMyBets={this.setMyP2PBets} myBets={this.state.myP2PBets} betContract={this.state.multiBetContract} address={this.state.defaultAccount}></MyP2PBets>
                        : <GetGains address={this.state.defaultAccount} betContract={this.state.multiBetContract}></GetGains>

                      }

                    </div>
                  </div>

                </div>

                {this.state.mainVue === "bet" ? <div id="bottomRightBar">
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
                  <button id="buttonApprover" onClick={(event) => { this.approve() }}><p id="approveP">APPROVE</p></button>
                  <button id="buttonBetter" onClick={(event) => { this.betFunction(this.state.betArgs) }}><p id="betP">BET</p></button>
                </div> : null}

              </div>}
            >
              <Route path="/" element={<LandingComponent mainVueSetter={this.setMainVue} vueSetter={this.setTopVue}></LandingComponent>} />
              <Route path="/basketball" element={<ListBet mainVueSetter={this.setMainVue} vueSetter={this.setTopVue}></ListBet>} />
              <Route path="/football" element={<ComingSoon ></ComingSoon>} />
              <Route path="/tennis" element={<ComingSoon ></ComingSoon>} />
              <Route path="/finance" element={<ComingSoon ></ComingSoon>} />
              <Route path="/bet/:betNum" element={<Bet mainVueSetter={this.setMainVue} socket={this.state.socket} logged={this.state.logged} betContract={this.state.multiBetContract} usdtContract={this.state.USDTContract} address={this.state.defaultAccount} mbtContract={this.state.mbtContract} amountToBet={this.state.amountToBet} setTypeBet={this.setTypeBet} setBetArgs={this.setBetArgs} balanceUSDT={this.state.balanceUSDT} setAmountBet={this.setAmountBet}></Bet>} />
              <Route path="/decentrabet" element={
              //<DecentraBet mainVueSetter={this.setMainVue} vueSetter={this.setTopVue} decentrabetContract={this.state.decentrabetContract} usdtContract={this.state.USDTContract} address={this.state.defaultAccount}></DecentraBet>
              <ComingSoon></ComingSoon>
              } />
              <Route path="/rankings" element={<Classement mainVueSetter={this.setMainVue} vueSetter={this.setTopVue} address={this.state.defaultAccount}></Classement>}></Route>
              {/*<Route path="/mybets" element={<MyBets mainVueSetter={this.setMainVue} betContract={this.state.multiBetContract} address={this.state.defaultAccount}></MyBets>}></Route>*/}
              <Route path="/account" element={<Account  myP2PBets={this.state.myP2PBets} myBets={this.state.myBets} betContract={this.state.multiBetContract} mainVueSetter={this.setMainVue} requestUpdater={this.state.requestUpdater} friendsUpdater={this.state.friendsUpdater} socket={this.state.socket} setLogged={this.setLogged} web3={this.state.web3} address={this.state.defaultAccount} logged={this.state.logged}></Account>}></Route>
              <Route path="/docs" element={<ComingSoon></ComingSoon>}></Route>
              <Route path="/getusdt" element={<USDTGetter web3={this.state.web3} address={this.state.defaultAccount}></USDTGetter>}></Route>
              <Route path="/*" element={<p>error</p>}></Route>
            </Route>

          </Routes>
        </BrowserRouter >
        <div id="overlay" className={this.state.overlayClass}></div>
        <div id="overlayTop" className={this.state.overlayClass}></div>

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
async function logout() {
  let url = "https://testnet.bettingcroc.com/logout";

  //console.log(url);
  let options = {
    method: "POST",
  };
  fetch(url, options).then((res) => {
    console.log("logged out");
  });
}