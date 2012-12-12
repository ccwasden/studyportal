
var Data = {
	dashboard : function(){
		var notifications = getWhere(db.Notifications, function(n){return n.personId == db.User});
		var data = {
			userId : db.User,
			profilePic:db.User ? (get(db.Person, db.User).profilePic) : null,
			nextMeeting : "Tuesday at 3:00pm",
			dashboardItems : notifications
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

		group.meetings = getWhere(db.Meeting, function(row){ 
			row.dateStr = row.dateTime ? longDate(row.dateTime) : "--";
			return row.groupId == id; 
		});

		group.meetings.sort(function(a,b){
			if(!a.dateTime) return 1;
			if(!b.dateTime) return -1;
			return  moment(a.dateTime).diff(moment(b.dateTime));
		});
		return group;
	},
	
	profilePage : function(personId) {
		var person = get(db.Person, personId);
		person.me = personId == db.User;  
     //    person.schedule = [];
     //    for(var i = 0; i < db.StudyTime.length; i++){ //Parse through study sessions
     //        for(var j = 0; j < db.StudyTime[i].attendees.length; j++){
     //            if(personId == db.StudyTime[i].attendees[j]){
     //                person.schedule.push({
					//	title: db.StudyTime[i].subject, 
					//	subtitle: longDate(db.StudyTime[i].time), 
					//	me: (personId == db.User)
					// });
     //                break;
     //            }
     //        }
     //    }

		person.studytimes = getMeetings(personId);
                
		return person;
	},

	meetingPage: function(meetingId){
		var meeting = get(db.Meeting, meetingId);
		if(!meeting) throw "no existing meeting of id: "+meetingId;
		meeting.coordinator = get(db.Person, meeting.coordinatorId);
		meeting.scheduledTimeString = meeting.dateTime ? longDate(meeting.dateTime) : "--";
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
		else date = moment(date);
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
			date.add('m',60);
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
  //       var times = getWhere(db.StudyTime, function(st){
		//	return st.attendees && st.attendees.indexOf(db.User) != -1;
		// });
		// $.each(times, function(i, st){
  //           var time = moment(st.time);
  //           st.day = time.date();
  //           st.month = time.format('MMM');
  //           st.eventtitle = st.subject;
  //           st.hour = time.format('h:mma');
  //           st.hour = st.hour.substr(0, st.hour.length-1);
  //           st.href = "studytime/"+st.id;
  //           var num = st.attendees.length
  //           st.peopleText = num + " attendee" + (num!=1 ?  "s": "");
		// });
        

        var meetings = getMeetings(db.User);
        return {studysessions:meetings};
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
		// dateTime:'',
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

function getMeetings(personId){
	var meetings = getWhere(db.Meeting, function(mt){
		var group = get(db.Group, mt.groupId);
		mt.group = group;
		if(!mt.dateTime || !group || group.memberIds.indexOf(personId) == -1) 
			return false;
		var time = moment(mt.dateTime);
		mt.day = time.date();
		// mt.time = time.toDate();
		mt.month = time.format('MMM');
		mt.eventtitle = mt.name;
		mt.hour = time.format('h:mma');
		mt.hour = mt.hour.substr(0, mt.hour.length-1);
		var num = group.memberIds.length;
		mt.peopleText = num + " attendee" + (num!=1 ?  "s": " (you)");
		mt.isMeeting = true;
		mt.href = "meeting/"+mt.id;
		return true;
    });
	meetings.sort(function(a,b){return moment(a.dateTime).diff(moment(b.dateTime))});
    return meetings;
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

function deleteNotificationsOfUser(personId){
	db.Notifications = $.grep(db.Notifications, function(row){
		return row.personId != personId;
	});
}






