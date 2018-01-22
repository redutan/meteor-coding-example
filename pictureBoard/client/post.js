Template.post.events({
  'click button[name=removePost]' (evt, tmpl) {
    Meteor.call('removePost', this._id, (err, data) => {
      if (err) {
        alert('서버 에러 => ' + err.error);
      } else {
        console.log(data);
      }
    })
  }
});