import React from 'react';
import "./BetterMobile.css"
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import BetMaker from '../betMaker/betMaker';

class BetterMobile extends React.Component {
  constructor(props) {
    super(props)
    this.handleClickAwayEvent = this.handleClickAwayEvent.bind(this);

  }
  handleClickAwayEvent() {
    this.props.setTypeBet(0)
  }
  render() {
    return (
      <div id='betterMobile'>
        <div id='overlayBetterMobile'></div>

        {window.innerWidth <= 1080 ? <ClickAwayListener onClickAway={this.handleClickAwayEvent} touchEvent={false}>
          <BetMaker setTypeBet={this.props.setTypeBet} setBetArgs={this.props.setBetArgs} betArgs={this.props.betArgs} typeBet={this.props.typeBet}></BetMaker>
          {/*<div id='betterMobileModal'>

    </div>*/}
        </ClickAwayListener> : null}
      </div>
    );
  }
}

BetterMobile.propTypes = {};

BetterMobile.defaultProps = {};

export default BetterMobile;
