import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Web3 } from 'web3';
import HDWalletProvider from '@truffle/hdwallet-provider'

const API_KEY = "1fde84a793ca4aa19212a5cde02ca5c73eec37be7bf98a6c668c19fd0f83c877"

const PRIVATE_KEY_CREATOR = 'd20947a33bb7e2b8a17b3a29c59f4bcb86131ede571fbf150aa0884e5fa48fa9'
const PUBLIC_KEY_CREATOR = "0x6d3DCcF2C028766D26a5382Fce9d898e75E6D629"
const PRIVATE_KEY_ENDER = '8b2e6d2f97bc806b85d17ecd3eae0a8dd24b4d40c96fb6ebebaf2835ce6714fb'
const PUBLIC_KEY_ENDER = "0x1deecf77dD59A35c9f68cf507d79DDbd8524fa65"
const multiBetAddress = "0xbAa6D18637A92410F30A3A784f129659BafB9a40"
const NODES_URL_BSCTESTNET = ["https://bsc-testnet.blockpi.network/v1/rpc/public", "https://bsc-testnet.publicnode.com", "https://data-seed-prebsc-2-s1.bnbchain.org:8545", "https://bsc-testnet.public.blastapi.io", "https://bsc-testnet.blockpi.network/v1/rpc/public", "https://data-seed-prebsc-1-s1.bnbchain.org:8545"]
const NODE_URL_BSCTESTNET = NODES_URL_BSCTESTNET[2]; //url of bsc testnet node
const provider = new HDWalletProvider(PRIVATE_KEY_CREATOR, NODE_URL_BSCTESTNET, 0, 10000);
const web3 = new Web3(provider);
//console.log("setting node to " + web3.currentProvider.engine._providers[3].rpcUrl)
const GAS_PRICE = web3.utils.toWei('10', 'gwei') //await web3.eth.getGasPrice()
//console.log("setting gasPrice to " + GAS_PRICE)
const NODE_URL_POLYGON = "https://speedy-nodes-nyc.moralis.io/d7cfb9005cec8b6a40236ec8/polygon/mainnet"; // url of polygon mainnet node
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const multiBetABI = JSON.parse(fs.readFileSync(__dirname + '/MultiBetABI.json'));
const decentraBetABI = JSON.parse(fs.readFileSync(__dirname + '/DecentrabetABI.json'));
const decentraBetAddress = '0xd9d04FaeE2982F4072EC4Bc53D0C0212a73aAE61'
const newBetCreatedABI = [
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
]
const betClosedABI = [
    {
        "indexed": true,
        "internalType": "uint256",
        "name": "betNumber",
        "type": "uint256"
    }
]
const URL_API_BASKETBALL = 'https://v1.basketball.api-sports.io/games'
const URL_API_FOOTBALL = 'https://v3.football.api-sports.io/fixtures'
const leagueFootIDs = {
    "PremierLeague": 39,
    "LaLiga": 140,
    "SerieA": 135
}
const leagueBasketIDs = {
    "NBA": 12,
    "LNB": 2,
    "GLeague": 20,
    "NBASL": 17,
    "WNBA": 13
}
export { API_KEY,decentraBetABI, decentraBetAddress, GAS_PRICE, web3, NODES_URL_BSCTESTNET,  PRIVATE_KEY_ENDER, PUBLIC_KEY_ENDER, PRIVATE_KEY_CREATOR, PUBLIC_KEY_CREATOR, multiBetAddress, NODE_URL_BSCTESTNET, NODE_URL_POLYGON, multiBetABI, newBetCreatedABI, betClosedABI, URL_API_BASKETBALL, URL_API_FOOTBALL, leagueFootIDs, leagueBasketIDs, __dirname }