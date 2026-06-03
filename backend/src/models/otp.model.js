import mongoose from "mongoose";

const otpSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default: Date.now,
        expires: 600
    }
});

const otpModel = mongoose.model("otps", otpSchema);
export default otpModel;