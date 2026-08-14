import mongoose from "mongoose";

export const hotelSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        desc: {
            type: String,
            required: true,
            trim: true
        },

        address: {
            type: String,
            required: true,
            trim: true
        },

        city: {
            type: String,
            required: true,
            trim: true
        },

        state: {
            type: String,
            required: true,
            trim: true
        },

        country: {
            type: String,
            required: true,
            trim: true
        },

        pincode: {
            type: String,
            required: true,
            trim: true,
            match: [/^[0-9]{6}$/, "Please enter a valid 6-digit pincode"]
        },

        phone: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]
        },

        hotelImage: {
            type: String,
            required: true,
            trim: true
        },

        checkInTime: {
            type: String,
            required: true,
            trim: true
        },

        checkOutTime: {
            type: String,
            required: true,
            trim: true
        },

        status: {
            type: String,
            enum: ["Active", "Inactive"],
            default: "Active"
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
            required: true
        }
    },
    {
        collection:'hotel',
        timestamps: true
    }
);
