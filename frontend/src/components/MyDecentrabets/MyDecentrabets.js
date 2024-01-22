import React from 'react';
import PropTypes from 'prop-types';
import "./MyDecentrabets.css"

function MyDecentrabets(props) {

  return (
    <div id='introDecentraBet' className={props.theme === "light" ? 'decentraBetDiv' : 'decentraBetDivDark'}>
      <p className={props.theme === "light" ? "headerTitle" : "headerTitleDark"}>My decentrabets</p>
      <div id='myDecentrabetsList'>
        {props.myDecentrabets.map((item, index) => {
          return (
            <div className='myDecentrabetLine'>
              <p className={props.theme === "light" ? "blackP" : "whiteP"}>Bet {item}</p>
            </div>
          )
        })}
      </div>
    </div>
  );
}

MyDecentrabets.propTypes = {};

MyDecentrabets.defaultProps = {};

export default MyDecentrabets;
