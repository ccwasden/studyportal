
var Data = {
	dashboard : function(){
		//FAKE DATA FOR NOW UNTIL WE GET THE BACKEND INTERFACE GOING
		var data = {
			nextMeeting : "Tuesday at 3:00pm",
			dashboardItems : [
				{ title : "Study Request", subtitle: "Sandra Bernard" },
				{ title : "Meeting Time Change", subtitle : "Math 112 - Tomorrow, 3pm" }
			]
		};
		return data;
	},
	groupsPage : function(){
		//FAKE DATA FOR NOW UNTIL WE GET THE BACKEND INTERFACE GOING
		var data = {
			groups : [
			 	{ name : "Math 112", numMembers : 3},
			 	{ name : "Bio 221", numMembers : 5 },
			 	{ name : "AmHtg 100", numMembers : 18 },
			 	{ name : "AmHtg 100", numMembers : 18 },
			 	{ name : "AmHtg 100", numMembers : 18 },
			 	{ name : "AmHtg 100", numMembers : 18 },
			 	{ name : "AmHtg 100", numMembers : 181 },
			 	{ name : "AmHtg 100", numMembers : 1 },
			 	{ name : "AmHtg 100", numMembers : 1 },
			 	{ name : "AmHtg 100", numMembers : 2 },
			 	{ name : "AmHtg 100", numMembers : 32 },
			 	{ name : "AmHtg 100", numMembers : 234 },
			 	{ name : "Other", numMembers : 35 },			
			]	                                    	
		}
		return data;
	},
	groupPage : function(){
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
		return data;
	},
	
	profilePage : function(person) {
		//FAKE DATA FOR NOW UNTIL WE GET THE BACKEND INTERFACE GOING
		var meData = {
			me : "true",
			name : "David Woodruff",
			major : "Computer Science"
		};
		
		var otherPersonData = {
			name : "Stonewall Jackson",
			major : "Bayonet studies"
		};
		
		if(person == "me"){
			return meData;
		}
		else{
			return otherPersonData;
		}
	}
};

//Data = JSON.parse("data.json", function(data) { Data = data; }; );

$.getJSON("js/data.json",
	function (json) {
    	Data = json;// Otherwise, we'll keep the dud data.
	});