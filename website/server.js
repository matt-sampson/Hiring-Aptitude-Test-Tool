var http = require("http");
var https = require("https");
var fs = require("fs");
var url = require("url");
var express = require("express");
var bodyParser = require("body-parser");
var nodemailer = require("nodemailer");
var jsonfile = require("jsonfile");

/*
* Setup smtp to send emails.
* Set config settings and setup transporter.
*/
var smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: "csc301.mailer@gmail.com",
        pass: "csc301team10"
	}
};
var transporter = nodemailer.createTransport(smtpConfig);

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

app.put("/questions", function (req, res) {
	var quiz = req.body;
	var filename = __dirname + "/saves/" + quiz.name;
	jsonfile.writeFile(filename, quiz, function(err) {
		if (err) {
			console.log(err);
		}
	});
	
	var recipients = quiz.recipient;
	for (var i = 0; i < recipients.length; i++) {
		var msg = quiz.creator + " has challenged you to the quiz at " + "http://localhost:5000/start/" + quiz.name;
		
		var mailOptions = {
			from: '"quiz" <csc301.mailer@gmail.com>', 
			to: recipients[i], 
			subject: quiz.name,
			text: msg, 
		};
	
		transporter.sendMail(mailOptions, function(error, info){
			if(error){
				res.status(400).end();
			}
			else {
				res.status(200).send({});
			}
		});
	}
});

app.get(/quiz/, function (req, res) {
	var name = (req.url).split("\/")[2];
	var filename =  __dirname + "/saves/" + name;
	jsonfile.readFile(filename, function (err, json) {
		if (err)
			console.log(err);
		else {
			res.json(json);
		}
	});
});

app.get(/start/, function (req, res) {
	res.sendFile(__dirname + '/customquiz.html');
});

app.post("/send", function (req, res) {
	var json = req.body;
	//console.log(json);
	var msg = json.address + " scored " + json.score + " out of " + json.total + " for quiz " + json.name;
	//console.log(msg);
	
	var mailOptions = {
		from: '"quiz" <csc301.mailer@gmail.com>', 
		to: json.creator, 
		subject: json.name + ' Results',
		text: msg, 
	};
	
	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			res.status(400).end();
		}
		else {
			res.status(200).send({});
		}
	});
});