const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const todosController = require('../controllers/todosController');
const checkAuth = require('../middleware/checkAuth');


router.get('/', todosController.getAllTodos);

router.get("/:id", todosController.findById);

router.post('/', checkAuth, todosController.createTodo);

router.get('/delete/:id', checkAuth, todosController.deleteTodo);

module.exports = router;
