import React, { useEffect,useState } from 'react';
import DecentraBetCreator from '../DecentraBetCreator/DecentraBetCreator';
import ViewADecentrabet from '../ViewADecentrabet/ViewADecentrabet';
import "./DecentraBet.css"
import MyDecentrabets from '../MyDecentrabets/MyDecentrabets';


function DecentraBet(props) {
  const [myDecentrabets, setMyDecentrabets] = useState()
  useEffect(() => {
    props.vueSetter("decentraBet")
    props.mainVueSetter("decentraBet")
  }, [])
  useEffect(() => {
    if (props.decentrabetContract !== undefined && props.address !== undefined) {
      props.decentrabetContract.methods.getMyDecentrabetsUser(props.address).call()
        .then(result => {
          let reversed = [].concat(result)
          setMyDecentrabets(reversed.reverse())
        })
    }
  }, [props.decentrabetContract, props.address])

  return (
    <div id="mainContentDecentraBet" className={props.theme === "light" ? "backgroundLight" : "backgroundDark"}>
      <div id='introDecentraBet' className={props.theme === "light" ? 'decentraBetDiv' : 'decentraBetDivDark'}>
        <p id='decentraBetBigTitle' className={props.theme === "light" ? "blackP" : "whiteP"} >DecentraBet</p>
        <p id='introDecentraBetP' className={props.theme === "light" ? "blackP" : "lightGreyP"}> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam viverra tellus libero, dapibus dapibus nibh mattis id. Cras eu lacinia mauris. In sed aliquet ante, ac rhoncus velit. Aliquam et elit turpis. Duis sit amet cursus justo, a condimentum justo. Integer neque ipsum, tristique sit amet odio nec, pulvinar accumsan elit. Cras tincidunt lobortis tortor, vel luctus felis porta et. Phasellus vel risus ac erat pretium dapibus. </p>
      </div>
      <div id='decentraBetInteracter'>
        <ViewADecentrabet decentrabetContract={props.decentrabetContract} usdtContract={props.usdtContract} address={props.address} theme={props.theme}></ViewADecentrabet>
        <DecentraBetCreator toast={props.toast} theme={props.theme} decentrabetContract={props.decentrabetContract} usdtContract={props.usdtContract} address={props.address}></DecentraBetCreator>
      </div>
      {myDecentrabets!==undefined && myDecentrabets.length!==0 && <MyDecentrabets myDecentrabets={myDecentrabets}></MyDecentrabets>}

    </div>
  );

}


export default DecentraBet;
