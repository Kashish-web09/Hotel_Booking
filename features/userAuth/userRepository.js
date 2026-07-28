import mongoose from "mongoose";
import { userSchema } from "./userSchema.js";
import applicationError from "../../errorFile/applicationLevelError.js";

const userModels=new mongoose.model('auth',userSchema);

export default class userRepo{

    async register(userInfo){
        try {
            const newUser=new userModels(userInfo);
            await newUser.save();
            return newUser;
        } catch (err) {
            console.log(err)
            throw new applicationError("Wrong with db",500)
        }
    }
async findUserById(userId){
    try {
        return await userModels.findById(userId);
    } catch (err) {
                    console.log(err)
            throw new applicationError("Wrong with db",500)

    }
}
async findUserByEmail(email){
    try {
        return await userModels.findOne({email:email})
    } catch (err) {
                    console.log(err)
            throw new applicationError("Wrong with db",500)

    }
}
}