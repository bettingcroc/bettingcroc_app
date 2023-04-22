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
const request = require("request");
const NODE_URL_BSCTESTNET = "https://data-seed-prebsc-1-s1.binance.org:8545/"; //url of bsc testnet node
//const NODE_URL_BSCTESTNET = "https://rpc.ankr.com/bsc_testnet_chapel";
const NODE_URL_POLYGON =
  "https://speedy-nodes-nyc.moralis.io/d7cfb9005cec8b6a40236ec8/polygon/mainnet";
var Web3 = require("web3");
var web3 = new Web3(new Web3.providers.HttpProvider(NODE_URL_BSCTESTNET)); // new web3 object

//multiBetAddress='0xD5F51022d66382c3f432Ed2d0bc4cE18647f85a5'; Polygon
multiBetAddress = "0x99E3AC652BaB8F1b2Ff2b25d58862f1854C6689d";
multiBetContract = new web3.eth.Contract(multiBetABI, multiBetAddress);
const model = require("./model.js");
//console.log(model.get_MaxBet())
multiBetContract.methods
  .getLastBet()
  .call()
  .then(async function (result) {
    for (i = model.get_MaxBet() + 1; i < result; i++) {
      console.log(i);
      await multiBetContract.methods
        .getNumberToName(i)
        .call()
        .then(async (result)=>{
			matchUnsync=result.split(" ")
			let options=getOptions(dateFormater(matchUnsync[2]),matchUnsync[0])
			await new Promise(next =>{request(options, async function (error, response) {
				//console.log(JSON.parse(response.body))
				let nameHome=JSON.parse(response.body).response[0].teams.home.name;
        		let nameAway=JSON.parse(response.body).response[0].teams.away.name;
				let timestamp=JSON.parse(response.body).response[0].fixture.timestamp; 
				let country=JSON.parse(response.body).response[0].league.country;
				let idAPI=JSON.parse(response.body).response[0].fixture.id;
          		let league=JSON.parse(response.body).response[0].league.name;
				model.add_bet(i,3,nameHome+",Draw,"+nameAway,timestamp,"football",country,league,idAPI) ;

				next()
			})})
		
		
		});
    }
  });

function getOptions(date, team) {
    return {
      method: "GET",
      url: "https://v3.football.api-sports.io/fixtures",
      qs: { date: date, team:team , season: "2022" },
      headers: {
        "x-rapidapi-host": "v3.football.api-sports.io",
        "x-rapidapi-key": "1b8bea4eb9795ae6f10a338ffe214f5d", //achille zgiw api
      },
    };
}
    
function dateFormater(timestamp){
	let date=new Date(timestamp*1000)
	let month=(date.getUTCMonth()+1)
	let day=date.getUTCDate()
	if(month<10){month="0"+month.toString()}
	if(day<10){day="0"+day.toString()}
	return date.getUTCFullYear()+"-"+month+"-"+day
}