const observe = require("./observe.js");
const {parse} = require("url");
const http = require("http");
const path = require("path");
const qString = require("querystring");
const fs = require("fs");


module.exports.isProxy = function (pathList,req,res) {

    let {pathname} = parse(req.url);
    setCache(path.extname(req.url),res);
    switch (pathList ? pathList[1] : null) {
        case "craw":
            let url = "http://10.9.47.242:4000"+pathname.replace(/^\/craw/,"");
            http.get(url,(data) => {
                let userPath=req.headers["origin"];
                // let rootdir = path.join(__dirname,"../WWW/downImg",path.basename(req.url));
                if (userPath && path.extname(req.url)!=="") {
                    res.setHeader("Content-Type","application/octet-stream");
                    data.pipe(res);
                    return;
                }
                data.pipe(res);
            });
            break;
        default:
            observe.emit("route",[req,res]);
    }
}



function setCache(ext,res) {
    let oddTime=new Date();
    let cacheTime=0;
    switch (ext) {
        case (".jpg" || ".png" || ".webp" || ".gif"):
            oddTime.setDate(oddTime.getDate()+1);
            cacheTime=60*60*24;
            break;
        case ".css":
            oddTime.setHours(oddTime.getHours()+1);
            cacheTime=60*60;
    }
    res.setHeader("expires",oddTime.toGMTString());
    res.setHeader("cache-control","max-age="+cacheTime);
}