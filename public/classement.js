const { request } = require("express");

const NODE_URL_BSCTESTNET = "https://data-seed-prebsc-1-s1.binance.org:8545/"; //url of bsc testnet node
//const NODE_URL_BSCTESTNET = "https://rpc.ankr.com/bsc_testnet_chapel";

const NODE_URL_POLYGON = "https://speedy-nodes-nyc.moralis.io/d7cfb9005cec8b6a40236ec8/polygon/mainnet";
var web3; // new web3 object
function httpGet(theUrl) {
	var xmlHttp = null;

	xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", theUrl, false);
	xmlHttp.send(null);
	return xmlHttp.responseText;
}
multiBetABI = JSON.parse(httpGet('/MultiBetMultiOptionsUSDTABI.txt'));
multiBetAddress='0x33844f8042D7980C7060067562a11b14F278018e';
var multiBetContract;

MBTokenABI = JSON.parse(httpGet('/MBTABI.txt'));
MBTokenAddress='0x8bC9B949D39d0136ea98CF3AF5d770391e76d999';
var MBTokenContract;

usdtABI = JSON.parse(httpGet('/USDTABI.txt')); //real USDT
//usdtABI =  JSON.parse(httpGet('MBTABI.txt')); // MBT ABI

USDTaddress='0x243F13935a8a855715c1e06d5dC6f0650354A1F5'; // real USDT on bsc testnet
//USDTaddress='0xc2132D05D31c914a87C6611C10748AEb04B58e8F'; // usdt on polygon
var USDTContract;


ethereum.request({ method: 'eth_requestAccounts' })
      .then(function (result) {
        web3= new Web3(ethereum);
        multiBetContract= new web3.eth.Contract(multiBetABI,multiBetAddress);
        MBTokenContract= new web3.eth.Contract(MBTokenABI,MBTokenAddress);
        USDTContract=new web3.eth.Contract(usdtABI,USDTaddress);

        myaddress = result[0];
        initNavBars(myaddress);
        initPage();
        positionBackEnd(myaddress);
        //console.log(ethereum)
      })

async function sendTransaction(encodedData,myaddress,toaddress,gasArgs,stringCallBack){ 
	//console.log(myaddress,toaddress,gasArgs,stringCallBack)
	var gasTest= await estimateGasJS(gasArgs[0],gasArgs[1],gasArgs[2]);
	
	//console.log(gasTest,stringCallBack);
	params = [
		{
			from: myaddress,
			to: toaddress,
			gas: gasTest, // 30400
			gasPrice: '0x00006FC23AC00', // 10000000000000
			data: encodedData,
		},
	];
	ethereum
		.request({
			method: 'eth_sendTransaction',
			params,
		})
		.then((result) => {
			console.log(stringCallBack+" with "+gasTest+" gas");
			// The result varies by RPC method.
			// For example, this method will return a transaction hash hexadecimal string on success.
			//window.location.replace("localhost:3000");
		})
		.catch((error) => {
			// If the request fails, the Promise will reject with an error.
			console.log("error")
		});
}


function seeMyBets(address){
	multiBetContract.methods.seeMyBets(address).call()
	.then(function(result){
		//console.log(result);
		for(i=0;i<result.length;i++){
			var list=document.querySelector('#myBets');
			var endList=document.querySelector('#endList');
			var select=result[i];
			var newlink= document.createElement('a');
			//var br= document.createElement('br');
			newlink.href='/bet/'+select;
			//newlink.class='myBet';
			newlink.id='mylink'+i;
			newlink.classList.add('myBetAnc');
			var texte=document.createTextNode('Bet '+select);
			newlink.appendChild(texte);
			
			list.insertBefore(newlink,endList);
			var querytext='#myLink'+i;
			var linkquery=document.querySelector(querytext);
			//list.insertBefore(br,endList);
		}
	}
	)}

function initNavBars(address){
	seeMyBets(address);
	toClaimTotal(address);
	usdtBalance(address);
	mbtBalance(address);
	myGainsP2P(address);
	MBTallowance(address);
	allowance();
}

function initPage(){
	document.getElementById("addressMain").innerHTML ="connected with "+ myaddress;
	document.getElementById("multiBetAddress").innerHTML = "addresse du contrat: " + multiBetAddress;
}
async function toClaimTotal(address){
	totalClaim=0;
	//console.log(address);
	await multiBetContract.methods.getMyBetsUnpaid(address).call()
	.then(async(result)=>{
		unpaidBets=0;
		unpaidList=[];
		
		for(i=0;i<result.length;i++){
			if(result[i]!=666){unpaidBets++;unpaidList.push(result[i]);}
		}
		//console.log(unpaidBets," ",unpaidList)
		for(i=0;i<unpaidBets;i++){
			await multiBetContract.methods.howMuchIWon(unpaidList[i],address).call()
			.then((result)=>{totalClaim=parseInt(totalClaim,10)+parseInt(result,10);})
		}
		
	})
	document.getElementById("myGains").innerHTML='I have '+parseFloat(totalClaim) / decimalsConverter(10)+' USDT to claim !';
}
async function myGainsP2P(address){
	await multiBetContract.methods.howMuchIWonP2P(address).call()
	.then((result)=>{document.getElementById("myGainsP2P").innerHTML='I have '+parseFloat(result) / decimalsConverter(10)+' USDT to claim !';})
}
function usdtBalance(address){
	USDTContract.methods.balanceOf(address).call().then((result)=>{
		//console.log(result);
		balance=Math.round((parseFloat(result) / decimalsConverter(10))*100)/100;
		document.getElementById("USDTbalance").innerHTML='usdt balance :'+balance+' USDT';
		//document.getElementById("minBet").value=parseFloat(balance);
	})
}
function mbtBalance(address){
	MBTokenContract.methods.balanceOf(address).call().then((result)=>{
		//console.log(result);
		balance=Math.round((parseFloat(result) / decimalsConverter(10))*100)/100;
		document.getElementById("MBTbalance").innerHTML='mbt balance :'+balance+' MBT';
	})
}
function decimalsConverter(numberToConvert){
	return Math.pow(numberToConvert,18)
}
function allowance(){
	USDTContract.methods.allowance(myaddress,multiBetAddress).call()
	.then(function(result){document.getElementById("allowance").innerHTML='usdt allowed to contract: '+ parseFloat(result) / decimalsConverter(10) +' USDT';})
}

function MBTallowance(){
	MBTokenContract.methods.allowance(myaddress,multiBetAddress).call()
	.then(function(result){document.getElementById("MBTallowance").innerHTML='MBT allowed to contract: '+ parseFloat(result) / decimalsConverter(10) +' MBT';})
}
function positionBackEnd(address) {
	let url = 'api/position/' + address;
	options =
	{
	  'method': 'GET'
	}
	fetch(url, options).then(
	  (res) => {
		//console.log(res)
		res.json().then((data) => {
		  document.getElementById("myAddress").innerHTML = myaddress;
		  document.getElementById("myPseudo").innerHTML = data.pseudo;
		  document.getElementById("myScore").innerHTML = data.score;
		  document.getElementById("myRank").innerHTML = data.position
		  if (data.position === 'unknown') {
			openForm()
		  }
		})
	  }
	)
  }

  async function changePseudo(newPseudo) {
	let url = 'api/users/' + myaddress;
	options = { 'method': 'GET' }
	fetch(url, options).then(
	  (res) => {
		res.json().then((data) => {
		  console.log("address: "+myaddress)
		  console.log("Nonce: "+ data.nonce)
		  web3.eth.personal.sign(web3.utils.sha3(data.nonce), myaddress, function (err, result) {
			console.log("signedNonce: ", result)
			//web3.eth.personal.ecRecover(web3.utils.sha3(data.nonce),result).then((result2)=>console.log("signer: "+result2))
			//.then((result2)=>console.log("signer: "+result2))
			let url2= 'api/setUpPseudo/'+myaddress+"&"+result+"&"+newPseudo
			let options2 = { 'method': 'POST' }
			fetch(url2,options2)
			.then(
			  //console.log('done')
			)

		  })
		  /*
		  let params = [{
			'from': myaddress,
			'data': data
		  }]
		  ethereum
			.request({
			  method: 'eth_sign',
			  params,
			})
			.then((result) => {
			  console.log(result)
			  // The result varies by RPC method.
			  // For example, this method will return a transaction hash hexadecimal string on success.
			})
			.catch((error) => {
			  console.log(error)
			  // If the request fails, the Promise will reject with an error.
			});*/

		  //(data, myaddress, (err, result) => { console.log(err, result) });
		  //console.log("from classement html " + data)
		  setTimeout(closeForm,1000)
		}
		)
	  },
	  (error) => { console.log(error) }
	)
  }