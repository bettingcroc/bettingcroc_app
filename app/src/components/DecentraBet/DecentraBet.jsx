import React from 'react';
import DecentraBetCreator from '../DecentraBetCreator/DecentraBetCreator';
import ViewADecentrabet from '../ViewADecentrabet/ViewADecentrabet';

class DecentraBet extends React.Component {
  constructor(props){
    super(props);
  } 
  render(){
    return(
      <div className='decentraBet' class="mainContent">
        <DecentraBetCreator decentrabetContract={this.props.decentrabetContract} usdtContract={this.props.usdtContract} address={this.props.address}></DecentraBetCreator> 
        <ViewADecentrabet decentrabetContract={this.props.decentrabetContract} usdtContract={this.props.usdtContract} address={this.props.address}></ViewADecentrabet>   
      </div>
    );
  }
} 


export default DecentraBet;
