import crypto from "crypto";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import sendEmail from "../services/email.service.js";
import {generateOtp, htmlOtp} from "../utils/otp.util.js";
import otpModel from "../models/otp.model.js";
import sessionModel from "../models/session.model.js";
import config from "../config/config.js";
import { access } from "fs";
import bcrypt from "bcrypt"

// export async function otpTest(req, res){
//     const {email} = req.body;
//     if(!email){
//         return res.status(400).json({
//             success: false,
//             message: "Email is required"
//         })
//     }
//     const otp = generateOtp();
//     const html = htmlOtp(otp);
//     await sendEmail(email, "Your OTP Code", `Your OTP code is ${otp}`, html);
//     return res.status(200).json({
//         success: true,
//         message: "OTP sent successfully"
//     });
// }
//register
export async function register(req, res){
    if(!req.body){
        return res.status(400).json({
            success: false,
            message: "No data found"
        })
    }
    console.log(req.body);
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
    const hashedPassword = await bcrypt.hash(password, 10);
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
        res.status(201).json({
            success:true,
            message:"User is registered",
            user:{
                name:name,
                email:email,
                phoneNumber:phoneNumber
            }
        });
    }catch(error){
        console.error(error);
        return res.status(400).json({
            success:false,
            message:error.message,
            errors:error.errors
        });
    }
    
    
}
//login 
export async function login(req, res){
    const {email, password} = req.body;
    
    const user = await userModel.findOne({email});
    if(!user){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
    }
    
    const checkPassword = await bcrypt.compare(password, user.password);
    if(!checkPassword){
        return res.status(401).json({
            success:false,
            message:"User password invalid"
        })
    }
    if(!user.verified){
        return res.status(403).json({
            success:false,
            message:"User is not verified by email",
        })
    }
    const refreshToken = jwt.sign({
        id:user._id,
    }, config.JWT_URI,{
        expiresIn: "7d",
    });
    const hashedRefreshToken = crypto.createHash("sha256").update(refreshToken).digest("hex");
    await sessionModel.create({
        user:user._id,
        refreshToken:hashedRefreshToken,
        ip:req.ip,
        userAgent:req.headers["user-agent"]
    });
    const accessToken = jwt.sign({
        id:user._id,
    },config.JWT_URI, {
        expiresIn:"15m"
    });
    res.cookie("refreshToken", refreshToken,{
        httpOnly: true,
        sameSite: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
    res.status(200).json({
        success:true,
        message:"User login successfully",
        user:{
            name:user.name,
            email:user.email,
        },
        accessToken:accessToken
    })
}
//login
export async function verify(req, res){
    const {email, otp} = req.body;
    const hashedOtp = crypto.createHash("sha256").update(otp.toString()).digest("hex");
    const otpData = await otpModel.findOne({email, otp:hashedOtp});
    if(!otpData){
        return res.status(401).json({
            success: false,
            message:"OTP is incorrect or Expired",
        })
    }
    const user = await userModel.findById(otpData.user);
    if(!user){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
    }
    // const OTP_EXPIRE_TIME = 10 * 60 * 1000 // 10 Minutes
    // if(Date.now() - otp.createdAt.getTime() > OTP_EXPIRE_TIME){
    //     return res.status(410).json({
    //         success:false,
    //         message:"OTP is expired"
    //     });
    // }
    user.verified = true;
    await user.save();
    res.status(200).json({
        success:true,
        message: "OTP verified"
    })
}
//get-data
export async function getData(req, res){
    try{
        const accessToken = req.headers.authorization?.split(" ")[1];
        if(!accessToken){
            return res.status(401).json({
                success: false,
                message: "Access token is required"
            });
        }
        const decode = jwt.verify(accessToken, config.JWT_URI);
        
        const user = await userModel.findById(decode.id);
        if(!user){
            return res.status(401).json({
                success:false,
                message:"Invalid token"
            })
        }
        if(!user.verified){
            return res.status(403).json({
                success:false,
                message:"User not verified"
            });
        }
        return res.status(200).json({
            success:true,
            message:"User data found",
            user:{
                name:user.name,
                email:user.email
            }
        })
    }catch(e){
        return res.status(401).json({
            success:true,
            message:"Invalid token"
        })
    }
}
