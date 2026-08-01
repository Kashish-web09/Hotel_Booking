import mongoose from "mongoose";
import { userSchema } from "./userSchema.js";
import applicationError from "../../../errorFile/applicationLevelError.js";

const userModels=new mongoose.model('auth',userSchema);

export default class userRepo{

    async register(userInfo){
        try {
            const newUser=new userModels(userInfo);
            await newUser.save();
            return newUser;
        } catch (err) {
            throw new applicationError("Wrong with db",500)
        }
    }
async findUserById(userId){
    try {
        return await userModels.findById(userId);
    } catch (err) {
            throw new applicationError("Wrong with db",500)

    }
}
async findUserByEmail(email){
    try {
        return await userModels.findOne({email:email})
    } catch (err) {
            throw new applicationError("Wrong with db",500)

    }
}
async getAll(){
    try {
        return await userModels.find().sort({createdAt:-1});
    } catch (err) {
                throw new applicationError("Wrong with db", 500);

    }
}
async forgotPass(email){
    try {
        return await userModels.findOne({email});
    } catch (err) {
                    throw new applicationError("Wrong with db",500)

    }
}
async resetPass(token,password){
    try {
        return await userModels.updateOne(
            {
                resetToken:token,
                resetTokenExpiry:{$gt:Date.now()}
            },
            {
                $set:{
                    password,
                    resetToken:null,
                    resetTokenExpiry:null
                }
            }
        )
    } catch (err) {
                            throw new applicationError("Wrong with db",500)

    }
}
async saveResetToken(email,token,expiry){
    try {
        return await userModels.updateOne(
            {email},
            {
                $set:{
                    resetToken:token,
                    resetTokenExpiry:expiry
                }
            }
        )
    } catch (err) {
                            throw new applicationError("Wrong with db",500)

    }
}
}