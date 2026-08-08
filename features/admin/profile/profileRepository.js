import mongoose from "mongoose";
import adminSchema from "../adminAuth/adminSchema.js";
import applicationError from '../../../errorFile/applicationLevelError.js'


const adminUserModel=mongoose.models.adminUser || mongoose.model('adminUser',adminSchema);

export default class profileRepo{
    async getProfile(adminId){
try {
    return await adminUserModel.findById(
        adminId
    ).select("-passwrod")
} catch (err) {
    throw new applicationError("Wrong with db",500)
}
    }
    async updateProfile(adminId,data){
        try {
    const {name,email,image}=data;
    const updatedData={
        name,email
    }
    if(image){
        updatedData.image=image
    }
    return await adminUserModel.findByIdAndUpdate(
adminId,
updatedData,
{
    runValidators:true,
    returnDocument:"after"
}
    )
} catch (err) {
    throw new applicationError("Wrong with db",500)
}

    }
}
