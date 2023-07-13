import React from 'react';
import DecentraBetCreator from '../DecentraBetCreator/DecentraBetCreator';
import ViewADecentrabet from '../ViewADecentrabet/ViewADecentrabet';

class DecentraBet extends React.Component {
  constructor(props){
    super(props);
    this.props.vueSetter("decentraBet")
    this.props.mainVueSetter("decentraBet")
  } 
  render(){
    return(
      <div className="mainContentDecentraBet">
        <ViewADecentrabet decentrabetContract={this.props.decentrabetContract} usdtContract={this.props.usdtContract} address={this.props.address} theme={this.props.theme}></ViewADecentrabet>
        <DecentraBetCreator theme={this.props.theme} decentrabetContract={this.props.decentrabetContract} usdtContract={this.props.usdtContract} address={this.props.address}></DecentraBetCreator> 
   
      </div>
    );
  }
} 


export default DecentraBet;
