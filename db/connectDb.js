import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(
            process.env.MONGO_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
            },
            () => {
                console.log(`Database connected successfully`);
            }
        );
    } catch (error) {
        console.error("Database connection error", error.message);
    }
};

export default connectDb;
