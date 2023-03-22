import React from 'react';
import PropTypes from 'prop-types';


class GetGains extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gains: 0,
      gainsFromGeneral: 0,
      gainsFromP2P: 0,
      won:false
    }
    this.getGains=this.getGains.bind(this);
  }
  componentDidMount() {
    if (this.props.address !== undefined && this.props.betContract !== undefined) {
      try {
        this.props.betContract.methods.toClaimTotal(this.props.address).call().then(result => {
          this.setState({ gainsFromGeneral: parseFloat(result) / decimalsConverter(10) })
          this.props.betContract.methods.howMuchIWonP2P(this.props.address).call().then(result2 => {
            this.setState({ gainsFromP2P: parseFloat(result2) / decimalsConverter(10) })
            this.setState({ gains: parseFloat(result) / decimalsConverter(10) + parseFloat(result2) / decimalsConverter(10) })
            if(this.state.gains>0){
              this.setState({won:true})
            }
            else{
              this.setState({won:false})
            }
          })
        })
      }
      catch (e) { console.log(e) }
    }
  
}
componentDidUpdate(prevProps) {
  if ((prevProps.address !== this.props.address || prevProps.betContract !== this.props.betContract) && this.props.betContract !== undefined) {
    try {
      this.props.betContract.methods.toClaimTotal(this.props.address).call().then(result => {

        this.setState({ gainsFromGeneral: parseFloat(result) / decimalsConverter(10) })
        this.props.betContract.methods.howMuchIWonP2P(this.props.address).call().then(result2 => {
          this.setState({ gainsFromP2P: parseFloat(result2) / decimalsConverter(10) })
          this.setState({ gains: parseFloat(result) / decimalsConverter(10) + parseFloat(result2) / decimalsConverter(10) })
          //console.log("gains G "+this.state.gainsFromGeneral )
          //console.log("gains P "+this.state.gainsFromP2P )
          if(this.state.gains>0){
            this.setState({won:true})
          }
          else{
            this.setState({won:false})
          }
        })
      })
    }
    catch (e) { console.log(e) }
  }
}
getGains(){ 
  //console.log(this.state.gainsFromGeneral+" "+this.state.gainsFromP2P)
  if(this.state.gainsFromGeneral>0 && this.state.gainsFromP2P>0){
    this.props.betContract.methods.recupAllGains().send({ from: this.props.address })
    .once('receipt', (receipt) => {
      console.log("all gains recupered success")
    })
  }
  else if(this.state.gainsFromGeneral>0 && this.state.gainsFromP2P===0){
    this.props.betContract.methods.recupAllWin().send({ from: this.props.address })
    .once('receipt', (receipt) => {
      console.log("all gains from general recupered success")
    })
  }
  else if(this.state.gainsFromGeneral===0 && this.state.gainsFromP2P>0){
    this.props.betContract.methods.recupAllP2PWin().send({ from: this.props.address })
    .once('receipt', (receipt) => {
      console.log("all gains from P2P recupered success")
    })
  }
  else console.log("Bet first !")
}
render() {
  return (
    <div id="getGainsDiv">
      <button onClick={this.getGains} id={this.state.won?"getGains":"getGainsLose"}>{this.state.won?"Get "+this.state.gains+" USDT !":"Waiting for some money"}</button>
    </div>
  );
}
}

GetGains.propTypes = {};

GetGains.defaultProps = {};

export default GetGains;
function decimalsConverter(numberToConvert) {
  return Math.pow(numberToConvert, 18)
}