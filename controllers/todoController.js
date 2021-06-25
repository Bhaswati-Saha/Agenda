import { uuid } from "uuidv4";
import User from "../models/userModel.js";

const getAllTodos = async (req, res) => {
    const body = req.params;
    if (Object.entries(body).length === 0) {
        return res.status(403).json({
            error: "Please provide a userId",
        });
    }
    try {
        let user = await User.findById(body.userId);
        return res.send(user.todos);
    } catch (error) {
        return res.status(400).json({
            error,
            message: "Some error occured",
        });
    }
};

const addTodo = async (req, res) => {
    const body = req.body;

    if (
        Object.entries(body).length === 0 ||
        !body.hasOwnProperty("todo") ||
        !body.hasOwnProperty("userId")
    ) {
        return res.status(400).json({
            error: "You must provide a todo and an id",
        });
    }

    try {
        const key = uuid();
        let user = await User.findById(body.userId);

        user.todos.push({
            key: key,
            text: body.todo,
        });
        await user.save();

        return res.status(200).json({
            todoId: key,
            message: "todo item created",
        });
    } catch (error) {
        return res.status(400).json({
            error,
            message: "todo item not created",
        });
    }
};

const deleteTodo = async (req, res) => {
    const body = req.body;
    if (
        Object.entries(body).length === 0 ||
        !body.hasOwnProperty("userId") ||
        !body.hasOwnProperty("todoId")
    ) {
        return res.status(403).json({
            error: "Please provide a userId & todoId",
        });
    } else {
        try {
            const user = await User.updateOne(
                { _id: body.userId },
                { $pull: { todos: { key: body.todoId } } }
            );

            console.log(user);

            return res
                .status(200)
                .json({ message: `Todo deleted`, todoId: body.todoId });
        } catch (error) {
            return res.status(400).json({
                error,
                message: "Unable to delete",
            });
        }
    }
};

const updateTodo = async (req, res) => {
    const body = req.body;
    if (
        Object.entries(body).length === 0 ||
        !body.hasOwnProperty("userId") ||
        !body.hasOwnProperty("todoId")
    ) {
        return res.status(403).json({
            error: "Please provide a userId & todoId",
        });
    }

    try {
         let user = await User.findById(body.userId);
         user.todos.forEach((ele) => {
             if (ele.key === body.todoId) {
                 ele.text = body.todo;
             }
         });
         user.markModified("todos");
         await user.save();
         return res
            .status(200)
            .json({ message: `Todo updated`, todoId: body.todoId });
    } catch (error) {
        return res.status(400).json({
            error,
            message: "Unable to update",
        });
    }
};

export { getAllTodos, addTodo, deleteTodo, updateTodo };
