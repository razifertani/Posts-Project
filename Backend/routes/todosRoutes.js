const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const todosController = require('../controllers/todosController');
const checkAuth = require('../middleware/checkAuth');


router.get('/api/todos', todosController.getAllTodos);

router.get("/api/todos/:id", todosController.findById);

router.post('/api/todos', checkAuth, todosController.createTodo);

router.delete('/api/todos/:id', checkAuth, todosController.deleteTodo);

module.exports = router;
