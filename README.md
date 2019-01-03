# web 离线存储技术 indexDB webSql localstorage

[pouchdb 库](http://webfuse.cn/2016/09/24/PouchDB%E7%AE%80%E5%8D%95%E5%85%A5%E9%97%A8/)

- 安装
 > npm install pouchdb --save
- [Chrome 删除本地库插件](https://chrome.google.com/webstore/detail/clearbrowserdata/apehfighfmpoieeniallefdeibodgmmb)
- [Firefox 删除本地库插件](https://addons.mozilla.org/en-US/firefox/addon/clear-recent-history/)
- Safari Clear History and Website Data
- 代码 db.destroy()


- [浏览器查看 PouchDb 插件](https://chrome.google.com/webstore/detail/pouchdb-inspector/hbhhpaojmpfimakffndmpmpndcmonkfa) 或者通过浏览器中的IndexedDB/WebSQL查看

-
        Firefox 29+（包括适用于Android的Firefox OS和Firefox）
        Chrome 30+
        Safari 5+
        Internet Explorer 10+
        Opera 21+
        Android 4.0+
        iOS 7.1+
        Windows Phone 8+
[LOCALFORAGE 库](https://localforage.docschina.org/)

- 优点 localForage 有一个优雅降级策略，若浏览器不支持 IndexedDB 或 WebSQL，则使用 localStorage。在所有主流浏览器中都可用：Chrome，Firefox，IE 和 Safari（包括 Safari Mobile）。
