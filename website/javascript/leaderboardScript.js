function addButtons() {
	$.ajax({
		url: "\/leaderboard\/",
		method: "GET"
	}).done(function(jsondata) {
		var $section = $("#content").empty();
	    var $desc = $("<h1>").html("Get leaderboard rankings for:");
		var $button;
		$desc.appendTo($section);
		var tokens = jsondata["paths"].split(',');
		for(x = 1; x < tokens.length; x++){
			console.log(tokens[x]);
			var $button =  $("<button>").html(tokens[x]);
			$button.name = tokens[x];
			//$button.onclick = showLeaderBoard(tokens[x]);
			$button.appendTo($section);
			$button.click(function(){showLeaderBoard($button.name)});
		}
	});
}

function showLeaderBoard(name){
	var $section = $("#content").empty();
	var $desc = $("<h1>").html("Rankings: ");
	$desc.appendTo($section);
	var $desc2;
	$.ajax({
		url: "\/singleLeaderboard\/",
		method: "POST",
	    data: {1:name}
	}).done(function(jsondata) {
		for(x = 1; x < 4; x++){
			$desc2 = $("<h1>").html(jsondata[x]);
			$desc2.appendTo($section);
		}
	});
}