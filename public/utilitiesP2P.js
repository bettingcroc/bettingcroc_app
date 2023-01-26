const NODE_URL_BSCTESTNET = "https://speedy-nodes-nyc.moralis.io/d7cfb9005cec8b6a40236ec8/bsc/testnet"; //url of bsc testnet node
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

usdtABI = JSON.parse(httpGet('/USDTABI.txt')); //real USDT
//usdtABI =  JSON.parse(httpGet('MBTABI.txt')); // MBT ABI

USDTaddress='0x243F13935a8a855715c1e06d5dC6f0650354A1F5'; // real USDT on bsc testnet
//USDTaddress='0xc2132D05D31c914a87C6611C10748AEb04B58e8F'; // usdt on polygon

USDTContract=new web3.eth.Contract(usdtABI,USDTaddress);

function decimalsConverter(numberToConvert){
	return Math.pow(numberToConvert,18)
}
function sendTransaction(encodedData,myaddress,toaddress){
	params = [
		{
			from: myaddress,
			to: toaddress,
			gas: '0x3CF90', // 30400
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
			// The result varies by RPC method.
			// For example, this method will return a transaction hash hexadecimal string on success.
			//window.location.replace("localhost:3000");
		})
		.catch((error) => {
			// If the request fails, the Promise will reject with an error.
			console.log("error")
		});
}

function weiconvert(number){
	return BigInt(number*decimalsConverter(10));
} // function to manage decimals of the token

function decimalsConverter(numberToConvert){
	return Math.pow(numberToConvert,18)
}
function seeP2Pbet(betNumber,p2pNumber){
	multiBetContract.methods.seeP2PBet(betNumber,p2pNumber).call()
	.then(function(result){console.log(result);})
}