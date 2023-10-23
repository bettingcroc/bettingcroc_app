import React, { useEffect } from 'react';
import DecentraBetCreator from '../DecentraBetCreator/DecentraBetCreator';
import ViewADecentrabet from '../ViewADecentrabet/ViewADecentrabet';
import "./DecentraBet.css"


function DecentraBet(props) {
  useEffect(() => {
    props.vueSetter("decentraBet")
    props.mainVueSetter("decentraBet")
  },[])

  return (
    <div className="mainContentDecentraBet">
      <ViewADecentrabet decentrabetContract={props.decentrabetContract} usdtContract={props.usdtContract} address={props.address} theme={props.theme}></ViewADecentrabet>
      <DecentraBetCreator theme={props.theme} decentrabetContract={props.decentrabetContract} usdtContract={props.usdtContract} address={props.address}></DecentraBetCreator>

    </div>
  );

}


export default DecentraBet;
