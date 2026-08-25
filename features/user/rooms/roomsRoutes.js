import express from 'express';
import roomController from './roomsController.js';
import { upload } from '../../../middleware/fileUploadMiddleware.js';
import { authorize } from '../../../middleware/adminMiddleware.js';
import validator from '../../../middleware/commonValidation.js';
import { roomrules,updateRoomrules } from './roomsValidation.js';
const roomRoute=express.Router();
const roomsController=new roomController();

roomRoute.get('/',authorize("Guest","Admin"),(req,res,next)=>{
    roomsController.getAllRoom(req,res,next)
})

roomRoute.get('/add',authorize("Admin"),(req,res,next)=>{
    roomsController.addRoomPage(req,res,next)
})
roomRoute.post('/add',authorize("Admin"),upload.single('image'),validator(roomrules),(req,res,next)=>{
    roomsController.addRoom(req,res,next)
})
roomRoute.post('/delete/:id',authorize("Admin"),(req,res,next)=>{
    roomsController.deleteRoom(req,res,next)
})
roomRoute.get('/edit/:id',authorize("Admin"),(req,res,next)=>{
    roomsController.editPage(req,res,next)
})

roomRoute.post('/edit/:id',authorize("Admin"),upload.single('image'),validator(updateRoomrules),(req,res,next)=>{
    roomsController.edit(req,res,next)
})
roomRoute.get('/filter',authorize("Admin"),(req,res,next)=>{
    roomsController.filterRooms(req,res,next)
})



roomRoute.get('/view_Room/:id',authorize("Guest"),(req,res,next)=>{
    roomsController.roomDetailsPage(req,res,next)
})
roomRoute.get('/hotel',(req,res,next)=>{
    roomsController.getRoomByHotelId(req,res,next)
})
export default roomRoute;