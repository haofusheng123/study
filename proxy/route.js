const observe = require("./observe.js");
const RouServe = require("./RouServe.js");
const routeHandler = require("./routeHandler.js");
const setRoute = require("./setRoute.js");
const {parse} = require("url");


setRoute.post("/login",routeHandler.login);


observe.on("route",goRoute);
function goRoute([req,res]) {
    let {pathname} = parse(req.url);
    RouServe.emit(pathname,[req,res]);
}