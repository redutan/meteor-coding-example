Template.message.helpers({
    usr() {
        return Meteor.userId() == this.owner ? "나" : this.username;
    }
    ,
    gravatar() {
        return `http://www.gravatar.com/avatar/${Gravatar.hash(this.email)}?s=45&d=wavatar`;
    }
    ,
    me() {
        return Meteor.userId() === this.owner;
    }
});
