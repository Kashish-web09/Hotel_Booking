import mongoose from "mongoose";
import { roomSchema } from "./roomsSchema.js";
import applicationError from '../../../errorFile/applicationLevelError.js'
const roomModels=mongoose.models.rooms || mongoose.model('rooms',roomSchema);

export default class roomRepo{
    async addRoom(roomData){
        try {
            const newRoom=new roomModels(roomData);
            await newRoom.save();
            return newRoom;
        } catch (err) {
            console.log(err)
            throw new applicationError("Wrong with db",500)
        }
    }
    async getAllRooms(){
                try {
            return await roomModels.find().sort({createdAt:-1});
        } catch (err) {
            throw new applicationError("Wrong with db",500)
        }

    }
    async getRoomById(id){
                        try {
            return await roomModels.findById(id);
        } catch (err) {
            throw new applicationError("Wrong with db",500)
        }

    }
    async updadeRoom(id,data){
                try {
            return await roomModels.findByIdAndUpdate(
                id,
                {
                    $set:data
                },
                {
                    new:true,
                    runValidators:true
                }
            )
        } catch (err) {
            throw new applicationError("Wrong with db",500)
        }

    }
    async filterRoom(hotelId,roomType,roomNumber){
                        try {
            let filter={};
              if (hotelId) {
            filter.hotelId = hotelId;
        }

            if(roomType){
                filter.roomType=roomType
            }
            if(roomNumber){
                filter.roomNumber=roomNumber
            }
            return await roomModels.find(filter);
        } catch (err) {
            throw new applicationError("Wrong with db",500)
        }

    }
    async deleteRoom(id){
                        try {
            return await roomModels.findByIdAndDelete(id)
        } catch (err) {
            throw new applicationError("Wrong with db",500)
        }

    }
async getRoomByHotle(hotelId){
                try {
            return await roomModels.find({hotelId})
        } catch (err) {
            throw new applicationError("Wrong with db",500)
        }

}
async roomNumberExists(roomNumber){
                    try {
            return await roomModels.exists({roomNumber})
        } catch (err) {
            throw new applicationError("Wrong with db",500)
        }

}
async updateRoomStatus(id,status){
try {
    return await roomModels.findByIdAndUpdate(
        id,
        {
            $set:{
                status
            }
        },
        {
            new:true,
            runValidators:true
        }
    )
} catch (err) {
                throw new applicationError("Wrong with db",500)

}
}
}