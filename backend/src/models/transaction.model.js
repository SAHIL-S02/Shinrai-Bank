import mongoose from "mongoose";

const transactionSchema = mongoose.Schema({
    user1:{
        type: mongoose.Schema.ObjectId,
        required:true,
        ref:'user1'
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
},{
    timestamps:true
});

const transactionModel = mongoose.model("transaction", transactionSchema);

export default transactionModel;