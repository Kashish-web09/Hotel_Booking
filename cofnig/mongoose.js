import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config()

const url=process.env.DB_URL;
export const connectToMongoose=async()=>{
    try {
        await mongoose.connect(url);
        console.log("MongoDb conneted with mongoose")
    } catch (err) {
        console.log(err)
    }
}