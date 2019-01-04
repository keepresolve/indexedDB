// require('es6-promise').polyfill();
let PouchDB = require("pouchdb").default;
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
  db = new PouchDB("http://localhost:3000/dbname");
  // db = new PouchDB("test");
  // 删除数据库
  let destroyResult = await db.destroy("test");
  str += "\n\r删除数据库test:\n\r" + formatJson(destroyResult);
  db = new PouchDB("http://localhost:3000/dbname");

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
      img.src = URL.createObjectURL(blob);
      str += "\n\r【获取file存储:】\n\r" + formatJson(blob);
      pre.innerText = str;
    } catch (error) {
      console.error(error);
    }
  });
});

function formatJson(json, options) {
  var reg = null,
    formatted = "",
    pad = 0,
    PADDING = "    ";
  options = options || {};
  options.newlineAfterColonIfBeforeBraceOrBracket =
    options.newlineAfterColonIfBeforeBraceOrBracket === true ? true : false;
  options.spaceAfterColon = options.spaceAfterColon === false ? false : true;
  if (typeof json !== "string") {
    json = JSON.stringify(json);
  } else {
    json = JSON.parse(json);
    json = JSON.stringify(json);
  }
  reg = /([\{\}])/g;
  json = json.replace(reg, "\r\n$1\r\n");
  reg = /([\[\]])/g;
  json = json.replace(reg, "\r\n$1\r\n");
  reg = /(\,)/g;
  json = json.replace(reg, "$1\r\n");
  reg = /(\r\n\r\n)/g;
  json = json.replace(reg, "\r\n");
  reg = /\r\n\,/g;
  json = json.replace(reg, ",");
  if (!options.newlineAfterColonIfBeforeBraceOrBracket) {
    reg = /\:\r\n\{/g;
    json = json.replace(reg, ":{");
    reg = /\:\r\n\[/g;
    json = json.replace(reg, ":[");
  }
  if (options.spaceAfterColon) {
    reg = /\:/g;
    json = json.replace(reg, ":");
  }
  json.split("\r\n").forEach(function(node, index) {
    var i = 0,
      indent = 0,
      padding = "";

    if (node.match(/\{$/) || node.match(/\[$/)) {
      indent = 1;
    } else if (node.match(/\}/) || node.match(/\]/)) {
      if (pad !== 0) {
        pad -= 1;
      }
    } else {
      indent = 0;
    }

    for (i = 0; i < pad; i++) {
      padding += PADDING;
    }

    formatted += padding + node + "\r\n";
    pad += indent;
  });
  return formatted;
}
