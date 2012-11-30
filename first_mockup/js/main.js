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
	Renderer.renderDashboardPage(Data.dashboard());
});

// makes it so any element that has an "href" attribute becomes a link on click
$(document).click(function(eve){
	var cur = $(eve.target);
	while(cur.prop("tagName") != "BODY"){ // traverse parent elements
		var destination = cur.attr("href");
		if(destination) {
			redirect(destination);
			break;
		}
		cur = cur.parent(); //intended element was likely a few elements up
	}
});

function redirect(destination)
{
	switch(destination)
	{
		case "dashboard":
			Renderer.renderDashboardPage(Data.dashboard());
			break;
		case "groups":
			Renderer.renderGroupsPage(Data.groupsPage());
			break;
		case "studyschedule":
			Renderer.renderStudySchedulePage();
			break;
		case "search":
			Renderer.renderSearchPage();
			break;
		case "profile":
			Renderer.renderProfilePage();
			break;
			
	}


}



