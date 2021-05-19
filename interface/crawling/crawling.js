const http = require("http");
const fs = require("fs");
const path = require("path");
const {parse} = require("url");

const {routeSet} = require("./route.js");

const serve = http.createServer(function (req,res) {
    routeSet(req,res);
});



serve.listen(4000,"0.0.0.0",function () {
    console.log("请访问: http://10.9.47.242:4000");
})