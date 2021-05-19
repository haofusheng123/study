const observe = require("./observe.js");
const {parse} = require("url");
const http = require("http");

module.exports.isProxy = function (path,req,res) {
    let {pathname} = parse(req.url);
    switch (path[1]) {
        case "craw":
            let url = "http://10.9.47.242:4000"+pathname.replace(/^\/craw/,"");
            http.get(url,(data) => {
                data.pipe(res);
            });
            break;
        default:
            observe.emit("route",[req,res]);
    }
}