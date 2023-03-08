const express = require('express');
const commentRouter = express.Router();
const commentController = require('../controllers/commentsController.js');

commentRouter.get('/comments', commentController.getComments); // Get All Comments
commentRouter.post('/:postId/comments', commentController.createComment); // Create new Comment
commentRouter.get('/:postId/comments', commentController.getComment); // Get or Show Specific Comment
commentRouter.put('/:postId/comments/:commentId', commentController.updateComment); // Update Specific Comment
commentRouter.delete('/:postId/comments/:commentId', commentController.deleteComment); // Delete Specific Post by ID

module.exports = commentRouter;
