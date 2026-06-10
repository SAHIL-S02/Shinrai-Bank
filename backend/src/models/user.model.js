import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
    },
    nickName:{
        type:String,

    },
    currency: {
        type: String,
        default: "INR",
    },
    branchCode: {
        type: String,
        default: "Shinrai Branch of India"
    },

    ifscCode: {
        type: String,
        default: "SHIN02042007"
    },

    status: {
        type: String,
        enum: ["ACTIVE", "FROZEN", "CLOSED", "SUSPENDED"],
        default: "ACTIVE",
    },

    dailyTransferLimit: {
        type: Number,
        default: 100000,
    },
    monthlyTransferLimit: {
        type: Number,
        default: 1000000,
    },

    kycVerified: {
        type: Boolean,
        default: false,
    },

    interestRate: {
        type: Number,
        default: 0,
    },

    nominee: {
        name: String,
        relation: String,
        phone: String,
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already exist"]
    },
    phoneNumber:{
        type:Number,
        required:[true, "Phone number is required"],
        unique: [true, "Phone number already exist"]
    },
    aadharNumber:{
        type: Number,
        required:[true, "Aadhar number is required"],
        unique: [true, "Aadhar number already exist"]
    },
    address:{
        type:String,
    },
    dob:{
        type:Date,
        required:[true, "Date of Birth is required"],
    },
    accountType:{
        type:String,
        default: "SAVINGS",
        enum: ["SAVINGS", "CURRENT", "SALARY", "FIXED_DEPOSIT"],
    },
    password:{
        type:String,
        required: [true, "Password is required"]
    },
    verified:{
        type:Boolean,
        default: false
    }
}, {
    timestamps:true,
});

const userModel = mongoose.model("Users", userSchema);

export default userModel;