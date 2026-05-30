import express from "express";
import app from "./app.js";
import config from "./config/config.js";
import connectDatabase from "./config/database.config.js";
connectDatabase();
app.listen(config.BACKEND_PORT, ()=>{
    console.log(`Server is running at port ${config.BACKEND_PORT} .....`);
})