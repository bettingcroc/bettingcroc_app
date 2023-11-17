import fs from 'fs';
import { __dirname } from './config.js';

function red(toLog) {
    console.log('\x1b[31m%s\x1b[0m', toLog)
}
function green(toLog) {
    console.log('\x1b[32m%s\x1b[0m', toLog)
}
function yellow(toLog) {
    console.log('\x1b[33m%s\x1b[0m', toLog)
}
function blue(toLog) {
    console.log('\x1b[34m%s\x1b[0m', toLog)
}
function cyan(toLog) {
    console.log('\x1b[36m%s\x1b[0m', toLog)
}
function magenta(toLog) {
    console.log('\x1b[35m%s\x1b[0m', toLog)
}
function high(toLog) {
    console.log('\x1b[47m%s\x1b[30\x1b[0m', toLog)
}
function logBetEnder(log) {
    red(log);
    fs.appendFile(__dirname+"/../logs/logsBetEnder.txt", log + "\n", function (err) {
        if (err) {
            return console.log(err);
        }
    })
}
function logBetCloser(log) {
    yellow(log);
    fs.appendFile(__dirname+"/../logs/logsBetCloser.txt", log + "\n", function (err) {
        if (err) {
            return console.log(err);
        }
    })
}

export { logBetEnder, logBetCloser, cyan, blue }
