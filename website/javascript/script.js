function contentQuestion() {
	var $section = $("#content").empty();
	var $h3 = $("<h3>").html("Question Types");
	$section.append($h3);
	
	var $multiplcationMC =  $("<button>").html("Multiplication MC");
	$multiplcationMC.appendTo($section);
	$multiplcationMC.click(function() {
		$section.empty();
		var $mmcTitle = $("<h3>").html("Multiplication");
		$mmcTitle.appendTo($section);
		createMultiplicationQuestion($section, 10);
		var $mmcSubmit = $("<button>").html("Submit");
		$mmcSubmit.appendTo($section);
		//Attatch checkanswers function to submit button
		$mmcSubmit.click(function() {
			var score = 0;
			score = checkAnswers($section);
			window.alert("You scored: " + score.toString());
		});
	});
}

//Question ID Global Counter
//var qid = 0;

function createMultiplicationQuestion($container, number) {
	var $container = $("#content").empty();
	var qid = 0;
	for (i = 0; i < number; i++) {
		qid++;
		var $section = $("<section id='question" + qid + "'>");
		$section.css("border-bottom", "2px solid black");
		var $title = $("<h3>").html("Question: " + qid);
		
		var int1 = randInt(0, 9);
		var int2 = randInt(0, 9);
		var int3 = 0; //Stores value being added to radiobutton and span
		
		var answers = []; // keep track of answers generated to make sure same answer doesn't appear twice
		var $question = $("<p>").html("Calculate: " + int1 + " * " + int2);
		var $opt1 = $('<input type="radio" name=' + qid + ' />')
		int3 = int1 * int2;
		answers.push(int3);
		$opt1.val(int3);
		var $val1 = $("<span>").html(int3);
		
		var $opt2 = $('<input type="radio" name=' + qid + ' />');
		int3 = generateRandomAnswer(int1, int2, answers);
		answers.push(int3);
		$opt2.val(int3);
		var $val2 = $("<span>").html(int3);
		
		var $opt3 = $('<input type="radio" name=' + qid + ' />');
		int3 = generateRandomAnswer(int1, int2, answers);
		answers.push(int3);
		$opt3.val(int3);
		var $val3 = $("<span>").html(int3);
		
		var $opt4 = $('<input type="radio" name=' + qid + ' />');
		int3 = generateRandomAnswer(int1, int2, answers);
		answers.push(int3);
		$opt4.val(int3);
		var $val4 = $("<span>").html(int3);
		
		$section.append($title, $question).appendTo("#content");
		
		var numbers = [1, 2, 3, 4]; // make array to keep track of opt & vals that have been appended

		for (j = 0; j < 4; j++) {
			var random = [Math.floor(Math.random() * numbers.length)];
			while (numbers[random] == -1) {
				random = [Math.floor(Math.random() * numbers.length)];
			}

			if (random == 0) {
				$section.append($opt1, $val1, "<br>");
			}
			else if (random == 1) {
				$section.append($opt2, $val2, "<br>");
			}
			else if (random == 2) {
				$section.append($opt3, $val3, "<br>");
			}
			else if (random == 3) {
				$section.append($opt4, $val4, "<br>");
			}

			numbers[random] = -1;
		}
		
		$container.append($section); //Name of container
	}
}

// generate a random (wrong) answer for use in the multiple choice quiz
function generateRandomAnswer(int1, int2, answers) {
	var answer = int1 * int2 + randInt(1, 9);
	while (answers.indexOf(answer) >= 0) {
		answer = int1 * int2 + randInt(1, 9);
	}
	return answer;
}

function checkAnswers($container){
	//jquery of sections
	var $sections = $container.find("section");
	var $sect;
	var $radioButtons;
	var answer;
	var question;
	var $p;
	
	var score = 0;
	var totalScore = 0;
	
	//Go through every section in the container
	for(var x = 0; x < $sections.length; x++){
		$sect = $sections.eq(x);
		//jquery of radiobuttons for a specific section
		$radioButtons = $sect.find("input");
		//Find the checked radiobutton
		for(var y = 0; y < $radioButtons.length; y++){
			if($radioButtons.eq(y).prop("checked")){
				answer = $radioButtons.eq(y).val();
			}
		}
		//Find the question
		$p = $sect.find("p");
		question = $p.eq(0).text();
		
		score = checkAnswer(question, answer);
		//Set section to appropriate color for correct/incorrect
		if(score == 1){
			$sect.css("border", "2px solid green");
		}
		else{
			$sect.css("border", "2px solid red");
		}
		totalScore = totalScore + score;
	}
	return totalScore;
}

function checkAnswer(question, answer){
	var x1;
	var x2;
	
	//Format of question obtained from p is:
	//Calculate: x1 * x2
	var res = question.split(" ");
	
	x1 = parseInt(res[1]);
	x2 = parseInt(res[3]);
	
	if(answer == x1 * x2){
		return 1;
	}
	else{
		return 0;
	}
}

function randInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function createQuestion() {
	var $section = $("#content").empty();
	var $h3 = $("<h3>").html("Question Types");
	$section.append($h3);
	
	var $MC =  $("<button>").html("Multiple Choice");
	$MC.appendTo($section);
	$MC.click(function() {
		$section.empty();
		mcInit($section);
	});
}

function mcInit($container) {
	var $options = $("<table>").appendTo($container);
	
	var $quantity = $("<tr id='mc-quantity'>").appendTo($options);
	$("<td>").html("Number of Questions: ").appendTo($quantity);
	$("<input>").val(5).appendTo($("<td>").appendTo($quantity));
	
	var $ops = $("<tr id='mc-ops'>").appendTo($options);
	$("<td>").html("Multiple Choice Options: ").appendTo($ops);
	$("<input>").val(4).appendTo($("<td>").appendTo($ops));
	
	$("<button>").html("Start").appendTo($container).click(function() {
		var q = ($("#mc-quantity").find("input")).val();
		var o = ($("#mc-ops").find("input")).val();
		$container.empty();
		var $create = $("<section id='questionForm'>").appendTo($container);
		mcCreate($create, q, o - 1);
	});
}

function mcCreate($container, quantity, options) {
	for (i = 0; i < quantity; i++) {
		var $section = $("<section>").addClass("customQuestion").appendTo($container);
		var $h4 = $("<h4>").html("Create Question " + (i + 1)).appendTo($section);
		var $table = $("<table>").appendTo($section);
		var $question = $("<tr>").addClass("qName").appendTo($table);
		var $td = $("<td>").html("Question: ").appendTo($question);
		var $input = $("<input>").addClass("questionText").attr("size", 80).appendTo($("<td>").appendTo($question));
		var $correct = $("<tr>").appendTo($table);
		$("<td>").html("Answer: ").appendTo($correct);
		$("<input>").addClass("correctAnswer").attr("size", 80).appendTo($("<td>").appendTo($correct));
		
		for (j = 0; j < options; j++) {
			mcOptionCreate($table);
		}
	}
	$("<button>").html("Submit").appendTo($container).click(function() {
		jsonQuestions($container);
	});
}

function mcOptionCreate($table) {
	var $tr = $("<tr>").appendTo($table);
	var $td = $("<td>").html("Option: ").appendTo($tr);
	var $input = $("<input>").addClass("wrongAnswer").attr("size", 80).appendTo($("<td>").appendTo($tr));
}

function jsonQuestions($container) {
	var data = {"questions": []};
	var $questions = $container.find(".customQuestion");
	for (i = 0; i < $questions.length; i++) {
		var $curr = $questions.eq(i);
		var text = $curr.find(".questionText").val();
		var answer = $curr.find(".correctAnswer").val();
		var options = [];
		var wrong = $curr.find(".wrongAnswer");
		for (j = 0; j < wrong.length; j++) {
			options.push((wrong.eq(j)).val());
		}
		data.questions.push({text, answer, options});
	}
	prepareQuestions(data);
}

function prepareQuestions(data) {
	var $section = $("#content").empty();
	var $table = $("<table>").appendTo($section);
	var $name = $("<tr>").appendTo($table);
	$("<td>").html("Quiz Name: ").appendTo($name);
	var $qn = $("<input>").appendTo($("<td>").appendTo($name));
	var $results = $("<tr>").appendTo($table);
	$("<td>").html("Send Results To Email: ").appendTo($results);
	var $qe = $("<input>").appendTo($("<td>").appendTo($results));
	
	var $recipients = $("<section>").appendTo($section);
	var $title = $("<h3>").html("Send Quiz To Recipients").appendTo($recipients);
	var $add = $("<button>").html("Add Recipient").appendTo($recipients).click(function() {
		$("<input>").attr("size", 80).addClass("recipient").appendTo($recipients);
	});
	var $submit = $("<button>").html("Finish and Send").appendTo($recipients).click(function() {
		var name = $qn.val();
		var creator = $qe.val();
		var recipient = [];
		var allRecipient = $recipients.find(".recipient");
		for (i = 0; i < allRecipient.length; i++) {
			recipient.push((allRecipient.eq(i)).val());
		}
		var json = {name, creator, recipient, data};
		putNewQuestions(json);
	});	
}

function putNewQuestions(json) {
	$.ajax({
		url: "\/questions",
		method: "PUT",
		data: json
	}).done(function(jsondata) {
		alert("Done");
	});
}

function startQuiz() {
	var url = $(location).attr("href");
	var split = url.split("\/");
	var name = split[split.length - 1];
	
	$.ajax({
		url: "\/quiz\/" + name,
		method: "GET"
	}).done(function(jsondata) {
		$("#title").html("Quiz " + jsondata.name);
		loadQuiz(jsondata);
	});
}

function loadQuiz(json) {
	var $container = $("#content").empty();
	//alert(JSON.stringify(json));
	var questions = json.data.questions;
	for (let i = 0; i < questions.length; i++) {
		var curr = questions[i];
		var $section = $("<section>").addClass("questionSection").appendTo($container);
		$("<p>").html(curr.text).appendTo($section);
		var $table = $("<table>").appendTo($section);
		var $tr = $("<tr>").appendTo($table);
		$("<input type='radio' name='" + curr.text + "'>").addClass("correctChoice").appendTo($("<td>").appendTo($tr));
		$("<td>").html(curr.answer).appendTo($tr);
		attachOptions(curr.options, $table, curr.text);
	}
	var $email = $("<section>").appendTo($container);
	$("<span>").html("Enter Your Email").appendTo($email);
	$("<br>").appendTo($email);
	var $address = $("<input>").attr("size", 40).appendTo($email);
	$("<br>").appendTo($email);
	$("<button>").html("Submit Answers").appendTo($email).click(function() {
		scoreCustomQuiz($container, $address.val(), json.creator, json.name);
	});
}

function attachOptions(options, $table, inputName) {
	for (let i = 0; i < options.length; i++) {
		var $tr = $("<tr>").appendTo($table);
		$("<input type='radio' name='" + inputName + "'>").appendTo($("<td>").appendTo($tr));
		$("<td>").html(options[i]).appendTo($tr);
	}
}

function scoreCustomQuiz($container, address, creator, name) {
	var $questions = $container.find(".questionSection");
	var score = 0;
	for (let i = 0; i < $questions.length; i++) {
		var $curr = $questions.eq(i);
		var $correct = $curr.find(".correctChoice");
		if ($correct.is(":checked")) {
			score++;
		}
	}
	
	var obj = {creator, address, name, score, "total" : $questions.length};
	
	$.ajax({
		url: "\/send",
		method: "POST",
		data: obj
	}).done(function() {
		alert("Done");
	});

}