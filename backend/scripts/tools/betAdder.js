import db from '../db.js'
import process from 'process';
db.add_bet(parseInt(process.argv[2]),parseInt(process.argv[3]),process.argv[4],parseInt(process.argv[5]),process.argv[6],process.argv[7],process.argv[8],parseInt(process.argv[9]));