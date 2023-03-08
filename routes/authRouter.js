const express = require('express');
const authController = require('../controllers/authController.js');

const authRouter = express.Router();

authRouter.post('/login', authController.loginAuth);

module.exports = authRouter;
