//Register handlebars helpers
//None yet

//Define Renderer object
var Renderer = {

	renderDashboardPage : function(){
		var source = Templates.dashboard;
		var template = Handlebars.compile(source);
		$("#container").html(template());
	},

	renderGroupsPage : function(){
		var source = Templates.groups;
		var template = Handlebars.compile(source);
	
		//FAKE DATA FOR NOW UNTIL WE GET THE BACKEND INTERFACE GOING
		var data = {
			groups : [
				{ name : "Math 112", numMembers : 3},
				{ name : "Bio 221", numMembers : 5 },
				{ name : "AmHtg 100", numMembers : 18 },			
			]		
		}
		
		$("#container").html(template(data));		
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

		$("#container").html(template(data));
	},

	renderPersonPage : function() {
			
	},

	renderMeetingPage : function() {
			
	},
	
	renderSearchPage : function() { 
			
	}

	/*
	 * Not going to do individual piece rendering for a while
	PieceRenderer : {
		dashboardHeader : function(){
		},

		
	}*/

}
