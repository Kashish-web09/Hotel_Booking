import bookingRepo from "./bookingRepository.js";
import roomRepo from "../rooms/roomsRepository.js";
import logger from "../../../middleware/loggerMiddleware.js";
import userRepo from "../userAuth/userRepository.js";
import hotelRepo from "../hotel/hotelRepository.js";

import {
    bookingConfirmation,
    cancelBooking,
    bookingStatus
} from "../../../emailService/emailServices.js";

export default class bookingController {
    constructor() {
        this.bookingRepo = new bookingRepo();
        this.roomRepo = new roomRepo();
        this.hotelRepo = new hotelRepo();
        this.userRepo = new userRepo();
    }

    // =========================================================
    // GUEST
    // GET MY BOOKINGS
    // =========================================================

    async getMyBookings(req, res, next) {
        try {
            const userId = req.userId;

            const bookings =
                await this.bookingRepo.getUserBooking(userId);

            return res.render("myBooking", {
                title: "My Booking Page",
                bookings,
                errors: [],
                oldData: {}
            });
        } catch (err) {
            logger.error(err.message);
            next(err);
        }
    }

    // =========================================================
    // GUEST
    // CREATE BOOKING
    // =========================================================

    async createBooking(req, res, next) {
        try {
            const userId = req.userId;

            // -----------------------------------------
            // Validation errors
            // -----------------------------------------

            if (req.validationErrors) {
                const room =
                    await this.roomRepo.getRoomById(
                        req.body.roomId
                    );

                return res.render("guest/roomDetails", {
                    title: room
                        ? `${room.roomType} Room`
                        : "Room Details",
                    room,
                    errors: req.validationErrors,
                    oldData: req.body
                });
            }

            // -----------------------------------------
            // Get booking data
            // -----------------------------------------

            const {
                roomId,
                checkIn,
                checkOut,
                guests
            } = req.body;

            // -----------------------------------------
            // Find room
            // -----------------------------------------

            const room =
                await this.roomRepo.getRoomById(roomId);

            if (!room) {
                logger.warn(`Room not found ${roomId}`);

                return res.status(404).send(
                    "Room not found"
                );
            }

            // -----------------------------------------
            // Check number of guests
            // -----------------------------------------

            if (Number(guests) > room.maxGuests) {
                logger.warn(
                    `This room can accommodate maximum ${room.maxGuests} guests`
                );

                return res.status(400).send(
                    `This room can accommodate maximum ${room.maxGuests} guests`
                );
            }

            // -----------------------------------------
            // Convert dates
            // -----------------------------------------

            const startDate = new Date(checkIn);
            const endDate = new Date(checkOut);

            // -----------------------------------------
            // Validate dates
            // -----------------------------------------

            if (
                isNaN(startDate.getTime()) ||
                isNaN(endDate.getTime())
            ) {
                logger.warn(
                    "Invalid check-in or check-out date"
                );

                return res.status(400).send(
                    "Invalid check-in or check-out date"
                );
            }

            if (startDate >= endDate) {
                logger.warn(
                    "Check-out date must be after check-in date"
                );

                return res.status(400).send(
                    "Check-out date must be after check-in date"
                );
            }

            // -----------------------------------------
            // Check room availability
            // -----------------------------------------

            const isAvailable =
                await this.bookingRepo.checkRoomAvailability(
                    roomId,
                    startDate,
                    endDate
                );

            if (!isAvailable) {
                logger.warn(
                    `Room ${roomId} is not available from ${startDate}`
                );

                return res.status(400).send(
                    "Room is not available for the selected dates"
                );
            }

            // -----------------------------------------
            // Calculate nights
            // -----------------------------------------

            const millisecondsPerDay =
                1000 * 60 * 60 * 24;

            const nights =
                Math.ceil(
                    (endDate - startDate) /
                    millisecondsPerDay
                );

            // -----------------------------------------
            // Calculate price
            // -----------------------------------------

            const pricePerNight = room.pricePerNight;
            const totalAmount =
                nights * pricePerNight;

            // -----------------------------------------
            // Create booking
            // -----------------------------------------

            const newBooking =
                await this.bookingRepo.createBooking({
                    userId,
                    roomId,
                    checkIn: startDate,
                    checkOut: endDate,
                    guests: Number(guests),
                    pricePerNight,
                    totalAmount
                });

            // -----------------------------------------
            // Get user
            // -----------------------------------------

            const user =
                await this.userRepo.findUserById(
                    userId
                );

            if (!user) {
                logger.warn(
                    `User not found ${userId}`
                );

                return res.status(404).send(
                    "User not found"
                );
            }

            // -----------------------------------------
            // Get hotel
            // -----------------------------------------

            const hotelId = room.hotelId;

            const hotel =
                await this.hotelRepo.getHotelDetailsById(
                    hotelId
                );

            // -----------------------------------------
            // Booking confirmation email
            // -----------------------------------------

            try {
                await bookingConfirmation(
                    user.email,
                    user.name,
                    hotel,
                    newBooking._id
                );
            } catch (emailError) {
                logger.error(
                    `Booking confirmation email failed: ${emailError.message}`
                );
            }

            // -----------------------------------------
            // Redirect
            // -----------------------------------------

            return res.redirect(
                `/api/guest/booking/details/${newBooking._id}`
            );
        } catch (err) {
            logger.error(err.message);
            next(err);
        }
    }

    // =========================================================
    // GUEST
    // BOOKING DETAILS
    // =========================================================

    async bookingDetails(req, res, next) {
        try {
            const { id } = req.params;
            const userId = req.userId;

            const booking =
                await this.bookingRepo.getBookingById(id);

            // -----------------------------------------
            // Booking not found
            // -----------------------------------------

            if (!booking) {
                logger.warn(
                    `Booking not found: ${id}`
                );

                return res.status(404).send(
                    "Booking not found"
                );
            }

            // -----------------------------------------
            // Ownership check
            // -----------------------------------------

            if (
                booking.userId.toString() !==
                userId.toString()
            ) {
                logger.warn(
                    `User ${userId} attempted to access booking ${id}`
                );

                return res.status(403).send(
                    "You are not authorized to view this booking"
                );
            }

            return res.render(
                "bookingDetails",
                {
                    title: "Booking Details",
                    booking,
                    errors: [],
                    oldData: {}
                }
            );
        } catch (err) {
            logger.error(err.message);
            next(err);
        }
    }

    // =========================================================
    // GUEST
    // CANCEL BOOKING
    // =========================================================

    async cancelBooking(req, res, next) {
        try {
            const { id } = req.params;
            const userId = req.userId;

            // -----------------------------------------
            // Find booking
            // -----------------------------------------

            const existingBooking =
                await this.bookingRepo.getBookingById(id);

            if (!existingBooking) {
                logger.warn(
                    `Booking not found: ${id}`
                );

                return res.status(404).send(
                    "Booking not found"
                );
            }

            // -----------------------------------------
            // Ownership check
            // -----------------------------------------

            if (
                existingBooking.userId.toString() !==
                userId.toString()
            ) {
                return res.status(403).send(
                    "You are not authorized to cancel this booking"
                );
            }

            // -----------------------------------------
            // Already cancelled
            // -----------------------------------------

            if (
                existingBooking.status ===
                "Cancelled"
            ) {
                return res.status(400).send(
                    "Booking is already cancelled"
                );
            }

            // -----------------------------------------
            // Cancel booking
            // -----------------------------------------

            const booking =
                await this.bookingRepo.cancelBooking(id);

            if (!booking) {
                logger.warn(
                    `Unable to cancel booking: ${id}`
                );

                return res.status(400).send(
                    "Unable to cancel booking"
                );
            }

            // -----------------------------------------
            // Find user
            // -----------------------------------------

            const user =
                await this.userRepo.findUserById(
                    userId
                );

            if (!user) {
                return res.status(404).send(
                    "User not found"
                );
            }

            // -----------------------------------------
            // Cancellation email
            // -----------------------------------------

            try {
                await cancelBooking(
                    user.email,
                    id,
                    booking.totalAmount
                );
            } catch (emailError) {
                logger.error(
                    `Cancellation email failed: ${emailError.message}`
                );
            }

            // -----------------------------------------
            // Redirect
            // -----------------------------------------

            return res.redirect("/api/booking");
        } catch (err) {
            logger.error(err.message);
            next(err);
        }
    }

    // =========================================================
    // ADMIN
    // GET ALL BOOKINGS
    // =========================================================

    async getAllBookings(req, res, next) {
        try {
            const adminId = req.userId;

            const bookings =
                await this.bookingRepo.getAllBookings(
                    adminId
                );

            return res.render(
                "allBookings",
                {
                    title: "Admin Bookings Page",
                    booking: bookings,
                    errors: [],
                    oldData: {}
                }
            );
        } catch (err) {
            logger.error(err.message);
            next(err);
        }
    }

    // =========================================================
    // ADMIN
    // GET BOOKING BY ID
    // =========================================================

    async getBookingById(req, res, next) {
        try {
            const { id } = req.params;

            const booking =
                await this.bookingRepo.getBookingById(id);

            if (!booking) {
                logger.warn(
                    `No booking found for ${id}`
                );

                return res.redirect("/api/booking");
            }

            return res.render(
                "guestBooking",
                {
                    title: "Admin Booking Page",
                    booking,
                    errors: [],
                    oldData: {}
                }
            );
        } catch (err) {
            logger.error(err.message);
            next(err);
        }
    }

    // =========================================================
    // ADMIN
    // UPDATE BOOKING STATUS
    // =========================================================

    async updateBooking(req, res, next) {
        try {
            const { id } = req.params;
            const { status } = req.body;

            // -----------------------------------------
            // Validate status
            // -----------------------------------------

            const allowedStatuses = [
                "Pending",
                "Confirmed",
                "Cancelled",
                "Completed"
            ];

            if (!allowedStatuses.includes(status)) {
                return res.status(400).send(
                    "Invalid booking status"
                );
            }

            // -----------------------------------------
            // Update booking
            // -----------------------------------------

            const booking =
                await this.bookingRepo.updateBookingStatus(
                    id,
                    status
                );

            if (!booking) {
                logger.warn(
                    `No booking found for ${id}`
                );

                return res.redirect("/api/booking");
            }

            // -----------------------------------------
            // Find user
            // -----------------------------------------

            const user =
                await this.userRepo.findUserById(
                    booking.userId
                );

            if (!user) {
                logger.warn(
                    `User not found for booking ${id}`
                );

                return res.redirect(
                    `/api/booking/${id}`
                );
            }

            // -----------------------------------------
            // Status email
            // -----------------------------------------

            try {
                await bookingStatus(
                    user.email,
                    user.name,
                    id,
                    status
                );
            } catch (emailError) {
                logger.error(
                    `Booking status email failed: ${emailError.message}`
                );
            }

            logger.info(
                `${status} for booking ${id} has been updated`
            );

            // -----------------------------------------
            // Redirect
            // -----------------------------------------

            return res.redirect(`/api/booking/${id}`);
        } catch (err) {
            logger.error(err.message);
            next(err);
        }
    }
}