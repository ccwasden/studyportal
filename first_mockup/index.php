<?php
	//Some stuff might go here
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;"> 
	<title>Study Portal</title>
	
	<link href='http://fonts.googleapis.com/css?family=Overlock:400|Dosis:400|Crete+Round' rel='stylesheet' type='text/css'>
	<link type="text/css" href="css/styles.css" rel="stylesheet"/>

	<!--Do we just want to host JQuery locally? -->
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
	<script src="lib/handlebars-1.0.rc.1.js"></script>
	<script src="js/renderer.js"></script>
	<script src="js/main.js"></script>

</head>
<body>
<div id="wrapper">
<div id="container" class="dark">
	<div class="dashHeader">
		<div class="profileIcon"></div>
		<!-- <h1>jasonbourne</h1> -->
		<div class="search" href="search.html"></div>
		<span class="status">
			<h2>Upcoming:</h2>
			<span>No meetings...</span>
		</span>
	</div>
	
		
		<div class="pane dark">
			<div class="header dark">
				<h1>Notifications</h1>
				<button>Clear All</button>
			</div>
			<!-- <div id="header2" class="header">
				Header row 2
			</div> -->
			<div class="content">
				<div class="listWrapper dark">
					<!-- <div class="listHeader">
						<h1>No New Notifications...</h1>
					</div> -->
					<ol class="list arrow">
						<li>Study Request<span class="subtitle">Sandra Bernard</span></li>
						<li>Meeting Time Change<span class="subtitle">Math 112 - Tomorrow, 3pm</span></li>
				    </ol>
				</div>	
			</div>
	
		
	</div>
	<table class="tabs">
		<tr>
			<td class="schedule" href="studySchedule.html"></td>
			<td class="groups" href="groups.html"></td>
		</tr>
	</table>
</div>
</div>
</body>
</html>