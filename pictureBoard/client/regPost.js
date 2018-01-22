Template.regPost.events({
  'click button[name=writePost]' (evt, tmpl) {
    $(tmpl.findAll('.modal-dialog')).toggle();
  }
  ,
  'click button[name=save]' (evt, tmpl) {
    const title = tmpl.find("input[type=text]").value;
    const context = tmpl.find("textarea").value;
    const atDate = new Date();
    const post = {
      title, context, atDate
    };
    console.log(post);

    Meteor.call("savePost", post, (err, data) => {
      if (err) {
        alert('서버에러 => ' + err.error);
      } else {
        console.log(data);
      }
    });
  }
  ,'click button[name=cancel]' (evt, tmpl) {

  }
});