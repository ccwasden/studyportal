var Templates = { } //Templates are stored here

/**
 * Function called on application initialization
 */
$(document).ready(function(){
	//Get all templates
	$.ajax({
		url: "templates/getTemplates.php",
		data: {
		    method: "get"
		},
		async: false,
		success: function(data){
			Templates = $.parseJSON(data);
		}
	});
	
	//Render the first page in the app
	Renderer.renderDashboardPage();
});

// makes it so any element that has an "href" attribute becomes a link on click
$(document).click(function(eve){
	var cur = $(eve.target);
	while(cur.prop("tagName") != "BODY"){ // traverse parent elements
		var destination = cur.attr("href");
		if(destination) {
			window.location = destination;
			break;
		}
		cur = cur.parent(); //intended element was likely a few elements up
	}
});



