const url =encodeURI("https://search.jd.com/Search?keyword=高达&enc=utf-8&wq=高达");
const fs = require("fs");
const path = require("path");

const cheerio = require("cheerio");
const https = require("https");
const {writeLog} = require("./writelog.js");

module.exports = {
    async crawData(req,res) {
        let list = await getHtml(url);
        res.end(list);
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
                goods.each(async (index,el) => {
                    let goodsObj = {};
                    let imgSrc = $(el).find(".p-img img").attr("data-lazy-img");
                    let {outDir,hostDir}=await saveFile(imgSrc);
                    goodsObj["src"]=outDir;
                    goodsObj["price"] = $(el).find(".p-price i").text();
                    goodsObj["title"] = $(el).find(".p-name em").text();
                    goodsObj["shop"] = $(el).find(".p-shop a").attr("title");
                    goodsList.push(goodsObj);
                    writeLog(hostDir,goodsObj["title"],goodsObj["price"]);
                    if (index===goods.length-1) { //保证文件下载完成再进行返回
                        fulfill(JSON.stringify(goodsList));
                    }
                });
            });
        })
    })
}

function saveFile(src){ //保存每张图片
    return new Promise ((fulfill,reject) => {
        let url = "https:"+src;
        let fileName = path.basename(url);
        let fileOUT = path.join(__dirname,"img",fileName);
        https.get(url,function (res) {
            let readTo = fs.createWriteStream(fileOUT);
            res.pipe(readTo);
            readTo.on("finish",function () {
                fulfill({outDir:"http://10.9.47.242:4000/"+path.join("img",fileName),hostDir:fileOUT});
            })
        });
    })
    
}