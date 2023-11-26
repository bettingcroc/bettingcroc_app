import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { homeImage, titleImage, basketBallImage, footballImage, financeImage, tennisImage, accountImage, accountImageWhite } from "../../images"
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import "./MenuMobile.css"


const MenuMobile = (props) => {
    useEffect(() => {
        props.theme === "light" ? setClassP("optionsLeftBarP") : setClassP("optionsLeftBarPDark")
    }, [props.theme])
    const [classP, setClassP] = useState(props.theme === "light" ? "optionsLeftBarP" : "optionsLeftBarPDark")

    return (
        <div id="menuMobile" className={props.theme === "light" ? "whiteDiv " + props.menuMobile : "blackDiv " + props.menuMobile}>
        

            {props.address !== undefined && <Link className="optionsLeftBar" to="/account" id="">
                <button className="buttonTransparent" onClick={props.closeMenuMobile}>
                    <img className="accountLogo" src={props.theme === "light" ? accountImage : accountImageWhite} alt="accountImage"></img>
                </button>
                <p id='myAccountMenuMobile' className={props.theme === "light" ? "blackP "  : "whiteP "}>My account</p>
            </Link>}
            <ThemeSwitcher theme={props.theme} switchTheme={props.switchTheme}></ThemeSwitcher>
            <div id='linksMenuMobile'>
                <Link className="optionsLeftBar" to="/football">
                    <img src={footballImage} alt="footballImage" className="logoImage"></img>
                    <p className={classP}>Champions League</p>
                </Link>
                <Link className="optionsLeftBar" to="/football">
                    <img src={footballImage} alt="footballImage" className="logoImage"></img>
                    <p className={classP}>Ligue 1</p>
                </Link>
                <Link className="optionsLeftBar" to="/football">
                    <img src={footballImage} alt="footballImage" className="logoImage"></img>
                    <p className={classP}>Premier League</p>

                </Link>
                <Link className="optionsLeftBar" to="/football">
                    <img src={footballImage} alt="footballImage" className="logoImage"></img>
                    <p className={classP}>Liga</p>
                </Link>

                <Link className="optionsLeftBar" to="/football">
                    <img src={footballImage} alt="footballImage" className="logoImage"></img>
                    <p className={classP}>Bundesliga</p>
                </Link>

                <Link className="optionsLeftBar" to="/football">
                    <img src={footballImage} alt="footballImage" className="logoImage"></img>
                    <p className={classP}>Serie A</p>
                </Link>
                <Link className="optionsLeftBar" to="/basketball">
                    <img src={basketBallImage} alt="basketBallImage" className="logoImage"></img>
                    <p className={classP}>NBA</p>
                </Link>
                <Link id='helpLink' className="optionsLeftBar" to="/docs">
                    <img src={basketBallImage} alt="basketBallImage" className="logoImage"></img>
                    <p className={classP}>How it works</p>
                </Link>
            </div>
        </div>
    );
}

MenuMobile.propTypes = {};

MenuMobile.defaultProps = {};

export default MenuMobile;
