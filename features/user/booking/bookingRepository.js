import mongoose from "mongoose";
import { bookingSchema } from "./bookingSchema.js";
import applicationError from "../../../errorFile/applicationLevelError.js";

import { roomSchema } from "../rooms/roomsSchema.js";
import { hotelSchema } from "../hotel/hotelSchema.js";

// ===============================
// MODELS
// ===============================

const bookingModels =
    mongoose.models.booking ||
    mongoose.model("booking", bookingSchema);

const roomModels =
    mongoose.models.rooms ||
    mongoose.model("rooms", roomSchema);

const hotelModels =
    mongoose.models.hotel ||
    mongoose.model("hotel", hotelSchema);

export default class bookingRepo {
    // ==========================================
    // GUEST SIDE
    // ==========================================

    // Get user's bookings
    async getUserBooking(userId) {
        try {
            const bookings = await bookingModels
                .find({
                    userId: userId
                })
                .populate({
                    path: "roomId",
                    populate: {
                        path: "hotelId"
                    }
                })
                .sort({
                    createdAt: -1
                });

            return bookings;
        } catch (err) {
            throw new applicationError(
                "Wrong with db",
                500
            );
        }
    }

    // Create booking
    async createBooking(booking) {
        try {
            const newBooking =
                new bookingModels(booking);

            await newBooking.save();

            return newBooking;
        } catch (err) {
            throw new applicationError(
                "Wrong with db",
                500
            );
        }
    }

    // Get booking by ID
    async getBookingById(id) {
        try {
            return await bookingModels
                .findById(id)
                .populate({
                    path: "roomId",
                    populate: {
                        path: "hotelId"
                    }
                });
        } catch (err) {
            throw new applicationError(
                "Wrong with db",
                500
            );
        }
    }

    // Cancel booking
    async cancelBooking(id) {
        try {
            return await bookingModels.findByIdAndUpdate(
                id,
                {
                    $set: {
                        status: "Cancelled"
                    }
                },
                {
                    returnDocument: "after"
                }
            );
        } catch (err) {
            throw new applicationError(
                "Wrong with db",
                500
            );
        }
    }

    // Check room availability
    async checkRoomAvailability(
        roomId,
        checkIn,
        checkOut
    ) {
        try {
            const existingBooking =
                await bookingModels.findOne({
                    roomId,
                    status: {
                        $in: [
                            "Pending",
                            "Confirmed"
                        ]
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
            throw new applicationError(
                "Wrong with db",
                500
            );
        }
    }

    // ==========================================
    // ADMIN SIDE
    // ==========================================

    // Get all bookings for admin's hotels
    async getAllBookings(adminId) {
        try {
            // ----------------------------------
            // 1. Find hotels created by admin
            // ----------------------------------

            const hotels =
                await hotelModels.find({
                    createdBy: adminId
                }).select("_id");

            const hotelIds =
                hotels.map(hotel => hotel._id);

            // ----------------------------------
            // 2. Find rooms belonging to hotels
            // ----------------------------------

            const rooms =
                await roomModels.find({
                    hotelId: {
                        $in: hotelIds
                    }
                }).select("_id");

            const roomIds =
                rooms.map(room => room._id);

            // ----------------------------------
            // 3. Find bookings for those rooms
            // ----------------------------------

            return await bookingModels
                .find({
                    roomId: {
                        $in: roomIds
                    }
                })
                .populate({
                    path: "roomId",
                    populate: {
                        path: "hotelId"
                    }
                })
                .populate("userId")
                .sort({
                    createdAt: -1
                });
        } catch (err) {
            throw new applicationError(
                "Wrong with db",
                500
            );
        }
    }

    // Update booking status
    async updateBookingStatus(
        bookingId,
        status
    ) {
        try {
            return await bookingModels.findByIdAndUpdate(
                bookingId,
                {
                    $set: {
                        status: status
                    }
                },
                {
                    returnDocument: "after"
                }
            );
        } catch (err) {
            throw new applicationError(
                "Wrong with db",
                500
            );
        }
    }
}