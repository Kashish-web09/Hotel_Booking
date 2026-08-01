import mongoose from "mongoose";

export const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },

    phoneNo: {
      type: String,
      required: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    },

    image: {
      type: String,
      default: null
    },

    role: {
      type: String,
      enum: ["Guest", "Hotel Partner"],
      default: "Guest",
      required: true
    },

    resetToken: {
      type: String,
      default: null
    },

    resetTokenExpiry: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);