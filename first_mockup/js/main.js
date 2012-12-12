var Templates = { } //Templates are stored here
var currentLocation = null;

if(window.localStorage) {
	// var user = localStorage.getItem('User');
	// if(user) db.User = user;
	var persistedDb = retrieveDb();
	if(persistedDb) db = persistedDb;
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
			$('#resetDb').click(function(){
				localStorage.clear(); 
				window.location.hash = ""; 
				window.location.reload();
			});
			

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
					redirect(destination);
				} 
				catch(e){
					console.error(e.stack);
					// alert("Error: "+e);
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
	while(cur.prop("tagName") != "BODY" && !window.skipHref){ // traverse parent elements
		var destination = cur.attr("href");
		if(destination) {
			var destArray = destination.split("/");
			if(destArray == "showPopup" || destArray == "hidePopup") // if popup/dialog, dont change hash
				redirect(destArray);
			else 
				updateUrlHash(destination, destArray);
			break;
		}
		cur = cur.parent(); //intended element was likely a few elements up
	}
	window.skipHref = false;
});

function updateUrlHash(destination, destArray){ // going to be used to manage animations
	switch(destArray[0]) {
		case "studyschedule":
			break;
		case "search":
			break;
		case "profile":
			break;
		case "groups":
			break;	
		case "group":
			break;
		case "meeting":
			break;
		case "dashboard":
		default:
			break;
	}
	window.location.hash = destination;
}

function redirect(destination)
{
	if(!destination) destination = currentLocation;
	else currentLocation = destination;
	
	hideDialog();
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
            selectTab("schedule");
			break;
		case "search":
			Renderer.renderSearchPage(Data.searchPage());
            $("#searchBtn").live('click', function(){
                Renderer.renderSearchResults(Data.searchResults()); 
                resetScrolling();
            });
			break;
		case "profile":
			Renderer.renderProfilePage(Data.profilePage(destination[1]));
			selectTab("group");
			break;
		case "groups":
			Renderer.renderGroupsPage(Data.groupsPage());
			selectTab("group");
			break;	
		case "group":
			Renderer.renderGroupPage(Data.groupPage(destination[1]));
			selectTab("group");
			$('#createMeeting').click(dialogHandler('createmeetingdialog', function(){
				$('.datepicker').datepicker();
				$('#createMeetingForm').submit(function(){
					var groupId = window.location.hash.split('/')[1];
					var name = this.name.value;
					var description = this.description.value;
					var start = $(this.dateStart).datepicker( "getDate" );
					var end = moment($(this.dateEnd).datepicker( "getDate" )).add('d',1).toDate();
					saveNewMeeting(groupId, name, description, start, end);
					hideDialog();
					persistDb();
					return false;
				});
				$('#createMeetingCancel').click(function(){
					hideDialog();
					return false;
				});
			}));
			$('#addMemberToGroup').click(function(){
				var gId = window.location.hash.split('/')[1];
				var group = get(db.Group, gId);
				var people = getWhere(db.Person, function(p){
					return group.memberIds.indexOf(p.id) == -1;
				});
				if(people.length) {
					Renderer.showDialog('addmemberdialog', {people:people});
					$('#addMemberList').find('li').click(function(){
						group.memberIds.push($(this).attr('id'));
						redirect();
					});
				}
				else alert("Everyone is in this group already");
				return false;
			});
			break;
		case "meeting":
			var meetingId = destination[1];
			currentMeetingId = meetingId;
			Renderer.renderMeetingPage(Data.meetingPage(meetingId));
			Renderer.renderMeetingTimes(Data.meetingTimes(meetingId));
			rebindMeetingTimeUIEvents();
			selectTab("group");
			break;
		case "dashboard":
		default:
			if(destination[0] && destination[0] != "dashboard" ) 
				alert("There is no case implemented in main.js --> redirect() for: "+destination[0]);
			Renderer.renderDashboardPage(Data.dashboard());
			persistDb();
			$('#logout').on('click', function(eve){
				db.User = "";
				persistDb();
				redirect([]);
				return false;
			});
			$('#clearNotifications').click(function(){
				deleteNotificationsOfUser(db.User);
				redirect(["dashboard"]);
				return false;
			});
			$('#notificationList').find('li').click(function(){
				var index = db.Notifications.indexOf(get(db.Notifications, $(this).attr('id')));
				if(index != -1) db.Notifications.splice(index, 1);
			});
			visible = false;
			selectTab("");
			break;
	}

	if(visible) $("#container").addClass("visible");
	else $("#container").removeClass("visible");

	resetScrolling();
}

function resetScrolling(){
	setTimeout(function(){$('.pane').jScrollPane({verticalGutter: -6})},500);
	// $('.jspPane').css({width:'+=' + $('.jspTrack').width()});
}

function selectTab(tabName){
	$('#groupsTab').removeClass('selected');
	$('#scheduleTab').removeClass('selected');
	if(tabName == "group") {
		$('#groupsTab').addClass('selected');
		$("#groupsTab").attr('href', 'dashboard');
		$("#scheduleTab").attr('href', 'studyschedule');
	}
	else if(tabName == "schedule") {
		$('#scheduleTab').addClass('selected');
		$("#scheduleTab").attr('href', 'dashboard');
		$("#groupsTab").attr('href', 'groups');
	}
	else {
		$("#groupsTab").attr('href', 'groups');
		$("#scheduleTab").attr('href', 'studyschedule');
	}
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


var currentMeetingId = null

function onMeetingDayMenuClick(){
	var lHolder = $(this).find('.listHolder');
	var open = lHolder.height();
	lHolder.css('height', open ? 0 : $(this).find('ol').height());
	if(open) $(this).removeClass('open');
	else $(this).addClass('open');
};

function onTimeRowClick(eve){
	eve.stopPropagation();
	var time = moment($(this).attr('dateTime'));
	meetingTime(currentMeetingId, time);
	var timeChanged = updateMeetingTime(currentMeetingId);
	if(timeChanged) {
		var meeting = get(db.Meeting, currentMeetingId);
		var date = moment(meeting.dateTime);
		$('#meetingTime').text(longDate(date));
		$('#month').text(date.format('MMM').toUpperCase());
		$('#day').text(date.date());
	}
	Renderer.renderMeetingTimes(Data.meetingTimes(currentMeetingId, time));
	rebindMeetingTimeUIEvents();
	console.log(get(db.Meeting, currentMeetingId).dateTime);
};

function onMeetingDayClick(){
	var dateTime = moment($(this).attr('dateTime'));
	$(this).parent().find('li').removeClass('selected');
	$(this).addClass("selected");
	setTimeout(function(){
		Renderer.renderMeetingTimes(Data.meetingTimes(currentMeetingId, dateTime));
		rebindMeetingTimeUIEvents();
	}, 200);
};

function rebindMeetingTimeUIEvents(){
	$('#meetingTimeMenu').click(onMeetingDayMenuClick);
	$('#meetingTimeMenu').find('li').click(onMeetingDayClick);
	$('.timeRow').click(onTimeRowClick);
}

function dialogHandler(name, callback){
	return function(){
		Renderer.showDialog(name);
		if(callback) callback();
		return false;
	}
}

function studyTimeDialog(){
	Renderer.showDialog('newstudytimedialog');
	$(".datepicker").datepicker();
	$("#createStudyTime").submit(function(){
		try {
			var subject = this.subjects.value;
			var date = moment($(this.date).datepicker('getDate'));
			var timeSegs = this.time.value.split(' ');
			var time = timeSegs[0].split(':');
			var hours = parseInt(time[0]);
			var mins = parseInt(time[1]);
			var am = timeSegs[1] ? timeSegs[1][0].toLowerCase() == 'a' : true;
			if((am && hours != 12) || (!am && hours == 12)) date.hours(hours);
			else if(hours != 12) date.hours(hours+12);
			date.minutes(mins);
	        saveNewStudyTime(subject, date.toDate());
	        hideDialog();
	        persistDb();
		}
		catch (e){
			alert(e);
		}
        return false;
    });
    $('#cancelStudyTime').click(function(){hideDialog();return false;});
}

function newGroupDialog(){
	Renderer.showDialog('newgroupdialog');
	$('#newgroupdialog').submit(function(){
		saveNewGroup(
			this.name.value,
			this.subject.value,
			this.description.value);
		hideDialog();
		persistDb();
		return false;
	});
}

