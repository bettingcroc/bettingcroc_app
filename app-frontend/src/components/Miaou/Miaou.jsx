import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Miaou = () => (
  <div>
    <h2>Miaou Component</h2>
    <Link to="/">Home</Link>
  </div>
  
);

Miaou.propTypes = {};

Miaou.defaultProps = {};

export default Miaou;
