import React from 'react';
import "./BetterMobile.css"
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import BetMaker from '../betMaker/betMaker';
import BetterBottomRight from '../BetterBottomRight/BetterBottomRight';


class BetterMobile extends React.Component {
  constructor(props) {
    super(props)
    this.handleClickAwayEvent = this.handleClickAwayEvent.bind(this);
    if (window.innerWidth <= 1080) {
      document.body.style.overflow = 'hidden';
    }
  }
  componentWillUnmount() {
    if (window.innerWidth <= 1080) {
      document.body.style.overflow = '';
    }
  }
  handleClickAwayEvent() {
    this.props.setTypeBet(0)
  }
  render() {
    return (
      <div id='betterMobile'>
        <div id='overlayBetterMobile'></div>
        {window.innerWidth <= 1080 ? <ClickAwayListener onClickAway={this.handleClickAwayEvent} touchEvent={false}>
          <div id='modalBetterMobile'>
            <BetMaker setTypeBet={this.props.setTypeBet} setBetArgs={this.props.setBetArgs} betArgs={this.props.betArgs} typeBet={this.props.typeBet}></BetMaker>
            <BetterBottomRight address={this.props.address} betArgs={this.props.betArgs} approve={this.props.approve} betFunction={this.props.betFunction}></BetterBottomRight>
          </div>
        </ClickAwayListener> : null}

      </div>
    );
  }
}

BetterMobile.propTypes = {};

BetterMobile.defaultProps = {};

export default BetterMobile;
