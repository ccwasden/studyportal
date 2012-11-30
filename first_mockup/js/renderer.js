//Register handlebars helpers
//None yet

//Define Renderer object
var Renderer = {

	renderDashboardPage : function(data){
		var source = Templates.dashboard;
		var template = Handlebars.compile(source);

		

		$("#container").html(template(data));
	},

	renderGroupsPage : function(data){
		var source = Templates.groups;
		var template = Handlebars.compile(source);
		
		$("#container").html(template(data));		
	},

	renderGroupPage : function(data){
		var source = Templates.group;
		var template = Handlebars.compile(source);
		
		//FAKE DATA FOR NOW UNTIL WE GET THE BACKEND INTERFACE GOING
		

		$("#container").html(template(data));
	},

	renderProfilePage : function() {
		var source = Templates.profile;
		var template = Handlebars.compile(source);
	
		$("#container").html(template());		
	},

	renderStudySchedulePage : function() {
		var source = Templates.studyschedule;
		var template = Handlebars.compile(source);
	
		$("#container").html(template());	
	},

	renderMeetingPage : function() {
		var source = Templates.meetingdetails;
		var template = Handlebars.compile(source);
		
		$("#container").html(template());	
	},
	
	renderSearchPage : function() { 
		var source = Templates.search;
		var template = Handlebars.compile(source);
		
		$("#container").html(template());		
	},

	renderStudyTimePage : function() {
		var source = Templates.studytime;
		var template = Handlebars.compile(source);
		
		$("#container").html(template());	
	}

	/*
	 * Not going to do individual piece rendering for a while
	PieceRenderer : {
		dashboardHeader : function(){
		},

		
	}*/

}
