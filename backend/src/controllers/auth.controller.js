import crypto from "crypto";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import sendEmail from "../services/email.service.js";
import {generateOtp, htmlOtp} from "../utils/otp.util.js";
import otpModel from "../models/otp.model.js";


export async function otpTest(req, res){
    const {email} = req.body;
    if(!email){
        return res.status(400).json({
            success: false,
            message: "Email is required"
        })
    }
    const otp = generateOtp();
    const html = htmlOtp(otp);
    await sendEmail(email, "Your OTP Code", `Your OTP code is ${otp}`, html);
    return res.status(200).json({
        success: true,
        message: "OTP sent successfully"
    });
}

export async function register(req, res){
    const {name, email, phoneNumber, password, aadharNumber, dob} = req.body;
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
    const ifUser = await userModel.findOne({$or:[{email}, {aadharNumber}]});
    if(ifUser){
        return res.status(409).json({
            success:false,
            message:`${name} user already exist`,
            user:{
                name:name,
                email:email,
                phoneNumber:phoneNumber
            }
        })
    }
    //hashPassword
    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");
    const otp = generateOtp();
    const html = htmlOtp(otp);
    const hashedOtp = crypto.createHash("sha256").update(otp.toString()).digest("hex");
    try{
        const user = await userModel.create({
        name:name,
        email:email,
        phoneNumber: phoneNumber,
        aadharNumber:aadharNumber,
        dob:dob,
        password:hashedPassword
        });
        await otpModel.create({
            email:email,
            user:user._id,
            otp:hashedOtp
        });
        await sendEmail(email, "Your OTP Code", `Your OTP code is ${otp}`, html);
    }catch(error){
        return res.status(400).json({
            success:false,
            message:error.message,
        })
    }
    
    res.status(201).json({
        success:true,
        message:"User is registered",
        user:{
            name:name,
            email:email,
            phoneNumber:phoneNumber
        }
    });
}
export async function verify(req, res){
    const {email, otp} = req.body;
    const hashedOtp = crypto.createHash("sha256").update(otp.toString()).digest("hex");
    console.log(hashedOtp);
    const otpData = await otpModel.findOne({email, otp:hashedOtp});
    if(!otpData){
        return res.status(401).json({
            success: false,
            message:"OTP in incorrect",
            otp:hashedOtp,
        })
    }
    const user = await userModel.findById(otpData.user);
    user.verified = true;
    await user.save();
    res.status(200).json({
        success:true,
        message: "OTP verified"
    })
}