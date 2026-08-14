import mongoose from "mongoose";

export const feedbackSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            trim: true,
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        },
        adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true
},

        phoneNo: {
            type: String,
            trim: true,
            match: /^\d{10}$/
        },
messageType:{
type:String,required:true,enum:["Inquiry","Complaint","Feedback"]
},
        message: {
            type: String,
            required: true,
            minlength: 10,
            maxlength: 180,
            trim: true
        },
        status:{type:String,enum:["Pending","Resolved"], default:"Pending"},
          createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt:{
    type:Date,
    default:Date.now
  }

    },
    {
        collection: "feedback",
        timestamps: true
    }
);