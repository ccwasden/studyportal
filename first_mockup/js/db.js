


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
		id:'P1',
		username:'tommy',
		password:'1234',
		name:'Tom Bombadil',
		major:'Computer Science',
		profilePic:'P1.jpg'
	},
	{
		id:'P2',
		username:'user',
		password:'1234',
		name:'Jason Bourne',
		major:'Psychology',
		profilePic:'P2.jpg'
	},
	{
		id:'P3',
		username:'hello',
		password:'1234',
		name:'Fred Flintstone',
		major:'Math',
		profilePic:'P3.jpg'
	},
	{
		id:'P4',
		username:'kelly',
		password:'1234',
		name:'Kelly Bluebook',
		major:'Statistics',
		profilePic:'P4.jpg'
	},
	{
		id:'P5',
		username:'donny',
		password:'1234',
		name:'Donald Trump',
		major:'Business',
		profilePic:'P5.jpg'
	},
	{
		id:'P6',
		username:'frankie',
		password:'1234',
		name:'Frank Sinatra',
		major:'Music',
		profilePic:'P6.jpg'
	},
	{
		id:'P7',
		username:'billy',
		password:'1234',
		name:'Billy Jean',
		major:'Math',
		profilePic:'P7.png'
	}
];
db.Group = [
	{
		id:'G1',
		name:'Math 112',
		subject:'Math 112',
		description:'The happenin place for all things Newtonian Calculus',
		memberIds:[db.Person[1].id,db.Person[2].id,db.Person[3].id,db.Person[4].id]
	},
	{
		id:'G2',
		name:'Bio 221',
		subject:'Biology',
		description:'We love biology.',
		memberIds:[db.Person[2].id,db.Person[5].id,db.Person[6].id]
	},
	{
		id:'G3',
		name:'Stats 221',
		subject:'Statistics',
		description:'Math is always better when it is social',
		memberIds:[db.Person[0].id,db.Person[4].id,db.Person[6].id]
	}
];
db.Meeting=[
	{
		id:'M1',
		groupId:db.Group[0].id,
		name:'HW #13',
		coordinatorId:db.Person[1].id,
		description:'The lamest assignment to grace earth.',
		dateTime:new Date(2012, 11, 13, 12, 30),
		dateRangeStart:new Date(2012, 11, 12),
		dateRangeEnd:new Date(2012, 11, 16)
	}
];
db.MeetingTime = [
	{
		meetingId:db.Meeting[0].id,
		personId:db.Person[2].id,
		dateTime:new Date(2012, 11, 12, 12, 30)
	},
	{
		meetingId:db.Meeting[0].id,
		personId:db.Person[1].id,
		dateTime:new Date(2012, 11, 12, 13)
	},
	{
		meetingId:db.Meeting[0].id,
		personId:db.Person[1].id,
		dateTime:new Date(2012, 11, 12, 13, 30)
	},
	{
		meetingId:db.Meeting[0].id,
		personId:db.Person[1].id,
		dateTime:new Date(2012, 11, 12, 14)
	}
];
db.StudyTime = [
	{
		id:'ST1',
		subject:"Martial Arts",
		time:new Date(2012, 12, 13, 8),
		attendees:[db.Person[1].id]
	},
        {
            id:'ST2',
            subject:"Math 112",
            time:new Date(2012, 12, 5, 9),
            attendees:[db.Person[1].id]
        }
];
db.Notifications = [
	{
		id:'N1',
		hashURL:"profile/" + db.Person[1].id,
		personId:db.Person[1].id,
		title:"Study Request",
		subtitle:"Jason Bourne"
	},
	{
		id:'N2',
		hashURL:"meeting/" + db.Meeting[0].id,
		personId:db.Person[1].id,
		title:"Meeting Time Change",
		subtitle:"Math 112 - Tomorrow, 3pm"
	}
]

function stripForSave(rows, fields){
	var newArray = [];
	$.each(rows, function(i, row){
		var newRow = {};
		$.each(fields, function(j, field){
			if(Object.prototype.toString.call(row[field]) === '[object Array]')
				 newRow[field] = row[field];
			else newRow[field] = row[field].toString();
		});
		newArray.push(newRow);
	});
	return newArray;
}

var fieldMap = {
	Person:['id','name','username','password','major','profilePic'],
	Group:['id','name','subject','description','memberIds'],
	Meeting:['id','groupId','name','coordinatorId','description','dateTime','dateRangeEnd','dateRangeStart'],
	MeetingTime:['meetingId','personId','dateTime'],
	StudyTime:['id','subject','time','attendees'],
	Notifications:['id','hashURL','personId','title','subtitle']
};

var dateFieldMap = {
	Meeting:['dateTime','dateRangeEnd','dateRangeStart'],
	MeetingTime:['dateTime'],
	StudyTime:['time']
};

function persistDb(){
	var allData = {};
	$.each(fieldMap, function(table, fields){
		allData[table] = stripForSave(db[table],fields);
	});
	allData.User = db.User;
	localStorage.setItem("DB", JSON.stringify(allData));
}

function retrieveDb(){
	var jsonObj = JSON.parse(localStorage.getItem("DB"));
	if(jsonObj) {
		$.each(dateFieldMap, function(table, fields){
			$.each(jsonObj[table], function(i,obj){
				$.each(fields, function(j,field){
					jsonObj[table][i][field] = new Date(jsonObj[table][i][field]);
				});
			});
		});
		return jsonObj;
	}
	else return null;
}