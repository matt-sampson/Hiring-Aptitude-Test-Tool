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
			var $button =  $("<button>").html(tokens[x]);
			$button.name = tokens[x];
			$button.attr('id', tokens[x]);
			$button.appendTo($section);
			$button.click(function(e){ showLeaderBoard($(this).attr('id'))});
		}
	});
}

function showLeaderBoard(fileName){
	var $section = $("#content").empty();
	var $desc = $("<h1>").html("Rankings: ");
	$desc.appendTo($section);
	var leaderboard = $('<table id="leaderboard"></table>');
	var header = $('<tr><th>Rank</th><th>Name</th><th>Score</th></tr>');
	leaderboard.append(header);
	var $desc2;
	$.ajax({
		url: "\/singleLeaderboard\/",
		method: "POST",
	    data: {1:fileName}
	}).done(function(jsondata) {
		for (x = 1; x < 4; x++) {
			if (jsondata[x].split(' ')[0] != 'NULL') {
				var row = $('<tr><td>' + x + '</td><td>' + jsondata[x].split(' ')[0] + '</td><td>' + jsondata[x].split(' ')[1] + '</td></tr>');
			}
			else {
				var row = $('<tr><td>' + x + '</td><td>' + 'None' + '</td><td>' + '0' + '</td></tr>');
			}
			leaderboard.append(row);
		}
	});
	
	$("#content").append(leaderboard);
}
