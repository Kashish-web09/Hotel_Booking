import express from 'express';
import bookingController from './bookingController.js';

const bookingRoutes = express.Router();
const bookingsController = new bookingController();


// My bookings
bookingRoutes.get('/', (req, res, next) => {
    bookingsController.getMyBookings(req, res, next);
});


// Create booking
bookingRoutes.post('/create', (req, res, next) => {
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