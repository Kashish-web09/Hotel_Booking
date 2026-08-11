import mongoose from "mongoose";
import { bookingSchema } from "./bookingSchema.js";
import applicationError from '../../../errorFile/applicationLevelError.js'

const bookingModels=mongoose.models.booking || mongoose.model('booking',bookingSchema);

export default class bookingRepo{

    async getMyBookings(){
        try {
            return await bookingModels.find().sort({createdAt:1})
        } catch (err) {
                        throw new applicationError("Wrong with db",500)

        }
    }
    async createBooking(booking){
        try {
            const newBooking=new bookingModels(booking);
            await newBooking.save();
            return newBooking
        } catch (err) {
            throw new applicationError("Wrong with db",500)
        }
    }
async getBookingById(id){
    try {
        return await bookingModels.findById(id)
            .populate({
                path: "roomId",
                populate: {
                    path: "hotelId"
                }
            });
    } catch (err) {
        throw new applicationError("Wrong with db",500)
    }
}
async getUserBooking(id){
    try {
        const booking= await bookingModels.find({
            userId: id
        })
        .populate({
            path: "roomId",
            populate: {
                path: "hotelId"
            }
        })
        .sort({ createdAt: -1 });
return booking
    } catch (err) {
        throw new applicationError("Wrong with db", 500)
    }
}
    async cancelBooking(id){
        try {
            return await bookingModels.findByIdAndUpdate(
                id,
                {
                    $set:{
                        status:"Cancelled"
                    }
                },
                {
                    returnDocument:"after"
                }
            )
        } catch (err) {
            throw new applicationError("Wrong with db",500)
        }
    }
async checkRoomAvailability(roomId, checkIn, checkOut) {
    try {

        const existingBooking = await bookingModels.findOne({
            roomId,
            status: {
                $in: ["Pending", "Confirmed"]
            },
            checkIn: {
                $lt: new Date(checkOut)
            },
            checkOut: {
                $gt: new Date(checkIn)
            }
        });


        return !existingBooking;

    } catch (err) {
        throw new applicationError("Wrong with db", 500);
    }
}
}