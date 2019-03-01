const {networkInterfaces,} = require("os");
const readline = require("readline");

class NetworkInterfaces {
    constructor() {
        this.listing = this.listPublicInterfaces();
        this.names = Object.keys(this.listing);
        this.available = this.names.length;
    }

    listPublicInterfaces() {
        const interfaces = networkInterfaces();
        var availableInterfaces = {};

        for (let key in interfaces) {
            for(let connection of interfaces[key]){
                if (!connection.internal && connection.family === "IPv4") {
                    availableInterfaces[key] = connection.address;
                }
            }
        }
        return availableInterfaces;
    }

    buildInterfacePrompt(){
        let prompt = "Select network interface:\n";
        for(let index in this.names){
            prompt += `[${index}] ${this.names[index]}\n`;
        }
        return prompt;
    }

    async getIp(options = {}, cb) {
        if(!cb && typeof options === "function"){
            cb = options;
            options = {};
        }
        if(this.available === 0){
            const err = new Error("No network interfaces with a public IPv4 were found");
            return cb(err);
        }
        if(this.available === 1 || !options.interactive){
            return cb(null, this.listing[this.names[0]]);
        } else {
            process.stdin.setEncoding("utf8");
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            return rl.question(this.buildInterfacePrompt(), (selectedInterface) => {
                let index = 0;
                if(selectedInterface){
                    try {
                        index = parseInt(selectedInterface);
                        if(index >= this.available || index < 0 || isNaN(index)) {
                            throw new Error("Option out of bounds");              }
                    } catch(e) {
                        index = 0;
                        process.stderr.write(`Interface selection [${selectedInterface}] not found. `);
                    }
                }
                process.stdout.write(`Using ${this.names[index]}\n`);
                rl.close();
                cb(null, this.listing[this.names[index]]);
            });

        }
    }
}

module.exports = new NetworkInterfaces();
