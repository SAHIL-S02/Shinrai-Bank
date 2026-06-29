import express from "express";
import morgan from "morgan"
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser"
import cors from 'cors'
const app = express();
app.use(morgan());
app.use(express.json())
app.use(cors({
    origin: "https://shinraibank.slayers.space",
    credentials: true
}))
app.use(cookieParser())
app.use("/api/auth/", authRouter)
export default app;
