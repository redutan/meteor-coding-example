Template.addressList.onCreated(function () {
    Session.set("cnt", 30);
    const self = this;

    self.autorun(function() {
        self.subscribe("AddressBookData", Session.get("cnt"));
    });

    $(window).scroll(function() {
        const scrollHeight = $(window).scrollTop() + $(window).height();
        const documentHeight = $(document).height();
        if (scrollHeight + 200 >= documentHeight) {
            Session.set("cnt", Session.get("cnt") + 30);
        }
    });
});

Template.addressList.helpers({
    list () {
        return AddressBook.find({}, {/*limit: 10,*/ sort: {name: 1}});
    }
});

Template.addressList.events({
    'click button[name=more]' () {
        Session.set("cnt", Session.get("cnt") + 5);
    }
});

Template.addressInput.events({
    'click button[name=saveAddress]' (evt, tmpl) {
        const address = {
            name: tmpl.find("input[name=name]").value
            , phone: tmpl.find("input[name=phone]").value
            , email: tmpl.find("input[name=email]").value
            , company: tmpl.find("input[name=company]").value
            , birthday: tmpl.find("input[name=birthday]").value
            , owner: Meteor.userId()
        };

        try {
            check(address.name, NotEmptyString);
            check(address.phone, PhoneString);
            check(address.email, EmailString);
            check(address.company, NotEmptyString);
            check(address.birthday, BirthDayString);
        } catch (err) {
            alert(`입력 값을 확인하세요 : [${err.message}]`);
            return;
        }
        AddressBook.insert(address);

        tmpl.find("input[name=name]").value = "";
        tmpl.find("input[name=phone]").value = "";
        tmpl.find("input[name=email]").value = "";
        tmpl.find("input[name=company]").value = "";
        tmpl.find("input[name=birthday]").value = "";
    }
});

Template.addressListItem.events({
    'click button[name=remove]' (btn, tmpl) {
        AddressBook.remove({_id: this._id});
    }
    ,
    'click button[name=modify]' (btn, tmpl) {
        Session.set("editItem", this._id);
    }
    ,
    'click button[name=save]' (btn, tmpl) {
        var address = {
            name: tmpl.find("input[name=name]").value
            , phone: tmpl.find("input[name=phone]").value
            , email: tmpl.find("input[name=email]").value
            , company: tmpl.find("input[name=company]").value
            , birthday: tmpl.find("input[name=birthday]").value
        };
        try {
            check(address.name, NotEmptyString);
            check(address.phone, PhoneString);
            check(address.email, EmailString);
            check(address.company, NotEmptyString);
            check(address.birthday, BirthDayString);
        } catch (err) {
            alert(`입력 값을 확인하세요 : [${err.message}]`);
            return;
        }
        AddressBook.update({_id: this._id}, {$set: address});
        Session.set("editItem", null);
    }
    ,
    'click button[name=cancel]' (btn, tmpl) {
        Session.set("editItem", null);
    }
    ,
    'click .edit-thing' (evt, tmpl) {
        Session.set("editItem", this._id);
    }
});

Template.addressListItem.helpers({
    editing () {
        return this._id === Session.get("editItem");
    }
});


