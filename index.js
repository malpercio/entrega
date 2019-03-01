const interfaces = require("./lib/interfaces");
const createServer = require("./lib/createServer");
const readFile = require("./lib/readFile");

function entrega(filename, cb){
    readFile(filename, (err, file) => {
        if(err){
            return cb(err);
        }
        createServer(file, cb);
    });
}

entrega.interfaces = interfaces;
entrega.createServer = createServer;
entrega.readFile = readFile;

module.exports = entrega;
