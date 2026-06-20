import mongoose from "mongoose";

const transactionSchema = mongoose.Schema({
    user1:{
        type: mongoose.Schema.ObjectId,
        required:true,
        ref:'user1'
    },
    user1Name:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    user2:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:'user2',
    },
    user2Name:{
        type:String,
        required:true
    },
},{
    timestamps:true
});

const transactionModel = mongoose.model("transaction", transactionSchema);

export default transactionModel;