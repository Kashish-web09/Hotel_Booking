import mongoose from "mongoose";

export const roomSchema = new mongoose.Schema(
    {
        hotelId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hotel",
            required: true,
        },

        roomNumber: {
            type: String,
            required: true,
            trim: true,
        },

        roomType: {
            type: String,
            enum: [
                "Single",
                "Double",
                "Twin",
                "Deluxe",
                "Suite",
                "Family",
                "Executive",
            ],
            required: true,
        },

        floor: {
            type: Number,
            required: true,
        },

        maxGuests: {
            type: Number,
            required: true,
            min: 1,
        },

        bedType: {
            type: String,
            enum: [
                "Single",
                "Double",
                "Queen",
                "King",
                "Twin",
            ],
            required: true,
        },

        bedCount: {
            type: Number,
            default: 1,
            min: 1,
        },

        pricePerNight: {
            type: Number,
            required: true,
            min: 0,
        },

        size: {
            type: Number,
            min: 0,
        },

        amenities: [
            {
                type: String,
                trim: true,
            },
        ],

        images: [
            {
                type: String,
            },
        ],

        // Physical/current room condition
        status: {
            type: String,
            enum: [
                "Available",
                "Maintenance",
                "Cleaning",
            ],
            default: "Available",
        },

        description: {
            type: String,
            trim: true,
        },

        isSmokingAllowed: {
            type: Boolean,
            default: false,
        },

        hasBalcony: {
            type: Boolean,
            default: false,
        },

        hasAC: {
            type: Boolean,
            default: true,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
        },
    },
    {
        timestamps: true,
    }
);


roomSchema.index(
    {
        hotelId: 1,
        roomNumber: 1,
    },
    {
        unique: true,
    }
);