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
	});
}

//Question ID Global Counter
var qid = 0;

function createMultiplicationQuestion($container, number) {
	for (i = 0; i < number; i++) {
		qid++;
		var $section = $("<section id='question" + qid + "'>");
		$section.css("border-bottom", "2px solid black");
		var $title = $("<h3>").html("Question: " + qid);
		
		var int1 = randInt(1, 99);
		var int2 = randInt(1, 99);
		var int3 = 0; //Stores value being added to radiobutton and span
		
		
		var $question = $("<p>").html("Calculate: " + int1 + " * " + int2);
		var $opt1 = $('<input type="radio" name=' + qid + ' />').prop( "checked", true);
		int3 = int1 * int2;
		$opt1.val(int3);
		var $val1 = $("<span>").html(int3);
		
		var $opt2 = $('<input type="radio" name=' + qid + ' />');
		int3 = int1 * int2 + randInt(1, 99);
		$opt2.val(int3);
		var $val2 = $("<span>").html(int3);
		
		var $opt3 = $('<input type="radio" name=' + qid + ' />');
		int3 = int1 * int2 + randInt(1, 99);
		$opt3.val(int3);
		var $val3 = $("<span>").html(int3);
		
		var $opt4 = $('<input type="radio" name=' + qid + ' />');
		int3 = int1 * int2 - randInt(1, 99);
		$opt4.val(int3);
		var $val4 = $("<span>").html(int3);
		
		$section.append($title, $question, $opt1, $val1, $opt2, $val2, $opt3, $val3, $opt4, $val4);
		$container.append($section); //Name of container
	}
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
	
	//Go through every section in the container
	for(var x = 0; x < $sections.length; x++){
		$sect = $sections[x];
		//jquery of radiobuttons for a specific section
		$radioButtons = $sect.find("radio");
		//Find the checked radiobutton
		for(var y = 0; y < $radioButtons.length; y++){
			if($radioButtons[y].prop("checked")){
				answer = $radioButtons[y].val();
			}
		}
		//Find the question
		$p = $sect.find("p");
		question = $p[0].text();
		
		score = score + checkAnswer(question, answer);
	}
	return score;
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