var db = {
	Group:[
		{
			id:'G1',
			name:'Math 112',
			subject:'Math 112',
			description:'The happenin place for all things Newtonian Calculus',
			memberIds:['P1','P2','P3']
		},
		{
			id:'G2',
			name:'Bio 221',
			subject:'Biology',
			description:'We love biology.',
			memberIds:['P1','P3']
		}
	],
	Meeting:[
		{
			id:'M1',
			groupId:'G1',
			name:'HW #13',
			coordinatorId:'P1',
			description:'The lamest assignment to grace earth.',
			dateTime:new Date(2012, 11, 13, 12, 30),
			dateRangeStart:new Date(2012, 11, 12),
			dateRangeEnd:new Date(2012, 11, 14)
		}
	],
	MeetingTime:[
		{
			meetingId:'M1',
			personId:'P1',
			dateTime:new Date(2012, 11, 13, 12, 30)
		},
		{
			meetingId:'M1',
			personId:'P1',
			dateTime:new Date(2012, 11, 13, 13)
		}
	],
	StudyTime:[

	],
	Person:[
		{
			id:'P1',
			username:'tommy',
			password:'1234',
			name:'Tom Bombadil',
			major:'Computer Science'
		},
		{
			id:'P2',
			username:'user',
			password:'1234',
			name:'Jason Bourne',
			major:'Psychology'
		},
		{
			id:'P3',
			username:'hello',
			password:'1234',
			name:'Fred Flinstone',
			major:'Math'
		}
	]
}