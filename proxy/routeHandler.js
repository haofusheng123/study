const qString = require("querystring");

module.exports = {
    login([req,res]) {
        let user;
        req.on("data",function (_data) {
            user = JSON.parse(_data);
        });
        req.on("end",function () {
            res.end(encodeURIComponent(user));
        })
    }
}