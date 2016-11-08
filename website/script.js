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
		
		var $question = $("<p>").html("Calculate: " + int1 + " * " + int2);
		var $opt1 = $('<input type="radio" name=' + qid + ' />').prop( "checked", true);
		var $val1 = $("<span>").html(int1 * int2);
		var $opt2 = $('<input type="radio" name=' + qid + ' />');
		var $val2 = $("<span>").html(int1 * int2 + randInt(1, 99));
		var $opt3 = $('<input type="radio" name=' + qid + ' />');
		var $val3 = $("<span>").html(int1 * int2 + randInt(1, 99));
		var $opt4 = $('<input type="radio" name=' + qid + ' />');
		var $val4 = $("<span>").html(int1 * int2 - randInt(1, 99));
		
		$section.append($title, $question, $opt1, $val1, $opt2, $val2, $opt3, $val3, $opt4, $val4);
		$container.append($section); //Name of container
	}
}

function randInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}