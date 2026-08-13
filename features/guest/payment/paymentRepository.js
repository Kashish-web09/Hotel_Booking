import mongoose from "mongoose";
import { paymentSchema } from "./paymentScehma.js";
import applicationError from '../../../errorFile/applicationLevelError.js'

const paymentModels=mongoose.models.payment || mongoose.model('payment',paymentSchema);

export default class paymentRepo{
    async createPayment(payment){
        try {
            const newPayment=new paymentModels(payment);
            await newPayment.save();
            return newPayment;
        } catch (err) {
                    console.log("PAYMENT DB ERROR:", err);

            throw new applicationError("Wrong with db",500)
        }
    }
    async getPaymentById(paymentId){
                try {
            return await paymentModels.findById(paymentId)
        } catch (err) {
            throw new applicationError("Wrong with db",500)
        }

    }
  async  getPaymentByBookingId(bookingId){
                        try {
            return await paymentModels.findOne(
                {bookingId:bookingId}
            )
        } catch (err) {
            throw new applicationError("Wrong with db",500)
        }

    }
}
