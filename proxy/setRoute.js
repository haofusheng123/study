let getList=[];
let postList=[];

const RouServe = require("./RouServe.js");

class Rou{
    constructor(){

    }
    get(method,fn) {
        getList.push(method);
        RouServe.on(method,fn);
        return this;
    }
    post(method,fn) {
        postList.push(method);
        RouServe.on(method,fn);
        return this;
    }
}

module.exports = new Rou();