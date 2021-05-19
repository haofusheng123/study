const http = require("http");
const fs = require("fs");
const path = require("path");
const {parse} = require("url");

const serve = http.createServer(function (req,res) {

    if (req.method===get) get(req,res);
    else post(req,res);
    
});


function get(req,res) {

}

function post (req,res) {
    // req.on("data", buffer => )
}

serve.listen(4000,"0.0.0.0",function () {
    console.log("请访问: http://10.9.47.242:4000");
})