import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Outlet } from 'react-router-dom';
import { hamburgerWhiteImage, hamburgerImage, sportsInactive, sportsLight, sportsDark, rankingInactive, rankingLight, rankingDark, decentraBetDark, decentraBetInactive, decentraBetLight, notificationsLight, notificationsDark, notificationsInactive } from "../../images"
import { cssIdentifiers, } from "../../consts"
import { MyP2PBets, MyBets, BetMaker, GetGains, BetterMobile, BetterBottomRight } from "../../components"
import TopBar from "../TopBar/TopBar"
import { useEffect } from 'react'
import LeftBar from '../LeftBar/LeftBar';
import MenuMobile from '../MenuMobile/MenuMobile';
import { ToastContainer, toast } from 'react-toastify';
import "./Base.css"
import "react-toastify/dist/ReactToastify.css";
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import CircularProgress from '@mui/material/CircularProgress';

const Base = (props) => {
    const [isTwitterLoading, setTwitterLoading] = useState(true);
    return (
        <div id={props.theme === "light" ? "bettingcroc" : "bettingcrocDark"}>
            <TopBar balanceUSDT={props.balanceUSDT} balanceMBT={props.balanceMBT} unread={props.unread} setUnread={props.setUnread} notifications={props.notifications} setAllNotifsRead={props.setAllNotifsRead} vueTopBar={props.vueTopBar} accountChangedHandler={props.accountChangedHandler} switchTheme={props.switchTheme} theme={props.theme} overlayClass={props.overlayClass} closeOverlay={props.closeOverlay} switchOverlayMode={props.switchOverlayMode} disconnect={props.disconnect} connectWalletHandler={props.connectWalletHandler} defaultAccount={props.defaultAccount} errorMessage={props.errorMessage} connButtonText={props.connButtonText} connectCoinBaseHandler={props.connectCoinBase} web3={props.web3} logged={props.logged} setLogged={props.setLogged}></TopBar>
            <div id="secondBox">
                {props.mainVue !== "landing" && <LeftBar mainVue={props.mainVue} theme={props.theme}></LeftBar>}
                <div id="mainVue">

                    <Outlet></Outlet>
                </div>
                <div id="rightBar" className={props.theme === "light" ? "whiteDiv" : "blackDiv"}>
                    {props.mainVue === "landing" ?
                        <div id='boxTwitter'>
                            {isTwitterLoading &&
                                <div id='twitterLoadingBox'>
                                    <CircularProgress></CircularProgress>
                                    <p className={props.theme === "light" ? "blackP" : "whiteP"}>Twitter feed is loading...</p>
                                    </div>}
                            <TwitterTimelineEmbed sourceType="timeline" screenName="NBA" theme={props.theme} onLoad={() => setTwitterLoading(false)} onError={() => setTwitterLoading(false)} />
                        </div> :
                        <div id="underRightBar">{
                            props.defaultAccount !== undefined ? <div id={props.mainVue === "bet" ? "topRightBar" : "topRightBarElse"}>
                                {props.mainVue === "bet" ? <div id="underTopRightBar">
                                    <button onClick={props.goPanier} className="topRightButton" id="panierP"><div id={props.rightBar === "betMaker" ? "activeRightBar" : "inactiveRightBar"} className="topRightDiv">Bet maker</div></button>
                                    <button onClick={props.goMyBets} className="topRightButton" id="myBetsP"><div id={props.rightBar === "myBets" ? "activeRightBar" : "inactiveRightBar"} className="topRightDiv">My Bets</div></button>
                                    <button onClick={props.goMyP2PBets} className="topRightButton" id="myP2PBetsP"><div id={props.rightBar === "myP2PBets" ? "activeRightBar" : "inactiveRightBar"} className="topRightDiv">My P2P Bets</div></button>

                                </div> : <p className={props.theme === "light" ? "headerTitle" : "headerTitleDark"}>Hi young Crocodile !</p>}
                            </div> : null
                        }
                            < div id="superMidRightBar">

                                {props.mainVue === "bet" ?
                                    props.rightBar === "betMaker" ?
                                        props.typeBet === 0 ? null
                                            : <BetMaker setTypeBet={props.setTypeBet} setBetArgs={props.setBetArgs} betArgs={props.betArgs} typeBet={props.typeBet}></BetMaker>
                                        : props.rightBar === "myBets" ?
                                            <MyBets setMyBets={props.setMyBets} myBets={props.myBets} betContract={props.betContract} address={props.defaultAccount}></MyBets>
                                            : <MyP2PBets setMyBets={props.setMyP2PBets} myBets={props.myP2PBets} betContract={props.betContract} address={props.defaultAccount}></MyP2PBets>
                                    : null

                                }
                            </div>
                            {props.mainVue === "bet" ? <BetterBottomRight address={props.defaultAccount} betArgs={props.betArgs} approve={props.approve} betFunction={props.betFunction}></BetterBottomRight> : null}</div>

                    }


                </div>


            </div>
            {
                props.rightBar === "betMaker" ?
                    props.typeBet === 0 ?
                        null :
                        <BetterMobile address={props.defaultAccount} setTypeBet={props.setTypeBet} setBetArgs={props.setBetArgs} betArgs={props.betArgs} typeBet={props.typeBet} approve={props.approve} betFunction={props.betFunction}></BetterMobile>
                    : null
            }
            <div id="mobileBottomBar" className={props.theme === "light" ? "whiteDiv" : "blackDiv"}>
                <div id='linksMobileBottomBar'>
                    <Link to="/basketball" className="linkMobileBottomBar">
                        <img className='logoLinkMobileBottomBar' src={props.vueTopBar === "listBets" ? props.theme === "light" ? sportsLight : sportsDark : sportsInactive}></img>
                        <p id="listBetsLinkMobileBottomBar" className={props.vueTopBar === "listBets" ? cssIdentifiers[props.theme]["titleActive"] : "titleInactive"}>Sport Bets</p>
                    </Link>
                    <Link to="/decentrabet" className="linkMobileBottomBar">
                        <img className='logoLinkMobileBottomBar' src={props.vueTopBar === "decentraBet" ? props.theme === "light" ? decentraBetLight : decentraBetDark : decentraBetInactive}></img>
                        <p id="decentraBetLinkMobileBottomBar" className={props.vueTopBar === "decentraBet" ? cssIdentifiers[props.theme]["titleActive"] : "titleInactive"}>Decentrabet</p></Link>
                    <Link to="/rankings" className="linkMobileBottomBar">
                        <img className='logoLinkMobileBottomBar' src={props.vueTopBar === "rankings" ? props.theme === "light" ? rankingLight : rankingDark : rankingInactive}></img>
                        <p id="rankingsLinkMobileBottomBar" className={props.vueTopBar === "rankings" ? cssIdentifiers[props.theme]["titleActive"] : "titleInactive"}>Rankings</p>
                    </Link>
                    {props.logged ? <Link to="/notifications" className="linkMobileBottomBar">
                        <img className='logoLinkMobileBottomBar' src={props.vueTopBar === "notifications" ? props.theme === "light" ? notificationsLight : notificationsDark : notificationsInactive}></img>
                        <p id="notificationsLinkMobileBottomBar" className={props.vueTopBar === "notifications" ? cssIdentifiers[props.theme]["titleActive"] : "titleInactive"}>Notifications</p>
                    </Link> : null}

                </div>

                <button className="buttonTransparent" id="hamburger" onClick={props.switchMenuMobile}><img id="hamburgerImg" src={props.theme === "light" ? hamburgerImage : hamburgerWhiteImage} alt="hamburgerImage"></img></button>

            </div>
            <MenuMobile menuMobile={props.menuMobile} theme={props.theme} switchTheme={props.switchTheme} closeMenuMobile={props.closeMenuMobile} address={props.defaultAccount}></MenuMobile>
            <ToastContainer autoClose={false}></ToastContainer>
        </div >
    );
}

Base.propTypes = {};

Base.defaultProps = {};

export default Base;
