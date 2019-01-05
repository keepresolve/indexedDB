let localforage = require("localforage");

let image = document.querySelector("#img");
async function test() {
  await localforage.dropInstance({ name: "dataBaseName" });
  console.log("删除数据库dataBaseName");
  // table1
  localforage.config({
    driver: localforage.INDEXEDDB, // 默认选择顺序indexedDB  webSQL localstroage   setDriver() 若可用，强制设置特定的驱动
    name: "dataBaseName",
    version: 1.0,
    //   size: 4980736, // 数据库的大小，单位为字节。现仅 WebSQL 可用
    storeName: "table_store_1", // 仅接受字母，数字和下划线
    description: "some description"
  });
  // table2
  let store = localforage.createInstance({
    driver: localforage.INDEXEDDB,
    version: 1.0,
    name: "dataBaseName",
    storeName: "table_store_2" // 仅接受字母，数字和下划线
  });
  await localforage.ready();
  console.log("初始化ready完成");

  let supports = localforage.supports(localforage.INDEXEDDB);
  console.log("支持INDEXEDDB", supports);
  let driver = localforage.driver();
  console.log("正在使用驱动", driver);
  await localforage.clear();
  await store.clear();
  console.log("清空表");
  let table2 = await store.setItem("table2", "table2");
  console.log("table2", table2);
  //字符串
  let result = await localforage.setItem("string", "indexedDB使用");
  console.log("string 类型", result);
  //数组
  let result1 = await localforage.setItem("myarray", [1, 2, "three"]);
  console.log("myarray 类型", result1);
  //number
  let result2 = await localforage.setItem("number", 1231231);
  console.log("number 类型", result2);


  //blob 图片 文件  
  let req = new XMLHttpRequest(); 
  req.open("GET", "./dong_41c10f9ee0a17d664b76404d3b276d09.gif", true);
  req.responseType = "arraybuffer";
  req.addEventListener("readystatechange", async data => {
    if (req.readyState === 4) {
      // readyState 完成
      let arraybuffer = await localforage.setItem("blob photo", req.response);
      console.log("blob arraybuffer 类型", arraybuffer);
      let blob = new Blob([arraybuffer]);
      var imageURI = window.URL.createObjectURL(blob);
      image.src = imageURI;
    }
  });
  req.send(null);
 
  //object
  let result3 = await localforage.setItem("object", { test: 12234 });
  console.log("object 类型", result3);


  //查询
  let result4 = await localforage.getItem("object");
  console.log("getobject", result4);

  //删除
  let result5 = await localforage.removeItem("object");
  console.log("removeobject", result5);
  //迭代
  console.log("iterate迭代");
  await localforage.iterate((value, key, index) => {
    console.log([key, value, index]);
  });
  console.log("iterate迭代结束");

  //获取keys
  let keys = await localforage.keys();
  console.log("获取所有keys", keys);
  //获取指定key
  let key = await localforage.key(2);
  console.log("获取指定key", key);
}
test();
