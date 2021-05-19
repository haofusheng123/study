const xhr = new XMLHttpRequest();

export function post (option) {
    return new Promise((fulfill,reject) => {
        xhr.open(option.method,option.url);
        xhr.addEventListener("readystatechange",function () {
            if (this.readyState===4 && /2\d{2}/.test(this.status)) {
                fulfill(this.response);
            }
        });
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xhr.send(option.data);
    })
}
