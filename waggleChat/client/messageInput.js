Template.messageInput.events({
    'click button[name=sendMessage]' (evt, tmpl) {
        tmpl.sendMessage();
    }
    ,
    'keyup input[name=messageText]' (evt, tmpl) {
        if (evt.keyCode !== 13) {
            return;
        }
        tmpl.sendMessage();
    }
});

Template.messageInput.onCreated(function() {
    this.sendMessage = () => {
        // 텍스트 박스에서 메시지 가져오기
        const txtBox = this.find("input[name=messageText]");
        const message = txtBox.value;
        if (!message) return;
        // 메시지 insert
        const messageObj = {
            timestamp: (new Date()).getTime(),
            msg: message,
            roomId: Session.get("currentRoom"),
            owner: Meteor.userId(),
            username: Meteor.user().username,
            email: Meteor.user().emails[0].address
        };

        // Messages.insert(messageObj);
        Meteor.call("insertMessage", messageObj);
        console.log(messageObj);

        // 텍스트 박스 초기화
        txtBox.value = "";
        txtBox.focus();
    }
});