
var Data = {
	dashboard : function(){
		//FAKE DATA FOR NOW UNTIL WE GET THE BACKEND INTERFACE GOING
		var data = {
			userId : db.User,
			nextMeeting : "Tuesday at 3:00pm",
			dashboardItems : db.Notifications
		};
		return data;
	},
	groupsPage : function(){
	    var groupsData = {groups:[]};
		for(var i = 0; i < db.Group.length; i++){
			if($.inArray(db.User, db.Group[i].memberIds) != -1){
				groupsData.groups.push(db.Group[i]);
			}
		}
		return groupsData;
	},
	groupPage : function(id){
		var group = get(db.Group, id);
		if(!group) throw "this group does not exist";
		group.members = [];
		group.isMember = true;
		$.each(group.memberIds, function(i,memberId){
			var person = get(db.Person, memberId);
			if(person) group.members.push(person);
		});

		group.meetings = getWhere(db.Meeting, function(row){ return row.groupId == id; });
		return group;
	},
	
	profilePage : function(personId) {
		var person = get(db.Person, personId);
		person.me = personId == db.User;
		return person;
	},
	meetingPage: function(meetingId){
		var meeting = get(db.Meeting, meetingId);
		if(!meeting) throw "no existing meeting of id: "+meetingId;
		meeting.coordinator = get(db.Person, meeting.coordinatorId);
		meeting.times = getWhere(db.MeetingTime, function(time){return time.meetingId == meeting.id});
		meeting.scheduledTimeString = longDate(meeting.dateTime);
		$.each(meeting.times, function(i,time){ 
			time.time = justTime(time.dateTime); 
			time.ratio = db.MeetingTime.filter(function (item) {
					return item.meetingId == meetingId && item.dateTime == time.dateTime;
				}).length + "/" +
				(get(db.Group, meeting.groupId)).memberIds.length;
		});
		return meeting;
	},
        
    searchPage : function(){
        var data = {
            people : db.Person,
            groups : db.Group
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
	db.Group.push({
		id:newId,
		name:name,
		subject:subject,
		description:description,
		memberIds:[db.User]
	});
	window.location.hash = 'group/'+newId;
}

function saveNewMeeting(groupId, name, description, start, end){
	var newId = GetGUID();
	db.Meeting.push({
		id:newId,
		groupId:groupId,
		coordinatorId:db.User,
		name:name,
		description:description,
		dateRangeStart:start,
		dateRangeEnd:end
	});
	window.location.hash = 'meeting/'+newId;
}

function saveNewStudyTime(subject, time){
	var newId = GetGUID();
	db.StudyTime.push({
		id:newId,
		subject:subject,
		time:time,
		attendees:[db.User]
	});
	window.location.hash = 'studySchedule/'+newId;// TODO: Right?
}

function clearNotifications(){
	db.Notifications = [];
	window.location.hash = 'dashboard/';
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








