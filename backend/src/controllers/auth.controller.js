import crypto from "crypto";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import sendEmail from "../services/email.service.js";
import {generateOTP, htmlOTP} from "../utils/otp.util.js";



export async function otpTest(req, res){
    const {email} = req.body;
    if(!email){
        return res.status(400).json({
            success: false,
            message: "Email is required"
        })
    }
    const otp = generateOTP();
    const html = htmlOTP(otp);
    await sendEmail(email, "Your OTP Code", `Your OTP code is ${otp}`, html);
    return res.status(200).json({
        success: true,
        message: "OTP sent successfully"
    });
}

export async function register(req, res){
    const {name, email, phoneNumber, password} = req.body;
    if(!name){
        return res.status(400).json({
            success: false,
            message: "Name is required"
        })
    }
    if(!email){
        return res.status(400).json({
            success: false,
            message: "Email is required"
        })
    }
    if(!phoneNumber){
        return res.status(400).json({
            success: false,
            message: "Phone number is required"
        })
    }
    if(!password){
        return res.status(400).json({
            success: false,
            message: "Password is required"
        })
    }
    //hashPassword
    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

    
}