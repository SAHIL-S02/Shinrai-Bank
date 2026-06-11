import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
const authRouter = Router();
//register 
authRouter.post("/register", authController.register);
//Verify email 
authRouter.post("/verify", authController.verify);
//login
authRouter.post("/login", authController.login);
//get refresh token
authRouter.get("/refresh-token", authController.refreshToken); // route to refresh the access token
//get data
authRouter.get("/get-data", authController.getData);

export default authRouter;