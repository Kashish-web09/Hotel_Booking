import mongoose from "mongoose";

export const travelSchema = new mongoose.Schema({
    category: {
        type: String,
        enum: [
            "Heritage cuisine trails",
            "Hill stations and mountains",
            "Cities and cafes"
        ],
        required: true,
        trim: true
    },

    country: {
        type: String,
        default: "India",
        trim: true
    },

    city: {
        type: String,
        required: true,
        trim: true
    },

    image: {
        type: String,
        required: true
    },

    isActive: {
        type: Boolean,
        default: true
    }

},
{
    timestamps:true,
    collection:'travel'
}
);