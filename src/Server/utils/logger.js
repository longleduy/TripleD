import fs from 'fs'
import * as Common from '../utils/common'

fs.access('src/Server/logs/info.txt', fs.constants.F_OK, (err) => {
    if (err) {
        fs.createWriteStream('src/Server/logs/info.txt')
    }
});
fs.access('src/Server/logs/error.txt', fs.constants.F_OK, (err) => {
    if (err) {
        fs.createWriteStream('src/Server/logs/error.txt')
    }
});
fs.access('src/Server/logs/debug.txt', fs.constants.F_OK, (err) => {
    if (err) {
        fs.createWriteStream('src/Server/logs/debug.txt')
    }
});
export const InforLogger = function (msg) {
    var message = new Date().toISOString() + " : " + msg + "\n";
    fs.appendFile('src/Server/logs/info.txt', message, (err) => { });
};

export const ErrorLogger = function (msg) {
    var message = Common.getFormattedDate(new Date()) + " : " + msg + "\n";
    fs.appendFile('src/Server/logs/error.txt', message, (err) => { });
};
export const DubugLogger = function (msg) {
    var message = new Date().toISOString() + " : " + msg + "\n";
    fs.appendFile('src/Server/logs/debug.txt', message, (err) => { });
};
