import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


class LandingComponent extends React.Component {
  constructor(props){
    super(props);
    this.props.vueSetter(null)
  }
  render() {
    return (
      <div id="landingComponent">
        <div id="landingLineDiv1">
          <Link to="/basketball" className='linkLanding'>
            <div className="landingSquare" id="landingDivListBets">
              <p className="landingP">List Bets</p>
            </div>
          </Link>
          <Link to="/decentrabet" className='linkLanding'>
            <div className="landingSquare" id="landingDivDecentraBet">
              <p className="landingP">DecentraBet</p>
            </div>
          </Link>
        </div>
        <div id="landingLineDiv2">
          <Link to="/classement" className='linkLanding'>
            <div className="landingSquare" id="landingDivRanking">
              <p className="landingP">Rankings</p>
            </div>
          </Link>
          <Link to="/docs" className='linkLanding'>
            <div className="landingSquare" id="landingDivDocs">
              <p className="landingP">Docs and tutos</p>
            </div>
          </Link>
        </div>
      </div>

    )

  }
}


LandingComponent.propTypes = {};

LandingComponent.defaultProps = {};

export default LandingComponent;
