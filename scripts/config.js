import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const PRIVATE_KEY_CERATOR = 'd20947a33bb7e2b8a17b3a29c59f4bcb86131ede571fbf150aa0884e5fa48fa9'
const PUBLIC_KEY_CREATOR = "0x6d3DCcF2C028766D26a5382Fce9d898e75E6D629"
const PRIVATE_KEY_ENDER = '8b2e6d2f97bc806b85d17ecd3eae0a8dd24b4d40c96fb6ebebaf2835ce6714fb'
const PUBLIC_KEY_ENDER = "0x1deecf77dD59A35c9f68cf507d79DDbd8524fa65"
const multiBetAddress = "0x17D31b07cAd51A170d35D3dc8a3b3fAC18d0e672"
const NODE_URL_BSCTESTNET = "https://data-seed-prebsc-1-s1.bnbchain.org:8545"; //url of bsc testnet node
const NODE_URL_POLYGON = "https://speedy-nodes-nyc.moralis.io/d7cfb9005cec8b6a40236ec8/polygon/mainnet"; // url of polygon mainnet node
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const multiBetABI = JSON.parse(fs.readFileSync(__dirname + '/MultiBetABI.json'));
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
const API_KEY = "0bd2ece4d5dca48c6d12f3d678737494"
export { API_KEY, PRIVATE_KEY_ENDER, PUBLIC_KEY_ENDER, PRIVATE_KEY_CERATOR, PUBLIC_KEY_CREATOR, multiBetAddress, NODE_URL_BSCTESTNET, NODE_URL_POLYGON, multiBetABI, newBetCreatedABI, betClosedABI, URL_API_BASKETBALL, URL_API_FOOTBALL, leagueFootIDs, leagueBasketIDs, __dirname }