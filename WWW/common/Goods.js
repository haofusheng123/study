
import Utils from './Utils.js';
export default class Goods extends EventTarget{
    static DOWN_IMG = "down_img";
    data;
    goodsItem;
    iconCon;
    refreshList=[];
    itemShowA;
    itemShowImg;
    price;
    infoText;
    appraise;
    iconPrev;
    tagList= new Map([
        [["自营","本地仓"],"tag1"],
        [["新品"],"tag2"],
        [["赠","秒杀","券","京东物流","免邮"],"tag3"],
        [["放心购"],"tag4"]
    ]);
    myTag=[];
    static setCssBool = true;
    constructor(data,parent) {
        super();
        this.data = data;
        this.myTag=["自营","新品","免邮","放心购"]
        Goods.setCss();
        this.goodsItem = document.createElement("div");
        this.goodsItem.className="goods-item";
        this.render(this.data);
        parent.appendChild(this.goodsItem);
        this.iconCon=this.goodsItem.querySelector(".info-icon");
        this.goodsItem.addEventListener("click",(e) => this.downLoad(e));
        this.iconCon.addEventListener("mouseover",(e) => this.checkIcon(e));
        this.createRefreshList();
        this.changeIcon(0)
    }

    downLoad(e) {
        let evt = new Event(Goods.DOWN_IMG);
        evt.imgSrc = this.goodsItem.querySelector("img").src;
        document.dispatchEvent(evt);
    }

    createRefreshList(){
        this.itemShowA=this.goodsItem.querySelector(".item-show a");
        this.itemShowImg=this.goodsItem.querySelector(".item-show img");
        this.price=this.goodsItem.querySelector(".price strong");
        this.infoText=this.goodsItem.querySelector(".info-text");
        this.appraise=this.goodsItem.querySelector(".appraise a");
    }

    changeTag(tagItem){
        for (var prop of this.tagList.keys()) {
            if (prop.some(item => tagItem.indexOf(item)>-1)) {
                return this.tagList.get(prop)
            }
        }
    }

    checkIcon(e){
        if (e.target.nodeName!=="IMG") return;
        var index=Array.from(this.iconCon.children).indexOf(e.target.parentElement);
        this.refreshDom(index);
        this.changeIcon(index);
    }

    changeIcon(_index){
        // if (this.iconPrev) this.iconPrev.style.borderColor="transparent";
        // this.iconPrev=this.iconCon.children[_index].firstElementChild;
        // this.iconPrev.style.borderColor="#e4393c";
    }

    refreshDom(_index){
        this.itemShowA.href=this.data.colors[_index].href;
        this.itemShowImg.src=this.data.colors[_index].src;
        this.price.textContent=this.data.colors[_index].price;
        this.infoText.href=this.data.colors[_index].href;
        this.appraise.href=this.data.colors[_index].href;
    }

    render(data) {
        this.goodsItem.innerHTML = `
            <div class="item-show">
               <a href="javascript:void(0)"><img src="${data.src}"></a>
            </div>
            <div class="item-info">
                <ul class="info-icon">
 
                </ul>
                <p class="price">
                    <i>￥</i><strong>${data.price}</strong>
                </p>
                <a class="info-text" href="javascript:void(0)" title="${data.title}">${data.title}</a>
                <p class="appraise">
                    <a href="javascript:void(0)">1万+</a>条评价
                </p>
                <p class="shop">
                    <a class="shop-text" href="javascript:void(0)" title="${data.shop}">${data.shop}</a>
                    <a class="shop-img" href="https://jdcs.jd.com/index.action"><img src="./img/serve.png"></a>
                </p>
                <p class="info-tag">
                    ${(() => {
                        return this.myTag.reduce((value,item) => {
                            return value+`<a class="tag ${this.changeTag(item)}">${item}</a>`
                        },"")
                    })()}
                </p>
            </div>
        `
    }

    static setCss() {
        if (!Goods.setCssBool) return;
        Goods.setCssBool = false;
        Utils.getStyleSheet(`
        :root{
            --color--:#e4393c;
        }
        i{
            font-style: initial;
        }
        a{
            text-decoration: none;
        }

        body,p,ul,li,h2,h3,h4,h5{
            margin: 0;
            padding: 0;
        }

        .goods-item{
            width: 240px;
            height: 440px;
            box-sizing: border-box;
            padding: 12px 9px;
            margin-bottom: 10px;
            margin-right: 20px;
            float: left;
        }
        .goods-item:hover{
            box-shadow: 0 0 2px 0 #c6c6c6;
        }
        .item-show img{
            width: 100%;
        }
        .item-info{
            font-size: 12px;
        }
        .item-info ul{
            list-style: none;
            overflow: hidden;
            padding: 0;
            margin: 0;
        }
        .item-info ul li{
            float: left;
            height: 29px;
            margin-right: 5px;
            border: 1px solid #e6e6e6;
        }
        .item-info ul li img{
            width: 25px;
            height: 25px;
            border: 2px solid transparent;
        }
        .item-info .price{
            color: var(--color--);
            margin: 10px 0;
            font-size: 16px;
        }
        .item-info .price strong{
            font-size: 20px;
            font-weight: 400;
        }
        .info-text{
            display: block;
            color: #666;
            font-size: 12px;
            word-break: break-all;
            line-height: 18px;
            height: 36px;
            overflow: hidden;
        }
        .info-text:hover{
            color: var(--color--);
        }
        .appraise{
            font-size: 12px;
            color: #999;
            margin: 6px 0;
        }
        .appraise a{
            color: #646fb0;
            font-weight: bold;
        }
        .shop{
            margin-bottom: 6px;
        }
        .shop .shop-text{
            display: inline-block;
            color: #999;
            max-width: 120px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
        .tag{
            padding: 0 2px;
            border-radius: 2px;
            user-select: none;
            margin-right: 4px;
        }
        .tag1{
            background: var(--color--);
            color: white;
        }
        .tag2{
            background: #31c19e;
             color: white;
        }
        .tag3{
            border: 1px var(--color--) solid;
            color: var(--color--);
        }
        .tag4{
            border: 1px #4d88ff solid;
            color: #4d88ff;
        }
        `)
    }
}