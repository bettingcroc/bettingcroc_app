import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { homeImage, titleImage, basketBallImage, footballImage, financeImage, tennisImage, accountImage, accountImageWhite } from "../../images"
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import "./MenuMobile.css"


const MenuMobile = (props) => {
    useEffect(() => {
    })
    return (
        <div id="menuMobile" className={props.theme === "light" ? "whiteDiv " + props.menuMobile : "blackDiv " + props.menuMobile}>
            <Link to="/account" id=""><button className="buttonTransparent" onClick={props.closeMenuMobile}><img className="accountLogo" src={props.theme === "light" ? accountImage : accountImageWhite} alt="accountImage"></img></button></Link>
            <ThemeSwitcher theme={props.theme} switchTheme={props.switchTheme}></ThemeSwitcher>
            <div id='linksMenuMobile'>
                <Link className="leftBarA" to="/basketball"><button className="buttonTransparent" onClick={props.closeMenuMobile}>
                    <div className="bottomBarLink">
                        <img src={basketBallImage} alt="basketBallImage" className="logoImage"></img>
                        <p>Basketball</p>
                    </div></button>
                </Link>
                <Link className="leftBarA" to="/football"><button className="buttonTransparent" onClick={props.closeMenuMobile}>
                    <div className="bottomBarLink">
                        <img src={footballImage} alt="footballImage" className="logoImage"></img>
                        <p>Football</p>
                    </div></button>
                </Link>
                <Link className="leftBarA" to="/finance"><button className="buttonTransparent" onClick={props.closeMenuMobile}>
                    <div className="bottomBarLink">
                        <img src={financeImage} alt="financeImage" className="logoImage"></img>
                        <p>Finance</p>
                    </div></button>
                </Link>
                <Link className="leftBarA" to="/tennis"><button className="buttonTransparent" onClick={props.closeMenuMobile}>
                    <div className="bottomBarLink">
                        <img src={tennisImage} alt="tennisImage" className="logoImage"></img>
                        <p>Tennis</p>
                    </div></button>
                </Link>
            </div>
        </div>
    );
}

MenuMobile.propTypes = {};

MenuMobile.defaultProps = {};

export default MenuMobile;
