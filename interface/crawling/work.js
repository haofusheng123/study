const url ="http://www.jj20.com/bz/nxxz/";

const cheerio = require("cheerio");
const http = require("http");

module.exports = {
    async crawData(req,res) {
        let html = await getHtml(url);
        // html.pipe(res);
        res.end("aaa");
    }
}

function getHtml(url) {
    return new Promise ((fulfill,reject) => {
        let html = "";
        http.get(url,(res) => {
            res.on("data",(_data) => {
                html+=_data;
            });
            res.on("end",() => {
                console.log(html);
                // let $ = cheerio.load(html);
                // // console.log($);
                // fulfill($);
            })
        })
    })
}