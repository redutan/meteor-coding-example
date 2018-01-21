Template.roomList.onCreated(() => {
    Meteor.subscribe("roomList");
});

Template.roomList.onDestroyed(() => {
    Meteor.subscribe("roomList").stop();
});

Template.roomList.helpers({
    list() {
        return Rooms.find();
    }
});

Template.roomList.events({
    'click a[name=selectRoom]' () {
        Session.set("viewMode", "chatRoom");
        Session.set("currentRoom", this._id);
    }
});