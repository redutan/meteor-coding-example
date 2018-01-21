Meteor.publish("roomList", () => {
    return Rooms.find();
});

Meteor.publish("room", function(roomId) {
    return Rooms.find({_id: roomId});
});

Meteor.publish("messages", (roomId, count) => {
    if (!roomId) {
        console.error("채팅방 식별자 부재", count);
    } else {
        return Messages.find({roomId: roomId}, {sort: {timestamp: -1}, limit: count});
    }
});