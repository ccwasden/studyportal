//Register handlebars helpers
//None yet

//Define Renderer object
var Renderer = {

	renderDashboardPage : function(data){
		var source = Templates.dashboard;
		var template = Handlebars.compile(source);

		$("#dashboard").html(template(data));
	},

	renderGroupsPage : function(data){
		var source = Templates.groups;
		var template = Handlebars.compile(source);
		
		$("#renderedContent").html(template(data));		
	},

	renderGroupPage : function(data){
		var source = Templates.group;
		var template = Handlebars.compile(source);
		
		//FAKE DATA FOR NOW UNTIL WE GET THE BACKEND INTERFACE GOING
		

		$("#renderedContent").html(template(data));
	},

	renderProfilePage : function(data) {
		var source = Templates.profile;
		var template = Handlebars.compile(source);
	
		$("#renderedContent").html(template(data));		
	},

	renderStudySchedulePage : function(data) {
		var source = Templates.studyschedule;
		var template = Handlebars.compile(source);
	
		$("#renderedContent").html(template(data));	
	},

	renderMeetingPage : function(data) {
		var source = Templates.meetingdetails;
		var template = Handlebars.compile(source);
		
		$("#renderedContent").html(template(data));	
	},
	
	renderSearchPage : function(data) { 
		var source = Templates.search;
		var template = Handlebars.compile(source);
		console.log(data);
		$("#renderedContent").html(template(data));		
	},

	renderStudyTimePage : function(data) {
		var source = Templates.studytime;
		var template = Handlebars.compile(source);
		
		$("#renderedContent").html(template());	
	}

	/*
	 * Not going to do individual piece rendering for a while
	PieceRenderer : {
		dashboardHeader : function(){
		},

		
	}*/

}
