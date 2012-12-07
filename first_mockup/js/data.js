
var Data = {
	dashboard : function(){
		//FAKE DATA FOR NOW UNTIL WE GET THE BACKEND INTERFACE GOING
		var data = {
			userId : db.User,
			profilePic:(get(db.Person, db.User).profilePic),
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
        person.schedule = [];
        for(var i = 0; i < db.StudyTime.length; i++){ //Parse through study sessions
            for(var j = 0; j < db.StudyTime[i].attendees.length; j++){
                if(personId == db.StudyTime[i].attendees[j]){
                    person.schedule.push({
						title: db.StudyTime[i].subject, 
						subtitle: longDate(db.StudyTime[i].time), 
						me: (personId == db.User)
					});
                    break;
                }
            }
        }
                
		return person;
	},

	meetingPage: function(meetingId){
		var meeting = get(db.Meeting, meetingId);
		if(!meeting) throw "no existing meeting of id: "+meetingId;
		meeting.coordinator = get(db.Person, meeting.coordinatorId);
		meeting.scheduledTimeString = longDate(meeting.dateTime);
		meeting.group = get(db.Group, meeting.groupId);
		meeting.dateRange = shortDate(meeting.dateRangeStart)+" - "+shortDate(meeting.dateRangeEnd);
		return meeting;
	},

	meetingTimes: function(meetingId, date){
		var meeting = get(db.Meeting, meetingId);
		if(!meeting) throw "no existing meeting of id: "+meetingId;
		meeting.group = get(db.Group, meeting.groupId);
		var numMembers = meeting.group.memberIds.length;
		if(!date) date = moment(moment(meeting.dateRangeStart));
		date.hours(0);
		date.minutes(0);
		var times = [];
		date.add('h', 7);
		while(date.hours() < 23){
			var existing = getTimesForMeeting(meeting.id, date);
			var mapped = $.map(existing, function(row){return row.personId});
			var checked = mapped.length && $.inArray(db.User, mapped) != -1;
			times.push({
				time:justTime(date),
				dateTime:date.toDate().toString(),
				ratio: (existing.length)+"/"+numMembers,
				checked:checked,
				noTakers:!existing.length,
				selectedDate:!moment(meeting.dateTime).diff(date)
			});
			date.add('m',30);
		}
		var days = Data.getMeetingDays(meeting, date)
		return {days:days,day:shortDate(date),times:times};
	},

	getMeetingDays: function(meeting, selectedDate){
		var days = [];
		var startDate = moment(moment(meeting.dateRangeStart)).hours(0).minutes(0);
		var endDate = moment(moment(meeting.dateRangeEnd)).hours(0).minutes(0);
		while(startDate.diff(endDate)){
			days.push({
				day:shortDate(startDate), 
				dateTime:startDate.toDate().toString(),
				selected:!startDate.diff(moment(selectedDate).hours(0).minutes(0))
			});
			startDate.add('d',1);
		}
		return days;
	},

	// script for --> http://momentjs.com/docs/
	//$(document.body).append($('<div>').css({width:300, background:'#fff', position:'absolute', top:0, right:0, zIndex:5000000, padding:10}).append($('h3').find('a').css({display:'block', color:'darkGray'}).clone()));
        
    searchPage : function(){
        return {};
    },
    
    searchResults : function(){
        var data = {
            people : db.Person,
            groups : db.Group
        };
        return data;
    },
    
    studySchedulePage : function(){
        var studyTimes = {studysessions:[]};
        for(var i = 0; i < db.StudyTime.length; i++){
            for(var j = 0; j < db.StudyTime[i].attendees.length; j++){
                if(db.StudyTime[i].attendees[j] == db.User){
                    var currentStudyTime = db.StudyTime[i];
                    studyTimes.studysessions.push(currentStudyTime);
                    var time = currentStudyTime.time;
                    if(typeof time.getMonth != 'undefined'){
                        currentStudyTime.time = longDate(time); 
                    }
                    break;
                }
            }
        }
        return studyTimes;
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
	window.location.hash = 'studyschedule/'+newId;// TODO: Right?
}

// @return boolean --> true if added, false if deleted
function meetingTime(meetingId, time){
	time = moment(time);
	var size = db.MeetingTime.length;
	var added = false;
	db.MeetingTime = db.MeetingTime.filter(function(meet) {
		return !(meet.meetingId == meetingId 
			&& meet.personId == db.User 
			&& !moment(meet.dateTime).diff(time));
	});
	if(db.MeetingTime.length == size){
		db.MeetingTime.push({
		   	meetingId: meetingId,
		   	personId: db.User,
		   	dateTime: time.toDate()
		});	
		added = true;
	}
	return added;
}

// loops through all the votes, finds the most popular, and sets the meeting time to the popular one.
// @return boolean - yes if changed
function updateMeetingTime(meetingId){
	var times = getTimesForMeeting(meetingId);
	var votes = [];
	var mappedTimes = times.reduce(function(prev, cur){
		var dateStr = moment(cur.dateTime).toDate().toString();
		if(!prev[dateStr]) prev[dateStr] = 1;
		else prev[dateStr] = prev[dateStr]+1;
		return prev;
	}, {});
	$.each(mappedTimes, function(key, value){votes.push([key, value])});
	votes.sort(function(a,b){
		if (a[1]!=b[1]) return b[1]-a[1];
		return moment(a[0]).diff(moment(b[0]))
	});
	if(votes.length) {
		var meeting = get(db.Meeting, meetingId);
		var newTime = moment(votes[0][0]);
		if(moment(meeting.dateTime).diff(newTime)) {
			meeting.dateTime = newTime.toDate();
			return true;
		}
	}
	return false;
}

function clearNotifications(){
	db.Notifications = [];
	window.location.hash = 'dashboard/';
}

function shortDate(date){
	// return dateUtil.format(date, 'M d, Y');
	return moment(date).format('MMM Do')
}

function longDate(date){
	// return dateUtil.format(date, 'M d, Y (g:i a)');
	//, YYYY
	return moment(date).format('MMM Do (h:mm a)');
}

function justTime(date){
	// return dateUtil.format(date, 'g:i a');
	var time = moment(date).format('h:mma');
	return time.substr(0, time.length-1);
}

function getTimesForMeeting(meetingId, dateTime){
	var meeting = get(db.Meeting, meetingId);
	var group = get(db.Group, meeting.groupId);
	return getWhere(db.MeetingTime, function(time){
		return	(!dateTime || !moment(time.dateTime).diff(moment(dateTime)))
		      	&&	time.meetingId == meetingId
		      	&&	$.inArray(group.memberIds, time.personId);
	});
}







