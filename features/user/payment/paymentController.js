
import logger from "../../../middleware/loggerMiddleware.js";

import bookingRepo from "../booking/bookingRepository.js";
import paymentRepo from './paymentRepository.js'
import roomRepo from "../rooms/roomsRepository.js";
import userRepo from "../userAuth/userRepository.js";
import hotelRepo from "../hotel/hotelRepository.js";

import {
    bookingConfirmation,
    cancelBooking
} from "../../../emailService/emailServices.js";


export default class paymentController {

    constructor() {

        this.paymentRepo = new paymentRepo();

        this.bookingRepo = new bookingRepo();

        this.roomRepo = new roomRepo();

        this.userRepo = new userRepo();

        this.hotelRepo = new hotelRepo();
    }


    // =====================================================
    // GUEST: GET PAYMENT PAGE
    // =====================================================

    async getPaymentPage(req, res, next) {

        try {

            const {
                roomId,
                checkIn,
                checkOut,
                guests
            } = req.query;


            const room =
                await this.roomRepo.getRoomById(roomId);


            if (!room) {

                return res.status(404).send(
                    "Room not found"
                );
            }


            return res.render("payment", {

                title: "Payment Page",

                room,

                bookingData: {
                    roomId,
                    checkIn,
                    checkOut,
                    guests
                },

                errors: [],

                oldData: {}
            });

        } catch (err) {

            logger.error(err.message);

            next(err);
        }
    }


    // =====================================================
    // GUEST: CREATE BOOKING + PAYMENT
    // =====================================================

    async createPayment(req, res, next) {

        try {

            // Logged-in guest ID from JWT
            const userId = req.userId;


            const {
                roomId,
                checkIn,
                checkOut,
                guests,
                paymentMethod
            } = req.body;


            // ===============================
            // VALIDATION
            // ===============================

            if (
                !roomId ||
                !checkIn ||
                !checkOut ||
                !guests ||
                !paymentMethod
            ) {

                return res.status(400).send(
                    "All payment details are required"
                );
            }


            // ===============================
            // GET ROOM
            // ===============================

            const room =
                await this.roomRepo.getRoomById(roomId);


            if (!room) {

                return res.status(404).send(
                    "Room not found"
                );
            }


            // ===============================
            // CHECK AVAILABILITY
            // ===============================

            const isAvailable =
                await this.bookingRepo.checkRoomAvailability(
                    roomId,
                    checkIn,
                    checkOut
                );


            if (!isAvailable) {

                return res.status(409).send(
                    "Room is not available for selected dates"
                );
            }


            // ===============================
            // DATE VALIDATION
            // ===============================

            const checkInDate =
                new Date(checkIn);

            const checkOutDate =
                new Date(checkOut);


            if (
                checkOutDate <= checkInDate
            ) {

                return res.status(400).send(
                    "Check-out must be after check-in"
                );
            }


            // ===============================
            // CALCULATE NIGHTS
            // ===============================

            const nights =
                Math.ceil(
                    (
                        checkOutDate -
                        checkInDate
                    )
                    /
                    (1000 * 60 * 60 * 24)
                );


            const pricePerNight =
                Number(room.pricePerNight);


            const totalAmount =
                pricePerNight * nights;


            // ===============================
            // GET HOTEL
            // ===============================

            const hotel =
                await this.hotelRepo.getHotelDetailsById(
                    room.hotelId
                );


            if (!hotel) {

                return res.status(404).send(
                    "Hotel not found"
                );
            }


            // =====================================
            // IMPORTANT: HOTEL OWNER / ADMIN
            // =====================================

            const adminId =
                hotel.createdBy;


            if (!adminId) {

                console.log(
                    "Hotel does not contain createdBy"
                );

                return res.status(500).send(
                    "Hotel admin not found"
                );
            }


            console.log(
                "PAYMENT DEBUG"
            );

            console.log(
                "Guest ID:",
                userId
            );

            console.log(
                "Admin ID:",
                adminId
            );


            // ===============================
            // CREATE BOOKING
            // ===============================

            const booking =
                await this.bookingRepo.createBooking({

                    userId,

                    adminId,

                    roomId,

                    checkIn:
                        checkInDate,

                    checkOut:
                        checkOutDate,

                    guests:
                        Number(guests),

                    pricePerNight,

                    totalAmount,

                    status:
                        "Pending"
                });


            // ===============================
            // PAYMENT STATUS
            // ===============================

            let status =
                "Pending";

            let paidAt =
                null;


            // Simulated payment

            if (
                paymentMethod !== "Cash"
            ) {

                status =
                    "Success";

                paidAt =
                    new Date();
            }


            // ===============================
            // CREATE PAYMENT
            // ===============================

            const payment =
                await this.paymentRepo.createPayment({

                    bookingId:
                        booking._id,

                    // Guest who paid
                    userId,

                    // Admin who owns hotel
                    adminId,

                    amount:
                        totalAmount,

                    paymentMethod,

                    status,

                    paidAt
                });


            console.log(
                "PAYMENT CREATED:",
                payment
            );


            // ===============================
            // CONFIRM BOOKING
            // ===============================

            if (
                status === "Success"
            ) {

                await this.bookingRepo
                    .updateBookingStatus(

                        booking._id,

                        "Confirmed"
                    );
            }


            // ===============================
            // SUCCESS PAGE
            // ===============================

            return res.render(
                "paymentSuccess",
                {

                    title:
                        "Payment Successful",

                    payment,

                    booking,

                    room,

                    hotel
                }
            );

        } catch (err) {

            logger.error(
                `Payment Error: ${err.message}`
            );

            next(err);
        }
    }


    // =====================================================
    // GUEST: CANCEL BOOKING
    // =====================================================

    async paymentRefund(req, res, next) {

        try {

            const { bookingId } =
                req.query;


            const userId =
                req.userId;


            const booking =
                await this.bookingRepo
                    .getBookingById(bookingId);


            if (!booking) {

                return res.status(404).send(
                    "Booking not found"
                );
            }


            // Check booking belongs to guest

            if (
                booking.userId.toString() !==
                userId.toString()
            ) {

                return res.status(403).send(
                    "Unauthorized"
                );
            }


            const payment =
                await this.paymentRepo
                    .getPaymentByBookingId(
                        bookingId
                    );


            // Cancel booking

            await this.bookingRepo
                .cancelBooking(bookingId);


            // Refund only successful online payments

            if (

                payment &&

                payment.status === "Success" &&

                payment.paymentMethod !== "Cash"

            ) {

                await this.paymentRepo
                    .refundPayment(
                        payment._id
                    );
            }


            return res.redirect(
                "/api/guest/booking"
            );

        } catch (err) {

            logger.error(err.message);

            next(err);
        }
    }


    // =====================================================
    // ADMIN: GET ALL PAYMENTS
    // =====================================================

    async getAllPayments(req, res, next) {

        try {
console.log("JWT USER ID:", req.userId);
console.log("TYPE:", typeof req.userId);
            // Same JWT field
            const adminId =
                req.userId;


            console.log(
                "ADMIN ID FROM TOKEN:",
                adminId
            );


            const payments =
                await this.paymentRepo
                    .getAllPayments(adminId);


            console.log(
                "TOTAL PAYMENTS:",
                payments.length
            );


            return res.render(
                "adminPayment",
                {

                    title:
                        "Payment History",

                    payments,

                    bookingId:
                        "",

                    errors:
                        [],

                    oldData:
                        {}
                }
            );

        } catch (err) {

            logger.error(err.message);

            next(err);
        }
    }


    // =====================================================
    // ADMIN: SEARCH PAYMENT
    // =====================================================

    async searchPayment(req, res, next) {

        try {

            const {
                bookingId
            } = req.query;


            const adminId =
                req.userId;


            const payments =
                await this.paymentRepo.searchPayment(
                    bookingId,
                    adminId
                );


            return res.render(
                "adminPayment",
                {

                    title:
                        "Payment History",

                    payments,

                    bookingId,

                    errors:
                        [],

                    oldData:
                        {}
                }
            );

        } catch (err) {

            logger.error(err.message);

            next(err);
        }
    }


    // =====================================================
    // ADMIN: UPDATE PAYMENT STATUS
    // =====================================================

    async updatePayment(req, res, next) {

        try {

            const {
                bookingId
            } = req.query;


            const {
                status
            } = req.body;


            const adminId =
                req.userId;


            const allowedStatus = [

                "Pending",

                "Success",

                "Failed",

                "Refunded"
            ];


            if (
                !allowedStatus.includes(status)
            ) {

                return res.status(400).send(
                    "Invalid payment status"
                );
            }


            // Make sure payment belongs to admin

            const payment =
                await this.paymentRepo
                    .getPaymentByBookingId(
                        bookingId
                    );


            if (!payment) {

                return res.status(404).send(
                    "Payment not found"
                );
            }


            if (
                payment.adminId.toString() !==
                adminId.toString()
            ) {

                return res.status(403).send(
                    "Unauthorized"
                );
            }


            const updatedPayment =
                await this.paymentRepo
                    .updatePaymentStatus(
                        bookingId,
                        status
                    );


            return res.redirect(
                "/api/payment/admin"
            );

        } catch (err) {

            logger.error(err.message);

            next(err);
        }
    }


    // =====================================================
    // ADMIN: REFUND PAYMENT
    // =====================================================

    async refundPayment(req, res, next) {

        try {

            const {
                bookingId
            } = req.query;


            const adminId =
                req.userId;


            const booking =
                await this.bookingRepo
                    .getBookingById(
                        bookingId
                    );


            if (!booking) {

                return res.status(404).send(
                    "Booking not found"
                );
            }


            // Booking must belong to this admin

         if (!booking.adminId) {
    return res.status(400).send(
        "This booking does not have an admin assigned"
    );
}

if (booking.adminId.toString() !== adminId.toString()) {
    return res.status(403).send("Unauthorized");
}
            if (
                booking.status !== "Cancelled"
            ) {

                return res.status(400).send(
                    "Booking must be cancelled first"
                );
            }


            const payment =
                await this.paymentRepo
                    .getPaymentByBookingId(
                        bookingId
                    );


            if (!payment) {

                return res.status(404).send(
                    "Payment not found"
                );
            }


            if (
                payment.status !== "Success"
            ) {

                return res.status(400).send(
                    "Only successful payments can be refunded"
                );
            }


            if (
                payment.paymentMethod === "Cash"
            ) {

                return res.status(400).send(
                    "Cash payment cannot be refunded"
                );
            }


            const refundedPayment =
                await this.paymentRepo
                    .refundPayment(
                        payment._id
                    );


            return res.redirect(
                "/api/payment/admin"
            );

        } catch (err) {

            logger.error(err.message);

            next(err);
        }
    }
}