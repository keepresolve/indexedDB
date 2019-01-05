// require('es6-promise').polyfill();
let PouchDB = require("pouchdb").default;
import formatJson  from "./formatJson.js"
// import 'fetch-detector'; 
// import 'fetch-ie8';
let app = document.querySelector("#app");
let pre = document.createElement("pre");
let img = document.querySelector("img");
let db = null;
let str = "";
// 创建一个数据库new PouchDB([name], [options]) https://pouchdb.com/api.html
//PouchDB将用于_pouch_为内部数据库名称添加前缀

// 1:创建内存中的Pouch（必须先安装pouchdb-adapter-memory）：
// var db = new PouchDB('dbnam3e', {adapter: 'memory'});

//2: var db2 = new PouchDB('http://localhost:5984/dbname1');
//3：使用特殊的提取选项创建一个远程PouchDB：
// var db = new PouchDB('http://example.com/dbname', {
//   fetch: function (url, opts) {
//     opts.headers.set('X-Some-Special-Header', 'foo');
//     return PouchDB.fetch(url, opts);
//   }
// });

//创建
// var db = new PouchDB("test");
//删除 {ok: true}
// db.destroy("test",function(error,response){
//     console.log(response)
// })
// await db.destroy("test")

//
async function test() {
  //创建
  // db = new PouchDB("http://localhost:3000/db/test");
  db = new PouchDB("test");
  // 删除数据库
  let destroyResult = await db.destroy("test");
  str += "\n\r删除数据库test:\n\r" + formatJson(destroyResult);
  // db = new PouchDB("http://localhost:3000/db/test");
  db = new PouchDB("test");
  // change监听
  var changes = db
    .changes({
      since: "now",
      live: true,
      include_docs: true
    })
    .on("change", function(change) {
      console.log("change", change);
    })
    .on("complete", function(info) {
      console.log("complete", info);
    })
    .on("error", function(err) {
      console.error(err);
    });

  try {
    // put插入
    let putResult = await db.put({
      _id: "mydoc",
      title: "创建put"
    });
    str += "\n\r【创建:】\n\r " + formatJson(putResult);

    // array插入
    let putArray = await db.put({
      _id: "array",
      title: [1, 2, 3]
    });
    str += "\n\r【创建array:】\n\r " + formatJson(putArray);

    //查询
    let getResult = await db.get("mydoc");
    str += "\n\r【查询get:】\n\r" + formatJson(getResult);

    //更新文档 使用_rev
    let putResult1 = await db.put({
      _id: "mydoc",
      _rev: getResult._rev,
      title: "更新"
    });
    str += "\n\r【更新get:】\n\r" + formatJson(putResult1);

    //post创建自动生成一个文档_id。
    let postResult = await db.post({
      title: "post 自动生成id"
    });
    str += "\n\r【post自动生成id:】\n\r" + formatJson(postResult);

    //remove删除

    // 必须是至少包含一个 _id和_rev 发送完整文档也可以。
    // let removeResult=await db.remove(postResult.id,postResult.rev)
    // str += "\n\rremove删除post 自动生成id:\n\r" + formatJson(removeResult);
    let removeResult = await db.remove(putResult1.id, putResult1.rev);
    str += "\n\r【remove删除更新get的文档:】\n\r" + formatJson(removeResult);

    //插入附件  blob
    let attachmentsREsult = await db.put({
      _id: "attachment",
      _attachments: {
        "myattachment.txt": {
          content_type: "text/plain",
          data: "aGVsbG8gd29ybGQ="
        }
      }
    });
    str += "\n\r 【attachments 存储附件:】\n\r" + formatJson(attachmentsREsult);

    // 查询 allDocs获取多条数据
    let getAllResult = await db.allDocs({
      include_docs: true,
      attachments: true
      // keys: ["mydoc", postResult.id] //可执行搜索显示的字段 包括已删除的
    });
    str += "\n\r 【allDocs获取多条数据:】\n\r" + formatJson(getAllResult);

    // 批量创建，更新
    // db.bulkDocs(docs, [options], [callback])

    // 同步
    var sync = PouchDB.sync("test", "http://localhost:3000/db/test", {
      live: true,
      retry: true
    })
      .on("change", function(info) {
        console.log("sync change", info);
      })
      .on("paused", function(err) {
        console.log("sync paused", err);
        // replication paused (e.g. replication up to date, user went offline)
      })
      .on("active", function(active) {
        console.log("sync active", active);
        // replicate resumed (e.g. new changes replicating, user went back online)
      })
      .on("denied", function(err) {
        console.log("sync denied", err);
        // a document failed to replicate (e.g. due to permissions)
      })
      .on("complete", function(info) {
        console.log("sync complete", info);
        // handle complete
      })
      .on("error", function(err) {
        console.log("sync error", err);
        // handle error
      });

    // sync.cancel(); // whenever you want to cancel
  } catch (error) {
    str += "\n\r 【error:】\n\r" + formatJson(error);
  }
  pre.innerText = str;
  app.appendChild(pre);
}
test();

//https://pouchdb.com/guides/attachments.html#base64-vs-blobs-buffers
window.addEventListener("load", async function() {
  let input = window.document.querySelector("input");
  input.addEventListener("change", async function() {
    var file = input.files[0]; // file is a Blob
    try {
      let uplpadResult = await db.put({
        _id: file.name,
        _attachments: {
          [file.name]: {
            content_type: file.type,
            data: file
          }
        }
      });
      str += "\n\r【file存储:】\n\r" + formatJson(uplpadResult);
      pre.innerText = str;

      // let getResult = await db.get(file.name);
      // let getResult = await db.get(file.name, { attachments: true });
      let blob = await db.getAttachment(file.name, file.name);
      console.log(blob)
      img.src = URL.createObjectURL(blob);
      str += "\n\r【获取file存储:】\n\r" + formatJson(blob);
      pre.innerText = str;
    } catch (error) {
      console.error(error);
    }
  });
});
