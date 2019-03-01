#!/usr/bin/env node
const parser = require("./parser");
const QRCode = require("qrcode");

const entrega = require("../../index");

const failIf = require("./failIf");


const filename = parser.getFilename();

entrega.readFile(filename, (err, file) => {
    failIf(err);
    entrega.interfaces.getIp({interactive: true}, (err, ip) => {
        failIf(err);
        entrega.createServer(file, (err, server) => {
            failIf(err);
            server.listen(0, (err) => {
                failIf(err || null);
                const address = `${ip}:${server.address().port}`;

                QRCode.toString(`http://${address}`, function (err, url) {
                    process.stdout.write(`Server listening on http://${address}\n`);
                    if(!err){
                        process.stdout.write(url);
                    }
                    process.stdout.write("\nPress [Ctrl+C] to quit");
                });
            });
        });
    });
});
