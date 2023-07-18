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


  
const NODE_URL_BSCTESTNET = "https://data-seed-prebsc-1-s1.binance.org:8545/"; //url of bsc testnet node
//const NODE_URL_BSCTESTNET = "https://rpc.ankr.com/bsc_testnet_chapel";
const NODE_URL_POLYGON = "https://speedy-nodes-nyc.moralis.io/d7cfb9005cec8b6a40236ec8/polygon/mainnet";
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider(NODE_URL_BSCTESTNET)); // new web3 object


//multiBetAddress='0xD5F51022d66382c3f432Ed2d0bc4cE18647f85a5'; Polygon
multiBetAddress = '0xBD445c5A2C4197ce12DE4e28473dE471aD21D8B5';
multiBetContract = new web3.eth.Contract(multiBetABI, multiBetAddress);


let Sqlite = require('better-sqlite3');

let db = new Sqlite('db.sqlite');
db.prepare('CREATE TABLE IF NOT EXISTS Bets (betNumber INTEGER PRIMARY KEY, options INTEGER, optionsArray TEXT, date INTEGER, status INTEGER, type TEXT, country TEXT, league TEXT, idAPI INTEGER, scoreHome INTEGER, scoreAway INTEGER)').run();






function add_bet(betNumber, option, list, date, type, country, league, idAPI) {
	if (!betNumber || !option || !list || !date || !type || !country || !league || !idAPI) { console.log(!betNumber, " ", !option, " ", !list, " ", !date, " ", !type, " ", !country, " ", !league, " ", idAPI, "error params"); return -1; }
	try {
		let insert = db.prepare(`INSERT INTO Bets (betNumber,options,optionsArray,date,status,type,country,league,idAPI,scoreHome,scoreAway) VALUES (?,?,?,?,?,?,?,?,?,?,?)`);
		let result = insert.run(betNumber, option, list, date, 0, type, country, league, idAPI, null, null);
		console.log(betNumber, " ", option, " ", list, " ", date, " ", 0, " ", type, " ", country, " ", league, " ", idAPI, " ", null, " ", null, " added to DataBase");
		return db.prepare('SELECT betNumber FROM Bets where ROWID=(?)').get(result.lastInsertRowid)['betNumber'];
	} catch (e) {
		console.log("error adding a bet to database => ", e.code);
		if (e.code == 'SQLITE_CONSTRAINT_PRIMARYKEY') return -1;
		throw e;
	}
}



function get_Name(betNumber) {
	//console.log("betNumber to print",betNumber);
	let select = db.prepare(`SELECT optionsArray FROM Bets WHERE betNumber = '${betNumber}'`);
	let result = select.get();
	array = result.optionsArray.split(',');
	if (result) return array[0] + " vs " + array[array.length - 1];
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
	let select = db.prepare(`SELECT betNumber from bets where date>='${date1}' and date<'${date2}'`);
	let result = select.all();
	if (result) return result;
}





function get_Type(betNumber) {
	let select = db.prepare(`SELECT type FROM Bets WHERE betNumber = '${betNumber}'`);
	let result = select.get();
	if (result) return result.type;
	return null;
}

function get_CLosestDates(date) {
	let select = db.prepare(`select betNumber from bets where date>'${date}' limit 14`);
	let result = select.all();
	if (result) return result;
	return null;
}

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

function get_CLosestDatesByTypeAndCountry(date, type, country) {
	//console.log(date,type,country);
	var param;
	if (country === "england") { param = 'England' }
	if (country === "spain") { param = 'Spain' }
	if (country === "usa") { param = 'USA' }
	if (country === "italy") { param = 'Italy' }
	if (country === "france") { param = 'France' };
	let select = db.prepare(`select betNumber from bets where date>'${date}' and type='${type}' and country='${param}' limit 14`);
	let result = select.all();
	if (result) return result;
	return null;
}

function get_CLosestDatesByTypeAndLeague(date, type, league) {
	//console.log(date,type,country);
	var param;
	if (league === "gleague") { param = 'NBA - G League' }
	if (league === "nba") { param = 'NBA' }
	if (league === "lnb") { param = 'LNB' }
	let select = db.prepare(`select betNumber from bets where date>'${date}' and type='${type}' and league='${param}' limit 14`);
	let result = select.all();
	if (result) return result;
	return null;
}

function initTest() {
	let del = db.prepare(`DELETE from bets`);
	let result = del.run();

	if (result) return result;
}

function closeBets(betNumbers) {
	for (let bN in betNumbers) {
		bN = betNumbers[bN]
		let update = db.prepare('update bets set status=1 where betNumber=' + bN)
		update.run()
		//console.log('update bets set status=1 where betNumber='+bN)
	}
}

function endBets(betNumbers) {
	for (let bN in betNumbers) {
		bN = betNumbers[bN]
		let update = db.prepare('update bets set status=2 where betNumber=' + bN)
		update.run()
	}
}

function cancelBet(betNumber) {
	let update = db.prepare('update bets set status=3 where betNumber=' + betNumber)
	update.run()
}

function sqlToInject(){
	db.prepare('ALTER TABLE Bets ADD scoreHome INTEGER').run()
	db.prepare('ALTER TABLE Bets ADD scoreAway INTEGER').run()

}

module.exports = {
	add_bet: add_bet,
	get_Name: get_Name,
	get_Options: get_Options,
	get_List: get_List,
	get_Date: get_Date,
	get_MaxBet: get_MaxBet,
	get_BetBetween2dates: get_BetBetween2dates,
	initTest: initTest,
	get_CLosestDates: get_CLosestDates,
	get_CLosestDatesByType: get_CLosestDatesByType,
	get_Type: get_Type,
	get_Country: get_Country,
	get_CLosestDatesByTypeAndCountry: get_CLosestDatesByTypeAndCountry,
	get_idAPI: get_idAPI,
	get_League: get_League,
	get_CLosestDatesByTypeAndLeague: get_CLosestDatesByTypeAndLeague,
	closeBets: closeBets,
	endBets: endBets,
	cancelBet: cancelBet,
	sqlToInject:sqlToInject,
};
//0xBD445c5A2C4197ce12DE4e28473dE471aD21D8B5
