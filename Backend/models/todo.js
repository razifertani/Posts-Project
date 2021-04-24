const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, },
    title: { type: String, required: true },
    content: { type: String, required: true },
});

module.exports = mongoose.model('Todo', todoSchema);

