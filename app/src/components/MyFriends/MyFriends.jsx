import React from 'react';
import PropTypes from 'prop-types';


class MyFriends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      myFriends: undefined,
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props && this.state.loaded === false && this.props.address !== undefined) {

      this.setState({ address: this.props.address.toLowerCase() });
      let link = "http://localhost:4000/api/myfriends/"
      fetch(link, { method: "GET" }).then((res) => {
        res.json().then((data) => {
          //console.log(data[0]);
          if (this.state.loaded !== true) { this.setState({ loaded: true, myFriends: data }); }
          // todo mettre le claseement de laddresse connectée
        });
      });

    }
  }
  render() {
    return (
      <div>
        <p>Friends</p>
        <div>
          {this.state.myFriends !== undefined ?
            this.state.myFriends.map(function (item) {
              return (
                <div key={item.address2} className="requestDiv">
                  <p>{item.address2}</p>
                  <button onClick={(event) => { //e is undefined
                  }
                  }
                  >
                    Remove</button>
                </div>
              );
            }) : null}
        </div>
      </div>
    );
  }


}

MyFriends.propTypes = {};

MyFriends.defaultProps = {};

export default MyFriends;
