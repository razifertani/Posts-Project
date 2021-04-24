const express = require('express');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();
const userController = require('../controllers/usersController');


router.post('/register', userController.register);

router.post('/login', userController.login);

module.exports = router;
