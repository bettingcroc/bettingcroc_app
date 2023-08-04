import React from 'react';
import PropTypes from 'prop-types';


class ComingSoon extends React.Component {
  constructor(props){
    super(props)
    this.props.mainVueSetter(false)
  }
  componentDidUpdate(){
  }
  render() {
    return (
      <div>
        Coming soon !
      </div>
    );
  }
}
ComingSoon.propTypes = {};

ComingSoon.defaultProps = {};

export default ComingSoon;
