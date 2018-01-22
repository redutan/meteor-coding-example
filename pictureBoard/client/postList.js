Template.postList.onCreated(function () {
  this.subscribe("postList");
});

Template.postList.helpers({
  list() {
    return Posts.find({}, {sort: {atDate:-1}});
  }
});