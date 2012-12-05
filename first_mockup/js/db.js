var db = {
	Group:[
		{
			id:'G1',
			name:'Math 112',
			subject:'Math 112',
			description:'The happenin place for all things Newtonian Calculus',
			memberIds:['P1','P2']
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
			coordinator:'P1',
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
		}
	]
}