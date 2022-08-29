const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    todoId: String,
    email: String,
    task: String,
    tag: String,
    status: Boolean
}, {
    timestamps: true
})

const Todo = mongoose.model("todo", todoSchema);

module.exports = Todo;