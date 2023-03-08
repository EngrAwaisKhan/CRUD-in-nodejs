const Comment = require('../models/commentModel.js');

exports.getComments = async (req, res) => {
  // await Comment.deleteMany({});
  const comments = await Comment.find({}).sort({
    createdAt: -1,
  });
  res.send({ comments });
};

exports.createComment = async (req, res) => {
  const comment = new Comment({
    text: req.body.text,
    post: req.params.postId,
    user: req.body.user,
  });
  comment.save();
  res.send(comment);
};

exports.getComment = async (req, res) => {
  // await Comment.deleteMany({});
  const page = req.query.page || 0;
  const itemsPerPage = req.query.items;
  const comments = await Comment.find({ post: req.params.postId })
    .sort({ createdAt: -1 })
    .skip(page * itemsPerPage)
    .limit(itemsPerPage);

  if (comments.length > 0) {
    res.send({ message: `No. of Comment: ${comments.length}`, comments });
  } else {
    res.send({ message: 'comment not found!' });
  }
};

exports.updateComment = async (req, res) => {
  const comment = await Comment.findOne({
    _id: req.params.commentId,
    post: req.params.postId,
  });
  if (comment) {
    comment.text = req.body.text || comment.text;
    const updatedComment = await comment.save();
    res.send({
      message: 'Comment Updated Successfully!',
      comment: updatedComment,
    });
  } else {
    res.status(404).send('Comment not Found!');
  }
};

exports.deleteComment = async (req, res) => {
  const comment = await Comment.findByIdAndDelete({
    _id: req.params.commentId,
    post: req.params.postId,
  });
  if (comment) {
    res.send({ message: 'Comment deleted Successfully!', comment: comment });
  } else {
    res.status(404).send({ message: 'Comment not Found!' });
  }
};
