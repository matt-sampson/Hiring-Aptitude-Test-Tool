//Question ID Global Counter
var qid = 0;

function createMultiplicationQuestion() {
	qid++;
	var $section = $("<section id='question" + qid + "'>");
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
	$("#content").append($section); //Name of container
}

function randInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}