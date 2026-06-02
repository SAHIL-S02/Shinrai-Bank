import mongoose from "mongoose";
import config from "./config.js";

async function connectDatabase() {
    try {
        await mongoose.connect(config.MONGODB_URI);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error.message);
        if (process.env.NODE_ENV === 'production') {
            process.exit(1);
        }
    }
}

export default connectDatabase;