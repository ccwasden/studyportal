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
	<script src="js/data.js"></script>
	<script src="js/renderer.js"></script>
	<script src="js/main.js"></script>

</head>
<body ontouchstart="">
<div id="wrapper">
	<div id="container">
            <div id="renderedContent">
            <!-- All page content will be rendered here -->
            </div>
        
            <!-- Page icons go on all buttons -->
            <table class="tabs">
                <tr>
                        <td class="schedule" href="studyschedule"></td>
                        <td class="groups" href="groups"></td>
                </tr>
            </table>    
	</div>
</div>
</body>
</html>
