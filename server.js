
var express = require("express");
var path = require("path");
var jsonfile = require("jsonfile");

app = express();
app.use("/", express.static(__dirname));
app.use(express.urlencoded());
app.listen(process.env.PORT || 3000, function() { console.log('Node.JS is listening! Port '+(process.env.PORT || 3000)); });

data = jsonfile.readFileSync("data.json");
console.log(data);
