let localforage = require("localforage");
let image=document.querySelector("img")
async function test() {
    let result = await localforage.setItem("string", "123213")   //字符串
    console.log(result)
    let result1 = await localforage.setItem('myarray', [1, 2, 'three'])//数组
    console.log(result1)
    let result2 = await localforage.setItem("number", 1231231)   //字符串
    console.log(result2)
    let req = new XMLHttpRequest();                         //blob 文件
    req.open('GET', './dong_41c10f9ee0a17d664b76404d3b276d09.gif', true);
    req.responseType = 'arraybuffer';
    req.addEventListener('readystatechange', async (data) => {
        if (req.readyState === 4) { // readyState 完成
            let arraybuffer = await localforage.setItem('photo', req.response)
            console.log(arraybuffer)
            let blob = new Blob([arraybuffer]);
            var imageURI = window.URL.createObjectURL(blob);
            image.src=imageURI
        }
    });
    req.send(null)
}
test()