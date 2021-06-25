import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        isLoggedin: {
            type: Boolean,
            default: true,
        },
        todos: [],
    },
    { timestamps: true }
);

const User = new model("User", userSchema);

export default User;
