const Post = require('../models/postModel.js');
const Comment = require('../models/commentModel.js');
const { text } = require('express');

// Display list of Post
exports.getPosts = async (req, res) => {
  const page = req.query.page || 0;
  const itemsPerPage = req.query.items;

  const posts = await Post.find({})
    .sort({ createdAt: -1 })
    .skip(page * itemsPerPage)
    .limit(itemsPerPage); //-1 for biggest ot smallest or latest to oldest dates for visversa 1.
  if (posts.length > 0) {
    res.send({ message: `No. of Posts: ${posts.length}`, posts });
  } else {
    res.status(404).send({ message: 'No Post Found!' });
  }
};

// Create New Post
exports.createPost = async (req, res) => {
  // await Post.deleteMany({});

  const createdPost = new Post({
    title: req.body.title,
    content: req.body.content,
    user: req.body.user,
  });
  createdPost.save();
  res.send({ createdPost });
};

// Display Specific Post by its ID
exports.getPost = async (req, res) => {
  const post = await Post.findById(req.params.postId);
  if (post) {
    const comments = await Comment.find({ post: post._id });
    // const comments = await Comment.find({ post: post._id },{post:0, user:0, createdAt:0, updatedAt:0}); use this if you want to show speific fields in comments
    res.send({ post, comments });
  } else {
    res.status(404).send({ message: 'No Post Found!' });
  }
};

// Update Post Specific Post
exports.updatePost = async (req, res) => {
  const post = await Post.findById(req.params.postId);
  if (post) {
    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    const updatedPost = await post.save();
    res.send({ message: 'Post Updated Successfully!', post: updatedPost });
  } else {
    res.status(404).send({ message: 'Post Not Found!' });
  }
};

// Delete Specific Post by ID

exports.deletePost = async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.postId);
  if (post) {
    res.send({ message: 'Post deleted Successfully!', post: post });
  } else {
    res.status(404).send({ message: 'Post not Found!' });
  }
};
