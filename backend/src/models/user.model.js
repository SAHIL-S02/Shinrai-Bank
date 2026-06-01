import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
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
    // addharNumber:{
    //     type: Number,
    //     required:[true, "Aadhar number is required"],
    //     unique: [true, "Phone number already exist"]
    // },
    dob:{
        type:Date,
        required:[true, "Phone number is required"],
        unique: [true, "Phone number already exist"]
    },
    accountType:{
        type:String,
        default: "Saving"
    },
    password:{
        type:String,
        required: [true, "Password is required"]
    },
    verified:{
        type:Boolean,
        default: false
    }
});

const userModel = mongoose.model(userSchema);

export default userModel;