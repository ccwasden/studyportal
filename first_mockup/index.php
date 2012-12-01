<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;"> 
	<title>Study Portal</title>
	
	<link href='http://fonts.googleapis.com/css?family=Overlock:400|Dosis:400|Crete+Round' rel='stylesheet' type='text/css'>
	<link type="text/css" href="css/styles.css" rel="stylesheet"/>
	<link type="text/css" href="lib/jscrollpane.css" rel="stylesheet"/>

	<!--Do we just want to host JQuery locally? -->
	<script src="lib/jquery.js"></script>
	<script src="lib/handlebars-1.0.rc.1.js"></script>
	<script src="lib/jquery.debounce-1.0.5.js"></script>
	<script src="lib/jquery.mousewheel.js"></script>
	<script src="lib/mwheelintent.js"></script>
	<script src="lib/jscrollpane.js"></script>
	<script src="lib/jquerybbq.js"></script>
	
	<script src="js/data.js"></script>
	<script src="js/renderer.js"></script>
	<script src="js/main.js"></script>

</head>
<body>
	<div id="wrapper">
		<div id="dashboard">
			<!-- <div class="dashHeader">
				<div class="profileIcon" href="profile"></div>
				<div class="search" href="search"></div>
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
				<div class="content">
					<div class="listWrapper dark">
	                    <ol class="list arrow">
	                        <li>Title<span class="subtitle">subtitle</span></li>
	                        <li>Title<span class="subtitle">subtitle</span></li>
	                        <li>Title<span class="subtitle">subtitle</span></li>
	                        <li>Title<span class="subtitle">subtitle</span></li>
	                        <li>Title<span class="subtitle">subtitle</span></li>
	                        <li>Title<span class="subtitle">subtitle</span></li>
	                        <li>Title<span class="subtitle">subtitle</span></li>
	                        <li>Title<span class="subtitle">subtitle</span></li>
	                        <li>Title<span class="subtitle">subtitle</span></li>
	                        <li>Title<span class="subtitle">subtitle</span></li>
	                        <li>Title<span class="subtitle">subtitle</span></li>
	                        <li>Title<span class="subtitle">subtitle</span></li>
	                        <li>Title<span class="subtitle">subtitle</span></li>
	                        <li>Title<span class="subtitle">subtitle</span></li>
	                    </ol>
					</div>	
				</div>
			</div> -->
		</div>
		<div id="container">
	            <div id="renderedContent">
	            <!-- All page content will be rendered here -->
	            </div>
	        
	               
		</div>
	</div>
	<!-- Page icons go on all buttons -->
	<table class="tabs" id="tabs">
	    <tr>
	            <td class="schedule" href="studyschedule"></td>
	            <td class="groups" href="groups"></td>
	    </tr>
	</table> 
</body>
</html>
