import mongoose from "mongoose";
import { travelSchema } from "./travelSchema.js";
import applicationError from '../../../errorFile/applicationLevelError.js'

const travelModel=new mongoose.model('travel',travelSchema);

export default class travelRepo{
    async getAll(){
        try {
            return await travelModel.find().sort({createdAt:-1});
        } catch (err) {
            throw new applicationError('Wrong with db',500)
        }
    }
    async addDestination(data){
        try {
            const newDestination=new travelModel(data);
            return newDestination.save();
        } catch (err) {
                        throw new applicationError('Wrong with db',500)

        }
    }
    async getById(id){
        try {
            return await travelModel.findById(id)
        } catch (err) {
                    throw new applicationError("Wrong with db", 500);

        }
    }
    async updateDestination(id,category,image,isActive){
        try {
            return await travelModel.findByIdAndUpdate(
                id,
                {
                    $set:{
                        category:category,
                        image:image,
                        isActive:isActive
                    }
                },
                {
                    returnDocumnet:"after"
                }
            )
        } catch (err) {
                                    throw new applicationError('Wrong with db',500)

        }
    }
    async deleteDestination(id){
        try {
            return await travelModel.findByIdAndDelete(
                id
            )
        } catch (err) {
                                                throw new applicationError('Wrong with db',500)

        }
    }
}