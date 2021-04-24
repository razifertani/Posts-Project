const express = require('express');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();
const userController = require('../controllers/usersController');


router.post('/api/user/register', userController.register);

router.post('/api/user/login', userController.login);

module.exports = router;
