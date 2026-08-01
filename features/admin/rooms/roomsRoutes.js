import express from 'express';
import roomController from './roomsController.js';
import { upload } from '../../../middleware/fileUploadMiddleware.js';

const roomRoutes=express.Router();
const roomsController=new roomController();

roomRoutes.get('/',(req,res,next)=>{
    roomsController.getAllRooms(req,res,next)
})
roomRoutes.get('/add',(req,res,next)=>{
    roomsController.addRoomPage(req,res,next)
})
roomRoutes.post('/add',upload.single('image'),(req,res,next)=>{
    roomsController.addRoom(req,res,next)
})
roomRoutes.post('/delete/:id',(req,res,next)=>{
    roomsController.deleteRoom(req,res,next)
})
export default roomRoutes;