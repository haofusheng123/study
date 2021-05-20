const http = require("http");
const fs = require("fs");
const path = require("path");
const {parse} = require("url");

const {routeSet} = require("./route.js");

const serve = http.createServer(function (req,res) {
    if (!path.extname(req.url)) {
        routeSet(req,res);
    }else {
        resFile(req,res);
    }
});

function resFile(req,res) {
    let {pathname} = parse(req.url);
    if (fs.existsSync(path.join(__dirname,pathname))) {
        res.setHeader("Content-Type","application/octet-stream");
        fs.createReadStream(path.join(__dirname,pathname)).pipe(res);
    }else {
        res.end(JSON.stringify({type:"error",code:404,detail:null}));
    }
}

serve.listen(4000,"0.0.0.0",function () {
    console.log("请访问: http://10.9.47.242:4000");
})