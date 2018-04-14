
var express = require("express");
var path = require("path");
var jsonfile = require("jsonfile");

app = express();
app.use("/", express.static(__dirname));
app.use(express.urlencoded());
app.listen(process.env.PORT || 3000, function() { console.log('Node.JS is listening! Port '+(process.env.PORT || 3000)); });

app.post("/index.html", function(req, res) {
    returnData = {};
    b = req.body;
    data = jsonfile.readFileSync("data.json");
    console.log(b);
    if (b.type == "getUserData") {
        if (data.users[b.username] && data.users[b.username].password == b.password) returnData = data.users[b.username];
        else returnData = {"error": "Sent invalid user credential pairing"};
    }
    res.send(returnData);
});

data = jsonfile.readFileSync("data.json");
console.log(data);
