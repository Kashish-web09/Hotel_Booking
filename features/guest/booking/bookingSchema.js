import mongoose from "mongoose";

export const bookingSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true
        },
        adminId:{type:mongoose.Schema.Types.ObjectId,
            ref:"Admin",required:true
        },

        roomId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "rooms",
            required: true
        },

        checkIn: {
            type: Date,
            required: true
        },

        checkOut: {
            type: Date,
            required: true
        },

        guests: {
            type: Number,
            required: true,
            min: 1
        },

        pricePerNight: {
            type: Number,
            required: true,
            min: 0
        },

        totalAmount: {
            type: Number,
            required: true,
            min: 0
        },

        status: {
            type: String,
            enum: [
                "Pending",
                "Confirmed",
                "Cancelled",
                "Completed"
            ],
            default: "Pending"
        }
    },
    {
        collection:'booking',
        timestamps: true
    }
);