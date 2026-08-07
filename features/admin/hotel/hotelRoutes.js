import express from 'express';
import hotelController from './hotelController.js';
import { upload } from '../../../middleware/fileUploadMiddleware.js';


const hotelRoutes=express.Router();
const hotelsController=new hotelController();

hotelRoutes.get('/',(req,res,next)=>{
    hotelsController.getAllHotels(req,res,next)
})
hotelRoutes.get('/add',upload.single('hotelImage'),(req,res,next)=>{
    hotelsController.addHotelPage(req,res,next)
})
hotelRoutes.post('/add',upload.single('hotelImage'),(req,res,next)=>{
    hotelsController.addHotel(req,res,next)
})
hotelRoutes.post('/:id',(req,res,next)=>{
    hotelsController.removeHotel(req,res,next)
})
export default hotelRoutes;