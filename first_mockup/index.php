<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0"> 
	<title>Study Portal</title>
	
	<link href='http://fonts.googleapis.com/css?family=Overlock:400|Dosis:400|Crete+Round' rel='stylesheet' type='text/css'>
	<link type="text/css" href="lib/jscrollpane.css" rel="stylesheet"/>
	<link type="text/css" href="lib/jquery-ui.min.css" rel="stylesheet"/>
	<link type="text/css" href="css/styles.css" rel="stylesheet"/>

	<script src="lib/jquery.js"></script>
	<script src="lib/handlebars-1.0.rc.1.js"></script>
	<script src="lib/jquery.debounce-1.0.5.js"></script>
	<script src="lib/jquery.mousewheel.js"></script>
	<script src="lib/mwheelintent.js"></script>
	<script src="lib/jscrollpane.js"></script>
	<script src="lib/jquerybbq.js"></script>
	<script src="lib/jquery-ui-1.9.2.custom.min.js"></script>
	<script src="lib/moment.js"></script>
	
	<script src="js/db.js"></script>
	<script src="js/data.js"></script>
	<script src="js/renderer.js"></script>
	<script src="js/main.js"></script>

</head>
<body>
	<div id="wrapper">
		<div id="dashboard">
			<!-- dashboard only rendered here -->
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
            <td class="schedule" id="scheduleTab" href="studyschedule"></td>
            <td class="groups" id="groupsTab" href="groups"></td>
	    </tr>
	</table> 
	<!-- This is the holder for any modal rederings -->
	<div id="modal">
	</div>
	<div id="loginModal" class="mainModal">
		<div class="logo"></div>
		<div class="listWrapper">
			<div class="list login">
				<form id="loginform">
					<h3>Username</h3><input id="username">
					<div id="userError" class="error"></div>
					<h3>Password</h3><input id="password" type="password">
					<div id="passError" class="error"></div>
					<label class="remember"><input type="checkbox" id="rememberMe"> Remember Me</label>
					<button class="button" type="submit" id="loginBtn">Login</button>
				</form>
			</div>
		</div>
		<div id="resetDb">Reset App</div>
	</div>
	<div class="dialogContainer mainDialog"></div>
</body>
</html>
