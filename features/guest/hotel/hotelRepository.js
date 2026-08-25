import mongoose from "mongoose";
import { hotelSchema } from "./hotelSchema.js";
import applicationError from '../../../errorFile/applicationLevelError.js'
const hotelModel=mongoose.models.hotel || mongoose.model('hotel',hotelSchema);

export default class hotelRepo{
    async getAllHotels(){
        try {
            return await hotelModel.find().sort({createdAt:-1})
        } catch (err) {

            throw new applicationError('Wrong with db',500)
        }
    }
    // For Admin — get only hotels created by this user
async getHotelsByUser(userId) {
    try {
        return await hotelModel
            .find({ createdBy: userId })
            .sort({ createdAt: -1 });
    } catch (err) {
        throw new applicationError("Wrong with db", 500);
    }
}

async filterHotel(city,name){
    try {
        const filter={};
        if(city){
            filter.city=city
        }
        if(name){
            filter.name=name
        };
        return await hotelModel.find(filter);
    } catch (err) {
                    throw new applicationError('Wrong with db',500)

    }
}
async getHotelDetailsById(hotelId){
    try {
        return await hotelModel.findById(hotelId)
    } catch (err) {
                            throw new applicationError('Wrong with db',500)

    }
}
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
    async getHotelById(hotelId){
        try {
            return await hotelModel.findById(hotelId)
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
                returnDocument:'after',
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

}
