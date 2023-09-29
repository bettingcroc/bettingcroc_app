import React from 'react';
import { Link } from 'react-router-dom';
import "./Landing.css"

class LandingComponent extends React.Component {
  constructor(props) {
    super(props);
    this.props.vueSetter(null)
  }
  componentDidMount() {
    this.props.mainVueSetter("landing")

  }
  render() {
    return (
      <div id="landingComponent">
        <Link to="/basketball" className='linkLanding'>
          <div className="landingSquare" id="landingDivListBets">
            <p className="landingP">Sport Bets</p>
          </div>
        </Link>
        <Link to="/decentrabet" className='linkLanding'>
          <div className="landingSquare" id="landingDivDecentraBet">
            <p className="landingP">DecentraBet</p>
          </div>
        </Link>

        <Link to="/rankings" className='linkLanding'>
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

    )

  }
}


LandingComponent.propTypes = {};

LandingComponent.defaultProps = {};

export default LandingComponent;
