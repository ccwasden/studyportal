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
					{ name: "HW #3", date: "Tomorrow 3pm", meetingId:"MID-1" },
					{ name: "HW #4, HW #5", date: "Thurs, Jan 5th", meetingId:"MID-2"}		
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
			major : "Computer Science",
                        schedule : [
                            {title:"HW #3 - Math 112", subtitle: "Tomorrow 3pm"},
                            {title:"HW #4, HW #5 - Math 112", subtitle: "Thurs Jan 5th, 11am"}
                        ]
		};
		
		var otherPersonData = {
			name : "Stonewall Jackson",
			major : "Bayonet studies",
                        schedule : [
                            {title:"HW #1 - Bayonet practive", subtitle: "Todat 4pm"},
                            {title:"Exam #1 - Give them the bayonet", subtitle: "Tues Jan 23rd, 8am"}
                        ]
		};
		
		if(person == "me"){
			return meData;
		}
		else{
			return otherPersonData;
		}
	},
	meetingPage: function(meetingId){
		var meetings = {
			"MID-1":{
				name:"HW#3",
				dateTime:"Tomorrow 3pm",
				description:"the good stuff",
				dateRange:"Mon 24th July - Wed 26th July",
				coordinator:"Jason Barnes",
				groupName:"Math 112",
				currentDay:"Wednesday July 26th",
				times:[
					{time:"3pm",ratio:"0/3"},
					{time:"4pm",ratio:"1/3",checked:"true"},
					{time:"5pm",ratio:"0/3"},
					{time:"6pm",ratio:"2/3",checked:"true"},
					{time:"7pm",ratio:"2/3",checked:"true"},
					{time:"8pm",ratio:"1/3"},
					{time:"9pm",ratio:"0/3"}
				]
			}
		}

		if(!meetings[meetingId]) throw "no existing meeting of id: "+meetingId;
		return meetings[meetingId];
	},
        
        searchPage : function(){
            var data = {
                people : [
                    {title: "John Cassidy", subtitle: "Bio 100"},
                    {title: "Yogi Bear", subtitle: "Math 112"},
                    {title: "Chuck norris", subtitle: "Engl 316"}
                ],
                groups : [
                    {title: "Math 112", subtitle: "Math 112"},
                    {title: "Business Wanabees", subtitle: "Bus 110"},
                    {title: "One More Group", subtitle: "Phil 110"}
                ]
            };
            return data;
        },
        
        studySchedulePage : function(){
            var data = {
                studysessions : [
                    "BIO 100 2pm - 4pm",
                    "STAT 212 4pm - 4:30pm"
                ]
            };
            return data;
        },

	// save group
	// @return the group object with id, etc.
	createGroup: function(name, description){
            
	}
}












