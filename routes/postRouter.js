const express = require('express');
const { isAuth } = require('../utils.js');
const postController = require('../controllers/postController.js');
const postRouter = express.Router();

postRouter.post('/', postController.createPost); // Created New post
postRouter.get('/', postController.getPosts); // Display List of All posts
postRouter.get('/:postId', postController.getPost); // Search post by it's ID
postRouter.put('/:postId', postController.updatePost); // Update post by it's ID
postRouter.delete('/:postId', postController.deletePost); // Delete post by It's ID

module.exports = postRouter;
