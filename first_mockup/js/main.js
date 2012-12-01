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

			// on window resize, we need to make sure scrolling is still working
		    $(window).bind('resize',
		        $.debounce(function(){ // debounce to only handle event every 100 ms
					$(".pane").each(function(){ 
						var api = $(this).data('jsp');
						if(api) api.reinitialise({verticalGutter: -6}); // reset scrolling for .pane div
					});
		        }, 100)
		    );

		    // this is the magic to handle back button on browser.. 
		    //	when the hash changes (from back button or javascript -- window.location.hash)
		    $(window).bind('hashchange', function(e) {
				var url = $.param.fragment(); // get the hash url
				var destination = url.split("/"); // split on '/', this way we can store multilevel hashes
				redirect(destination);
			});

			//Force initial hash to be read
			$(window).trigger('hashchange');
		}
	});
});

// makes it so any element that has an "href" attribute becomes a link on click
$(document).click(function(eve){
	var cur = $(eve.target);
	while(cur.prop("tagName") != "BODY"){ // traverse parent elements
		var destination = cur.attr("href");
		if(destination) {
			window.location.hash = destination;
			break;
		}
		cur = cur.parent(); //intended element was likely a few elements up
	}
});

function redirect(destination)
{
	$("#container").addClass("visible");
	switch(destination[0])
	{
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
			Renderer.renderProfilePage(Data.profilePage());
			break;	
		case "showPopup":
			$(".dialogContainer").show();
			break;
		case "hidePopup":
			$(".dialogContainer").hide();
			break;
		case "dashboard":
		default:
			$("#container").removeClass("visible");
			Renderer.renderDashboardPage(Data.dashboard());
			break;
	}

	resetScrolling();
}

function resetScrolling(){
	$('.pane').jScrollPane({verticalGutter: -6});
	// $('.jspPane').css({width:'+=' + $('.jspTrack').width()});
}

function GetGUID(){
	var GUID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
		return v.toString(16);
	});
	
	return GUID;
}
