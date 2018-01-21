Template.messageList.onCreated(function () {
    const inst = this;
    Session.set("limit", 30);

    inst.subcnt = 0;
    inst.autorun(() => {
        inst.messagesSub = inst.subscribe("messages",
            Session.get("currentRoom"),
            Session.get("limit"),
            function () {
                // 최초 구독 완료 시 && 현재 함수 처음 1번 실행 시에만
                if (inst.subcnt === 0) {
                    inst.subcnt = 1;
                    $('.panel-body').scrollTop($('.chat').height());
                }
            });

        inst.subscribe("room", Session.get("currentRoom"), function () {
            // 감지해서 바닥으로 보내는 코드를 작성하자
            Rooms.find({_id: Session.get("currentRoom")}).observe({
                changed: function(newDoc, oldDoc) {
                    $('.panel-body').scrollTop($('.chat').height());
                }
            });
        })
    });
});

Template.messageList.onDestroyed(function () {
    const inst = this;
    inst.messagesSub.stop();
});

Template.messageList.helpers({
    messages () {
        return Messages.find({}, {sort: {timestamp: 1}});
    }
});

Template.messageList.onRendered(function () {
    const staticSize = 90;
    // 스크롤 유지
    $(".panel-body").height($(window).height() - staticSize);
    // 윈도 크기가 변경돼도 유지
    $(window).resize(function () {
        $(".panel-body").height($(window).height() - staticSize);
    });
    // 무한스크롤
    $(".panel-body").scroll(function () {
        if ($(".panel-body").scrollTop() === 0) {
            $(".panel-body").scrollTop(100);
            Session.set("limit", Session.get("limit") + 10);
        }
    });
});