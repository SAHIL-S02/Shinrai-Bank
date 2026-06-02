import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
const authRouter = Router();
authRouter.post("/register", authController.register);
authRouter.post("/otp-test", authController.otpTest);

export default authRouter;