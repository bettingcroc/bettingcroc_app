/* global BigInt */

multiBetABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "previousAdminRole",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "newAdminRole",
				"type": "bytes32"
			}
		],
		"name": "RoleAdminChanged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "RoleGranted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "RoleRevoked",
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
		"inputs": [],
		"name": "CREATOR_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "DEFAULT_ADMIN_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ENDER_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "PAUSER_ROLE",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256[]",
				"name": "arr",
				"type": "uint256[]"
			}
		],
		"name": "arrayReverser",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
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
				"internalType": "uint256",
				"name": "betNumber",
				"type": "uint256"
			}
		],
		"name": "cancelBet",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "testNo",
				"type": "uint256"
			}
		],
		"name": "checkEven",
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
		"inputs": [],
		"name": "claimFeesMoney",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "claimMoney",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "claimMoneyFromP2P",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "claimTotalMoney",
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
		"inputs": [],
		"name": "constructor1",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256[]",
				"name": "list",
				"type": "uint256[]"
			}
		],
		"name": "countZeros",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "pure",
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
				"name": "index",
				"type": "uint256"
			},
			{
				"internalType": "uint256[]",
				"name": "list",
				"type": "uint256[]"
			}
		],
		"name": "deleteIndexFromUint256Array",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "pure",
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
			}
		],
		"name": "getAddressesPayedP2P",
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
		"name": "getAmountBettedFromUserP2P",
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
				"name": "option",
				"type": "uint256"
			}
		],
		"name": "getAmountInPool",
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
				"name": "option",
				"type": "uint256"
			}
		],
		"name": "getAmountInPoolEnd",
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
				"name": "option",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "msgsender",
				"type": "address"
			}
		],
		"name": "getAmountInPoolFromUser",
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
				"name": "option",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "msgsender",
				"type": "address"
			}
		],
		"name": "getAmountInPoolFromUserEnd",
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
		"name": "getAmountLosedOnBet",
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
		"name": "getAmountToClaimForOwner",
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
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "getBetNameToBetNumber",
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
		"name": "getBetNumberToBetName",
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
			}
		],
		"name": "getBetNumberToLastBetP2P",
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
		"name": "getBetOptions",
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
		"name": "getCanceled",
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
		"name": "getClosed",
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
		"name": "getDead",
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
		"inputs": [],
		"name": "getFeesRate",
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
			},
			{
				"internalType": "uint256",
				"name": "betNumber",
				"type": "uint256"
			}
		],
		"name": "getHasUserWon",
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
				"name": "msgsender",
				"type": "address"
			},
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
		"name": "getHasUserWonP2P",
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
		"inputs": [],
		"name": "getLastBetNumber",
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
				"internalType": "uint256[]",
				"name": "list",
				"type": "uint256[]"
			}
		],
		"name": "getLowerIndexMinimum",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
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
				"name": "optionAgainst",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "minToEnter",
				"type": "uint256"
			}
		],
		"name": "getMaxCoteP2PBet",
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
				"internalType": "address",
				"name": "msgsender",
				"type": "address"
			}
		],
		"name": "getMyBetsUser",
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
		"name": "getP2PBet",
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
		"name": "getP2PBets",
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
				"internalType": "struct MultiBetUSDTMultiOptions.p2pBet[]",
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
		"name": "getPercentageOnOptionFromUser",
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
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			}
		],
		"name": "getRoleAdmin",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
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
		"name": "getScoreUser",
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
		"name": "getTotalMoneyBet",
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
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "grantRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "hasRole",
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
				"internalType": "address",
				"name": "addressToTest",
				"type": "address"
			}
		],
		"name": "isAddressPayed",
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
				"internalType": "uint256[2]",
				"name": "element",
				"type": "uint256[2]"
			},
			{
				"internalType": "uint256[2][]",
				"name": "list",
				"type": "uint256[2][]"
			}
		],
		"name": "isInArrayArray",
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
				"internalType": "address",
				"name": "msgsender",
				"type": "address"
			}
		],
		"name": "moneyWonFromUser1Bet",
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
		"name": "proxiableUUID",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "renounceRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "role",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "revokeRole",
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
		"name": "seeMyP2PBetsUser",
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
		"name": "seeMyP2PBetsUserDetail",
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
				"internalType": "uint256[]",
				"name": "data",
				"type": "uint256[]"
			}
		],
		"name": "sort",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "interfaceId",
				"type": "bytes4"
			}
		],
		"name": "supportsInterface",
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
				"name": "msgsender",
				"type": "address"
			}
		],
		"name": "totalMoneyWonFromUser",
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
		"name": "totalMoneyWonFromUserP2P",
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
				"name": "newCode",
				"type": "address"
			}
		],
		"name": "updateCode",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

//const NODE_URL_BSCTESTNET = "https://data-seed-prebsc-1-s1.binance.org:8545/"; //url of bsc testnet node
const NODE_URL_BSCTESTNET = "https://data-seed-prebsc-1-s1.binance.org:8545";
const NODE_URL_POLYGON = "https://speedy-nodes-nyc.moralis.io/d7cfb9005cec8b6a40236ec8/polygon/mainnet";
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider(NODE_URL_BSCTESTNET)); // new web3 object


//multiBetAddress='0xD5F51022d66382c3f432Ed2d0bc4cE18647f85a5'; Polygon
multiBetAddress = '0xBD445c5A2C4197ce12DE4e28473dE471aD21D8B5';
multiBetContract = new web3.eth.Contract(multiBetABI, multiBetAddress);


let Sqlite = require('better-sqlite3');

let db = new Sqlite('db.sqlite');
db.prepare('CREATE TABLE IF NOT EXISTS Bets (betNumber INTEGER PRIMARY KEY, options INTEGER, optionsArray TEXT, date INTEGER, closed BOOLEAN, type TEXT, country TEXT, league TEXT, idAPI INTEGER)').run();

var randomString = function (length) {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (var i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}
function newNonce() {
	nonce = "Login to Bettingcroc : " + randomString(6)
	return nonce
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
function get_Name(betNumber) {
	//console.log("betNumber to print",betNumber);
	let select = db.prepare(`SELECT optionsArray FROM Bets WHERE betNumber = '${betNumber}'`);
	let result = select.get();
	array = result.optionsArray.split(',');
	if (result) return array[0] + " - " + array[array.length - 1];
	return null;
}

function get_Options(betNumber) {
	let select = db.prepare(`SELECT options FROM Bets WHERE betNumber = '${betNumber}'`);
	let result = select.get();
	if (result) return result.options;
	return null;
}

function get_List(betNumber) {
	let select = db.prepare(`SELECT optionsArray FROM Bets WHERE betNumber = '${betNumber}'`);
	let result = select.get();
	if (result) return result.optionsArray;
	return null;
}

function get_Date(betNumber) {
	let select = db.prepare(`SELECT date FROM Bets WHERE betNumber = '${betNumber}'`);
	let result = select.get();
	if (result) return result.date;
	return null;
}

function get_MaxBet() {
	let select = db.prepare('SELECT MAX(betNumber) as "MaxBet" FROM Bets ');
	let result = select.get();
	//betNumber=0;
	if (result) return result.MaxBet;
}

function get_BetBetween2dates(date1, date2) {
	let select = db.prepare(`SELECT betNumber from bets where date>'${date1}' and date<'${date2}'`);
	let result = select.all();
	if (result) return result;
}

function get_Type(betNumber) {
	let select = db.prepare(`SELECT type FROM Bets WHERE betNumber = '${betNumber}'`);
	let result = select.get();
	if (result) return result.type;
	return null;
}

/*function get_CLosestDates(date) {
	let select = db.prepare(`select betNumber from bets where date>'${date}' limit 14`);
	let result = select.all();
	if (result) return result;
	return null;
}*/

function get_CLosestDatesByType(date, type) {
	let select = db.prepare(`select betNumber from bets where date>'${date}' and type='${type}' limit 14`);
	let result = select.all();
	if (result) return result;
	return null;
}

function get_Country(betNumber) {
	let select = db.prepare(`SELECT country FROM Bets WHERE betNumber = '${betNumber}'`);
	let result = select.get();
	if (result) return result.country;

	return null;
}

function get_ScoreHome(betNumber) {
	let select = db.prepare(`SELECT scoreHome FROM Bets WHERE betNumber = '${betNumber}'`);
	let result = select.get();
	if (result) return result.scoreHome;

	return null;
}
function get_ScoreAway(betNumber) {
	let select = db.prepare(`SELECT scoreAway FROM Bets WHERE betNumber = '${betNumber}'`);
	let result = select.get();
	if (result) return result.scoreAway;

	return null;
}
function get_Status(betNumber) {
	let select = db.prepare(`SELECT status FROM Bets WHERE betNumber = '${betNumber}'`);
	let result = select.get();
	if (result) return result.status;

	return null;
}
function get_League(betNumber) {
	let select = db.prepare(`SELECT league FROM Bets WHERE betNumber = '${betNumber}'`);
	let result = select.get();
	if (result) return result.league;

	return null;
}

function get_idAPI(betNumber) {
	let select = db.prepare(`SELECT idAPI FROM Bets WHERE betNumber = '${betNumber}'`);
	let result = select.get();
	if (result) return result.idAPI;

	return null;
}
function get_CLosestDates(date) {
	let select = db.prepare(`select betNumber from bets where date>'${date}' limit 14`);
	let result = select.all();
	if (result) return result;
	return null;
}
function get10MaxScore() {
	let select = db.prepare(`SELECT * FROM Players order by score desc limit 10;`);
	let result = select.all();
	//console.log(result)
	if (result) return result;
}
function getTodayMatches() {
	timeNow = new Date().getTime() - 10800;
	timeNow = new Date(timeNow);
	//console.log(timeNow)
	arrayIndex = get_CLosestDates(Math.floor(timeNow.getTime() / 1000));
	//arrayIndex.push({ betNumber: 15 })
	//console.log(arrayIndex)
	let matches = { matches: [] }
	opt = arrayIndex.length;
	for (i = 0; i < opt; i++) {
		let match = {}
		match["betNumber"] = arrayIndex[i]["betNumber"]
		match["name"] = get_Name(arrayIndex[i]["betNumber"])
		match["date"] = timeConverter(get_Date(arrayIndex[i]["betNumber"]))
		match["type"] = get_Type(arrayIndex[i]["betNumber"]) === 'football' ? '⚽' : '🏀'
		matches.matches.push(match)
	}
	//console.log(matches)
	return (matches)
}
async function getTopBets() {
	timeNow = new Date().getTime() - 10800;
	timeNow = new Date(timeNow);
	//console.log(timeNow)
	arrayIndex = get_CLosestDates(Math.floor(timeNow.getTime() / 1000));
	//console.log(arrayIndex)
	let matches = { matches: [] }
	list = ''
	opt = arrayIndex.length;
	try {
		for (i = 0; i < opt; i++) {
			let match = {}
			match["betNumber"] = arrayIndex[i]["betNumber"]
			match["name"] = get_Name(arrayIndex[i]["betNumber"])
			match["date"] = timeConverter(get_Date(arrayIndex[i]["betNumber"]))
			match["type"] = get_Type(arrayIndex[i]["betNumber"]) === 'football' ? '⚽' : '🏀'
			await multiBetContract.methods.getTotalMoneyBet(arrayIndex[i]["betNumber"]).call()
				.then(function (result) {
					//console.log(i)
					//console.log(result)
					match["moneyBetted"] = result
				})
			matches.matches.push(match)
		}
		matches.matches.sort((a, b) => (BigInt(a.moneyBetted) > BigInt(b.moneyBetted) ? -1 : 1))
		//console.log({ matches: [matches.matches[0], matches.matches[1], matches.matches[2]] })
		return ({ matches: [matches.matches[0], matches.matches[1], matches.matches[2]] })
	}
	catch (e) {
		console.log(e);
		//return "error" 
	}

}
function getMatchInfo(id) {
	let optionsArray = get_List(id)
	let date = get_Date(id)
	let type = get_Type(id)
	let country = get_Country(id)
	let league = get_League(id)
	let status = get_Status(id)
	let scoreHome = get_ScoreHome(id)
	let scoreAway = get_ScoreAway(id)
	let matchInfos = {
		optionsArray: optionsArray,
		date: date,
		type: type,
		country: country,
		league: league,
		status: status,
		scoreHome: scoreHome,
		scoreAway
	}
	return matchInfos
}
function getMyScore(address) {
	let select = db.prepare(`select address,position,score,pseudo from(select row_number() over (order by score desc) as position,address,score,pseudo from players )  where address='${address}'`);
	let result = select.all();
	if (result) return result;

	return null;
}
async function getMyBets(listMatches) {
	toReturn = []
	for (m in listMatches) {
		//console.log(m)
		toReturn.push(getMatchInfo(listMatches[m]))
		toReturn[m].id = listMatches[m]
	}
	return toReturn
}

async function getMyRecentsBets(listMatches) {
	toReturn = []
	date = new Date
	date = Math.ceil(date.getTime() / 1000) - 86400
	console.log(date)
	for (m in listMatches) {
		matchInfos = getMatchInfo(listMatches[m])
		console.log(matchInfos)
		if (date <= matchInfos.date) {
			toReturn.push(matchInfos)
			toReturn[m].id = listMatches[m]
		}
	}
	return toReturn
}

async function getMyP2PBets(address) {
	let listMatches;
	await multiBetContract.methods.seeMyP2PBetsUser(address).call()
		.then(function (result) {
			console.log(result)
			listMatches = result

		}
		)
	toReturn = []
	numBet = 0
	compteur = 0
	for (m in listMatches) {
		//console.log(m)
		if (numBet === parseInt(listMatches[m])) {
			compteur++
		}
		else {
			numBet = parseInt(listMatches[m])
		}
		console.log("numBet " + numBet + " compteur " + compteur)
		//console.log(m)
		toReturn.push(getMatchInfo(listMatches[m]))
		toReturn[m].id = listMatches[m]
		await multiBetContract.methods.seeMyP2PBetsDetail(address, numBet).call()
			.then((res) => {
				toReturn[m].p2pNum = res[compteur]
			})
	}
	return toReturn
}

function getMyRequests(address, maxDate = 0) {
	//console.log(maxDate)
	if (maxDate === 0) {
		let select = db.prepare(`select address1,address2,header,body,dateRequest,read,pseudo,id from friendsRequests,Players where address2='${address}' and address=address1;`);
		let result = select.all();
		//console.log(result)
		if (result) return result;
	}
}

function getMyRequestsUnread(address) {
	let select = db.prepare(`SELECT COUNT(*) as unread FROM friendsRequests where read=0 and address2='${address}'`);
	let result = select.get();
	//console.log(result)
	if (result) return result;
}

function getMyFriends(address) {
	let select = db.prepare(`select address2,pseudo from friendsLinks,Players where address1='${address}' and address2=address`);
	let result = select.all();
	//console.log(result)
	if (result) return result;
}

function setMyRequestsRead(address) {
	let update = db.prepare(`UPDATE friendsRequests
	SET read=1
	WHERE
		read=0 and address2='${address}'`)
	update.run()
}

module.exports = {
	getTodayMatches: getTodayMatches,
	getMatchInfo: getMatchInfo,
	get10MaxScore: get10MaxScore,
	getMyScore: getMyScore,
	getMyBets: getMyBets,
	getTopBets: getTopBets,
	getMyRequests: getMyRequests,
	getMyFriends: getMyFriends,
	getMyP2PBets: getMyP2PBets,
	getMyRecentsBets: getMyRecentsBets,
	newNonce: newNonce,
	getMyRequestsUnread: getMyRequestsUnread,
	setMyRequestsRead: setMyRequestsRead
}
