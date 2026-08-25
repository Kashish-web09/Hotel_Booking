import mongoose from "mongoose";
import { userSchema } from "../userAuth/userSchema.js";
import appliationError from "../../../errorFile/applicationLevelError.js";

const userModels =
    mongoose.models.auth ||
    mongoose.model("auth", userSchema);


export default class ProfileRepo {

    async getProfile(userId) {

        try {

            return await userModels
                .findById(userId)
                .select("-password");

        } catch (err) {

            throw new appliationError(
                "Wrong with db",
                500
            );

        }
    }


    async updateProfile(userId, data) {

        try {

            const {
                name,
                email,
                phoneNo,
                image
            } = data;


            const updateData = {
                name,
                email,
                phoneNo
            };


            // Only update image if a new image was uploaded
            if (image) {
                updateData.image = image;
            }


            return await userModels.findByIdAndUpdate(
                userId,
                updateData,
                {
                    runValidators: true,
                    returnDocument:"after"
                }
            );

        } catch (err) {

            throw new appliationError(
                "Wrong with db",
                500
            );

        }
    }
}