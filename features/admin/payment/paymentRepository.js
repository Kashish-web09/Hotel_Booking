import mongoose from "mongoose";
import { paymentSchema } from "../../guest/payment/paymentScehma.js";
import applicationError from '../../../errorFile/applicationLevelError.js'
const paymentModels=mongoose.models.payment || mongoose.model('payment', paymentSchema);

export default class paymentRepo{
    async getAllPayments(){
        try {
            return await paymentModels.find().sort({createdAt:-1});
        } catch (err) {
            throw new applicationError("Wrong with db",500)
        }
    }
  async  getPaymentById(paymentId){
        try {
            return await paymentModels.findById(paymentId)
        } catch (err) {
        
            throw new applicationError("Wrong with db",500)
        }
    }
   async getPaymentByBookingId(bookingId){
        try {
            return await paymentModels.findOne({bookingId})
        } catch (err) {
            throw new applicationError("Wrong with db",500)
        }
    }
async searchPayment(bookingId) {
    try {
        const search = {};

        if (bookingId) {
            search.bookingId = bookingId;
        }

        return await paymentModels
            .find(search)
            .sort({ createdAt: -1 });

    } catch (err) {
        console.log(err)
        throw new applicationError("Wrong with db", 500);
    }
}
    async updatePaymentStatus(bookingId,status){
        try {
            return await paymentModels.findOneAndUpdate(
                {bookingId},
                {
                    $set:{status}
                },
                {
                    returnDocument:"after"
                }
            )
        } catch (err) {
            throw new applicationError("Wrong with db",500)
        }
    }
    async refundPayment(paymentId){
        try {
            return await paymentModels.findOneAndUpdate(
{               _id: paymentId,
               status:"Success"
},
{
                    $set:{
                        status:"Refunded"
                    }
                },
                {
                    returnDocument:"After"
                }
            )
        } catch (err) {
             throw new applicationError("Wrong with db",500)
           
        }
    }
}