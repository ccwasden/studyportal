//Register handlebars helpers
//None yet

//Define Renderer object
var Renderer = {

	renderDashboardPage : function(data){
		var source = Templates.dashboard;
		var template = Handlebars.compile(source);

		$("#renderedContent").html(template(data));
	},

	renderGroupsPage : function(data){
		var source = Templates.groups;
		var template = Handlebars.compile(source);
		
		$("#renderedContent").html(template(data));		
	},

	renderGroupPage : function(){
		var source = Templates.group;
		var template = Handlebars.compile(source);
		
		//FAKE DATA FOR NOW UNTIL WE GET THE BACKEND INTERFACE GOING
		var data = {
			groupName: "Math 112",
			groupSubject: "Math 112",
			groupDescription : "The happenin place for all things Newtonian Calculus",
			members : [
				"You",
				"John Cassidy",
				"Johnny Depp"				
			],
			meetings: [
				{ name: "HW #3", date: "Tomorrow 3pm" },
				{ name: "HW #4, HW #5", date: "Thurs, Jan 5th"}		
			]
		};

		$("#renderedContent").html(template(data));
	},

	renderProfilePage : function() {
		var source = Templates.profile;
		var template = Handlebars.compile(source);
	
		$("#renderedContent").html(template());		
	},

	renderStudySchedulePage : function() {
		var source = Templates.studyschedule;
		var template = Handlebars.compile(source);
	
		$("#renderedContent").html(template());	
	},

	renderMeetingPage : function() {
		var source = Templates.meetingdetails;
		var template = Handlebars.compile(source);
		
		$("#renderedContent").html(template());	
	},
	
	renderSearchPage : function() { 
		var source = Templates.search;
		var template = Handlebars.compile(source);
		
		$("#renderedContent").html(template());		
	},

	renderStudyTimePage : function() {
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
