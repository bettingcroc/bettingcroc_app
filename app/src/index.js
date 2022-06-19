/* global BigInt */

import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import ListBet from "./components/ListBet/ListBet"
import Bet from "./components/Bet/Bet.jsx"
//import * as serviceWorker from './serviceWorker';
//window.location.replace('/home');
import React, { Component } from "react";
import Web3 from "web3";
import "./App.css";
import { DECENTRABET_ABI, DECENTRABET_ADDRESS, MBT_ABI, MBT_ADDRESS, MULTIBET_ABI, MULTIBET_ADDRESS, USDT_ABI, USDT_ADDRESS } from "./config";
import { Link, Outlet } from "react-router-dom";
import ConnectButton from "./components/ConnectButton/ConnectButton";
import homeImage from './home.png'
import DecentraBet from "./components/DecentraBet/DecentraBet";
import Classement from "./components/Classement/Classement";
import MyBets from "./components/MyBets/MyBets";
import Authentification from "./components/Authentification/Authentification";
import Account from "./components/Account/Account";

class App extends Component {
  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider);
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    const multiBetContract = new web3.eth.Contract(MULTIBET_ABI, MULTIBET_ADDRESS);
    const USDTContract = new web3.eth.Contract(USDT_ABI,USDT_ADDRESS);
    const mbtContract = new web3.eth.Contract(MBT_ABI,MBT_ADDRESS);
    const decentrabetContract = new web3.eth.Contract(DECENTRABET_ABI,DECENTRABET_ADDRESS);
    this.setState({ multiBetContract});
    this.setState({ USDTContract });
    this.setState({mbtContract});
    this.setState({decentrabetContract});
    this.setState({web3})
    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((result) => {
        this.accountChangedHandler(result[0]);
      });
    this.setState({ loading: false });
    
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
      usdtAllowed:null,
      mbtAllowed:null
    };
    this.accountChangedHandler = this.accountChangedHandler.bind(this);
    this.loadBlockchainData();
    this.allowancesSetter=this.allowancesSetter.bind(this)
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
  allowancesSetter(){
    try{
      console.log(this.state.defaultAccount)
      this.state.USDTContract.methods.allowance(this.state.defaultAccount,MULTIBET_ADDRESS).call().then((result)=>{this.setState({usdtAllowed:parseFloat(result) / decimalsConverter(10)});console.log("usdt allowed "+result)})
    }
    catch(error){
      console.log(error)
    }
    try{
      console.log(this.state.defaultAccount)
      this.state.mbtContract.methods.allowance(this.state.defaultAccount,MULTIBET_ADDRESS).call().then((result)=>{this.setState({mbtAllowed:parseFloat(result) / decimalsConverter(10)});console.log("mbt allowed "+result)})
    }
    catch(error){
      console.log(error)
    }
  }
  render() {
    return (
      <BrowserRouter>
    <Routes>
      <Route path="/" element={
      <div>
        <div className="container-fluid">
          <div className="row">
          <Link to="/"><img src={homeImage} alt="homeImage"></img></Link>
            <main role="main" className="col-lg-12 d-flex justify-content-end">
            <ConnectButton connectWalletHandler={this.connectWalletHandler} defaultAccount={this.state.defaultAccount} errorMessage={this.state.errorMessage} connButtonText={this.state.connButtonText}></ConnectButton>
            <h4>usdt allowed: {this.state.usdtAllowed}</h4>
            <br></br>
            <h4> mbt allowed: {this.state.mbtAllowed}</h4>
            </main>
          </div>
          <Link to="/basketball"><h3>ListBets</h3></Link>
          <Link to="/decentrabet"><h3>Decentrabet</h3></Link>
          <Link to="/classement"><h3>Classement</h3></Link>
          <Link to="/mybets"><h3>myBets</h3></Link>
          <Link to="/authentification"><h3>authentification</h3></Link>
          <Link to="/account"><h3>account</h3></Link>
        </div>
        <Outlet></Outlet>
      </div>}
      >
        <Route path="/basketball" element={<ListBet ></ListBet>}/>
        <Route path="/bet/:id" element=   {<Bet betContract={this.state.multiBetContract} usdtContract={this.state.USDTContract} address={this.state.defaultAccount} mbtContract={this.state.mbtContract} ></Bet>}  />
        <Route path="/decentrabet" element={<DecentraBet  decentrabetContract={this.state.decentrabetContract} usdtContract={this.state.USDTContract} address={this.state.defaultAccount}></DecentraBet>}/>
        <Route path="/classement" element={<Classement address={this.state.defaultAccount}></Classement>}></Route>
        <Route path="/mybets" element={<MyBets betContract={this.state.multiBetContract} address={this.state.defaultAccount}></MyBets>}></Route>
        <Route path="/authentification" element={<Authentification web3={this.state.web3} address={this.state.defaultAccount}></Authentification>}></Route>
        <Route path="/account" element={<Account address={this.state.defaultAccount}></Account>}></Route>
      </Route>

    </Routes>
  </BrowserRouter>
      
    );
  }
}
ReactDOM.render(<App></App>
  ,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
/*  createTask(content) {
    this.setState({ loading: true });
    this.state.todoList.methods
      .createTask(content)
      .send({ from: this.state.account })
      .once("receipt", (receipt) => {
        this.setState({ loading: false });
      });
  }*/
  function decimalsConverter(numberToConvert){
    return Math.pow(numberToConvert,18)
  }
  function weiconvert(number) { return BigInt(number * decimalsConverter(10)); }