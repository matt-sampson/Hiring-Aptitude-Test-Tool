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
	//Write new json file for names of json files for leaderboards for quizzes
	//if it does not exist
	var lbFile = __dirname + "/leaderboard/quizNames.json";
	jsonfile.readFile(lbFile, function(err, json){
		if(err){
			var obj = {"paths" : ""};
			jsonfile.writeFile(lbFile, obj, function(err){
				if(err){
					console.log(err);
				}
			});
		}
	});
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
	//Create leaderboard file if it does not exist
	var lbFile = __dirname + "/leaderboard/" + quiz.name;
	jsonfile.readFile(lbFile, function (err, json) {
		if (err){
			var obj = {1:"NULL", 2:"NULL", 3:"NULL"};
	        jsonfile.writeFile(lbFile, obj, function(err) {
		    if (err) {
			    console.log(err);
		    }
	        });
			//Update the file containing the paths
			pathsFile = __dirname + "/leaderboard/quizNames.json";
			jsonfile.readFile(pathsFile, function(err, obj2){
				if(err){
					console.log(err);
				}
				else{
					obj2["paths"] = obj2["paths"] + "," + quiz.name;
					jsonfile.writeFile(pathsFile, obj2, function(err){
						if(err){
							console.log(err);
						}
					});
				}
			});
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
	
	//Update leaderboard if needed
	var obj1;
	var lbDir = __dirname + "/leaderboard/" + json.name;
	jsonfile.readFile(lbDir, function(err, obj){
		if (err) {
			console.log(err);
		}
		//No error, write
		else{
			var nameScore;
			var tokens;
			var isNull = 0;
			var holder;
			var toAdd;
			for(x = 1; x < 4; x++){
				nameScore = obj[x];
				tokens = nameScore.split(" ");
				if(tokens.length < 2){
					isNull = 1;
					break;
				}
				else if(tokens[1] < json.score){
					break;
				}
			}
			//This score is lower, do nothing
			if(x == 4){
				return;
			}
			//Null means that this entry of the scoreboard has nothing so we just add it
			if(isNull == 1){
				obj[x] = json.address + " " + json.score;
			}
			//Bubble everything else down otherwise
			else{
				toAdd = json.address + " " + json.score;
				while(x < 4){
					holder = obj[x];
					obj[x] = toAdd;
					toAdd = holder;
					x++;
				}
				
			}
			jsonfile.writeFile(lbDir, obj, function(err) {
		        if (err) {
			        console.log(err);
		        }
	        });
		}
	});
	
	
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

app.get(/leaderboard/, function (req, res) {
	var filename =  __dirname + "/leaderboard/quizNames.json";
	jsonfile.readFile(filename, function (err, json) {
		if (err)
			console.log(err);
		else {
			res.json(json);
		}
	});
});

app.post(/singleLeaderboard/, function (req, res) {
	console.log("here");
	console.log(req.body);
	var filename =  __dirname + "/leaderboard/" + req.body[1];
	jsonfile.readFile(filename, function (err, json) {
		if (err)
			console.log(err);
		else {
			res.json(json);
		}
	});
});