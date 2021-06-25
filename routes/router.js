import express from "express";
import {
    getAllTodos,
    addTodo,
    deleteTodo,
    updateTodo,
} from "./../controllers/todoController.js";

import {
    loginHandler,
    logoutHandler,
    signUpHandler,
    resetPasswordHandler
} from "./../controllers/userControler.js";

const router = express.Router();

router.use((req, res, next) => {
    next();
});

router.get("/todo/:userId", getAllTodos);

router.route("/todo").post(addTodo).delete(deleteTodo).put(updateTodo);

router.post("/signup", signUpHandler);
router.post("/signin", loginHandler);
router.post("/signout", logoutHandler);
router.post("/resetPassword", resetPasswordHandler);

export default router;
