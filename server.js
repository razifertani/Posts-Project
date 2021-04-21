const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;
const Post = require('./Backend/models/post');

const app = express();

const config = require('./Backend/config/database');

mongoose.connect(config.database).then(() => {
    console.log('CONNECTED ************');
}).catch(() => {
    console.log('ERROR ', + error);
});

app.use(cors());
app.use(bodyParser.json());

app.get('/api/posts', (req, res, next) => {
    Post.find().then((data) => {
        return res.status(200).json({
            success: "true",
            posts: data,
        });
    });
});

app.post('/api/posts', (req, res, next) => {
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

app.delete('/api/posts/:id', (req, res, next) => {
    Post.deleteOne({
        _id: req.params.id,
    }).then((result) => {
        res.status(200).json({
            success: 'true',
        });
    })


});


app.set("port", port);
app.listen(port, () => {
    console.log("Server started listening on " + port);
})