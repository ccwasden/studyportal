var Templates = { } //Templates are stored here
var currentLocation = null;
if(window.localStorage) {
	var user = localStorage.getItem('User');
	if(user) db.User = user;
}


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
			$('#loginform').submit(attemptLoginFn);
			

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
				try {
					currentLocation = destination;
					redirect(destination);
				} 
				catch(e){
					console.error(e.stack);
					alert("Error: "+e);
					history.go(-1);
				}
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
			var destArray = destination.split("/");
			if(destArray == "showPopup" || destArray == "hidePopup") // if popup/dialog, dont change hash
				redirect(destArray);
			else window.location.hash = destination;
			break;
		}
		cur = cur.parent(); //intended element was likely a few elements up
	}
});

function redirect(destination)
{
	if(!db.User){
		$('#loginModal').css('top',0);
	}
	var visible = true;
	switch(destination[0]) {
		case "showPopup":
			$(".dialogContainer").show();
			break;
		case "hidePopup":
			$(".dialogContainer").hide();
			break;
		case "studyschedule":
			Renderer.renderStudySchedulePage(Data.studySchedulePage());
                        $("#saveMeetingBtn").click(function(){
                            saveNewStudyTime(
                                $("#subject").val(),
                                $("#datepicker").val());
                        });
			break;
		case "search":
			Renderer.renderSearchPage(Data.searchPage());
			break;
		case "profile":
			Renderer.renderProfilePage(Data.profilePage(destination[1]));
			break;
		case "groups":
			Renderer.renderGroupsPage(Data.groupsPage());
			$('#saveGroupBtn').click(function(){
				saveNewGroup(
					$('#name').val(),
					$('#subject').val(),
					$('#description').val());
			});
			break;	
		case "group":
			Renderer.renderGroupPage(Data.groupPage(destination[1]));
			break;
		case "meeting":
			Renderer.renderMeetingPage(Data.meetingPage(destination[1]));
			break;
		case "dashboard":
		default:
			if(destination[0] && destination[0] != "dashboard" ) 
				alert("There is no case implemented in main.js --> redirect() for: "+destination[0]);
			Renderer.renderDashboardPage(Data.dashboard());
			$('#logout').on('click', function(){
				if(window.localStorage) localStorage.removeItem('User');
				db.User = "";
				redirect();
			});
			visible = false;
			break;
	}

	if(visible) $("#container").addClass("visible");
	else $("#container").removeClass("visible");

	resetScrolling();
}

function resetScrolling(){
	$('.pane').jScrollPane({verticalGutter: -6});
	// $('.jspPane').css({width:'+=' + $('.jspTrack').width()});
}

function attemptLoginFn(eve){
	$('#userError').html("");
	$('#passError').html("");

	var username = $('#username').attr('value').trim();
	var password = $('#password').attr('value').trim();
	var validUser = $.grep(db.Person, function(u){return u.username==username}).length;
	var validPass = $.grep(db.Person, function(u){return u.password==password}).length;
	if(!validUser) $('#userError').html("Invalid username");
	if(!validPass) $('#passError').html("Invalid password");
	if(!username) $('#userError').html("You must enter a user");

	var foundUsers = $.grep(db.Person, function(u){
		return u.username == username && u.password == password;
	});

	if(foundUsers.length) {
		window.db.User = foundUsers[0].id;
		$(window).trigger('hashchange');
		var remember = $('#rememberMe').attr('checked');
		if(remember && window.localStorage) 
			localStorage.setItem('User', window.db.User);
		$('#loginModal').css('top','100%');
	}
	return false;
}
