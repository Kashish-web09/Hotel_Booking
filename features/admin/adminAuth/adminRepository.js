import mongoose from "mongoose";
import applicationError from "../../../errorFile/applicationLevelError.js";
import adminSchema from './adminSchema.js'
const adminUserModel=mongoose.model('adminUser',adminSchema);

export default class adminUserRepo{
    async register(user){
        try {
            const newAdmin=new adminUserModel(user);
            await newAdmin.save();
            return newAdmin;
        } catch (err) {
            throw new applicationError("Wrong with db",500)
        }
    }
    async findUserByEmail(email){
                try {
            return await adminUserModel.findOne({email});
        } catch (err) {
            throw new applicationError("Wrong with db",500)
        }

    }
    async findUserById(id){
            try {
            return await adminUserModel.findById(
                id
            )
        } catch (err) {
            throw new applicationError("Wrong with db",500)
        }

    }
    async forgotPass(email){
        try {
            return await adminUserModel.findOne(
                {email}
            )
        } catch (err) {
            throw new applicationError("Wrong with db",500)
        }

    }
    async resetPass(token,passwrod){
                try {
            return await adminUserModel.updateOne(
                {
                    resetToken:token,
                    resetTokenExpiry:{$gt:Date.now()}
                },
                {
                    $set:{
                        password:passwrod,
                        resetToken:null,
                        resetTokenExpiry:null
                    }
                }
            )
        } catch (err) {
            throw new applicationError("Wrong with db",500)
        }

    }

    async saveResetPass(email,token,expiry){
                try {
            return await adminUserModel.updateOne(
                {email},
                {
                    resetToken:token,
                    resetTokenExpiry:expiry
                }
            )
        } catch (err) {
            throw new applicationError("Wrong with db",500)
        }

    }
}