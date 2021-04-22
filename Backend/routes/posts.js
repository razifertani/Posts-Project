const express = require('express');

const Post = require('../models/post');

const router = express.Router();


router.get('/api/posts', (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.currentpage;
    const postQuery = Post.find();
    let fetchedPosts;

    if (pageSize && currentPage) {
        postQuery
            .skip(pageSize * (currentPage - 1))
            .limit(pageSize);
    }

    postQuery.then((data) => {
        fetchedPosts = data;
        return Post.count();
    }).then((count) => {
        res.status(200).json({
            success: "true",
            posts: fetchedPosts,
            postsLength: count,
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
