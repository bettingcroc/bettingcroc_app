import React, { useEffect } from 'react';
import "./BetterMobile.css"
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import BetMaker from '../betMaker/betMaker';
import BetterBottomRight from '../BetterBottomRight/BetterBottomRight';


function BetterMobile(props) {
  useEffect(() => {
    if (window.innerWidth <= 1080) {
      document.body.style.overflow = 'hidden';
    }
    return (() => {
      if (window.innerWidth <= 1080) {
        document.body.style.overflow = '';
      }
    })
  })
  function handleClickAwayEvent() {
    props.setTypeBet(0)
  }
  return (
    <div id='betterMobile'>
      <div id='overlayBetterMobile'></div>
      {window.innerWidth <= 1080 ? <ClickAwayListener onClickAway={handleClickAwayEvent} touchEvent={false}>
        <div id='modalBetterMobile'>
          <BetMaker setTypeBet={props.setTypeBet} setBetArgs={props.setBetArgs} betArgs={props.betArgs} typeBet={props.typeBet}></BetMaker>
          <BetterBottomRight address={props.address} betArgs={props.betArgs} approve={props.approve} betFunction={props.betFunction}></BetterBottomRight>
        </div>
      </ClickAwayListener> : null}

    </div>
  );

}

BetterMobile.propTypes = {};

BetterMobile.defaultProps = {};

export default BetterMobile;
