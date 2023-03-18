import React from 'react';
import PropTypes from 'prop-types';


class Jauge extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div id="superStakeJauge">
        <div id="stakeJauge">
          <div id="stakeTitle">
            <p id="stakeTitleP">Stake</p>

            {/*<div id="underStakeTitle">
                      <div id="under2StakeTitle">
                      </div>
            </div>*/}
          </div>
          <div id="stakeBox">
            <div id="jaugeDiv">
              <div id="graduation">
                <p id="zeroRange">1 USDT</p>
                <p id="midRange">50%</p>
                <p id="maxRange">Max ({Math.round(this.props.balanceUSDT * 10) / 10})</p>
              </div>
              <div id="range">
                <input type="range" min="1" step="1" max={this.props.balanceUSDT} id="rangeInput" value={this.props.amountToBet} onChange={e => this.props.setAmountBet( e.target.value )}></input>
              </div>
            </div>
            <div>
              <input type="number" id="inputStake" min="1" value={this.props.amountToBet} onChange={e => this.props.setAmountBet( e.target.value )}></input>
              {/*<button id="enterStakeButtonB">
                        <div id="enterStakeButton">
                          Enter stake
                        </div>
                      </button>*/}
            </div>
          </div>
        </div>
      </div>
    );

  }
}

Jauge.propTypes = {};

Jauge.defaultProps = {};

export default Jauge;
