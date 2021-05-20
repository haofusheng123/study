export default {
    getStyleSheet(cssAll){
        if (document.styleSheets.length<=0) {
            document.head.appendChild(document.createElement("style"))
        }
        var styleBox=document.styleSheets[document.styleSheets.length-1]
        cssAll.replace(/\n/g,"").replace(/(.*?)\{(.*?)\}/g,function (item,a,b) {
            styleBox.addRule(a,b)
        });
    }
}