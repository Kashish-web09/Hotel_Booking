import mongoose from "mongoose";
import { hotelSchema } from "./hotelSchema.js";
import applicationError from '../../../errorFile/applicationLevelError.js'

const hotelModel=mongoose.models.hotel || mongoose.model('hotel',hotelSchema)


export default class hotelrepo{
    async createHotel(data){
        try {
            const hotel=new hotelModel(data);
            return await hotel.save();
        } catch (err) {
            throw new applicationError("Wrong with db",500)
        }
    }
    async findHotel(name,city){
                        try {
            return await hotelModel.findOne({
                name:name,
                city:city
            })
        } catch (err) {
            throw new applicationError("Wrong with db",500)
        }

    }
async updateHotelById(hotelId, data) {
    try {

        return await hotelModel.findByIdAndUpdate(
            hotelId,
            {
                $set: data
            },
            {
                new: true,
                runValidators: true
            }
        );

    } catch (err) {
        throw new applicationError("Wrong with db", 500);
    }
}
    async removeHotel(hotelId){
                try {
            return await hotelModel.findByIdAndDelete(
                {
                    _id:hotelId
                }
                
            )
        } catch (err) {
            throw new applicationError("Wrong with db",500)
        }

    }
    async updateStatus(hotelId,status){
                try {
            
        } catch (err) {
            throw new applicationError("Wrong with db",500)
        }

    }
    async getAllHotel(){
        try {
            return await hotelModel.find().sort({createdAt:-1});
        } catch (err) {
                        throw new applicationError("Wrong with db",500)

        }
    }
    async getOneHotel(hotelId){
                try {
            return await hotelModel.findById(hotelId);
        } catch (err) {
            throw new applicationError("Wrong with db",500)
        }

    }
async filterhotel(hotelId,city){
    try {
        
    } catch (err) {
                    throw new applicationError("Wrong with db",500)

    }
}
}