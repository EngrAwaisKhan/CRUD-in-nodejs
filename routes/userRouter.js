const express = require('express');
const { isAuth } = require('../utils.js');
const userController = require('../controllers/userController.js');
const userRouter = express.Router();

userRouter.post('/', userController.createUser); // Created New User
userRouter.get('/', userController.getUsers); // Display List of All Users
userRouter.get('/:id', userController.getUser); // Search User by it's ID
userRouter.patch('/:id', userController.updateUser); // Update User by it's ID
userRouter.delete('/:id', userController.deleteUser); // Delete User by It's ID

module.exports = userRouter;
