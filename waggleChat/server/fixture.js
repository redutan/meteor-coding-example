// 미티어 실행 시 한 번 호출되는 함수
Meteor.startup(() => {
    // Rooms 컬렉션을 이용하여 방이 없을 경우
    if (!Rooms.findOne({_id: "MeteorSchool"})) {
        // 사용자 등록
        const usr1 = Accounts.createUser({
            username: "와글이"
            ,email: "waggle@fake.com"
            ,password: "12345678"
        });
        const usr2 = Accounts.createUser({
            username: "수다쟁이"
            ,email: "sudajangi@fake.com"
            ,password: "12345678"
        });
        // 채팅방 등록
        Rooms.insert({
            _id: "MeteorSchool",
            name: "MeteorSchool",
            owner: usr1,
            userList: [usr1, usr2],
            createdAt: (new Date()).getTime()
        });
    }
});