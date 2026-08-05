import express from 'express';
import bookingController from './bookingController.js';

const bookingRoute=express.Router();
const bookingsController=new bookingController();

bookingRoute.get('/',(req,res,next)=>{
    bookingsController.getAllBookings(req,res,next)
})
bookingRoute.get('/:id',(req,res,next)=>{
    bookingsController.getBookingById(req,res,next)
})
bookingRoute.post('/:id/status',(req,res,next)=>{
    bookingsController.updateBooking(req,res,next)
})

export default bookingRoute;