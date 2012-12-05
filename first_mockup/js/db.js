


function GetGUID(){
	var GUID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
		return v.toString(16);
	});
	
	return GUID;
}

var db = new Object();
db.Person = [
	{
		id:GetGUID(),
		username:'tommy',
		password:'1234',
		name:'Tom Bombadil',
		major:'Computer Science'
	},
	{
		id:GetGUID(),
		username:'user',
		password:'1234',
		name:'Jason Bourne',
		major:'Psychology'
	},
	{
		id:GetGUID(),
		username:'hello',
		password:'1234',
		name:'Fred Flintstone',
		major:'Math'
	}
];
db.Group = [
	{
		id:GetGUID(),
		name:'Math 112',
		subject:'Math 112',
		description:'The happenin place for all things Newtonian Calculus',
		memberIds:[db.Person[0].id,db.Person[1].id,db.Person[2].id]
	},
	{
		id:GetGUID(),
		name:'Bio 221',
		subject:'Biology',
		description:'We love biology.',
		memberIds:[db.Person[0].id,db.Person[2].id]
	}
];
db.Meeting=[
	{
		id:GetGUID(),
		groupId:db.Group[0].id,
		name:'HW #13',
		coordinatorId:db.Person[0].id,
		description:'The lamest assignment to grace earth.',
		dateTime:new Date(2012, 11, 13, 12, 30),
		dateRangeStart:new Date(2012, 11, 12),
		dateRangeEnd:new Date(2012, 11, 14)
	}
];
db.MeetingTime = [
	{
		meetingId:db.Meeting[0].id,
		personId:db.Person[0].id,
		dateTime:new Date(2012, 11, 13, 12, 30)
	},
	{
		meetingId:db.Meeting[0].id,
		personId:db.Person[0].id,
		dateTime:new Date(2012, 11, 13, 13)
	}
];
db.StudyTime = [
	{
		id:GetGUID(),
		subject:"Martial Arts",
		time:new Date(2012, 12, 13, 8),
		attendees:[db.Person[1].id]
	},
        {
            id:GetGUID(),
            subject:"Math 112",
            time:new Date(2012, 12, 5, 9),
            attendees:[db.Person[1].id]
        }
];
db.Notifications = [
	{
		id:GetGUID(),
		hashURL:"profile/" + db.Person[1].id,
		personId:db.User,
		title:"Study Request",
		subtitle:"Jason Bourne"
	},
	{
		id:GetGUID(),
		hashURL:"meeting/" + db.Meeting[0].id,
		personId:db.User,
		title:"Meeting Time Change",
		subtitle:"Math 112 - Tomorrow, 3pm"
	}
]