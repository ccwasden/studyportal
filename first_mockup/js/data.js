var Data = {
	dashboard : function(){
	//FAKE DATA FOR NOW UNTIL WE GET THE BACKEND INTERFACE GOING
			var data = {};
			return data;
	},
	groupsPage : function(){
		//FAKE DATA FOR NOW UNTIL WE GET THE BACKEND INTERFACE GOING
		var data = {
			groups : [
				{ name : "Math 112", numMembers : 3},
				{ name : "Bio 221", numMembers : 5 },
				{ name : "AmHtg 100", numMembers : 18 },			
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
	}
	
	
}