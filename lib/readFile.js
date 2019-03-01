const fs = require("fs");
const path = require("path");

class File {
    constructor(basename, size, buffer){
        this.basename = basename;
        this.size = size;
        this.buffer = buffer;
    }
}

module.exports = function readFile(filename, cb){
    fs.stat(filename, (err, {size}) => {
        if (err){
            const errorWrapper = new Error("Unable to open file.");
            errorWrapper.originalError = err;
            return cb(errorWrapper);
        }

        var filePath = path.resolve(process.env.PWD, filename);
        const basename = path.basename(filePath);
        fs.readFile(filePath, (fileError, buffer) => {
            if(fileError){
                const errorWrapper = new Error("Unable to open file.");
                errorWrapper.originalError = fileError;
                return cb(errorWrapper);
            }
            const bufferableFile = new File(basename, size, buffer);
            cb(null, bufferableFile);
        });
    });
};
