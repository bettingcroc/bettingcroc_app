import React, { useEffect } from 'react';
import PropTypes from 'prop-types';


function NotificationsMobile(props) {

  useEffect(() => {
    props.vueSetter("notifications")

  })
  return (
    <div>
      NotificationsMobile Component
    </div>
  );
}

NotificationsMobile.propTypes = {};

NotificationsMobile.defaultProps = {};

export default NotificationsMobile;
