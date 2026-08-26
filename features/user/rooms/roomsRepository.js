import mongoose from "mongoose";
import { roomSchema } from "./roomsSchema.js";
import applicationError from "../../../errorFile/applicationLevelError.js";

const roomModels =
    mongoose.models.rooms ||
    mongoose.model("rooms", roomSchema);

export default class roomRepo {

    // Get all rooms
    async getAll() {
        try {
            return await roomModels
                .find({})
                .sort({ createdAt: -1 });

        } catch (err) {
            throw new applicationError("Wrong with db", 500);
        }
    }


    // Get rooms belonging to one hotel
    async getRoomsByHotelId(hotelId) {
        try {
            return await roomModels
                .find({ hotelId })
                .sort({ createdAt: -1 });

        } catch (err) {
            throw new applicationError("Wrong with db", 500);
        }
    }


    // Add room
    async addRoom(roomData) {
        try {
            const newRoom = new roomModels(roomData);

            await newRoom.save();

            return newRoom;

        } catch (err) {
            throw new applicationError("Wrong with db", 500);
        }
    }


    // Filter / search rooms
    async filterRooms({
        hotelId,
        status,
        roomType,
        roomNumber,
        guests,
        onlyAvailable = false
    }) {
        try {

            const filter = {};

            if (hotelId) {
                filter.hotelId = hotelId;
            }

            if (status) {
                filter.status = {
                    $regex: status,
                    $options: "i"
                };
            }

            if (roomType) {
                filter.roomType = roomType;
            }

            if (roomNumber) {
                filter.roomNumber = roomNumber;
            }

            if (guests) {
                filter.maxGuests = {
                    $gte: Number(guests)
                };
            }

            if (onlyAvailable) {
                filter.status = "Available";
            }

            return await roomModels
                .find(filter)
                .sort({ createdAt: -1 });

        } catch (err) {
            throw new applicationError("Wrong with db", 500);
        }
    }


    // Get one room
    async getRoomById(id) {
        try {
            return await roomModels.findById(id);

        } catch (err) {
            throw new applicationError("Wrong with db", 500);
        }
    }


    // Update room
    async updateRoom(id, data) {
        try {
            return await roomModels.findByIdAndUpdate(
                id,
                {
                    $set: data
                },
                {
                    returnDocument: "after",
                    runValidators: true
                }
            );

        } catch (err) {
            throw new applicationError("Wrong with db", 500);
        }
    }


    // Delete one room
    async deleteRoom(id) {
        try {
            return await roomModels.findByIdAndDelete(id);

        } catch (err) {
            throw new applicationError("Wrong with db", 500);
        }
    }


    // Delete all rooms belonging to a hotel
    async deleteRoomsByHotelId(hotelId) {
        try {
            return await roomModels.deleteMany({
                hotelId
            });

        } catch (err) {
            throw new applicationError("Wrong with db", 500);
        }
    }
}