import express from 'express';
import hotelController from './hotelController.js';
import { upload } from '../../../middleware/fileUploadMiddleware.js';
import validator from '../../../middleware/commonValidation.js';
import { hotelrules } from './hotelValidation.js';

const hotelRoutes=express.Router();
const hotelsController=new hotelController();

hotelRoutes.get('/',(req,res,next)=>{
    hotelsController.getAllHotels(req,res,next)
})
hotelRoutes.get('/add',upload.single('hotelImage'),(req,res,next)=>{
    hotelsController.addHotelPage(req,res,next)
})
hotelRoutes.post('/add',upload.single('hotelImage'),validator(hotelrules),(req,res,next)=>{
    hotelsController.addHotel(req,res,next)
})
hotelRoutes.get('/update/:id',(req,res,next)=>{
    hotelsController.updateHotelPage(req,res,next)
})
hotelRoutes.post('/update/:id',upload.single('hotelImage'),validator(hotelrules),(req,res,next)=>{
    hotelsController.updateHotel(req,res,next)
})

hotelRoutes.post('/:id',(req,res,next)=>{
    hotelsController.removeHotel(req,res,next)
})
export default hotelRoutes;