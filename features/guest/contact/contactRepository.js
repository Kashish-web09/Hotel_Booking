import mongoose from "mongoose";
import applicationError from "../../../errorFile/applicationLevelError.js";
import { feedbackSchema } from "./contactSchema.js";

const feedbackModel=mongoose.models.feedback || mongoose.model('feedback',feedbackSchema);

export default class feedbackRepo{
    async createFeedback(data){
try {
    const newFeedback=new feedbackModel(data);
   await newFeedback.save();
   return newFeedback;
    
} catch (err) {
    console.log(err)
    throw new applicationError("Wrong with db",500)
}
    }
}