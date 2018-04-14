
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
    else if (b.type == "sendMessage") {
        if (data.events[b.event]) {
            data.events[b.event].msgHistory.push({"text": b.message, "user": b.username, "profileImg": data.users[b.username].profileImg});
            jsonfile.writeFileSync("data.json", data);
        }
    }
    else if (b.type == "addEvent") {
        if (!data.events[b.event]) {
            data.users[b.username].events.push("b.event");
            data.events[b.event] = {"msgHistory": [], "going": [], "notGoing": []};
            jsonfile.writeFileSync("data.json", data);
        }
    }
    else if (b.type == "getAllMessages") {
        if (data.events[b.event]) returnData = data.events[b.event].msgHistory;
    }
    else if (b.type == "login") {
        if (data.users[b.username] && data.users[b.username].password == b.password) returnData = {"result": true};
    }
    else if (b.type == "signup") {
        if (!data.users[b.username]) {
            data.users[b.username] = {"password": b.password, "events": [], "profileImg": b.profileImg};
        }
    }
    res.send(returnData);
});

data = jsonfile.readFileSync("data.json");
console.log(data);
