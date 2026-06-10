import mongoose from "mongoose";

const transactionSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.ObjectId,
        required:true,
        ref:'user'
    },
    amount:{
        type:Number,
        required:true
    },
    transactionType:{
        type:String,
        required:true,
        enum:["DEBIT", "CREDIT"]
    },
    user2:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:'user2',
    },
},{
    timestamps:true
});

const transactionModel = mongoose.model("transaction", transactionSchema);

export default transactionModel;