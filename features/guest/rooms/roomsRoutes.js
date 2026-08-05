import express from 'express';
import roomController from './roomsController.js';
import { upload } from '../../../middleware/fileUploadMiddleware.js';

const roomRoute=express.Router();
const roomsController=new roomController();

roomRoute.get('/',(req,res,next)=>{
    roomsController.getAllRoom(req,res,next)
})

roomRoute.get('/search',(req,res,next)=>{
    roomsController.searchRoom(req,res,next)
})

roomRoute.get('/view_Room/:id',(req,res,next)=>{
    roomsController.roomDetailsPage(req,res,next)
})

export default roomRoute;