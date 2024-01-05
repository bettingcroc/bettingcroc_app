import React from 'react';
import PropTypes from 'prop-types';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { sunImage, moonImage, sunYellowImage, moonYellowImage } from "../../images"
import { useState } from "react"
import "./ThemeSwitcher.css"


const ThemeSwitcher = (props) => {
  const [theme, setTheme] = useState(props.theme);
  const handleChange = (event, newTheme) => {
    if (newTheme != null) {
      setTheme(newTheme);
      props.switchTheme()
    }
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={theme}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      id={props.id}
    >
      <ToggleButton value="light"><img className='themeImages' src={theme === "light" ? sunYellowImage : sunImage}></img></ToggleButton>
      <ToggleButton value="dark"><img className='themeImages' src={theme === "dark" ? moonYellowImage : moonImage}></img></ToggleButton>
    </ToggleButtonGroup>
  );
}

ThemeSwitcher.propTypes = {};

ThemeSwitcher.defaultProps = {};

export default ThemeSwitcher;
