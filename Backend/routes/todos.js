const express = require('express');

const Todo = require('../models/todo');

const checkAuth = require('../middleware/checkAuth');

const router = express.Router();


router.get('/api/todos', (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.currentpage;
    const todoQuery = Todo.find();
    let fetchedTodos;

    if (pageSize && currentPage) {
        todoQuery
            .skip(pageSize * (currentPage - 1))
            .limit(pageSize);
    }

    todoQuery.then((data) => {
        fetchedTodos = data;
        return Todo.countDocuments();
    }).then((count) => {
        res.status(200).json({
            success: "true",
            todos: fetchedTodos,
            todosLength: count,
        });
    });
});

router.post('/api/todos',
    checkAuth,
    (req, res, next) => {
        const todo = new Todo({
            title: req.body.title,
            content: req.body.content,
        });

        todo.save().then((result) => {
            res.status(201).json({
                success: 'true',
                todoId: result._id,
            });
        });
    });

router.delete('/api/todos/:id',
    checkAuth,
    (req, res, next) => {
        Todo.deleteOne({
            _id: req.params.id,
        }).then((result) => {
            res.status(200).json({
                success: 'true',
            });
        })
    });

module.exports = router;
