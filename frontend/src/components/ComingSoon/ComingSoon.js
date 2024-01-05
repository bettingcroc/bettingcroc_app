import React, { useEffect } from 'react';
import PropTypes from 'prop-types';


function ComingSoon(props) {
  useEffect(() => {
    props.mainVueSetter("comingSoon")
  }, [])
  return (
    <div>
      Coming soon !
    </div>
  );

}
ComingSoon.propTypes = {};

ComingSoon.defaultProps = {};

export default ComingSoon;
