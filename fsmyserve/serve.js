/*
    未完善部分： 管道流传输图片
    html页面的压缩

*/






const http = require("http");
const path = require("path");
const os = require("os");
const url = require("url");

const rootPath = path.join("E:/fsServe/WWW");
const servePath = path.join(__dirname,"../");

const searchFile = require("searchFile");

const serve = http.createServer(function (req,res) {
    let {query,pathname} = url.parse(req.url,true);
    if (pathname==="/favicon.ico") {
        res.end();
        return;
    }
    let filePath;
    if (pathname.includes("/fsmyserve")) {
        filePath = path.join(servePath,pathname);
    }else {
        filePath = path.join(rootPath,pathname);
    }
    searchFile(filePath,pathname,res);
});

serve.listen(2000,"10.9.47.242",function () {
    console.log("请访问 http://10.9.47.242:2000");
})
