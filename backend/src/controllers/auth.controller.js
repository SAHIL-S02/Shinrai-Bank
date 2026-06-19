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
import transactionModel from "../models/transaction.model.js";
import mongoose from "mongoose";

function generateLuhnCardNumber() {
    let digits = [];

  // Generate first 15 digits
    for (let i = 0; i < 15; i++) {
        digits.push(Math.floor(Math.random() * 10));
    }
    let sum = 0;
    let isEven = true;
    for (let i = digits.length - 1; i >= 0; i--) {
        let digit = digits[i];
        if (isEven) {
        digit *= 2;
        if (digit > 9) digit -= 9;
        }
        sum += digit;
        isEven = !isEven;
    }
    const checkDigit = (10 - (sum % 10)) % 10;
    return digits.join("") + checkDigit;
}

async function generateUniqueCardNumber() {
    while (true) {
        const cardNumber = generateLuhnCardNumber();
        const exists = await userModel.findOne({ cardNumber });
        if (!exists) {
            return cardNumber;
        }
    }
}



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
    //hash aadhar number
    const hashedAadharNumber = crypto.createHash("sha256").update(aadharNumber.toString()).digest("hex");
    //generate card details 
    const cardNumber = generateUniqueCardNumber();
    const cardCVV = Math.floor(100 + Math.random() * 900);
    const hashedCardNumber = crypto.createHash("sha256").update(cardNumber.toString()).digest("hex");
    const hashedCVV = crypto.createHash("sha256").update(cardCVV.toString()).digest("hex");
    //hashPassword
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOtp();
    const html = htmlOtp(otp);
    const hashedOtp = crypto.createHash("sha256").update(otp.toString()).digest("hex");
    try{
        const user = await userModel.create({
        name:name,
        accountNumber:phoneNumber,
        email:email,
        phoneNumber: phoneNumber,
        aadharNumber:hashedAadharNumber,
        dob:dob,
        password:hashedPassword,
        cardNumber:hashedCardNumber,
        cardCVV:hashedCVV,
        });
        await otpModel.create({
            email:email,
            user:user._id,
            otp:hashedOtp
        });
        await sendEmail(email, "Your OTP Code", html);
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
    const {email, password, accountType} = req.body;
    
    const user = await userModel.findOne({email, accountType});
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
//refresh
export async function refreshToken(req,res){ // refresh access token using a valid refresh token cookie
    const refreshToken = req.cookies.refreshToken; // read refresh token from cookies
    if(!refreshToken){
        return res.status(401).json({
            message: "Refresh Token Not Found"
        })
    }
    const decode = jwt.verify(refreshToken, config.JWT_URI); // verify that the refresh token is valid
    const hashedRefreshToken = crypto.createHash("sha256").update(refreshToken).digest("hex"); // hash refresh token for lookup
    const session = await sessionModel.findOne({
        refreshToken:hashedRefreshToken,
        revoked:false
    }) // find an active session matching the refresh token
    if(!session){
        return res.status(401).json({
            message: "Refresh token invalid"
        })
    }
    const accessToken = jwt.sign({
        id:decode.id
    }, config.JWT_URI,{
        expiresIn: "15m"
    }); // issue a new access token

    const newRefreshToken = jwt.sign({
        id:decode.id
    }, config.JWT_URI, {
        expiresIn: "7d"
    }); // issue a new refresh token
    const newHashedRefreshToken = crypto.createHash("sha256").update(newRefreshToken).digest("hex"); // hash the new refresh token
    session.refreshToken = newHashedRefreshToken; // update session record with new refresh token hash
    await session.save(); // save the updated session
    res.cookie("refreshToken", newRefreshToken,{
        httpOnly: true,
        secure:true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    }) // set the new refresh token cookie
    res.status(200).json({
        message:"Access token refreshed successfully",
        newAccessToken: accessToken
    }); // return the new access token
}
//verify
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
export async function getDashboardData(req, res){
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
            success:false,
            message:"Invalid token"
        })
    }
}
//send-money
export async function sendMoney(req, res){
    const session = await mongoose.startSession();
    try{
        const accessToken = req.headers.authorization?.split(" ")[1];
        const {reciverPhoneNumber, reciverAccountNumber, amount} = req.body;
        const transferAmount = Number(amount);

        if (isNaN(transferAmount) || transferAmount <= 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid amount"
            });
        }
        if(!transferAmount){
            return res.status(400).json({
                success:false,
                message:"Amount not given"
            })
        }
        
        if (!reciverAccountNumber && !reciverPhoneNumber){
            return res.status(400).json({
                success:false,
                message:"Reciver data not given"
            })
        }
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
        if (reciverAccountNumber === user.accountNumber || reciverPhoneNumber === user.phoneNumber) {
            return res.status(400).json({
                success: false,
                message: "Cannot transfer money to your own account"
            });
        }
        const now = new Date();

        // Daily reset
        if (
            now.getDate() !== user.lastDailyReset.getDate() ||
            now.getMonth() !== user.lastDailyReset.getMonth() ||
            now.getFullYear() !== user.lastDailyReset.getFullYear()
        ) {
            user.dailyTransferredAmount = 0;
            user.lastDailyReset = now;
        }

        // Monthly reset
        if (
            now.getMonth() !== user.lastMonthlyReset.getMonth() ||
            now.getFullYear() !== user.lastMonthlyReset.getFullYear()
        ) {
            user.monthlyTransferredAmount = 0;
            user.lastMonthlyReset = now;
        }
        if(user.dailyTransferLimit  - (user.dailyTransferredAmount + transferAmount) < 0){
            return res.status(409).json({
                success:false,
                message:"Daily Transfer limit reached"
            });
        }
        if(user.monthlyTransferLimit  - (user.monthlyTransferredAmount + transferAmount) < 0){
            return res.status(409).json({
                success:false,
                message:"Monthly Transfer limit reached"
            });
        }
        if(user.bankBalance < transferAmount){
            return res.status(409).json({
                success:false,
                message:"Low balance"
            });
        }
        await session.startTransaction();
        if(reciverAccountNumber){
            const reciver = await userModel.findOne({accountNumber:reciverAccountNumber}).session(session);
            if(!reciver){
                return res.status(404).json({
                    success:false,
                    message:"Reciver not found"
                })
            }
            user.bankBalance -= transferAmount;
            reciver.bankBalance += transferAmount;
            user.dailyTransferredAmount += Number(transferAmount);
            user.monthlyTransferredAmount += Number(transferAmount);
            const debit = await transactionModel.create([{
                user1:user._id,
                amount:transferAmount,
                user2:reciver._id,
            }], {session});
            await user.save({ session });
            await reciver.save({ session });

            await session.commitTransaction();
            return res.status(200).json({
                success:true,
                message:`Amount ${amount} transferred to ${reciver.name}`
            });
        }
        if(reciverPhoneNumber){
            const reciver = await userModel.findOne({phoneNumber:reciverPhoneNumber}).session(session);
            if(!reciver){
                return res.status(404).json({
                    success:false,
                    message:"Reciver not found"
                })
            }
            user.bankBalance -= transferAmount;
            reciver.bankBalance += transferAmount;
            user.dailyTransferredAmount += Number(transferAmount);
            user.monthlyTransferredAmount += Number(transferAmount);
            const debit = await transactionModel.create({
                user1:user._id,
                amount:transferAmount,
                user2:reciver._id,
            })
            await user.save({ session });
            await reciver.save({ session });

            await session.commitTransaction();
            return res.status(200).json({
                success:true,
                message:`Amount ${amount} transferred to ${reciver.name}`
            });
        }
    }catch(e){
        await session.abortTransaction();

        console.error(e);

        return res.status(500).json({
            success: false,
            message: e.message
        });
    }finally {
        session.endSession();
    }
}
