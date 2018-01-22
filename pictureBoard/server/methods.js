Meteor.methods({
  savePost(post) {
    if (!post) {
      throw new Meteor.Error("입력 값이 없습니다.");
    }
    return Posts.insert(post);
  }
  ,
  removePost(post_id) {
    if (!post_id) {
      throw new Meteor.Error("입력 값이 없습니다.");
    }
    return Posts.remove({_id: post_id});
  }
});