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


//multiBetAddress='0xD5F51022d66382c3f432Ed2d0bc4cE18647f85a5'; Polygon
multiBetAddress= '0xD90531a9234A38dfFC8493c0018ad17cB5F7A867';
multiBetContract = new web3.eth.Contract(multiBetABI, multiBetAddress);


const READ_OPTIONS = { encoding: 'UTF-8' };
const BET_URL = './html/componsantes/betPagePattern.html';
const POOL_BOX_URL = './html/componsantes/poolBox.html';
const INDEX_URL = './html/componsantes/index.html';
const P2P_BOX=  './html/componsantes/p2pOptionsBox.html';

let Sqlite = require('better-sqlite3');

let db = new Sqlite('db.sqlite');
db.prepare('CREATE TABLE IF NOT EXISTS Bets (betNumber INTEGER PRIMARY KEY, options INTEGER, optionsArray TEXT, date INTEGER, status INTEGER, type TEXT, country TEXT, league TEXT, idAPI INTEGER)').run();









function add_bet(betNumber, option, list, date, type, country, league, idAPI) {
  if(!betNumber || !option || !list || !date || !type || !country || !league || !idAPI)  {console.log(!betNumber," ",!option," ",!list," ",!date," ",!type," ",!country," ",!league," ",idAPI, "error params"); return -1;}
  try {
    let insert = db.prepare(`INSERT INTO Bets (betNumber,options,optionsArray,date,status,type,country,league,idAPI) VALUES (?,?,?,?,?,?,?,?,?)`);
    let result = insert.run(betNumber,option,list,date,0,type,country,league,idAPI);
    console.log(betNumber," ",option," ",list," ",date," ",0," ",type," ",country," ",league," ",idAPI," added to DataBase");
    return db.prepare('SELECT betNumber FROM Bets where ROWID=(?)').get(result.lastInsertRowid)['betNumber'];
  } catch(e) {
    console.log("error adding a bet to database => ",e.code);
    if(e.code == 'SQLITE_CONSTRAINT_PRIMARYKEY') return -1;
    throw e;
  }
}

function get_Name(betNumber) {
  //console.log("betNumber to print",betNumber);
  let select = db.prepare(`SELECT optionsArray FROM Bets WHERE betNumber = '${betNumber}'`);
  let result = select.get();
  array=result.optionsArray.split(',');
  if(result) return array[0]+" vs "+array[array.length-1];
  return null;
}

function get_Options(betNumber) {
  let select = db.prepare(`SELECT options FROM Bets WHERE betNumber = '${betNumber}'`);
  let result = select.get();
  if(result) return result.options;
  return null;
}

function get_List(betNumber) {
  let select = db.prepare(`SELECT optionsArray FROM Bets WHERE betNumber = '${betNumber}'`);
  let result = select.get();
  if(result) return result.optionsArray;
  return null;
}

function get_Date(betNumber) {
  let select = db.prepare(`SELECT date FROM Bets WHERE betNumber = '${betNumber}'`);
  let result = select.get();
  if(result) return result.date;
  return null;
}

function get_MaxBet(){
  let select = db.prepare('SELECT MAX(betNumber) as "MaxBet" FROM Bets ');
  let result= select.get();
  //betNumber=0;
  if(result) return result.MaxBet;
}

function get_BetBetween2dates(date1,date2){
  let select = db.prepare(`SELECT betNumber from bets where date>='${date1}' and date<'${date2}'`);
  let result= select.all();
  if(result) return result;
}

function get_Type(betNumber){
  let select = db.prepare(`SELECT type FROM Bets WHERE betNumber = '${betNumber}'`);
  let result = select.get();
  if(result) return result.type;
  return null;
}

function get_CLosestDates(date){
  let select = db.prepare(`select betNumber from bets where date>'${date}' limit 14`);
  let result = select.all();
  if(result) return result;
  return null;
}

function get_CLosestDatesByType(date,type){
  let select = db.prepare(`select betNumber from bets where date>'${date}' and type='${type}' limit 14`);
  let result = select.all();
  if(result) return result;
  return null;
}

function get_Country(betNumber){
  let select = db.prepare(`SELECT country FROM Bets WHERE betNumber = '${betNumber}'`);
  let result = select.get();
  if(result) return result.country;
  
  return null;
}

function get_League(betNumber){
  let select = db.prepare(`SELECT league FROM Bets WHERE betNumber = '${betNumber}'`);
  let result = select.get();
  if(result) return result.league;
  
  return null;
}

function get_idAPI(betNumber){
  let select = db.prepare(`SELECT idAPI FROM Bets WHERE betNumber = '${betNumber}'`);
  let result = select.get();
  if(result) return result.idAPI;
  
  return null;
}

function get_CLosestDatesByTypeAndCountry(date,type,country){
  //console.log(date,type,country);
  var param;
  if(country==="england"){param='England'}
  if(country==="spain"){param='Spain'}
  if(country==="usa"){param='USA'}
  if(country==="italy"){param='Italy'}
  if(country==="france"){param='France'};
  let select = db.prepare(`select betNumber from bets where date>'${date}' and type='${type}' and country='${param}' limit 14`);
  let result = select.all();
  if(result) return result;
  return null;
}

function get_CLosestDatesByTypeAndLeague(date,type,league){
  //console.log(date,type,country);
  var param;
  if(league==="gleague"){param='NBA - G League'}
  if(league==="nba"){param='NBA'}
  if(league==="lnb"){param='LNB'}
  let select = db.prepare(`select betNumber from bets where date>'${date}' and type='${type}' and league='${param}' limit 14`);
  let result = select.all();
  if(result) return result;
  return null;
}

function initTest(){
  let del = db.prepare(`DELETE from bets`);
  let result= del.run();
  
  if(result) return result;
}

function closeBets(betNumbers){
	for (let bN in betNumbers){
		bN=betNumbers[bN]
		let update = db.prepare('update bets set status=1 where betNumber='+bN)
		update.run()
	}
}

module.exports = {
  add_bet:add_bet,
  get_Name:get_Name,
  get_Options:get_Options,
  get_List:get_List,
  get_Date:get_Date,
  get_MaxBet:get_MaxBet,
  get_BetBetween2dates:get_BetBetween2dates,
  initTest:initTest,
  get_CLosestDates:get_CLosestDates,
  get_CLosestDatesByType:get_CLosestDatesByType,
  get_Type:get_Type,
  get_Country:get_Country,
  get_CLosestDatesByTypeAndCountry:get_CLosestDatesByTypeAndCountry,
  get_idAPI:get_idAPI,
  get_League:get_League,
  get_CLosestDatesByTypeAndLeague:get_CLosestDatesByTypeAndLeague,
  closeBets:closeBets
};
//0xD90531a9234A38dfFC8493c0018ad17cB5F7A867
