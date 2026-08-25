import express from 'express';

import bookingController from './bookingController.js';
import { bookingrule } from './bookingValidation.js';
import validator from '../../../middleware/commonValidation.js';
import { authorize } from '../../../middleware/adminMiddleware.js';

const bookingRoutes = express.Router();

const bookingsController = new bookingController();


// ==========================================
// GUEST + ADMIN
// GET ALL / MY BOOKINGS
// ==========================================

bookingRoutes.get(
    '/',
    authorize("Guest", "Admin"),
    (req, res, next) => {

        if (req.role === "Guest") {
            return bookingsController.getMyBookings(req, res, next);
        }

        if (req.role === "Admin") {
            return bookingsController.getAllBookings(req, res, next);
        }

        return res.status(403).send("Access denied");
    }
);


// ==========================================
// GUEST
// CREATE BOOKING
// ==========================================

bookingRoutes.post(
    '/create',
    authorize("Guest"),
    validator(bookingrule),
    (req, res, next) => {
        bookingsController.createBooking(req, res, next);
    }
);


// ==========================================
// GUEST
// BOOKING DETAILS
// ==========================================

bookingRoutes.get(
    '/details/:id',
    authorize("Guest"),
    (req, res, next) => {
        bookingsController.bookingDetails(req, res, next);
    }
);


// ==========================================
// GUEST
// CANCEL BOOKING
// ==========================================

bookingRoutes.post(
    '/:id/cancel',
    authorize("Guest"),
    (req, res, next) => {
        bookingsController.cancelBooking(req, res, next);
    }
);


// ==========================================
// ADMIN
// BOOKING DETAILS
// ==========================================

bookingRoutes.get(
    '/:id',
    authorize("Admin"),
    (req, res, next) => {
        bookingsController.getBookingById(req, res, next);
    }
);


// ==========================================
// ADMIN
// UPDATE BOOKING STATUS
// ==========================================

bookingRoutes.post(
    '/:id/status',
    authorize("Admin"),
    (req, res, next) => {
        bookingsController.updateBooking(req, res, next);
    }
);


export default bookingRoutes;