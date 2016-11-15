function addButtons() {
	var $section = $("#content").empty();
	var $desc = $("<h1>").html("Get leaderboard rankings for:");
	var $multiplcationMC =  $("<button>").html("Multiplication MC");
	$desc.appendTo($section);
	$multiplcationMC.appendTo($section);
	
	$multiplcationMC.click(function() {
		$section.empty();
		$("#content").load("assets/mockLeaderboard.html");
	});
}