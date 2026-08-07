import mongoose from "mongoose";
import { roomSchema } from "../../admin/rooms/roomsSchema.js";
import applicationError from "../../../errorFile/applicationLevelError.js";
const roomModels=mongoose.models.rooms || mongoose.model('rooms',roomSchema)


export default class roomRepo{
    async getAll(){
    try {
        return await roomModels.find(
            {
                status:{
                    $ne:"Maintenance" //not equal to 
                }
            }
        ).sort({createdAt:-1});
    } catch (err) {
        throw new applicationError("Wrong with db",500)
    }
}
async searchRoom(guests, roomType) {
    try {
        const filter = {
            status: { $ne: "Maintenance" }
        };

        if (guests) {
            filter.maxGuests = {
                $gte: Number(guests)
            };
        }

        if (roomType) {
            filter.roomType = roomType;
        }


        const rooms = await roomModels
            .find(filter)
            .sort({ createdAt: -1 });


        return rooms;

    } catch (err) {
        throw new applicationError("Wrong with db", 500);
    }
} 
   async getRoomById(id){
    try {
return await roomModels.findById(id);
    } catch (err) {
        throw new applicationError("Wrong with db",500)
    }
}
async getRoomsByHotelId(hotelId){
        try {
return await roomModels.find({
    hotelId,
    status:{
        $ne:"Maintenance"
    }
}).sort({createdAt:-1});
    } catch (err) {
        throw new applicationError("Wrong with db",500)
    }

}

}