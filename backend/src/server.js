import express from "express";
import app from "./app.js";
import config from "./config/config.js";
import connectDatabase from "./config/database.config.js";

// Start the server immediately — don't block on DB connection
app.listen(config.BACKEND_PORT, () => {
    console.log(`Server is running at port ${config.BACKEND_PORT} .....`);
});

// Connect to MongoDB in the background
connectDatabase().then(() => {
    console.log("MongoDB ready to handle requests");
}).catch((err) => {
    console.error("MongoDB connection failed on startup:", err.message);
});