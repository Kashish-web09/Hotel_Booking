import express from 'express';
import bookingController from './bookingController.js';
import { bookingrule } from './bookingValidation.js';
import validator from '../../../middleware/commonValidation.js'
const bookingRoutes = express.Router();
const bookingsController = new bookingController();


// My bookings
bookingRoutes.get('/', (req, res, next) => {
    bookingsController.getMyBookings(req, res, next);
});


// Create booking
bookingRoutes.post('/create',validator(bookingrule), (req, res, next) => {
    bookingsController.createBooking(req, res, next);
});


// Booking details
bookingRoutes.get('/details/:id', (req, res, next) => {
    bookingsController.bookingDetails(req, res, next);
});


bookingRoutes.post('/:id',(req,res,next)=>{
    bookingsController.cancelBooking(req,res,next)
})

export default bookingRoutes;