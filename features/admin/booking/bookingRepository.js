import mongoose from "mongoose";
import { bookingSchema } from "../../guest/booking/bookingSchema.js";
import applicationError from '../../../errorFile/applicationLevelError.js'

const bookingModels=mongoose.models.booking || mongoose.model('booking',bookingSchema);

export default class bookingRepo{
    async getAllBookings(adminId){
try {
    return await bookingModels.find({adminId}).sort({createdAt:-1});
} catch (err) {
    throw new applicationError("Wrong with db",500)
}
    }
    async getBookingById(id){
try {
    return await bookingModels.findById(id);
} catch (err) {
    throw new applicationError("Wrong with db",500)
}

    }
    async updateBookingStatus(id,status){
try {
    return await bookingModels.findByIdAndUpdate(
id,
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

}