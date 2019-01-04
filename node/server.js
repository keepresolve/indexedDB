var PouchDB = require("pouchdb");
var express = require("express");
var path = require("path");
var TempPouchDB = PouchDB.defaults({ prefix: __dirname+"/db/"});
var app = express();
var port = 3000;
//代理
// var TempPouchDB = require('http-pouchdb')(PouchDB, 'http://localhost:5984');
// app.use('/db', require('express-pouchdb')(TempPouchDB));
app.use('*', function (req, res, next) {
      res.header("Access-Control-Allow-Credentials", true)
      res.header("Access-Control-Allow-Origin", "*")
    //   res.header("Access-Control-Allow-Headers", "X-Requested-With")
    //   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
    //   res.header("X-Powered-By", ' 3.2.1')
    //   res.header("Content-Type", "application/json;charset=utf-8")
      next()
})
app.use("/db", require("express-pouchdb")(TempPouchDB));

app.listen(port, function() {
  console.log("listen port at" + port);
});
