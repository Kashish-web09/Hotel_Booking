import mongoose from "mongoose";
import { roomSchema } from "../../admin/rooms/roomsSchema.js";

const roomModels=mongoose.models.rooms || mongoose.model('rooms',roomSchema)