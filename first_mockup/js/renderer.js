//Register handlebars helpers
//None yet

//Define Renderer object
var Renderer = {

	renderDashboardPage : function(data, destination){
		var source = Templates.dashboard;
		var template = Handlebars.compile(source);

		$(destination || "#dashboard").html(template(data));
	},

	renderGroupsPage : function(data, destination){
		var source = Templates.groups;
		var template = Handlebars.compile(source);
		
		$(destination || "#renderedContent").html(template(data));		
	},

	renderGroupPage : function(data, destination){
		var source = Templates.group;
		var template = Handlebars.compile(source);
		
		//FAKE DATA FOR NOW UNTIL WE GET THE BACKEND INTERFACE GOING
		

		$(destination || "#renderedContent").html(template(data));
	},

	renderProfilePage : function(data, destination) {
		var source = Templates.profile;
		var template = Handlebars.compile(source);
	
		$(destination || "#renderedContent").html(template(data));		
	},

	renderStudySchedulePage : function(data, destination) {
		var source = Templates.studyschedule;
		var template = Handlebars.compile(source);
	
		$(destination || "#renderedContent").html(template(data));	
	},

	renderMeetingPage : function(data, destination) {
		var source = Templates.meetingdetails;
		var template = Handlebars.compile(source);
		
		$(destination || "#renderedContent").html(template(data));	
	},

	renderMeetingTimes : function(data, destination) {
		var source = Templates.meetingTimeList;
		var template = Handlebars.compile(source);
		
		$(destination || "#meetingTimeList").html(template(data));	
	},
	
	renderSearchPage : function(data, destination) { 
		var source = Templates.search;
		var template = Handlebars.compile(source);
		$(destination || "#renderedContent").html(template(data));		
	},
        
    renderSearchResults : function(data, destination) {
        var source = Templates.searchresults;
        var template = Handlebars.compile(source);
        $(destination || "#searchResults").html(template(data));
    },

	renderStudyTimePage : function(data, destination) {
		var source = Templates.studytime;
		var template = Handlebars.compile(source);
		
		$(destination || "#renderedContent").html(template());	
	},

	showDialog: function(name){
		var source = Templates[name];
		if(!source) {
			console.warn("dialog not found: ", name);
			return false;
		}
		var template = Handlebars.compile(source);
		$(".mainDialog").html(template()).fadeOut(0).fadeIn(500);
	}
}

function hideDialog(){
	$(".mainDialog").fadeOut(500);
}

