multiBetABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_tetherAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_MBTaddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_fees",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "oldOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnerSet",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "betNumber",
				"type": "uint256"
			}
		],
		"name": "betClosed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "betNumber",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "winner",
				"type": "uint256"
			}
		],
		"name": "betDead",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "better",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "numberBet",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "option",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "betting",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "betNumber",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "string",
				"name": "nameBet",
				"type": "string"
			}
		],
		"name": "newBetCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "ownerPayed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "payed",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "payment",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "betNumber",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "option",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "betOn",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "changeOwner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "claimFeesMoney",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "betNumber",
				"type": "uint256"
			}
		],
		"name": "closeBet",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256[]",
				"name": "betsToClose",
				"type": "uint256[]"
			}
		],
		"name": "closeBets",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "a",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "b",
				"type": "string"
			}
		],
		"name": "compareStrings",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "optionsNumber",
				"type": "uint256"
			}
		],
		"name": "createNewBet",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string[]",
				"name": "names",
				"type": "string[]"
			},
			{
				"internalType": "uint256[]",
				"name": "optionsNumbers",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256",
				"name": "numberOfBetsToAdd",
				"type": "uint256"
			}
		],
		"name": "createNewBets",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amountToBet",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amountToEnter",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "betNumber",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "optionToBet",
				"type": "uint256"
			},
			{
				"internalType": "address[]",
				"name": "authorized",
				"type": "address[]"
			}
		],
		"name": "createP2PBet",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "betNumber",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "msgsender",
				"type": "address"
			}
		],
		"name": "didIWinSmth",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "betNumber",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "poolWin",
				"type": "uint256"
			}
		],
		"name": "endBet",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256[]",
				"name": "betNumbers",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "poolwinners",
				"type": "uint256[]"
			}
		],
		"name": "endBets",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "betNumber",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "p2pNumber",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "msgsender",
				"type": "address"
			}
		],
		"name": "getAmountBetted",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getFees",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getFeesRewards",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getLastBet",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "betNumber",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "optionAgainst",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "minToEnter",
				"type": "uint256"
			}
		],
		"name": "getMaxCote",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "betNumber",
				"type": "uint256"
			}
		],
		"name": "getMoneyLosedOnBet",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "msgsender",
				"type": "address"
			}
		],
		"name": "getMyBetsUnpaid",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "getNameToNumber",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "betNumber",
				"type": "uint256"
			}
		],
		"name": "getNumberOfOptions",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "number",
				"type": "uint256"
			}
		],
		"name": "getNumberToName",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "betNumber",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "option",
				"type": "uint256"
			}
		],
		"name": "getOptionMoney",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getOwner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "betNumber",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "p2pNumber",
				"type": "uint256"
			}
		],
		"name": "getPayedP2P",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "msgsender",
				"type": "address"
			}
		],
		"name": "getScore",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "betNumber",
				"type": "uint256"
			}
		],
		"name": "getWinner",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "betNumber",
				"type": "uint256"
			}
		],
		"name": "getbetNumberToLastBetPP",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "betNumber",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "addressToTest",
				"type": "address"
			}
		],
		"name": "haveIBeenPaid",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "betNumber",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "option",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "msgsender",
				"type": "address"
			}
		],
		"name": "howMuchIGotOnAnOption",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "betNumber",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "msgsender",
				"type": "address"
			}
		],
		"name": "howMuchIWon",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "msgsender",
				"type": "address"
			}
		],
		"name": "howMuchIWonP2P",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "betNumber",
				"type": "uint256"
			}
		],
		"name": "isClosed",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "betNumber",
				"type": "uint256"
			}
		],
		"name": "isDead",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "element",
				"type": "address"
			},
			{
				"internalType": "address[]",
				"name": "list",
				"type": "address[]"
			}
		],
		"name": "isInArrayAddress",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "element",
				"type": "uint256"
			},
			{
				"internalType": "uint256[]",
				"name": "list",
				"type": "uint256[]"
			}
		],
		"name": "isInArrayUint256",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "betNumber",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "p2pNumber",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amountToBet",
				"type": "uint256"
			}
		],
		"name": "joinP2PBet",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "betNumber",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "option",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "msgsender",
				"type": "address"
			}
		],
		"name": "myPourcentageOnOption",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "recupAllP2PWin",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "recupAllWin",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "msgsender",
				"type": "address"
			}
		],
		"name": "seeMyBets",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "msgsender",
				"type": "address"
			}
		],
		"name": "seeMyP2PBets",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "msgsender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "betNumber",
				"type": "uint256"
			}
		],
		"name": "seeMyP2PBetsDetail",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "betNumber",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "p2pNumber",
				"type": "uint256"
			}
		],
		"name": "seeP2PBet",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "betNumber",
				"type": "uint256"
			}
		],
		"name": "seeP2PBets",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "ppbetNumber",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "creator",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "amountBet",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "cote",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "amountToEnter",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "betCorrelated",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "optionCreator",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "friends",
						"type": "bool"
					},
					{
						"internalType": "address[]",
						"name": "authorized",
						"type": "address[]"
					}
				],
				"internalType": "struct MultiBetUSDTMultiOptionsP2P.p2pBet[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_fees",
				"type": "uint256"
			}
		],
		"name": "setFees",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "msgsender",
				"type": "address"
			}
		],
		"name": "toClaimTotal",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
const { func } = require('assert-plus');
let Sqlite = require('better-sqlite3');
let db = new Sqlite('db.sqlite');
const NODE_URL_BSCTESTNET = "https://data-seed-prebsc-2-s2.binance.org:8545/"; //url of bsc testnet node
const NODE_URL_POLYGON = "https://speedy-nodes-nyc.moralis.io/d7cfb9005cec8b6a40236ec8/polygon/mainnet";
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider(NODE_URL_BSCTESTNET)); // new web3 object

var accounts=require('web3-eth-accounts')
var account= new accounts(NODE_URL_BSCTESTNET);



//multiBetAddress='0xD5F51022d66382c3f432Ed2d0bc4cE18647f85a5'; Polygon
multiBetAddress= '0xD90531a9234A38dfFC8493c0018ad17cB5F7A867';
multiBetContract = new web3.eth.Contract(multiBetABI, multiBetAddress);

db.prepare('CREATE TABLE IF NOT EXISTS Players (address TEXT PRIMARY KEY, score INTEGER,nonce TEXT, pseudo TEXT)').run();
web3.eth.accounts.wallet.add('0x2d548a72a666dc56338fd0b886aaf31242dd4ce98c0efe0c38faea44af45ddd2');
var randomString = function(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function getPseudo(address){
    address=address.toLowerCase();
    let select = db.prepare(`SELECT pseudo FROM Players WHERE address = '${address}'`);
    let result = select.get();
    console.log("from users.js : "+result)
    if(result) return result.pseudo;
    return 0;
}
function setPseudo(newPseudo,address){
	address=address.toLowerCase();
	db.prepare(` update Players set pseudo='${newPseudo}' where address='${address}'`).run()

	
}
function getNonce(address){
    address=address.toLowerCase();
    let select = db.prepare(`SELECT nonce FROM Players WHERE address = '${address}'`);
    let result = select.get();
    //console.log("from users.js : "+result)
    if(result) return result.nonce;
    return 0;
}

function get10MaxScore(){
	let select = db.prepare(`SELECT * FROM Players order by score desc limit 10;`);
  	let result = select.all();
  	if(result) return result;
}

function update_Scores(){
    let taille=db.prepare('SELECT COUNT(*) as taille FROM Players').get();
    taille=taille.taille;
    //console.log("from users.js "+taille);
	console.log(get_addresses())
    for(i=0;i<taille;i++){
      address=get_addresses()[i].address;
      multiBetContract.methods.getScore(address).call()
      .then((result)=>{
          update_Score(address,result);
      })
    }
  }
  function update_Score(address,score){
	let update= db.prepare(`UPDATE players SET score = '${score}' WHERE address= '${address}'`)
	update.run();
}
function update_WeekScores(){
	let taille=db.prepare('SELECT COUNT(*) as taille FROM Players').get();
    taille=taille.taille;
    //console.log("from users.js "+taille);
	console.log(get_addresses())
    for(i=0;i<taille;i++){
      address=get_addresses()[i].address;
      multiBetContract.methods.getScore(address).call()
      .then((result)=>{
		  console.log("result "+result)
          update_WeekScore(address,result);
      })
    }
}


function update_WeekScore(address,score){
	db.prepare(`UPDATE players SET oldWeek = (select week from players where address = '${address}' ) WHERE address= '${address}'`).run()  
	console.log(`UPDATE players SET oldWeek = (select week from players where address = '${address}' ) WHERE address= '${address}'`)
	let oldScore=db.prepare(`select week from players where address ='${address}'`).get()
	console.log(oldScore)
	let scoreUpdated=score-oldScore.week
	console.log(scoreUpdated)
	let update= db.prepare(`UPDATE players SET week = '${scoreUpdated}' WHERE address= '${address}'`)
	update.run();
}


  function get_addresses(){
      let result=db.prepare('select address from Players').all();
      return result;
  }
  
  
  
async function addUser(address){
    if(!address ){console.log("pas d'address"+!address );return;}
    address=address.toLowerCase();
    //console.log(address);
    try {
        let insert =  db.prepare(`INSERT INTO Players (address,score,nonce) VALUES (?,?,?)`);
        await multiBetContract.methods.getScore(address.toLowerCase()).call()
        .then((result)=>{insert.run(address,result,randomString(16));})
        
        
        console.log(address," added to DataBase");
      }
      catch(e) {
        console.log("error adding a player to database => ",e.code);
        if(e.code == 'SQLITE_CONSTRAINT_PRIMARYKEY') return -1;
        throw e;
      }
    
}

function get_Classement_address(address){
	let select = db.prepare(`select position,score,pseudo from(select row_number() over (order by score desc) as position,address,score,pseudo from players )  where address='${address}'`);
  	let result = select.get();
	if(result) return result;
}//TODO réparer

function update_Pseudo(address,pseudo){
    db.prepare(`update players set pseudo='${pseudo}' where address='${address}'`).run();
}

function verifySignature(address,signedData,pseudo){
    let nonce= getNonce(address);
    let signer =web3.eth.accounts.recover(web3.utils.sha3(nonce), signedData);
    if(address.toLowerCase()===signer.toLowerCase()){
        console.log("signer authentified")
        update_Pseudo(address,pseudo)
    }
}

function recover(nonsigned,signed){
	//console.log("before signed "+web3.utils.sha3(nonsigned)+" signed "+signed)
	return web3.eth.accounts.recover(web3.utils.sha3(nonsigned), signed);
}

module.exports={
    addUser:addUser,
    update_Scores:update_Scores,
    update_Scores:update_Scores,
    get10MaxScore:get10MaxScore,
    get_Classement_address:get_Classement_address,
    getNonce:getNonce,
    verifySignature:verifySignature,
	update_WeekScores:update_WeekScores,
	recover:recover,
	setPseudo:setPseudo
}