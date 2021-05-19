const url =encodeURI("https://search.jd.com/Search?keyword=高达&enc=utf-8&wq=高达");
const fs = require("fs");
const path = require("path");

const cheerio = require("cheerio");
const https = require("https");

module.exports = {
    async crawData(req,res) {
        let html = await getHtml(url);
        res.end(html);
    }
}

function getHtml(url) {
    return new Promise ((fulfill,reject) => {
        let html = "";
        https.get(url,(res) => {
            res.on("data",(_data) => {
                html+=_data;
            });
            res.on("end",async () => {
                let goodsList = [];
                
                let $ = cheerio.load(html);
                const goods = $(".gl-warp > li");
                goods.each((index,el) => {
                    let goodsObj = {};
                    let imgSrc = $(el).find(".p-img img").attr("data-lazy-img");
                    goodsObj["src"] = saveFile(imgSrc);
                    goodsObj["price"] = $(el).find(".p-price i").text();
                    goodsObj["title"] = $(el).find(".p-name em").text();
                    goodsObj["shop"] = $(el).find(".p-shop a").attr("title");
                    goodsList.push(goodsObj);
                });
                fulfill(JSON.stringify(goodsList));
            });
        })
    })
}

function saveFile(src){
    let url = "https:"+src;
    let fileName = path.basename(url);
    let filepath = path.join("http://10.9.47.242:4000","img",fileName);
    let fileOUT = path.join(__dirname,"img",fileName);

    https.get(url,function (res) {
        res.pipe(fs.createWriteStream(fileOUT));
    });
    return "http://10.9.47.242:4000/"+path.join("img",fileName);
}