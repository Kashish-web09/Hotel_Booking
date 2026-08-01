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
    async searchRoom(checkIn,checkOut,roomType,guests){
    try {
let filter={};
if(checkIn){
    filter.checkIn={
        $regex:checkIn,
        $options:'i'
    }
}
if(checkOut){
    filter.checkOut=checkOut
}
if(roomType){
    filter.roomType=roomType
}
if(guests){
    filter.guests=guests
}
return await roomModels.find(filter).sort({createAt:-1})
        // search using checkin,checkout date, room types
    } catch (err) {
        throw new applicationError("Wrong with db",500)
    }
}
    async getRoomById(id){
    try {
        // show room details
return await roomModels.findById(id);
    } catch (err) {
        throw new applicationError("Wrong with db",500)
    }
}
    async checkRoomAvailability(roomId,checkIn,checkOut){
    try {
        //  chek room is available or not
    } catch (err) {
        throw new applicationError("Wrong with db",500)
    }
}

}