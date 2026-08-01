import mongoose from "mongoose";
import { feedbackSchema } from "../../guest/contact/contactSchema.js";
import applicationError from "../../../errorFile/applicationLevelError.js";

const feedbackModels=mongoose.models.feedback || mongoose.model('feedback',feedbackSchema);


export default class feedbackRepo{

    async getAllFeedback(){
try {
    return await feedbackModels.find().sort({createdAt:-1});
    
} catch (err) {
    throw new applicationError("Wrong with db",500)
}
    }

    async updateStatus(feedbackId,status){
        try {
    return await feedbackModels.findOneAndUpdate(
        {_id:feedbackId},
        {
            $set:{
                status:status
            }
        },
        {
            new:true
        }
    )
} catch (err) {
    throw new applicationError("Wrong with db",500)
}

    }
    async getFeedbackByID(id){
        try {
    return await feedbackModels.findById(id)
} catch (err) {
    throw new applicationError("Wrong with db",500)
}

    }

    async filterFeedback(email,status,messageType){
        try {
    let filter={};
    if(email){
        filter.email={
            $regex:email,
            $options:'i'
        }
    }
    if(status){
        filter.status=status
    }
    if(messageType){
        filter.messageType=messageType
    }
    return await feedbackModels.find(filter).sort({createdAt:-1});
} catch (err) {
    throw new applicationError("Wrong with db",500)
}

    }
}