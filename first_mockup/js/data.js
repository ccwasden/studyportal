
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
	    //TODO: filter by db.User (make sure current user is a member of each group) -- user $.grep() --> (jquery util fn)
	    var groupsData = {groups:db.Group};
	 //    $.map(groupsData, function(group){

		//	return group;
		// });
		return groupsData;
	},
	groupPage : function(id){
		//FAKE DATA FOR NOW UNTIL WE GET THE BACKEND INTERFACE GOING
		var group = get(db.Group, id);
		if(!group) throw "this group does not exist";
		group.members = [];
		group.isMember = true;
		$.each(group.memberIds, function(i,memberId){
			var person = get(db.Person, memberId);
			if(person) group.members.push(person);
		});

		group.meetings = getWhere(db.Meeting, function(row){ return row.groupId==group.id; });
		return group;
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
		var meeting = get(db.Meeting, meetingId);
		if(!meeting) throw "no existing meeting of id: "+meetingId;
		meeting.coordinator = get(db.Person, meeting.coordinatorId);
		meeting.times = getWhere(db.MeetingTime, function(time){return time.meetingId == meeting.id});
		meeting.scheduledTimeString = longDate(meeting.dateTime);
		$.each(meeting.times, function(i,time){ 
			time.time = justTime(time.dateTime); 
			time.ratio = "0/3";
		});
		return meeting;
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
	
};

function get(table, id){
	var results = getWhere(table, function(row){return row.id==id});
	if(results.length) return results[0];
	return null;
}

function getWhere(table, callback){
	return $.grep(table, callback);
}

function saveNewGroup(name, subject, description){
	var newId = GetGUID();
	// while(groups.hasOwnProperty[newId]){
	//	newId = GetGUID();
	// }
	db.Group.push({
		id:newId,
		name:name,
		subject:subject,
		description:description,
		members:[],
		meetings:[]
	});
	window.location.hash = 'group/'+newId;
}


function shortDate(date){
	return dateUtil.format(date, 'M d, Y');
}

function longDate(date){
	return dateUtil.format(date, 'M d, Y (g:i a)');
}

function justTime(date){
	return dateUtil.format(date, 'g:i a');
}








