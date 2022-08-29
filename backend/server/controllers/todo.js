const Todo = require("../database/Todo");
const User = require("../database/user");
const { v4: uuid } = require("uuid");

async function addTodo(req, res) {
    const {
        task,
        email,
        tag
    } = req.body

    const user = await User.findOne({
        email
    })

    if (!user) {
        return res.status(400).send({
            status: "error",
            message: "User not found"
        })
    }

    await Todo.create({
        todoId: uuid(),
        task,
        email,
        tag,
        status: false
    });

    return res.status(200).send({
        status: "success",
        message: "Todo Created"
    })
}

async function getTodo(req, res) {
    const { email } = req.body;

    const user = await User.findOne({
        email
    })

    if (!user) {
        return res.status(400).send({
            status: "error",
            message: "User not found"
        })
    }

    const todos = await Todo.find({ email });

    res.status(200).json(todos);
}

async function deleteTodo(req, res) {
    const id = req.query.id;

    const todo = await Todo.find({ todoId: id });


    if (todo.length == 0) {
        return res.status(400).send({
            response: "error",
            message: "id not matched"
        })
    }

    await Todo.deleteOne({ todoId: id })

    res.status(200).send({
        response: "success",
        message: "todo deleted"
    })
}

async function updateTodo(req, res) {
    const id = req.query.id;

    const todo = await Todo.find({ todoId: id });


    if (todo.length == 0) {
        return res.status(400).send({
            response: "error",
            message: "id not matched"
        })
    }

    const { task, status } = req.body.data

    await Todo.updateOne({ todoId: id }, { task, status })

    res.status(200).send({
        response: "success",
        message: "todo updated"
    })
}

module.exports = {
    addTodo,
    getTodo,
    deleteTodo,
    updateTodo
}