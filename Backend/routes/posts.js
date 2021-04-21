const express = require('express');

const Post = require('../models/post');

const router = express.Router();


router.get('/api/posts', (req, res, next) => {
    Post.find().then((data) => {
        return res.status(200).json({
            success: "true",
            posts: data,
        });
    });
});

router.post('/api/posts', (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
    });

    post.save().then((result) => {
        res.status(201).json({
            success: 'true',
            postId: result._id,
        });
    });
});

router.delete('/api/posts/:id', (req, res, next) => {
    Post.deleteOne({
        _id: req.params.id,
    }).then((result) => {
        res.status(200).json({
            success: 'true',
        });
    })
});

module.exports = router;
