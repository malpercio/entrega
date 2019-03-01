const failIf = require("./failIf");

class Parser{
    getFilename() {
        const [, ,...args] = process.argv;

        failIf(args.length < 1, "Filename needed");
        failIf(args.length > 1, "Too many arguments provided");

        return args[0];
    }

}

module.exports = new Parser();
