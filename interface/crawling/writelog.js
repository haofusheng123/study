const fs = require("fs");
const path = require("path");
const os = require("os");

module.exports = {
    writeLog(dir,title,price){
        let str = new Date()+" === " + dir + " === "+ title+" === "+price+os.EOL;
        fs.appendFileSync(path.join(__dirname,"log/log.txt"),str);
    }
}