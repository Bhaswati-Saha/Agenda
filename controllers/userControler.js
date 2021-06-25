import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

const signUpHandler = async (req, res) => {
    const body = req.body;

    if (
        Object.entries(body).length === 0 ||
        !body.hasOwnProperty("username") ||
        !body.hasOwnProperty("password")
    ) {
        return res.status(403).json({
            error: "Please provide a valid username and password",
        });
    }

    try {
        const { username, password } = body;

        const newUser = new User({
            username: username,
            password: "",
            todos: [],
        });

        const hash = bcrypt.hashSync(password, 10);
        newUser.password = hash;

        const createdUser = await newUser.save();
        return res.status(200).json({
            id: createdUser._id,
            message: "Create user successful",
        });
    } catch (error) {
        return res.status(400).json({
            error,
            message: "Something went wrong",
        });
    }
};

const loginHandler = async (req, res) => {
    const body = req.body;

    if (
        Object.entries(body).length === 0 ||
        !body.hasOwnProperty("username") ||
        !body.hasOwnProperty("password")
    ) {
        return res.status(403).json({
            error: "Please provide a valid username and password",
        });
    }

    try {
        const { username, password } = body;

        let user = await User.findOne({ username: username });

        if (bcrypt.compareSync(password, user.password)) {
            user.isLoggedin = true;
            await user.save();
            return res.status(200).json({
                id: user._id,
                message: "Login successfull",
            });
        } else {
            return res.status(403).json({
                message: "Wrong password",
            });
        }
    } catch (error) {
        return res.status(400).json({
            error,
            message: "Something went wrong",
        });
    }
};

const logoutHandler = async (req, res) => {
    const body = req.body;
    if (Object.entries(body).length === 0) {
        return res.status(403).json({
            error: "Please provide a userId",
        });
    }
    try {
        let user = await User.findById(body.id);
        user.isLoggedin = false;
        await user.save();
        return res.status(200).json({
            message: "Logout successfull",
        });
    } catch (error) {
        return res.status(400).json({
            error,
            message: "Something went wrong",
        });
    }
};

const resetPasswordHandler = async(req,res)=>{
    const body=req.body;
    if (
        Object.entries(body).length === 0 ||
        !body.hasOwnProperty("username") ||
        !body.hasOwnProperty("password")
    ) {
        return res.status(403).json({
            error: "Please provide a valid username and new password",
        });
    }
    try {
        const { username, password } = body;
        const hash = bcrypt.hashSync(password, 10);
        await User.updateOne({ username: username },{ password: hash });
        return res
        .status(200)
        .json({ message: "Password reset successfull.Kindly Sign In" });
    } catch (error) {
        return res.status(400).json({
            error,
            message: "Unable to reset password",
        });
    }

}

export { loginHandler, logoutHandler, signUpHandler, resetPasswordHandler };
