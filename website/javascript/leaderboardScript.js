function addButtons() {
	var $section = $("#content").empty();
	var $multiplcationMC =  $("<button>").html("Multiplication MC");
	$multiplcationMC.appendTo($section);
	
	$multiplcationMC.click(function() {
		$("#desc").empty();
		$section.empty();
		$("#content").load("assets/mockLeaderboard.html");
	});
}