const http = require("http");

module.exports = function createServer (file, cb) {

    const server = http.createServer((req, res) => {
        const ipMatch = req.connection.remoteAddress.match(/(\d+\.){3}\d/) || ["Unknown"];
        process.stdout.write(`\n${ipMatch[0]} downloaded ${file.basename}`);
        res.writeHead(200, {
            "Content-Length": file.size,
            "Content-Disposition": `attachment; filename=${file.basename}`
        });

        res.end(file.buffer);
    });
    return cb(null, server);

};
