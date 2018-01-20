Meteor.publish("AddressBookData", function (count) {
    const userId = this.userId;
    if (userId) {
        return AddressBook.find({owner: userId}, {limit: count, sort: {name: 1}});
    }
});