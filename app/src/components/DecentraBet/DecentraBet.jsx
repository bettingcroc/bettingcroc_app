import React from 'react';
import DecentraBetCreator from '../DecentraBetCreator/DecentraBetCreator';
import ViewADecentrabet from '../ViewADecentrabet/ViewADecentrabet';

class DecentraBet extends React.Component {
  constructor(props){
    super(props);
    this.props.vueSetter("decentraBet")
  } 
  render(){
    return(
      <div className="mainContent">
        <DecentraBetCreator decentrabetContract={this.props.decentrabetContract} usdtContract={this.props.usdtContract} address={this.props.address}></DecentraBetCreator> 
        <ViewADecentrabet decentrabetContract={this.props.decentrabetContract} usdtContract={this.props.usdtContract} address={this.props.address}></ViewADecentrabet>   
      </div>
    );
  }
} 


export default DecentraBet;
