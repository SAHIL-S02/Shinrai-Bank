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
    accountNumber:{
        type:Number,
    },
    cardType:{
        type:String,
        default:"DEBIT",
        enum:["DEBIT", "CREDIT"],
    },
    cardNumber:{
        type:String,
    },
    cardValid:{
        type:Date,
        default: () =>{
            const date = new Date();
            date.setFullYear(date.getFullYear() + 5);
            return date;
        }
    },
    cardCVV:{
        type:String,
    },
    status: {
        type: String,
        enum: ["ACTIVE", "FROZEN", "CLOSED", "SUSPENDED"],
        default: "ACTIVE",
    },
    bankBalance:{
        type:Number,
        default:10000
    },
    dailyTransferLimit: {
        type: Number,
        default: 100000,
    },
    dailyTransferredAmount: {
        type: Number,
        default: 0,
    },
    monthlyTransferLimit: {
        type: Number,
        default: 1000000,
    },
    monthlyTransferredAmount: {
        type: Number,
        default: 0,
    },
    lastDailyReset: {
        type: Date,
        default: Date.now
    },
    lastMonthlyReset: {
        type: Date,
        default: Date.now
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
        type: String,
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