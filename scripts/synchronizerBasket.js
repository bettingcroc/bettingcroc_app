multiBetABI = [
    {
      inputs: [
        {
          internalType: "address",
          name: "_tetherAddress",
          type: "address",
        },
        {
          internalType: "address",
          name: "_MBTaddress",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_fees",
          type: "uint256",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "oldOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnerSet",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "betNumber",
          type: "uint256",
        },
      ],
      name: "betClosed",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "betNumber",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "winner",
          type: "uint256",
        },
      ],
      name: "betDead",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "better",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "numberBet",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "option",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "betting",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "betNumber",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "string",
          name: "nameBet",
          type: "string",
        },
      ],
      name: "newBetCreated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "ownerPayed",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "payed",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "payment",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "betNumber",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "option",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "betOn",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "changeOwner",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "claimFeesMoney",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "betNumber",
          type: "uint256",
        },
      ],
      name: "closeBet",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256[]",
          name: "betsToClose",
          type: "uint256[]",
        },
      ],
      name: "closeBets",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "a",
          type: "string",
        },
        {
          internalType: "string",
          name: "b",
          type: "string",
        },
      ],
      name: "compareStrings",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "name",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "optionsNumber",
          type: "uint256",
        },
      ],
      name: "createNewBet",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string[]",
          name: "names",
          type: "string[]",
        },
        {
          internalType: "uint256[]",
          name: "optionsNumbers",
          type: "uint256[]",
        },
        {
          internalType: "uint256",
          name: "numberOfBetsToAdd",
          type: "uint256",
        },
      ],
      name: "createNewBets",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "amountToBet",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "amountToEnter",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "betNumber",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "optionToBet",
          type: "uint256",
        },
        {
          internalType: "address[]",
          name: "authorized",
          type: "address[]",
        },
      ],
      name: "createP2PBet",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "betNumber",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "msgsender",
          type: "address",
        },
      ],
      name: "didIWinSmth",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "betNumber",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "poolWin",
          type: "uint256",
        },
      ],
      name: "endBet",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256[]",
          name: "betNumbers",
          type: "uint256[]",
        },
        {
          internalType: "uint256[]",
          name: "poolwinners",
          type: "uint256[]",
        },
      ],
      name: "endBets",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "betNumber",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "p2pNumber",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "msgsender",
          type: "address",
        },
      ],
      name: "getAmountBetted",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getFees",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getFeesRewards",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getLastBet",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "betNumber",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "optionAgainst",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "minToEnter",
          type: "uint256",
        },
      ],
      name: "getMaxCote",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "betNumber",
          type: "uint256",
        },
      ],
      name: "getMoneyLosedOnBet",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "msgsender",
          type: "address",
        },
      ],
      name: "getMyBetsUnpaid",
      outputs: [
        {
          internalType: "uint256[]",
          name: "",
          type: "uint256[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "name",
          type: "string",
        },
      ],
      name: "getNameToNumber",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "betNumber",
          type: "uint256",
        },
      ],
      name: "getNumberOfOptions",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "number",
          type: "uint256",
        },
      ],
      name: "getNumberToName",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "betNumber",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "option",
          type: "uint256",
        },
      ],
      name: "getOptionMoney",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getOwner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "betNumber",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "p2pNumber",
          type: "uint256",
        },
      ],
      name: "getPayedP2P",
      outputs: [
        {
          internalType: "address[]",
          name: "",
          type: "address[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "msgsender",
          type: "address",
        },
      ],
      name: "getScore",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "betNumber",
          type: "uint256",
        },
      ],
      name: "getWinner",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "betNumber",
          type: "uint256",
        },
      ],
      name: "getbetNumberToLastBetPP",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "betNumber",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "addressToTest",
          type: "address",
        },
      ],
      name: "haveIBeenPaid",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "betNumber",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "option",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "msgsender",
          type: "address",
        },
      ],
      name: "howMuchIGotOnAnOption",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "betNumber",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "msgsender",
          type: "address",
        },
      ],
      name: "howMuchIWon",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "msgsender",
          type: "address",
        },
      ],
      name: "howMuchIWonP2P",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "betNumber",
          type: "uint256",
        },
      ],
      name: "isClosed",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "betNumber",
          type: "uint256",
        },
      ],
      name: "isDead",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "element",
          type: "address",
        },
        {
          internalType: "address[]",
          name: "list",
          type: "address[]",
        },
      ],
      name: "isInArrayAddress",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "element",
          type: "uint256",
        },
        {
          internalType: "uint256[]",
          name: "list",
          type: "uint256[]",
        },
      ],
      name: "isInArrayUint256",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "betNumber",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "p2pNumber",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "amountToBet",
          type: "uint256",
        },
      ],
      name: "joinP2PBet",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "betNumber",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "option",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "msgsender",
          type: "address",
        },
      ],
      name: "myPourcentageOnOption",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "recupAllP2PWin",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "recupAllWin",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "msgsender",
          type: "address",
        },
      ],
      name: "seeMyBets",
      outputs: [
        {
          internalType: "uint256[]",
          name: "",
          type: "uint256[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "msgsender",
          type: "address",
        },
      ],
      name: "seeMyP2PBets",
      outputs: [
        {
          internalType: "uint256[]",
          name: "",
          type: "uint256[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "msgsender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "betNumber",
          type: "uint256",
        },
      ],
      name: "seeMyP2PBetsDetail",
      outputs: [
        {
          internalType: "uint256[]",
          name: "",
          type: "uint256[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "betNumber",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "p2pNumber",
          type: "uint256",
        },
      ],
      name: "seeP2PBet",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
        {
          internalType: "address[]",
          name: "",
          type: "address[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "betNumber",
          type: "uint256",
        },
      ],
      name: "seeP2PBets",
      outputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "ppbetNumber",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "creator",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amountBet",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "cote",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "amountToEnter",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "betCorrelated",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "optionCreator",
              type: "uint256",
            },
            {
              internalType: "bool",
              name: "friends",
              type: "bool",
            },
            {
              internalType: "address[]",
              name: "authorized",
              type: "address[]",
            },
          ],
          internalType: "struct MultiBetUSDTMultiOptionsP2P.p2pBet[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_fees",
          type: "uint256",
        },
      ],
      name: "setFees",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "msgsender",
          type: "address",
        },
      ],
      name: "toClaimTotal",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];
  const request = require("request");
  
  const NODE_URL_BSCTESTNET = "https://data-seed-prebsc-2-s2.binance.org:8545/"; //url of bsc testnet node
  const NODE_URL_POLYGON =
    "https://speedy-nodes-nyc.moralis.io/d7cfb9005cec8b6a40236ec8/polygon/mainnet";
  var Web3 = require("web3");
  var web3 = new Web3(new Web3.providers.HttpProvider(NODE_URL_BSCTESTNET)); // new web3 object
  
  //multiBetAddress='0xD5F51022d66382c3f432Ed2d0bc4cE18647f85a5'; Polygon
  multiBetAddress = "0xD90531a9234A38dfFC8493c0018ad17cB5F7A867";
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
                  let timestamp=JSON.parse(response.body).response[0].timestamp; 
                  let country=JSON.parse(response.body).response[0].country.name;
                  let idAPI=JSON.parse(response.body).response[0].id;
                    let league=JSON.parse(response.body).response[0].league.name;
                  model.add_bet(i,2,nameHome+","+nameAway,timestamp,"basketball",country,league,idAPI) ;
  
                  next()
              })})
          
          
          });
      }
    });
  
  function getOptions(date, team) {
      return {
        method: "GET",
        url: "https://v1.basketball.api-sports.io/games",
        qs: { date: date, team:team , season: "2022-2023" },
        headers: {
          "x-rapidapi-host": "v1.basketball.api-sports.io",
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