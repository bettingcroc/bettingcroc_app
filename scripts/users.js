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
const { func } = require('assert-plus');
let Sqlite = require('better-sqlite3');
let db = new Sqlite('db.sqlite');
const NODE_URL_BSCTESTNET = "https://data-seed-prebsc-1-s1.binance.org:8545/"; //url of bsc testnet node
//const NODE_URL_BSCTESTNET = "https://rpc.ankr.com/bsc_testnet_chapel";
const NODE_URL_POLYGON = "https://speedy-nodes-nyc.moralis.io/d7cfb9005cec8b6a40236ec8/polygon/mainnet";
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider(NODE_URL_BSCTESTNET)); // new web3 object

var accounts = require('web3-eth-accounts')
var account = new accounts(NODE_URL_BSCTESTNET);



//multiBetAddress='0xD5F51022d66382c3f432Ed2d0bc4cE18647f85a5'; Polygon
multiBetAddress = '0xBD445c5A2C4197ce12DE4e28473dE471aD21D8B5';
multiBetContract = new web3.eth.Contract(multiBetABI, multiBetAddress);

db.prepare('CREATE TABLE IF NOT EXISTS Players (address TEXT PRIMARY KEY, score INTEGER, pseudo TEXT)').run();
db.prepare('create TABLE IF NOT EXISTS friendsLinks (address1 TEXT,address2 text)').run();
//db.prepare('drop table friendsRequests').run()
db.prepare('create TABLE IF NOT EXISTS friendsRequests (id INTEGER PRIMARY KEY,address1 TEXT,address2 text,header text,body text,dateRequest date)').run();

web3.eth.accounts.wallet.add('0x2d548a72a666dc56338fd0b886aaf31242dd4ce98c0efe0c38faea44af45ddd2');



function getPseudo(address) {
	address = address.toLowerCase();
	let select = db.prepare(`SELECT pseudo FROM Players WHERE address = '${address}'`);
	let result = select.get();
	console.log("from users.js : " + result)
	if (result) return result.pseudo;
	return 0;
}
function setPseudo(newPseudo, address) {
	address = address.toLowerCase();
	db.prepare(` update Players set pseudo='${newPseudo}' where address='${address}'`).run()


}
function newFriendRequest(args, address) {
	//console.log(args)
	//console.log(address)
	let insert = db.prepare(`INSERT INTO friendsRequests (address1,address2,header,body,dateRequest,read) VALUES (?,?,?,?,?,?)`);
	timeNow = new Date().toLocaleTimeString();
	dateNow = new Date().toLocaleDateString();
	//console.log(address,args.newFriend,args.head, JSON.stringify(args),dateNow+" "+timeNow)
	insert.run(address, args.newFriend.toLowerCase(), args.head, JSON.stringify(args), dateNow + " " + timeNow, 0);
}

function newBetInvitation(args, address) {
	console.log(args)
	console.log(address)
	let insert = db.prepare(`INSERT INTO friendsRequests (address1,address2,header,body,dateRequest,read) VALUES (?,?,?,?,?,?)`);
	timeNow = new Date().toLocaleTimeString();
	dateNow = new Date().toLocaleDateString();
	//console.log(address,args.newFriend,args.head, JSON.stringify(args),dateNow+" "+timeNow)
	insert.run(address, args.address.toLowerCase(), args.head, JSON.stringify(args), dateNow + " " + timeNow), 0;
}

function areUsersFriends(address1, address2) {
	let select = db.prepare(`select * from friendsLinks where address1='${address1}' and address2='${address2}'`);
	let result = select.get();
	if (result) return true

	else return false
}

function answerRequest(args, address) {
	console.log(address)
	console.log(address)
	if (args.head === "newFriend") {
		let insert = db.prepare(`INSERT INTO friendsLinks (address1,address2) VALUES (?,?)`);
		insert.run(address.toLowerCase(), args.newFriend.toLowerCase());
		insert.run(args.newFriend.toLowerCase(), address.toLowerCase());
		let del = db.prepare('DELETE FROM friendsRequests WHERE id=' + args.id)
		del.run()
	}
}
function removeFriend(args, address) {
	let del = db.prepare(`DELETE from friendsLinks where address1='` + address.toLowerCase() + `' and address2='` + args.oldFriend.toLowerCase() + `'`);
	del.run();
	let del2 = db.prepare(`DELETE from friendsLinks where address1='` + args.oldFriend.toLowerCase() + `' and address2='` + address.toLowerCase() + `'`);
	del2.run();
}


function get10MaxScore() {
	let select = db.prepare(`SELECT * FROM Players order by score desc limit 10;`);
	let result = select.all();
	if (result) return result;
}
function getFriendsClassement(address) {
	address = address.toLowerCase()
	request = `SELECT * FROM players where address in (select address2 from friendsLinks where address1='${address}' union SELECT distinct address1 from friendsLinks where address1='${address}') order by score desc;`
	let select = db.prepare(request);
	let result = select.all();
	if (result) return result;
}

function update_Scores() {
	let taille = db.prepare('SELECT COUNT(*) as taille FROM Players').get();
	taille = taille.taille;
	//console.log("from users.js "+taille);
	console.log(get_addresses())
	for (i = 0; i < taille; i++) {
		address = get_addresses()[i].address;
		multiBetContract.methods.getScoreUser(address).call()
			.then((result) => {
				update_Score(address, result);
			})
	}
}
function update_Score(address, score) {
	let update = db.prepare(`UPDATE players SET score = '${score}' WHERE address= '${address}'`)
	update.run();
}
function update_WeekScores() {
	let taille = db.prepare('SELECT COUNT(*) as taille FROM Players').get();
	taille = taille.taille;
	//console.log("from users.js "+taille);
	console.log(get_addresses())
	for (i = 0; i < taille; i++) {
		address = get_addresses()[i].address;
		multiBetContract.methods.getScoreUser(address).call()
			.then((result) => {
				console.log("result " + result)
				update_WeekScore(address, result);
			})
	}
}


function update_WeekScore(address, score) {
	db.prepare(`UPDATE players SET oldWeek = (select week from players where address = '${address}' ) WHERE address= '${address}'`).run()
	console.log(`UPDATE players SET oldWeek = (select week from players where address = '${address}' ) WHERE address= '${address}'`)
	let oldScore = db.prepare(`select week from players where address ='${address}'`).get()
	console.log(oldScore)
	let scoreUpdated = score - oldScore.week
	console.log(scoreUpdated)
	let update = db.prepare(`UPDATE players SET week = '${scoreUpdated}' WHERE address= '${address}'`)
	update.run();
}


function get_addresses() {
	let result = db.prepare('select address from Players').all();
	return result;
}



async function addUser(address) {
	if (!address) { console.log("pas d'address" + !address); return; }
	address = address.toLowerCase();
	console.log(address);
	try {
		let insert = db.prepare(`INSERT INTO Players (address,score) VALUES (?,?)`);
		/*await multiBetContract.methods.getScoreUser(address).call()
			.then((result) => {
				console.log("new user score :" + result)
			})*/
		await multiBetContract.methods.getScoreUser(address.toLowerCase()).call()
			.then((result) => {
				console.log("new user score :" + result)
				insert.run(address, result);
				console.log(address, " added to DataBase with ", address, " ", result);
			})

	}
	catch (e) {
		console.log(e)
		//console.log("error adding a player to database => ", e.code);
		if (e.code === 'SQLITE_CONSTRAINT_PRIMARYKEY') return -1;
		throw e;
	}

}

function get_Classement_address(address) {
	let select = db.prepare(`select position,score,pseudo from(select row_number() over (order by score desc) as position,address,score,pseudo from players )  where address='${address}'`);
	let result = select.get();
	if (result) return result;
}

function update_Pseudo(address, pseudo) {
	db.prepare(`update players set pseudo='${pseudo}' where address='${address}'`).run();
}



function recover(nonsigned, signed) {
	var hex = ''
	for (var i = 0; i < nonsigned.length; i++) {
		hex += '' + nonsigned.charCodeAt(i).toString(16)
	}
	var hexMessage = "0x" + hex
	console.log(hexMessage)
	//console.log("before signed "+web3.utils.sha3(nonsigned)+" signed "+signed)
	return web3.eth.accounts.recover(hexMessage, signed);
}



module.exports = {
	addUser: addUser,
	update_Scores: update_Scores,
	update_Scores: update_Scores,
	get10MaxScore: get10MaxScore,
	get_Classement_address: get_Classement_address,
	//verifySignature: verifySignature,
	update_WeekScores: update_WeekScores,
	recover: recover,
	setPseudo: setPseudo,
	newFriendRequest: newFriendRequest,
	answerRequest: answerRequest,
	removeFriend: removeFriend,
	areUsersFriends: areUsersFriends,
	newBetInvitation: newBetInvitation,
	getFriendsClassement: getFriendsClassement
}
