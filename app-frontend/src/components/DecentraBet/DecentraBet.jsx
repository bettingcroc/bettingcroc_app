import React, { useEffect } from 'react';
import DecentraBetCreator from '../DecentraBetCreator/DecentraBetCreator';
import ViewADecentrabet from '../ViewADecentrabet/ViewADecentrabet';
import "./DecentraBet.css"


function DecentraBet(props) {
  useEffect(() => {
    props.vueSetter("decentraBet")
    props.mainVueSetter("decentraBet")
  }, [])

  return (
    <div className="mainContentDecentraBet">
      <div id='introDecentraBet' className={props.theme === "light" ? 'decentraBetDiv' : 'decentraBetDivDark'}>
        <p id='decentraBetBigTitle' className={props.theme === "light" ? "blackP" : "whiteP"} >DecentraBet</p>
        <p id='introDecentraBetP' className={props.theme === "light" ? "blackP" : "lightGreyP"}> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam viverra tellus libero, dapibus dapibus nibh mattis id. Cras eu lacinia mauris. In sed aliquet ante, ac rhoncus velit. Aliquam et elit turpis. Duis sit amet cursus justo, a condimentum justo. Integer neque ipsum, tristique sit amet odio nec, pulvinar accumsan elit. Cras tincidunt lobortis tortor, vel luctus felis porta et. Phasellus vel risus ac erat pretium dapibus. </p>
      </div>
      <div id='decentraBetInteracter'>
        <ViewADecentrabet decentrabetContract={props.decentrabetContract} usdtContract={props.usdtContract} address={props.address} theme={props.theme}></ViewADecentrabet>
        <DecentraBetCreator theme={props.theme} decentrabetContract={props.decentrabetContract} usdtContract={props.usdtContract} address={props.address}></DecentraBetCreator>
      </div>


    </div>
  );

}


export default DecentraBet;
