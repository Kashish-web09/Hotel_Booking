import mongoose from "mongoose";
import { hotelSchema } from "../../admin/hotel/hotelSchema.js";
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
}
