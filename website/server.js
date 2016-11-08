var http = require("http");
var https = require("https");
var fs = require("fs");
var url = require("url");
var express = require("express");
var bodyParser = require("body-parser");

/* 
* Setup Express.
* Setup settings for parsing and path to static content.
*/
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
})); 
app.use(express.static(__dirname));

var port = process.env.PORT || 5000;
var server = app.listen(port, function () {
	console.log("Listening: " + server.address().port);
});

app.get("/", function (req, res) {
	res.sendFile(__dirname + '/main.html');
});