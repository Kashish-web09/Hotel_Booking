import express from 'express';
import hotelController from './hotelController.js';

const hotelRoute=express.Router();
const hotelsController=new hotelController();

hotelRoute.get('/',(req,res,next)=>{
    hotelsController.getAllHotels(req,res,next)
})

hotelRoute.get('/search',(req,res,next)=>{
    hotelsController.filterHotel(req,res,next)
})
hotelRoute.get('/:id',(req,res,next)=>{
    hotelsController.hotelDetailsPage(req,res,next)
})
export default hotelRoute
