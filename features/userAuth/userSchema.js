import mongoose from "mongoose";
import { Schema } from "mongoose";

export const userSchema=mongoose.Schema({
name:{type:String,trim:true,required:true},
email:{type:String,trim:true,required:true,unique:true},
phoneNo:{type:Number,trim:true,required:true},
password:{type:String,required:true},
image:{type:String},
role:{type:String,enum:["Customer","admin"],default:"Customer",required:true}
})