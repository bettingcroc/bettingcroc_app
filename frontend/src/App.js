/* global BigInt */
import { io } from 'socket.io-client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import "./App.css";
import "./index.css";
import { ListBet, Bet, DecentraBet, Classement, Account, ComingSoon, LandingComponent, USDCGetter, Base, NotificationsMobile, LeagueBet } from "./components"
import { DECENTRABET_ABI, DECENTRABET_ADDRESS, BCROC_ABI, BCROC_ADDRESS, MULTIBET_ABI, MULTIBET_ADDRESS, USDC_ABI, USDC_ADDRESS } from "./configWebApp";
import { EthereumProvider } from '@walletconnect/ethereum-provider'
import CoinbaseWalletSDK from '@coinbase/wallet-sdk'
import { APP_NAME, APP_LOGO_URL, DEFAULT_ETH_JSONRPC_URL, chainId, MY_SERVER } from "./consts"
import { toast } from 'react-toastify';
import { useNotificationCenter } from "react-toastify/addons/use-notification-center"

/*const coinbaseWallet = new CoinbaseWalletSDK({
  appName: APP_NAME,
  appLogoUrl: APP_LOGO_URL,
  darkMode: false
})
const ethereum = coinbaseWallet.makeWeb3Provider(DEFAULT_ETH_JSONRPC_URL, DEFAULT_CHAIN_ID)*/



function App() {
    const [loading, setLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState("")
    const [defaultAccount, setDefaultAccount] = useState()
    const [connButtonText, setConnButtonText] = useState("Connect Wallet")
    const [usdcAllowed, setUsdcAllowed] = useState()
    const [bcrocAllowed, setBcrocAllowed] = useState()
    const [amountToBet, setAmountToBet] = useState(1)
    const [rightBar, setRightBar] = useState("betMaker")
    const [typeBet, setTypeBet] = useState(0)
    const [betArgs, setBetArgs] = useState(null)
    const [vueTopBar, setVueTopBar] = useState()
    const [logged, setLogged] = useState(false)
    const [overlayClass, setOverlayClass] = useState("inactiveOverlay")
    const [mainVue, setMainVue] = useState()
    const [myBets, setMyBets] = useState([])
    const [myP2PBets, setMyP2PBets] = useState([])
    const [socket, setSocket] = useState(io(MY_SERVER + ""))
    const [requestUpdater, setRequestUpdater] = useState()
    const [friendsUpdater, setFriendsUpdater] = useState()
    const [theme, setTheme] = useState(localStorage.getItem("theme") === "dark" ? "dark" : "light")
    const [menuMobile, setMenuMobile] = useState("menuHidden")
    const [web3, setWeb3] = useState(new Web3(DEFAULT_ETH_JSONRPC_URL))
    const [multiBetContract, setMultiBetContract] = useState()
    const [USDCContract, setUSDCContract] = useState()
    const [BCROCContract, setBCROCContract] = useState()
    const [decentrabetContract, setDecentrabetContract] = useState()
    const [balanceUSDC, setBalanceUSDC] = useState()
    const [balanceBCROC, setBalanceBCROC] = useState()
    const [notificationsServer, setNotificationsServer] = useState([])
    //notificationCenter
    const [unread, setUnread] = useState(0)
    var {
        notifications,
        clear,
        markAllAsRead,
        markAsRead,
        add,
        update,
        remove,
        find,
        sort,
        unreadCount
    } = useNotificationCenter()

    useEffect(() => {
        let unread = 0
        for (let n = 0; n < notificationsServer.length; n++) {
            let notif = notificationsServer[n]
            console.log(JSON.parse(JSON.stringify(notif)))
            console.log(notif.read)
            console.log(notif.read === 0)
            if (notif.read === 0) {
                console.log("unread")
                unread++
            }
        }
        setUnread(unread)
    }, [notificationsServer])

    useEffect(() => {
        fetch(MY_SERVER + "/api/myrequests_unread", { method: "GET", credentials: 'include' }).then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {
                    setUnread(data.unread)
                })
            }
        })
    }, [logged])

    useEffect(() => {
        updateNotificationsFromServer()
    }, [logged])


    async function testLogin() {
        let url = MY_SERVER + "/api/testlogin";
        let options = {
            method: "GET",
            credentials: 'include'
        };
        return new Promise((resolve) => {
            fetch(url, options).then((res) => {
                res.json().then((data) => {
                    if (data.isLogged === true) { setLogged(true) }
                    else { setLogged(false) }
                    resolve(data.isLogged)
                })
            });
        })

    }
    function setAllNotifsRead() {
        setTimeout(() => {
            for (let n = 0; n < notifications.length; n++) {
                let notif = notifications[n]
                notif.data.read = "1"
            }
            console.log("setAllNotifsRead")
        }, 5000);


    }
    function updateNotificationsFromServer() {
        //console.log("updating notifications")
        fetch(MY_SERVER + "/api/myrequests", { method: "GET", credentials: 'include' }).then((res) => {
            if (res.status === 200) {
                res.json().then((data) => {
                    let notificationsUpadted = []
                    for (let n = data.length - 1; n >= 0; n--) {
                        let notif = data[n]
                        console.log(notif)
                        let body = JSON.parse(notif.body)
                        let content = notif.header === "newFriend" ? notif.address1 + " wants to be your friend" : notif.pseudo !== undefined && notif.header === "betInvitation" ? notif.pseudo : null
                        notificationsUpadted.push(notif)
                        //add({ "id": notif.id, "content": content, "data": { "inCenter": true, "body": body, "read": notif.read } })
                    }
                    setNotificationsServer(notificationsUpadted)
                });
            }
        });
    }

    useEffect(() => {
        socket.on('connect', () => {
            //console.log("connected to server with " + socket.id); if (defaultAccount !== undefined) { socket.emit('joinRoom', defaultAccount.toLowerCase()) }
        })
        socket.on('ReceivedFriendRequest', (from) => {
            console.log("ReceivedFriendRequest from" + from)
            toast.info(from + " wants to be your friend", {
                position: toast.POSITION.TOP_CENTER,
                icon: "👥",
                data: { "inCenter": true, "read": "0" }
            });
            updateNotificationsFromServer()
            setRequestUpdater(Math.random())
        })
        socket.on('ReceivedBetInvitation', (addressFrom, pseudoFrom) => {
            if (window.innerWidth <= 1080) {
                addressFrom = addressFrom.substring(0, 5) + "..." + addressFrom.substring(39)
            }
            let from = pseudoFrom !== undefined ? pseudoFrom : addressFrom
            console.log("ReceivedBetInvitation from" + from)
            /*fetch(MY_SERVER + "/api/score/" + from, { method: "GET", credentials: 'include' }).then((res) => {
                res.json().then((data) => {
                })
            })*/
            toast.info(from + " wants you to bet on something...", {
                position: toast.POSITION.TOP_CENTER,
                icon: "📨",
                data: { "inCenter": true, "read": "0" }
            });
            updateNotificationsFromServer()
            setRequestUpdater(Math.random())
        })
        socket.on('newFriendAcceptedToSender', (from) => {
            console.log("newFriendAcceptedToSender from " + from)
            updateNotificationsFromServer()
            setFriendsUpdater(Math.random())
        })
        socket.on('connect_error', () => {
            setTimeout(() => socket.connect(), 5000)
        })
        if (defaultAccount !== undefined) {
            console.log("joiningRoom " + defaultAccount)
            socket.emit('joinRoom', defaultAccount.toLowerCase())
        }
        socket.on('disconnect', () => console.log('server disconnected'))
        initConnection()

        return () => {
            // cleaning up the listeners here
        }
    }, []);
    useEffect(() => {
        if (defaultAccount !== undefined && BCROCContract !== undefined && USDCContract !== undefined) {
            allowancesSetter()
        }
    }, [defaultAccount, BCROCContract, USDCContract])
    useEffect(() => {
        updateMyBets()
        updateMyP2PBets()
        if (defaultAccount !== undefined) {
            //console.log("joiningRoom " + defaultAccount)
            socket.emit('joinRoom', defaultAccount.toLowerCase())
        }
    }, [defaultAccount])
    async function initConnection() {
        let walletType = localStorage.getItem("walletType")
        testLogin().then((logged) => {
            if (walletType === "Metamask") {
                if (web3.givenProvider) {
                    web3.setProvider(Web3.givenProvider)
                }
            }
            else if (walletType === "WC") {
                if (localStorage.getItem("WCM_VERSION") !== null) {
                    //  Create WalletConnect Provider
                    let initWC = async () => {
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
                        web3.setProvider(provider)
                        web3.eth.getAccounts().then((res) => { accountChangedHandler(res[0]) })
                    }
                    initWC()

                }
            }
            if (!logged) {
                disconnect()
            }
            else{
                let getAccounts = async () => {
                    const accounts = await web3.eth.getAccounts();
                    if (accounts[0] !== undefined) {
                        setDefaultAccount(accounts[0]);
                    }
                }
                getAccounts()
            }
            /*
        else if (walletType === "Coinbase") {
          try {
            ethereum.request({ method: 'eth_requestAccounts' }).then((result) => {
              web3.setProvider(Web3.givenProvider)
              this.accountChangedHandler(result[0]);
              console.log(result[0])
              //this.setState({ connButtonText: "Wallet Connected" });
              //getAccountBalance(result[0]);
            })
              .catch((error) => {
                //this.setState({ errorMessage: error.message });
              });
            // Initialize a Web3 object
            //console.log(web3)
            web3.setProvider(ethereum)
          }
          catch (e) {
          }
        }*/

            
            setMultiBetContract(new web3.eth.Contract(MULTIBET_ABI, MULTIBET_ADDRESS));
            setUSDCContract(new web3.eth.Contract(USDC_ABI, USDC_ADDRESS));
            setBCROCContract(new web3.eth.Contract(BCROC_ABI, BCROC_ADDRESS));
            setDecentrabetContract(new web3.eth.Contract(DECENTRABET_ABI, DECENTRABET_ADDRESS));
            //this.accountChangedHandler(accounts[0])
            setLoading(false);
            if (defaultAccount !== undefined) {
                updateMyBets()
                updateMyP2PBets()
            }
            if (window.ethereum) {
                if (window.ethereum.networkVersion != 97) {
                }
            }
            if (window.ethereum) {
                window.ethereum.on('chainChanged', () => {
                    window.location.reload();
                })
                window.ethereum.on('accountsChanged', () => {
                    logout()
                })
            }

        })

    }
    async function chainChanger() {
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
                            rpcUrls: [DEFAULT_ETH_JSONRPC_URL]

                        }
                    ]
                });
            }
        }
    }





    function accountChangedHandler(newAccount) {
        console.log("logging " + newAccount)
        setDefaultAccount(newAccount);
        allowancesSetter()
        if (defaultAccount !== undefined) { socket.emit('joinRoom', defaultAccount.toLowerCase()) }
    };


    function connectCoinBase() { }
    /*
     
    connectCoinBase = async () => {
    
    
    
    ethereum.request({ method: 'eth_requestAccounts' }).then((result) => {
      web3.setProvider(Web3.givenProvider)
      console.log(result[0])
    
      this.accountChangedHandler(result[0]);
      this.setState({ connButtonText: "Wallet Connected" });
      localStorage.setItem("walletType", "Coinbase")
    
      //getAccountBalance(result[0]);
    })
      .catch((error) => {
        this.setState({ errorMessage: error.message });
      });
    // Initialize a Web3 object
    console.log(web3)
    web3.setProvider(ethereum)
    }*/
    async function logout() {
        let url = MY_SERVER + "/logout";
        let options = { method: "POST", credentials: 'include' };
        fetch(url, options).then((res) => {
            if (res.status === 200) {
                setLogged(false)
            }
        });
    }
    function disconnect() {
        logout()
        setDefaultAccount(undefined)
        web3.setProvider(DEFAULT_ETH_JSONRPC_URL)
        let theme = localStorage.getItem("theme")
        localStorage.clear();
        localStorage.setItem("theme", theme)

        setMyBets([])
        setMyP2PBets([])
    }
    function allowancesSetter() {
        try {
            USDCContract.methods.allowance(defaultAccount, MULTIBET_ADDRESS).call().then((result) => {
                setUsdcAllowed(parseFloat(result) / decimalsConverter(10)); //console.log("usdc allowed " + result) 
            })
        }
        catch (error) {
            //console.log(error)
        }
        try {
            BCROCContract.methods.allowance(defaultAccount, MULTIBET_ADDRESS).call().then((result) => {
                setBcrocAllowed(parseFloat(result) / decimalsConverter(10));// console.log("bcroc allowed " + result)
            })
        }
        catch (error) {
            //console.log(error)
        }
        try {
            USDCContract.methods.balanceOf(defaultAccount).call().then((result) => {
                setBalanceUSDC(parseFloat(result) / decimalsConverter(10)); //console.log("usdc balance " + result)
            })
        }
        catch (error) {
            //console.log(error)
        }
        try {
            BCROCContract.methods.balanceOf(defaultAccount).call().then((result) => {
                setBalanceBCROC(parseFloat(result) / decimalsConverter(10)); //console.log("bcroc balance " + result)
            })
        }
        catch (error) {
            //console.log(error)
        }
    }
    function goMyBets() {
        setRightBar("myBets")
    }
    function goPanier() {
        setRightBar("betMaker")
    }
    function goMyP2PBets() {
        setRightBar("myP2PBets")
    }
    function updateTypeBet(newTypeBet) {
        setTypeBet(newTypeBet)
        //console.log(typeBet)
        if (newTypeBet !== 0) { goPanier() }
    }
    function updateMainVue(newVue) {
        if (newVue) {
            setMainVue(newVue)
            closeMenuMobile()
        }
    }
    function closeMenuMobile() {
        setMenuMobile("menuHidden")
        document.body.style.overflow = '';

    }

    function switchOverlayMode() {
        overlayClass === "inactiveOverlay" ? setOverlayClass("overlayActive") : setOverlayClass("inactiveOverlay")
    }
    function closeOverlay() {
        setOverlayClass("inactiveOverlay")
    }
    function approve() {
        if (typeBet === 1 || typeBet === 3) {
            approveUSDC(betArgs.amountToBet)
        }
        if (typeBet === 2) {
            approveUSDC(betArgs.amountToBet)
            approveBCROC(betArgs.amountToBet)
        }
    }
    const switchTheme = () => {
        if (theme === "light") {
            setTheme("dark")
            localStorage.setItem("theme", "dark")
        }
        else {
            setTheme("light")
            localStorage.setItem("theme", "light")
        }
    }
    function updateMyBets() {
        let disconnectedFunction = false
        if (multiBetContract === undefined || defaultAccount === undefined) {
            return
        }
        try {
            console.log("asking bets")
            multiBetContract.methods.getMyBetsUser(defaultAccount).call().then(result => {
                console.log(result)
                fetch(MY_SERVER + "/api/mybets/", {
                    method: "POST"
                    , body: JSON.stringify({ listBets: result })
                    , headers: {
                        "Content-Type": "application/json",
                    }
                }).then(
                    (res) => {
                        res.json().then(async (data) => {
                            data = data.reverse()
                            setMyBets(JSON.parse(JSON.stringify(data)))
                            for (let b in data) {
                                let bet = data[b]
                                if (bet.status === 0 || bet.status === 1) {
                                    bet = Object.assign(bet, { betState: "🕗" })
                                    setMyBets(JSON.parse(JSON.stringify(data)))
                                }
                                else if (bet.status === 2) {
                                    try {
                                        await multiBetContract.methods.getHasUserWon(defaultAccount, bet.id).call().then(
                                            async (res1) => {
                                                //console.log("call3")
                                                if (res1 === true) {
                                                    bet = Object.assign(bet, { betState: "W" })
                                                    setMyBets(JSON.parse(JSON.stringify(data)))

                                                }
                                                else {
                                                    try {
                                                        await multiBetContract.methods.getHasUserWon(defaultAccount, bet.id).call().then(
                                                            (res2) => {
                                                                //console.log("call4")

                                                                if (res2 === true) {
                                                                    bet = Object.assign(bet, { betState: "W" })

                                                                }
                                                                else {
                                                                    bet = Object.assign(bet, { betState: "L" })
                                                                }
                                                                setMyBets(JSON.parse(JSON.stringify(data)))

                                                            })
                                                    }
                                                    catch (error) { //console.log(error); 
                                                        disconnectedFunction = true; return
                                                    }
                                                }
                                            }
                                        )
                                    }
                                    catch (e) {
                                        console.log(e)
                                            ; disconnectedFunction = true;
                                    }
                                }
                                else {
                                    bet = Object.assign(bet, { betState: "✖️" })
                                    setMyBets(JSON.parse(JSON.stringify(data)))

                                }
                                await multiBetContract.methods.getBetOptions(bet.id).call().then(async options => {
                                    let mises = []
                                    for (let o = 0; o < options; o++) {
                                        try {
                                            await multiBetContract.methods.getAmountInPoolFromUserEnd(bet.id, o, defaultAccount).call().then(mise => {
                                                //console.log(bet.id)
                                                mises.push(mise)
                                                //console.log(mise)
                                            }

                                            )
                                        }
                                        catch (error) {
                                            console.log(error);
                                            disconnectedFunction = true; return
                                        }
                                    }
                                    bet = Object.assign(bet, { mise: mises })
                                    setMyBets(JSON.parse(JSON.stringify(data)))

                                }
                                );
                                //console.log(bet)
                            }

                            if (disconnectedFunction === false) { setMyBets(data) }

                        });
                    }
                );
            })

        } catch (error) {
            console.log(error);

            disconnectedFunction = true;
            return
        }
    }
    function updateMyP2PBets() {

        let disconnectedFunction = false
        if (multiBetContract === undefined || defaultAccount === undefined) {
            return
        }
        try {
            console.log("asking p2pbets")
            multiBetContract.methods.seeMyP2PBetsUser(defaultAccount).call().then(async result => {
                fetch(MY_SERVER + "/api/mybets/", {
                    method: "POST"
                    , body: JSON.stringify({ listBets: result })
                    , headers: {
                        "Content-Type": "application/json",
                    }
                }).then(
                    (res) => {
                        res.json().then(async (data) => {
                            data = data.reverse()
                            setMyP2PBets(JSON.parse(JSON.stringify(data)))
                            result = result.filter((element, index) => {
                                return result.indexOf(element) === index;
                            });
                            for (let n = 0; n < result.length; n++) {
                                await new Promise(next => {
                                    try {
                                        multiBetContract.methods.seeMyP2PBetsUserDetail(defaultAccount, result[n]).call().then(p2pNumbers => {
                                            for (let p = 0; p < p2pNumbers.length; p++) {
                                                let iterationStatus = true
                                                for (let m = 0; m < data.length; m++) {
                                                    if (iterationStatus) {
                                                        if (data[m].id === result[n] && data[m].p2pNum === undefined) {
                                                            //console.log("setting p2p " + p2pNumbers[p])
                                                            data[m].p2pNum = p2pNumbers[p]
                                                            iterationStatus = false
                                                            //console.log(data[n])
                                                        }
                                                    }
                                                }
                                            }
                                            next()
                                        })
                                    }
                                    catch (error) {
                                        console.log(error);
                                        disconnectedFunction = true; return;
                                    }
                                })
                            }
                            for (let n = 0; n < data.length; n++) {
                                await new Promise(next => {
                                    try {
                                        //console.log(n, data[n].id, defaultAccount, data[n].p2pNum)
                                        multiBetContract.methods.getHasUserWonP2P(defaultAccount, data[n].id, data[n].p2pNum).call().then(async result3 => {
                                            //console.log(result3)
                                            if (result3 === true) {
                                                data[n].betState = "W"
                                            }
                                            else {
                                                try {
                                                    multiBetContract.methods.getDead(data[n].id).call().then(result4 => {
                                                        if (result4 === true) {
                                                            data[n].betState = "L"
                                                        }
                                                        else {
                                                            data[n].betState = "🕗"
                                                        }
                                                    })
                                                }
                                                catch (error) {
                                                    console.log(error);
                                                    disconnectedFunction = true; return
                                                }
                                            }
                                            setMyP2PBets(JSON.parse(JSON.stringify(data)))
                                            next()
                                        })
                                    }
                                    catch (error) {
                                        console.log(error);
                                        disconnectedFunction = true; return
                                    }
                                })
                                await multiBetContract.methods.getBetOptions(data[n].id).call().then(async options => {
                                    //console.log(options)
                                    let mises = []
                                    for (let ind = 0; ind < options; ind++) {
                                        mises.push(0)
                                    }
                                    //console.log(mises)
                                    let optionCreator = 0
                                    try {
                                        await multiBetContract.methods.getP2PBet(data[n].id, data[n].p2pNum).call().then(p2pBet => {
                                            //console.log(bet.id)
                                            //console.log(data[n].id, data[n].p2pNum)
                                            optionCreator = parseInt(Object.values(p2pBet)[6])
                                            //console.log(optionCreator)
                                            if (Object.values(p2pBet)[1].toLowerCase() === defaultAccount.toLowerCase()) {
                                                mises[optionCreator] = Object.values(p2pBet)[2]
                                                //console.log(Object.values(p2pBet)[2])
                                                //console.log(mises)
                                            }
                                            else { mises[optionCreator] = 0 }
                                            //console.log(mise)
                                        }
                                        )
                                    }
                                    catch (error) {
                                        console.log(error);
                                        disconnectedFunction = true;
                                        return
                                    }
                                    for (let o = 0; o < options; o++) {
                                        if (o === optionCreator) { break }
                                        //console.log(data[n].id, data[n].p2pNum,defaultAccount)
                                        try {
                                            await multiBetContract.methods.getAmountBettedFromUserP2P(data[n].id, data[n].p2pNum, defaultAccount).call().then(amountBetted => {
                                                mises[o] = amountBetted
                                            }
                                            )
                                        }
                                        catch (error) {
                                            console.log(error);
                                            disconnectedFunction = true;
                                            return
                                        }
                                    }
                                    setMyP2PBets(JSON.parse(JSON.stringify(data)))
                                    data[n] = Object.assign(data[n], { mise: mises })
                                    //console.log(data[n])
                                }
                                );
                            }
                            if (disconnectedFunction === false) {
                                setMyP2PBets(data)
                            } //console.log("data setted ")
                            //console.log(data)

                        });
                    }
                );
            })

        } catch (error) {
            console.log(error);
            disconnectedFunction = true;
        }
    }
    function approveUSDC(amount) {
        let approveToast = toast.loading("Approving USDC...", { closeButton: true })
        console.log(MULTIBET_ADDRESS, amount, defaultAccount)
        USDCContract.methods
            .approve(MULTIBET_ADDRESS, amount)
            .send({ from: defaultAccount })
            .once('receipt', (receipt) => {
                console.log("approve success")
                toast.update(approveToast, { render: "USDC approved", type: "success", isLoading: false, closeButton: true, autoClose: 7000 });
            })
            .once('error', (error) => {
                console.log(error)
                toast.update(approveToast, { render: "Error " + error.code, type: "error", isLoading: false, closeButton: true, autoClose: 7000 });
            })
    }
    function approveBCROC(amount) {
        let approveToast = toast.loading("Approving BCROC...")
        BCROCContract.methods
            .approve(MULTIBET_ADDRESS, amount)
            .send({ from: defaultAccount })
            .once('receipt', (receipt) => {
                console.log("approve success")
                toast.update(approveToast, { render: "BCROC approved", type: "success", isLoading: false, closeButton: true, autoClose: 7000 });
            })
            .once('error', (error) => {
                console.log(error)
                toast.update(approveToast, { render: "Error " + error.code, type: "error", isLoading: false, closeButton: true, autoClose: 7000 });
            })
    }
    function betFunction() {
        console.log("bet")
        if (typeBet === 1) {
            betOnThisOption(betArgs.amountToBet)
        }
        if (typeBet === 2) {
            createP2PBet(
                betArgs.amountToBet,
                betArgs.cote,
                betArgs.selectedOption,
                betArgs.authorized
            );
        }
        if (typeBet === 3) {
            betOnThisOptionP2P(betArgs.amountToBet)
        }
    }
    function betOnThisOption(amount) {
        let betToast = toast.loading("Betting...")
        multiBetContract.methods
            .betOn(betArgs.betNumber, betArgs.optionNumber, amount)
            .send({ from: defaultAccount })
            .once('receipt', (receipt) => {
                console.log("bet success")
                setTypeBet(0)
                toast.update(betToast, { render: "betOnThisOption success", type: "success", isLoading: false, closeButton: true, autoClose: 7000 });
            })
            .once('error', (error) => {
                console.log(error)
                toast.update(betToast, { render: "Error " + error.code, type: "error", isLoading: false, closeButton: true, autoClose: 7000 });
            })
    }
    function betOnThisOptionP2P(amount) {
        let betToast = toast.loading("Betting...")
        try {
            multiBetContract.methods
                .joinP2PBet(
                    betArgs.betNumber,
                    betArgs.betNumberP2P,
                    amount
                )
                .send({ from: defaultAccount })
                .once('receipt', (receipt) => {
                    console.log("bet success")
                    setTypeBet(0)
                    toast.update(betToast, { render: "betOnThisOptionP2P success", type: "success", isLoading: false, closeButton: true, autoClose: 7000 });
                })
                .once('error', (error) => {
                    console.log(error)
                    toast.update(betToast, { render: "Error " + error.code, type: "error", isLoading: false, closeButton: true, autoClose: 7000 });
                })
        } catch (error) {
            console.log(error);
        }
    }
    function createP2PBet(amount, cote, option, authorized) {
        if (authorized === undefined) {
            authorized = [];
        }
        else {
            authorized = authorized.split(',')
        }
        console.log(amount, cote, option, authorized);
        let amountToEnter = (cote - 1) * (parseFloat(amount) / decimalsConverter(10));
        amountToEnter = weiconvert(parseFloat(amountToEnter.toPrecision(7)));
        let betToast = toast.loading("Creating bet...")

        multiBetContract.methods
            .createP2PBet(
                amount,
                amountToEnter,
                betArgs.betNumber,
                option,
                authorized
            )
            .send({ from: defaultAccount })
            .once('receipt', (receipt) => {
                console.log("new bet created")
                toast.update(betToast, { render: "createP2PBet success", type: "success", isLoading: false, closeButton: true });
            })
            .once('error', (error) => {
                console.log(error)
                toast.update(betToast, { render: "Error " + error.code, type: "error", isLoading: false, closeButton: true });
            })
    }
    function joinBetRoom(betNumber) {
        socket.emit('joinRoom', "scoreBet" + betNumber)
        console.log("joinRoom " + "scoreBet" + betNumber)
    }
    function leaveBetRoom(betNumber) {
        socket.emit('leaveRoom', "scoreBet" + betNumber)
        console.log("leaveRoom " + "scoreBet" + betNumber)
    }
    function switchMenuMobile() {
        if (menuMobile !== "menu") {
            setMenuMobile("menu");
            document.body.style.overflow = 'hidden';
            console.log("switching menu mobile to open : " + menuMobile)
        } else {
            closeMenuMobile()
            console.log("switching menu mobile to closed")

        }
    }

    return (

        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Base testLogin={testLogin} setFriendsUpdater={setFriendsUpdater} updateNotificationsFromServer={updateNotificationsFromServer} socket={socket} balanceUSDC={balanceUSDC} balanceBCROC={balanceBCROC} accountChangedHandler={accountChangedHandler} theme={theme} goPanier={goPanier} goMyBets={goMyBets} goMyP2PBets={goMyP2PBets} setMyP2PBets={setMyP2PBets} setMyBets={setMyBets} setTypeBet={updateTypeBet} approve={approve} betContract={multiBetContract} mainVue={mainVue} myP2PBets={myP2PBets} myBets={myBets} setBetArgs={setBetArgs} betFunction={betFunction} vueTopBar={vueTopBar} overlayClass={overlayClass} defaultAccount={defaultAccount} rightBar={rightBar} errorMessage={errorMessage} switchTheme={switchTheme} closeOverlay={closeOverlay} switchOverlayMode={switchOverlayMode} disconnect={disconnect} connButtonText={connButtonText} connectCoinBaseHandler={connectCoinBase} web3={web3} setLogged={setLogged} typeBet={typeBet} betArgs={betArgs} menuMobile={menuMobile} closeMenuMobile={closeMenuMobile} switchMenuMobile={switchMenuMobile} logged={logged} unread={unread} setUnread={setUnread} notifications={notificationsServer} setAllNotifsRead={setAllNotifsRead}></Base>}>
                    <Route path="/" element={<LandingComponent mainVueSetter={updateMainVue} vueSetter={setVueTopBar} theme={theme}></LandingComponent>} />
                    <Route path="/sportbets" element={<ListBet mainVueSetter={updateMainVue} vueSetter={setVueTopBar} theme={theme}></ListBet>} />
                    <Route path="/bet" element={<Bet mainVueSetter={updateMainVue} socket={socket} logged={logged} betContract={multiBetContract} usdcContract={USDCContract} address={defaultAccount} BCROCContract={BCROCContract} amountToBet={amountToBet} setTypeBet={updateTypeBet} setBetArgs={setBetArgs} balanceUSDC={balanceUSDC} setAmountBet={setAmountToBet} joinBetRoom={joinBetRoom} leaveBetRoom={leaveBetRoom} theme={theme}></Bet>} />
                    <Route path="/leaguebet" element={<LeagueBet mainVueSetter={updateMainVue} socket={socket} logged={logged} betContract={multiBetContract} usdcContract={USDCContract} address={defaultAccount} BCROCContract={BCROCContract} amountToBet={amountToBet} setTypeBet={updateTypeBet} setBetArgs={setBetArgs} balanceUSDC={balanceUSDC} setAmountBet={setAmountToBet} joinBetRoom={joinBetRoom} leaveBetRoom={leaveBetRoom} theme={theme}></LeagueBet>} />
                    {/*<Route path="/decentrabet" element={<DecentraBet toast={toast} mainVueSetter={updateMainVue} vueSetter={setVueTopBar} decentrabetContract={decentrabetContract} usdcContract={USDCContract} address={defaultAccount} theme={theme}></DecentraBet>} />*/}
                    <Route path="/rankings" element={<Classement mainVueSetter={updateMainVue} vueSetter={setVueTopBar} address={defaultAccount} theme={theme} logged={logged}></Classement>}></Route>
                    <Route path="/account" element={<Account updateNotificationsFromServer={updateNotificationsFromServer} vueSetter={setVueTopBar} closeMenuMobile={updateMainVue} myP2PBets={myP2PBets} myBets={myBets} betContract={multiBetContract} mainVueSetter={updateMainVue} requestUpdater={requestUpdater} friendsUpdater={friendsUpdater} socket={socket} setLogged={setLogged} web3={web3} address={defaultAccount} logged={logged} theme={theme} switchTheme={switchTheme} ></Account>}></Route>
                    <Route path="/docs" element={<ComingSoon mainVueSetter={updateMainVue}></ComingSoon>}></Route>
                    <Route path="/notifications" element={<NotificationsMobile mainVueSetter={updateMainVue} vueSetter={setVueTopBar} theme={theme} unread={unread} setUnread={setUnread} notifications={notifications} setAllNotifsRead={setAllNotifsRead}></NotificationsMobile>}></Route>
                    <Route path="/getusdc" element={<USDCGetter web3={web3} address={defaultAccount}></USDCGetter>}></Route>
                    <Route path="/*" element={<p>error</p>}></Route>
                </Route>

            </Routes>
        </BrowserRouter >



    );

}




function decimalsConverter(numberToConvert) {
    return Math.pow(numberToConvert, 18)
}
function weiconvert(number) { return BigInt(number * decimalsConverter(10)); }


export default App