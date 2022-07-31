async function estimateGasJS(method,address,arguments){
    console.log(method,address,arguments);
    var gas="";
    if(method=="recupAllWin"){
        await multiBetContract.methods.recupAllWin().estimateGas({from: address})
	    .then((result)=>{gas=result;})
    }
    if(method=="approveUSDTOption"){
        await USDTContract.methods.approve(arguments[0],arguments[1]).estimateGas({from: address})
	    .then((result)=>{gas=result;})
    }
    if(method=="approveMBTOption"){
        await MBTokenContract.methods.approve(arguments[0],arguments[1]).estimateGas({from: address})
	    .then((result)=>{gas=result;})
    }
    if(method=="createNewP2PBet"){
        await multiBetContract.methods.createP2PBet(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4]).estimateGas({from: address})
	    .then((result)=>{gas=result;})
    }
    if(method=="JoinP2PBet"){
        await multiBetContract.methods.joinP2PBet(arguments[0],arguments[1],arguments[2]).estimateGas({from: address})
	    .then((result)=>{gas=result;})
    }
    if(method=="betOnOption"){
        await multiBetContract.methods.betOn(arguments[0],arguments[1],arguments[2]).estimateGas({from: address})
	    .then((result)=>{gas=result;})
    }
    if(method=="claimAllRewards"){
        console.log("recupallwin")
        await multiBetContract.methods.recupAllWin().estimateGas({from: address})
	    .then((result)=>{gas=result;})
    }
    if(method=="claimAllRewardsP2P"){
        console.log("recupallwinP2P")
        await multiBetContract.methods.recupAllP2PWin().estimateGas({from: address})
	    .then((result)=>{gas=result;})
    }
	console.log("gas estimate : 0x"+gas.toString(16));
    return "0x"+gas.toString(16);
}