import mongoose from "mongoose";

export const paymentSchema=new mongoose.Schema({
    bookingId:{type:mongoose.Schema.Types.ObjectId,ref:"booking",required:true},
        userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
                adminId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},

amount:{type:Number,required:true},

        paymentMethod:{type:String,enum:["UPI","Credit Card","Cash","NetBanking"],default:"Credit Card",required:true},
        transactionId:{
            type:String,unique:true,sparse:true
        },
status: {
        type: String,
        enum: ["Pending", "Success", "Failed", "Refunded"],
        default: "Pending"
    },
     paidAt: {
        type: Date
    }
},
{
    timestamps:true,
    collection:'payment'
}
)