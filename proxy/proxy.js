const http = require("http");
const fs = require("fs");
const path = require("path");
const {parse} = require("url");


const route = require("./route.js");
const observe = require("./observe.js");

const serve = http.createServer(function (req,res) {
    res.setHeader("Content-Type","application/json");
    res.setHeader("Access-Control-Allow-Origin","http://10.9.47.242:2000");
    isProxy(req.url.match(/^\/(\w+)\/.*?/i),req,res);
});

function isProxy(path,req,res) {
    let {pathname} = parse(req.url);
    switch (path[1]) {
        case "craw":
            let url = "http://10.9.47.242:4000"+pathname.replace(/^\/craw/,"");
            http.get(url,(data) => {
                res.end(JSON.stringify(data));
            });
            break;
        default:
            observe.emit("route",[req,res]);
    }
}


function get(req,res) {

}

function post (req,res) {
    res.end(req.url);
}

serve.listen(3000,"0.0.0.0",function () {
    console.log("请访问: http://10.9.47.242:3000");
})