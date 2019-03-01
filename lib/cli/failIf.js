module.exports = function failIf(predicate = true, cause = "Unknown error"){
    if(typeof predicate === "function"){
        predicate = predicate();
    }
    if(predicate) {
        if(typeof predicate === "object" && predicate.message){
            cause = predicate.message;
        }
        process.stderr.write(`${cause}\n`);
        process.exit(1);
    }
};
