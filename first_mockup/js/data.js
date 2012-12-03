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
			 	{ id:"8ea7a781-0104-41ac-b82a-3f2cbe438c23", name : "Math 112", numMembers : 3},
			 	{ id:"5d2e5f19-6328-46bd-b6c4-b366d99b20e1", name : "Bio 221", numMembers : 5 },
			 	{ id:"f64169c3-5053-439b-810d-c72cf81929f1", name : "AmHtg 100", numMembers : 18 },
			 	{ id:"5a18e523-47f5-419a-8534-2e37917bf5c7", name : "Other", numMembers : 35 }
			]		
		}
		return data;
	},
	groupPage : function(id){
		//FAKE DATA FOR NOW UNTIL WE GET THE BACKEND INTERFACE GOING
		var data = {
			"8ea7a781-0104-41ac-b82a-3f2cbe438c23":{
				id:"8ea7a781-0104-41ac-b82a-3f2cbe438c23",
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
			},
			"5d2e5f19-6328-46bd-b6c4-b366d99b20e1": {
				id:"5d2e5f19-6328-46bd-b6c4-b366d99b20e1",
				groupName: "Bio 221",
				groupSubject: "Biology",
				groupDescription : "A sweet bio class",
				members : [
					"You",
					"Dude1"
				],
				meetings: [
					{ name: "HW #14", date: "Wednesday 3pm" }
				]
			}
		};
		if(!data[id]) throw "this group does not exist";
		return data[id];
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
	},

	// save group
	// @return the group object with id, etc.
	createGroup: function(name, description){

	},

}












