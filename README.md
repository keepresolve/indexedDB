# web 离线存储技术 indexDB webSql localstorage

[pouchdb 库](http://webfuse.cn/2016/09/24/PouchDB%E7%AE%80%E5%8D%95%E5%85%A5%E9%97%A8/)

- 介绍

  - [参考](https://www.cnblogs.com/suziwen/p/4507684.html)

  - PouchDB 是一个浏览器内数据库 受[Apache CouchDB](http://docs.couchdb.org/en/stable/intro/index.html)启发的开源 JavaScript 数据库，旨在在浏览器中运行良好。

    允许应用程序在本地保存数据，这样用户即使在离线状态下也可以享受应用程序的所有功能。此外，数据在客户端之间同步，因此用户可以随时随地了解最新信息。

* [PouchDB Server](https://github.com/pouchdb/pouchdb-server)
  是 CouchDB 的直接替代品，使用 PouchDB 和 Node.js
  或者自己安装[CouchDB](http://couchdb.apache.org/)
  线上数据库;
* 安装
  > npm install pouchdb --save
* [Chrome 删除本地库插件](https://chrome.google.com/webstore/detail/clearbrowserdata/apehfighfmpoieeniallefdeibodgmmb)
* [Firefox 删除本地库插件](https://addons.mozilla.org/en-US/firefox/addon/clear-recent-history/)
* Safari Clear History and Website Data
* 代码 db.destroy()

- [浏览器查看 PouchDb 插件](https://chrome.google.com/webstore/detail/pouchdb-inspector/hbhhpaojmpfimakffndmpmpndcmonkfa) 或者通过浏览器中的 IndexedDB/WebSQL 查看

-        Firefox 29+（包括适用于Android的Firefox OS和Firefox）
         Chrome 30+
         Safari 5+
         Internet Explorer 10+   fetch不支持  还没有找到如何解决
         Opera 21+
         Android 4.0+
         iOS 7.1+
         Windows Phone 8+

- 比较大
  min.js 40kb 左右
- 优点 - 支持 indexedDB 的索引 - 附件
  - 与线上同步机制
    [PouchDB Server](https://github.com/pouchdb/pouchdb-server)
    线上数据库;
    nodejs 中使用 [LevelDB](http://leveldb.org/)

[LOCALFORAGE 库](https://localforage.docschina.org/)

- 优点 localForage 有一个优雅降级策略，若浏览器不支持 IndexedDB 或 WebSQL，则使用 localStorage。在所有主流浏览器中都可用：Chrome，Firefox，IE 和 Safari（包括 Safari Mobile）。
- 比较小 min.js 10kb 左右

- 数据类型

      Array
      ArrayBuffer
      Blob
      Float32Array
      Float64Array
      Int8Array
      Int16Array
      Int32Array
      Number
      Object
      Uint8Array
      Uint8ClampedArray
      Uint16Array
      Uint32Array
      String

- 配置

       localforage.config({

       driver      : localforage.WEBSQL, // 使用 WebSQL；也可以使用 setDriver() 可强制设置启动
       name        : 'myApp',
       version     : 1.0,
       size        : 4980736, // 数据库的大小，单位为字节。现仅 WebSQL 可用
       storeName   : 'keyvaluepairs', // 仅接受字母，数字和下划线
       description : 'some description'
       });
