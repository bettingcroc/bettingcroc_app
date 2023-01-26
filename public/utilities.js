//const NODE_URL_BSCTESTNET = "https://data-seed-prebsc-1-s1.binance.org:8545/"; //url of bsc testnet node
const NODE_URL_BSCTESTNET = "https://rpc.ankr.com/bsc_testnet_chapel";
const NODE_URL_POLYGON = "https://speedy-nodes-nyc.moralis.io/d7cfb9005cec8b6a40236ec8/polygon/mainnet";
var web3 = new Web3(new Web3.providers.HttpProvider(NODE_URL_BSCTESTNET)); // new web3 object
function httpGet(theUrl) {
	var xmlHttp = null;

	xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", theUrl, false);
	xmlHttp.send(null);
	return xmlHttp.responseText;
}
multiBetABI = JSON.parse(httpGet('/MultiBetMultiOptionsUSDTABI.txt'));
multiBetAddress='0x33844f8042D7980C7060067562a11b14F278018e';
multiBetContract= new web3.eth.Contract(multiBetABI,multiBetAddress);

MBTokenABI = JSON.parse(httpGet('/MBTABI.txt'));
MBTokenAddress='0x8bC9B949D39d0136ea98CF3AF5d770391e76d999';
MBTokenContract= new web3.eth.Contract(MBTokenABI,MBTokenAddress);

usdtABI = JSON.parse(httpGet('/USDTABI.txt')); //real USDT
//usdtABI =  JSON.parse(httpGet('MBTABI.txt')); // MBT ABI

USDTaddress='0x7ef95a0FEE0Dd31b22626fA2e10Ee6A223F8a684'; // real USDT on bsc testnet
//USDTaddress='0xc2132D05D31c914a87C6611C10748AEb04B58e8F'; // usdt on polygon

USDTContract=new web3.eth.Contract(usdtABI,USDTaddress);

function decimalsConverter(numberToConvert){
	return Math.pow(numberToConvert,18)
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

async function moneyPoolOption(number){
	let opt=0;
	await multiBetContract.methods.getNumberOfOptions(number).call().then((result)=>{
		//console.log(result);
		opt=result;
		})
	//console.log("opt "+opt);	
	for(n =0;n<opt;n++){
		await multiBetContract.methods.getOptionMoney(number,n).call()
		.then(function(result){
			ptr="argentTotalOption"+n;
			document.getElementById(ptr).innerHTML = parseFloat(result) / decimalsConverter(10) + ' USDT in option '+n+' Pool';
		})
		//console.log(i);
		}	
}

async function myPourcentageOption(number){
	
	let opt=0;
	await multiBetContract.methods.getNumberOfOptions(number).call().then((result)=>{
		//console.log(result);
		opt=result;
		})
	//console.log("opt "+opt);	
	for(u =0;u<opt;u++){
		//console.log(u);
		await multiBetContract.methods.myPourcentageOnOption(number,u,myaddress).call()
		.then(function(result){ptr="pourcentagePoolOption"+u;document.getElementById(ptr).innerHTML ='I got '+result + ' % of Option Pool'+u;})
		
		}	
}


async function myBetOnOption(number){
	
	let opt=0;
	await multiBetContract.methods.getNumberOfOptions(number).call().then((result)=>{
		//console.log(result);
		opt=result;
		})
	//console.log("opt "+opt);	
	for(a =0;a<opt;a++){
		await multiBetContract.methods.howMuchIGotOnAnOption(number,a,myaddress).call()
		.then(function(result){document.getElementById("myBetOnOption"+a).innerHTML ='I got '+ parseFloat(result) / decimalsConverter(10) + ' USDT on Option '+a+' Win';})
		
		}	
}


function viewBet(number){
	//winner(number);
	//nameBet(number);
	moneyPoolOption(number);
	myPourcentageOption(number);
	myBetOnOption(number);
}

function allowance(){
	USDTContract.methods.allowance(myaddress,multiBetAddress).call()
	.then(function(result){document.getElementById("allowance").innerHTML='usdt allowed to contract: '+ parseFloat(result) / decimalsConverter(10) +' USDT';})
}

function MBTallowance(){
	MBTokenContract.methods.allowance(myaddress,multiBetAddress).call()
	.then(function(result){document.getElementById("MBTallowance").innerHTML='MBT allowed to contract: '+ parseFloat(result) / decimalsConverter(10) +' MBT';})
}

/*function winner(number){
	multiBetContract.methods.getWinner(number).call()
	.then(function(result){document.getElementById("winner").innerHTML='Winner of bet n°'+number+' is '+result;})
}*/

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

function nameBet(number){
	multiBetContract.methods.getNumberToName(number).call()
	.then(function(result){document.getElementById("nameBet").innerHTML=result;})
}

function contractBalance(){
	USDTContract.methods.balanceOf(multiBetAddress).call()
	.then(function(result){document.getElementById("contractBalance").innerHTML='contract balance: '+parseFloat(result) / decimalsConverter(10) +' USDT'})
}


async function sendTransaction(encodedData,myaddress,toaddress,gasArgs,stringCallBack){ 
	console.log(myaddress,toaddress,gasArgs,stringCallBack)
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

function searchBet(betNumber,optionAgainst,minToEnter){
	multiBetContract.methods.getMaxCote(betNumber,optionAgainst,minToEnter).call()
	.then((result)=>{
		nbr=parseFloat(result);
		if(nbr!=0){
			multiBetContract.methods.seeP2PBet(betNumber,nbr).call()
			.then((result2)=>{	
				//console.log(Object.values(result2));	
				cote=1+(Object.values(result2)[2]/Object.values(result2)[3]);
				bettable=Object.values(result2)[4];
				document.getElementById("coteSearch"+optionAgainst).innerHTML="best cote :"+parseFloat(cote).toFixed(2);
				document.getElementById("amountBettable"+optionAgainst).innerHTML="amount bettable : "+(parseFloat(bettable) / decimalsConverter(10)).toFixed(2);
				document.getElementById("joinMaxBet"+optionAgainst).disabled=false;
				document.getElementById("approveUSDTOptionP2P"+optionAgainst).disabled=false;
				document.getElementById("amountToBetP2P"+optionAgainst).disabled=false;
				document.getElementById("p2pBet"+optionAgainst).value=parseInt(Object.values(result2)[0]);
			})
		}	
		else{
			document.getElementById("joinMaxBet"+optionAgainst).disabled=true;
			document.getElementById("approveUSDTOptionP2P"+optionAgainst).disabled=true;
			document.getElementById("amountToBetP2P"+optionAgainst).disabled=true;
			document.getElementById("coteSearch"+optionAgainst).innerHTML="best cote : indisponible";
			document.getElementById("amountBettable"+optionAgainst).innerHTML="amount bettable : indisponible";
		}
	})
}
