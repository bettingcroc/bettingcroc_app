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


const NODE_URL_BSCTESTNET = "https://data-seed-prebsc-2-s2.binance.org:8545/"; //url of bsc testnet node
const NODE_URL_POLYGON = "https://speedy-nodes-nyc.moralis.io/d7cfb9005cec8b6a40236ec8/polygon/mainnet";
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider(NODE_URL_BSCTESTNET)); // new web3 object

const { readFile } = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(readFile);
const model = require('./model');
const users = require('./users');
const { title } = require('process');

//multiBetAddress='0xD5F51022d66382c3f432Ed2d0bc4cE18647f85a5'; Polygon
multiBetAddress='0xd59F3464aFA2b0a1E75C75d417707c985E50Bf8B';
multiBetContract = new web3.eth.Contract(multiBetABI, multiBetAddress);


const READ_OPTIONS = { encoding: 'UTF-8' };
const BET_URL = '../html/componsantes/betPagePattern.html';
const POOL_BOX_URL = '../html/componsantes/poolBox.html';
const INDEX_URL = '../html/componsantes/index.html';
const P2P_BOX=  '../html/componsantes/p2pOptionsBox.html';
const CLASSEMENT_URL=  '../html/componsantes/classement.html';
const LIGNES_URL=  '../html/componsantes/lignesClassement.html';

async function betHTMLGenerator(betNumber, nameBet, options, listOptions) {
	winner = '';
	await multiBetContract.methods.isDead(betNumber).call()
		.then(async function (result) {
			if (result == true) {
				await multiBetContract.methods.getWinner(betNumber).call()
					.then(function (result) { winner = 'Winner is ' + model.get_List(betNumber).split(",")[result]; })
			}
			else {
				await multiBetContract.methods.isClosed(betNumber).call()
					.then((result) => {
						if (result == true) { winner = "Bet Closed but not ended"; }
						else { winner = "Bet still open, will close on " + new Date(model.get_Date(betNumber) * 1000).toDateString() + " at " + new Date(model.get_Date(betNumber) * 1000).toLocaleTimeString() }
					})
			}
		})
	pools = '';
	boxPool = await readFileAsync(POOL_BOX_URL, READ_OPTIONS);
	var p2pBoxes='';
	var p2pBox = await readFileAsync(P2P_BOX, READ_OPTIONS);
	for (i = 0; i < options; i++) {
		const temp = boxPool.replace(/::nbr::/gi, i);
		pools = pools + temp;
		const temp2 = p2pBox.replace(/::nbr::/gi, i);
		p2pBoxes = p2pBoxes +temp2;
	}
	const contenu = await readFileAsync(BET_URL, READ_OPTIONS);
	//console.log(contenu);
	var re = /::BETNUMBER::/gi;
	date = timeConverter(model.get_Date(betNumber));
	returnable = contenu.replace('{{POOLS}}', pools).replace('{{P2PBOXES}}',p2pBoxes).replace(re, betNumber).replace('::NAMEBET::', nameBet + " le " + date);

	selects='';
	for(i=0;i<options;i++){
		selects=selects+'<option value="valeur'+i+'">'+listOptions.split(",")[i]+'</option>';
	}
	
	for (i = 0; i < options; i++) {
		returnable = returnable.replace('namePool' + i, listOptions.split(",")[i]).replace('option' + i, listOptions.split(",")[i]);
	}
	//console.log(returnable.replace('{{SELECTOPTIONS}}',selects));
	return returnable.replace('::WINNERBET::', winner).replace('{{SELECTOPTIONS}}',selects);
}

async function indexHTMLGenerator() {
	timeNow = new Date().getTime() - 10800;
	timeNow = new Date(timeNow);
	//console.log(Math.floor(timeNow.getTime()/1000));
	arrayIndex = model.get_CLosestDates(Math.floor(timeNow.getTime() / 1000));
	//console.log("array index ",arrayIndex);
	list = ''
	opt = arrayIndex.length;
	for (i = 0; i < opt; i++) {
		nameBet = model.get_Name(arrayIndex[i]["betNumber"]);
		date = timeConverter(model.get_Date(arrayIndex[i]["betNumber"]));
		emoji = '';
		if (model.get_Type(arrayIndex[i]["betNumber"]) == 'football') { emoji = '⚽' }
		if (model.get_Type(arrayIndex[i]["betNumber"]) == 'basketball') { emoji = '🏀' }
		list = list + '<br><a class="linkBet" id="linkBet' + arrayIndex[i]["betNumber"] + '" href="/bet/' + arrayIndex[i]["betNumber"] + '">' + emoji + ' Bet ' + arrayIndex[i]["betNumber"] + ' :' + nameBet + ' on ' + date + '</a><br>';
	}
	contenu = await readFileAsync(INDEX_URL, READ_OPTIONS);
	contenu = contenu.replace('::LISTBETS::', list)

	return contenu.replace('::CLICKSIMULATION::', '');;
}

async function typeHTMLGenerator(type) {
	timeNow = new Date().getTime() - 10800;
	timeNow = new Date(timeNow);
	//console.log(Math.floor(timeNow.getTime()/1000));
	arrayIndex = model.get_CLosestDatesByType(Math.floor(timeNow.getTime() / 1000), type);
	//console.log("array index ",arrayIndex);
	list = ''
	opt = arrayIndex.length;
	for (i = 0; i < opt; i++) {
		nameBet = model.get_Name(arrayIndex[i]["betNumber"]);
		date = timeConverter(model.get_Date(arrayIndex[i]["betNumber"]));
		emoji = '';
		if (model.get_Country(arrayIndex[i]["betNumber"]) == ('USA')) { emoji = '<span class="emoji">🇺🇸</span>' };
		if (model.get_Country(arrayIndex[i]["betNumber"]) == ('England')) { emoji = '<span class="emoji">🇬🇧</span>' };
		if (model.get_Country(arrayIndex[i]["betNumber"]) == ('Spain')) { emoji = '<span class="emoji">🇪🇸</span>' };
		if (model.get_Country(arrayIndex[i]["betNumber"]) == ('Italy')) { emoji = '<span class="emoji">🇮🇹</span>' };
		if (model.get_Country(arrayIndex[i]["betNumber"]) == ('France')) { emoji = '<span class="emoji">🇫🇷</span>' };

		list = list + '<br><a class="linkBet" id="linkBet' + arrayIndex[i]["betNumber"] + '" href="/bet/' + arrayIndex[i]["betNumber"] + '">' + emoji + ' Bet ' + arrayIndex[i]["betNumber"] + ' :' + nameBet + ' on ' + date + '</a><br>';
	}
	//console.log(arrayIndex);
	contenu = await readFileAsync(INDEX_URL, READ_OPTIONS);
	contenu = contenu.replace('::LISTBETS::', list);
	titlePage = '';
	clickSimul = '';
	if (type === 'football') { titlePage = 'Football ⚽'; clickSimul = 'simulate(document.getElementById("btnFoot"), "click");' }
	if (type === 'basketball') { titlePage = 'Basketball 🏀'; clickSimul = 'simulate(document.getElementById("btnBasket"), "click");' }

	return contenu.replace('::TYPE::', titlePage).replace('::CLICKSIMULATION::', clickSimul);;
}

async function typeCountryHTMLGenerator(type, league) {
	timeNow = new Date().getTime() - 10800;
	timeNow = new Date(timeNow);
	//console.log(Math.floor(timeNow.getTime()/1000));
	arrayIndex = model.get_CLosestDatesByTypeAndCountry(Math.floor(timeNow.getTime() / 1000), type, league);
	//console.log("array index ", arrayIndex);
	list = ''
	opt = arrayIndex.length;
	console.log("opt " + opt)
	if (opt < 14) {
		for (i = 0; i < 14 - opt; i++) {
			arrayIndex.push({ "betNumber": 0 })
		}
		opt = 14;
	}
	for (i = 0; i < opt; i++) {
		nameBet = model.get_Name(arrayIndex[i]["betNumber"]);
		date = timeConverter(model.get_Date(arrayIndex[i]["betNumber"]));
		emoji = '';
		if (model.get_Country(arrayIndex[i]["betNumber"]) == ('USA')) { emoji = '<span class="emoji">🇺🇸</span>' };
		if (model.get_Country(arrayIndex[i]["betNumber"]) == ('England')) { emoji = '<span class="emoji">🇬🇧</span>' };
		if (model.get_Country(arrayIndex[i]["betNumber"]) == ('Spain')) { emoji = '<span class="emoji">🇪🇸</span>' };
		if (model.get_Country(arrayIndex[i]["betNumber"]) == ('Italy')) { emoji = '<span class="emoji">🇮🇹</span>' };
		if (model.get_Country(arrayIndex[i]["betNumber"]) == ('France')) { emoji = '<span class="emoji">🇫🇷</span>' };
		if (arrayIndex[i]["betNumber"] > 0) { list = list + '<br><a class="linkBet" id="linkBet' + arrayIndex[i]["betNumber"] + '" href="/bet/' + arrayIndex[i]["betNumber"] + '">' + emoji + ' Bet ' + arrayIndex[i]["betNumber"] + ' :' + nameBet + ' on ' + date + '</a><br>'; }
		else { list = list + '<br><a class="linkBet" id="linkBet' + arrayIndex[i]["betNumber"] + '" href="/bet/' + arrayIndex[i]["betNumber"] + '">' + '</a><br>'; }

	}
	//console.log(arrayIndex);
	contenu = await readFileAsync(INDEX_URL, READ_OPTIONS);
	contenu = contenu.replace('::LISTBETS::', list);
	titlePage = '';
	clickSimul = '';
	if (type === 'football') { titlePage = 'Football ⚽'; clickSimul = 'simulate(document.getElementById("btnFoot"), "click");' }
	if (type === 'basketball') { titlePage = 'Basketball 🏀'; clickSimul = 'simulate(document.getElementById("btnBasket"), "click");' }


	return contenu.replace('::TYPE::', titlePage).replace('::CLICKSIMULATION::', clickSimul);
}

async function typeLeagueHTMLGenerator(type, league) {
	timeNow = new Date().getTime() - 10800;
	timeNow = new Date(timeNow);
	//console.log(Math.floor(timeNow.getTime()/1000));
	arrayIndex = model.get_CLosestDatesByTypeAndLeague(Math.floor(timeNow.getTime() / 1000), type, league);
	//console.log("array index ", arrayIndex);
	list = ''
	opt = arrayIndex.length;
	console.log("opt " + opt)
	if (opt < 14) {
		for (i = 0; i < 14 - opt; i++) {
			arrayIndex.push({ "betNumber": 0 })
		}
		opt = 14;
	}
	for (i = 0; i < opt; i++) {
		nameBet = model.get_Name(arrayIndex[i]["betNumber"]);
		date = timeConverter(model.get_Date(arrayIndex[i]["betNumber"]));
		emoji = '';
		if (model.get_Country(arrayIndex[i]["betNumber"]) == ('USA')) { emoji = '<span class="emoji">🇺🇸</span>' };
		if (model.get_Country(arrayIndex[i]["betNumber"]) == ('England')) { emoji = '<span class="emoji">🇬🇧</span>' };
		if (model.get_Country(arrayIndex[i]["betNumber"]) == ('Spain')) { emoji = '<span class="emoji">🇪🇸</span>' };
		if (model.get_Country(arrayIndex[i]["betNumber"]) == ('Italy')) { emoji = '<span class="emoji">🇮🇹</span>' };
		if (model.get_Country(arrayIndex[i]["betNumber"]) == ('France')) { emoji = '<span class="emoji">🇫🇷</span>' };
		if (arrayIndex[i]["betNumber"] > 0) { list = list + '<br><a class="linkBet" id="linkBet' + arrayIndex[i]["betNumber"] + '" href="/bet/' + arrayIndex[i]["betNumber"] + '">' + emoji + ' Bet ' + arrayIndex[i]["betNumber"] + ' :' + nameBet + ' on ' + date + '</a><br>'; }
		else { list = list + '<br><a class="linkBet" id="linkBet' + arrayIndex[i]["betNumber"] + '" href="/bet/' + arrayIndex[i]["betNumber"] + '">' + '</a><br>'; }

	}
	//console.log(arrayIndex);
	contenu = await readFileAsync(INDEX_URL, READ_OPTIONS);
	contenu = contenu.replace('::LISTBETS::', list);
	titlePage = '';
	clickSimul = '';
	if (type === 'football') { titlePage = 'Football ⚽'; clickSimul = 'simulate(document.getElementById("btnFoot"), "click");' }
	if (type === 'basketball') { titlePage = 'Basketball 🏀'; clickSimul = 'simulate(document.getElementById("btnBasket"), "click");' }


	return contenu.replace('::TYPE::', titlePage).replace('::CLICKSIMULATION::', clickSimul);
}

async function classementHTMLGenerator(){
	classementHTML = await readFileAsync(CLASSEMENT_URL,READ_OPTIONS);
	let lignes=""
	
	dbRequest=users.get10MaxScore()
	//console.log(dbRequest);
	for(i=0;i<dbRequest.length;i++){
		//lignes
		let line= await readFileAsync(LIGNES_URL,READ_OPTIONS);
		line=line.replace("::address::",dbRequest[i].address).replace("::pseudo::",dbRequest[i].pseudo).replace("::score::",dbRequest[i].score).replace("::rank::",i+1)
		lignes=lignes+line
	}
	lignes=lignes+"<tr ><td></td><td></td><td></td><td></td></tr>"
	lignes=lignes+"<tr ><td id='myAddress'></td><td id='myPseudo'></td><td id='myScore'></td><td id='myRank'></td></tr>"
	//console.log(lignes);
	return classementHTML.replace("::LIGNES::",lignes);
}

function timeConverter(UNIX_timestamp) {
	var a = new Date(UNIX_timestamp * 1000);
	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	var year = a.getFullYear();
	var month = months[a.getMonth()];
	var date = a.getDate();
	var hour = a.getHours();
	var min = a.getMinutes();
	var sec = a.getSeconds();
	var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
	return time;
}

module.exports.betHTMLGenerator = betHTMLGenerator;
module.exports.indexHTMLGenerator = indexHTMLGenerator;
module.exports.typeHTMLGenerator = typeHTMLGenerator;
module.exports.typeCountryHTMLGenerator = typeCountryHTMLGenerator;
module.exports.typeLeagueHTMLGenerator = typeLeagueHTMLGenerator;
module.exports.classementHTMLGenerator = classementHTMLGenerator;