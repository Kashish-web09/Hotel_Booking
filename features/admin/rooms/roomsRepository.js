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
            throw new applicationError("Wrong with db",500)
        }
    }
    async getAllRooms(hotelId){
                try {
            return await roomModels.find({
                hotelId:{
                    $in:hotelId
                }
            }).sort({createdAt:-1});
        } catch (err) {
            console.log(err)
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
                    returnDocument:"after",
                    runValidators:true
                }
            )
        } catch (err) {
            throw new applicationError("Wrong with db",500)
        }

    }
    async filterRoom(hotelId,status,roomType,roomNumber){
                        try {
            let filter={};
              if (hotelId) {
            filter.hotelId = hotelId;
        }
            if(status){
                filter.status={
                    $regex:status,
                    $options:"i"
                }
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

    async deleteRoomsByHotelId(hotelId){
try {
    return await roomModels.deleteMany({hotelId});
} catch (err) {
            throw new applicationError("Wrong with db", 500);

}
    }
    // async gethotelById(id){
    //     try {
            
    //     } catch (err) {
    //                     throw new applicationError("Wrong with db",500)

    //     }
    // }

    // async roomNumberExists(hoteId,roomNumber){
    //     try {
            
    //     } catch (err) {
    //                     throw new applicationError("Wrong with db",500)

    //     }
    // }
}

// Find documents where this field matches any value in this list -> $in