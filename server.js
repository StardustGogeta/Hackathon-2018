
var express = require("express");
var path = require("path");

app = express();
app.use("/", express.static(__dirname));
app.use(express.urlencoded());
app.listen(process.env.PORT || 3000, function() { console.log('Node.JS is listening! Port '+(process.env.PORT || 3000)); });
