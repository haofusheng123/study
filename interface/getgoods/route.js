const work = require("./work.js");
const {parse} = require("url");

function routeSet(req,res) {
    let {pathname} = parse(req.url);
    switch (pathname) {
        case "/getdata":
            work.crawData(req,res);
            break;
    }
}

module.exports = {
    routeSet
}