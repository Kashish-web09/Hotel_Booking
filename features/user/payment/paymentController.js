import paymentRepo from "./paymentRepository.js";
import logger from "../../../middleware/loggerMiddleware.js";
import bookingRepo from "../booking/bookingRepository.js";
import roomRepo from "../rooms/roomsRepository.js";
import {
    bookingConfirmation,
    cancelBooking
} from "../../../emailService/emailServices.js";
import userRepo from "../userAuth/userRepository.js";
import hotelRepo from "../hotel/hotelRepository.js";

export default class paymentController {
    constructor() {
        this.paymentRepo = new paymentRepo();
        this.bookingRepo = new bookingRepo();
        this.roomRepo = new roomRepo();
        this.userRepo = new userRepo();
        this.hotelRepo = new hotelRepo();
    }

    // ==========================================
    // GET PAYMENT PAGE
    // ==========================================

    async getPaymentPage(req, res, next) {
        try {
            const {
                roomId,
                checkIn,
                checkOut,
                guests
            } = req.query;

            // Get room
            const room = await this.roomRepo.getRoomById(roomId);

            if (!room) {
                return res.status(404).render("payment", {
                    title: "Payment Page",
                    errors: ["Room not found"],
                    oldData: req.query
                });
            }

            // Check room availability before showing payment page
            const isAvailable =
                await this.bookingRepo.checkRoomAvailability(
                    roomId,
                    checkIn,
                    checkOut
                );

            if (!isAvailable) {
                return res.status(409).render("payment", {
                    title: "Payment Page",
                    room,
                    bookingData: req.query,
                    errors: [
                        "This room is already booked for the selected dates."
                    ],
                    oldData: req.query
                });
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

    // ==========================================
    // CREATE PAYMENT + BOOKING
    // ==========================================

    async createPayment(req, res, next) {
        try {
            const userId = req.userId;

            const {
                roomId,
                checkIn,
                checkOut,
                guests,
                paymentMethod
            } = req.body;

            // ==========================================
            // 1. VALIDATE PAYMENT METHOD
            // ==========================================

            if (!paymentMethod) {
                return res.status(400).render("payment", {
                    title: "Payment Page",
                    errors: ["Payment method is required"],
                    oldData: req.body
                });
            }
            console.log("========== PAYMENT DEBUG ==========");
console.log("BODY:", req.body);
console.log("PARAMS:", req.params);
console.log("ROOM ID:", roomId);
console.log("===================================");

            // ==========================================
            // 2. GET ROOM
            // ==========================================

            const room = await this.roomRepo.getRoomById(roomId);
console.log("ROOM ID:", roomId);
            if (!room) {
                logger.warn(`Room not found: ${roomId}`);

                return res.status(404).render("payment", {
                    title: "Payment Page",
                    errors: ["Room not found"],
                    oldData: req.body
                });
            }

            // ==========================================
            // 3. VALIDATE REQUIRED BOOKING DATA
            // ==========================================

            if (!roomId || !checkIn || !checkOut || !guests) {
                return res.status(400).render("payment", {
                    title: "Payment Page",
                    room,
                    bookingData: req.body,
                    errors: ["All booking details are required."],
                    oldData: req.body
                });
            }

            // ==========================================
            // 4. VALIDATE GUESTS
            // ==========================================

            const numberOfGuests = Number(guests);

            if (
                !Number.isInteger(numberOfGuests) ||
                numberOfGuests <= 0
            ) {
                return res.status(400).render("payment", {
                    title: "Payment Page",
                    room,
                    bookingData: req.body,
                    errors: [
                        "Please enter a valid number of guests."
                    ],
                    oldData: req.body
                });
            }

            if (numberOfGuests > room.maxGuests) {
                logger.warn(
                    `Too many guests for room ${roomId}. Maximum: ${room.maxGuests}`
                );

                return res.status(400).render("payment", {
                    title: "Payment Page",
                    room,
                    bookingData: req.body,
                    errors: [
                        `This room can accommodate maximum ${room.maxGuests} guests.`
                    ],
                    oldData: req.body
                });
            }

            // ==========================================
            // 5. CREATE DATE OBJECTS
            // ==========================================

            const checkInDate = new Date(`${checkIn}T00:00:00`);
            const checkOutDate = new Date(`${checkOut}T00:00:00`);

            // ==========================================
            // 6. VALIDATE DATE FORMAT
            // ==========================================

            if (
                isNaN(checkInDate.getTime()) ||
                isNaN(checkOutDate.getTime())
            ) {
                return res.status(400).render("payment", {
                    title: "Payment Page",
                    room,
                    bookingData: req.body,
                    errors: [
                        "Invalid check-in or check-out date."
                    ],
                    oldData: req.body
                });
            }

            // ==========================================
            // 7. CHECK-IN CANNOT BE IN THE PAST
            // ==========================================

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (checkInDate < today) {
                logger.warn(
                    `Past check-in date attempted by user ${userId}: ${checkIn}`
                );

                return res.status(400).render("payment", {
                    title: "Payment Page",
                    room,
                    bookingData: req.body,
                    errors: [
                        "Check-in date cannot be in the past."
                    ],
                    oldData: req.body
                });
            }

            // ==========================================
            // 8. CHECK-OUT MUST BE AFTER CHECK-IN
            // ==========================================

            if (checkOutDate <= checkInDate) {
                logger.warn(
                    `Invalid checkout date for user ${userId}`
                );

                return res.status(400).render("payment", {
                    title: "Payment Page",
                    room,
                    bookingData: req.body,
                    errors: [
                        "Check-out date must be after check-in date."
                    ],
                    oldData: req.body
                });
            }

            // ==========================================
            // 9. CHECK ROOM AVAILABILITY
            // ==========================================

            const isAvailable =
                await this.bookingRepo.checkRoomAvailability(
                    roomId,
                    checkInDate,
                    checkOutDate
                );

            if (!isAvailable) {
                logger.warn(
                    `Room ${roomId} is not available from ${checkIn} to ${checkOut}`
                );

                return res.status(409).render("payment", {
                    title: "Payment Page",
                    room,
                    bookingData: req.body,
                    errors: [
                        "This room is already booked for the selected dates."
                    ],
                    oldData: req.body
                });
            }

            // ==========================================
            // 10. CALCULATE NUMBER OF NIGHTS
            // ==========================================

            const millisecondsPerDay =
                1000 * 60 * 60 * 24;

            const nights = Math.ceil(
                (checkOutDate - checkInDate) /
                millisecondsPerDay
            );

            if (nights <= 0) {
                return res.status(400).render("payment", {
                    title: "Payment Page",
                    room,
                    bookingData: req.body,
                    errors: [
                        "Invalid booking duration."
                    ],
                    oldData: req.body
                });
            }
            // ==========================================
            // 11. CALCULATE TOTAL AMOUNT
            // ==========================================

            const pricePerNight = Number(room.pricePerNight);

            const totalAmount =
                pricePerNight * nights;

            // ==========================================
            // 12. GET USER
            // ==========================================

            const user =
                await this.userRepo.findUserById(userId);

            if (!user) {
                return res.status(404).send(
                    "User not found"
                );
            }

            // ==========================================
            // 13. GET HOTEL
            // ==========================================

            const hotel =
                await this.hotelRepo.getHotelDetailsById(
                    room.hotelId
                );

            if (!hotel) {
                logger.warn(
                    `Hotel not found for room ${roomId}`
                );

                return res.status(404).render("payment", {
                    title: "Payment Page",
                    room,
                    bookingData: req.body,
                    errors: [
                        "Hotel not found."
                    ],
                    oldData: req.body
                });
            }

            // ==========================================
            // 14. GET ADMIN ID
            // ==========================================

            const adminId = hotel.createdBy;

            if (!adminId) {
                logger.error(
                    `Admin not found for hotel ${hotel._id}`
                );

                return res.status(500).render("payment", {
                    title: "Payment Page",
                    room,
                    bookingData: req.body,
                    errors: [
                        "Hotel administrator information is missing."
                    ],
                    oldData: req.body
                });
            }

            // ==========================================
            // 15. CREATE BOOKING
            // ==========================================

            const newBooking = {
                userId,
                adminId,
                roomId,
                checkIn: checkInDate,
                checkOut: checkOutDate,
                guests: numberOfGuests,
                pricePerNight,
                totalAmount,
                status: "Pending"
            };

            const booking =
                await this.bookingRepo.createBooking(
                    newBooking
                );

            logger.info(
                `Booking created by guest ${userId}, booking ${booking._id}`
            );

            // ==========================================
            // 16. CREATE PAYMENT
            // ==========================================

            let paymentStatus = "Pending";
            let paidAt = null;

            // Simulated payment
            // Online payment = Success
            // Cash = Pending

            if (paymentMethod !== "Cash") {
                paymentStatus = "Success";
                paidAt = new Date();
            }

            const newPayment = {
                bookingId: booking._id,
                userId,
                adminId,
                amount: totalAmount,
                paymentMethod,
                status: paymentStatus,
                paidAt
            };

            const payment =
                await this.paymentRepo.createPayment(
                    newPayment
                );

            logger.info(
                `Payment created by guest ${userId} for booking ${booking._id}`
            );

            // ==========================================
            // 17. UPDATE BOOKING STATUS
            // ==========================================

            if (paymentStatus === "Success") {
                await this.bookingRepo.updateBookingStatus(
                    booking._id,
                    "Confirmed"
                );

                booking.status = "Confirmed";
            }

            // ==========================================
            // 18. SEND CONFIRMATION EMAIL
            // ==========================================

            try {
                await bookingConfirmation(
                    user.email,
                    user.name,
                    hotel,
                    booking._id
                );

                logger.info(
                    `Booking confirmation email sent to ${user.email}`
                );
            } catch (emailError) {
                logger.error(
                    `Booking confirmation email failed: ${emailError.message}`
                );
            }

            // ==========================================
            // 19. SUCCESS PAGE
            // ==========================================

            return res.render(
                "paymentSuccess",
                {
                    title: "Payment Successful",
                    payment,
                    booking,
                    room,
                    hotel
                }
            );
        } catch (err) {
            logger.error(
                `Payment error: ${err.message}`
            );

            next(err);
        }
    }

    // ==========================================
    // CANCEL BOOKING + REFUND
    // ==========================================

    async payentRefund(req, res, next) {
        try {
            const { bookingId } = req.query;
            const userId = req.userId;

            // ==========================================
            // 1. GET BOOKING
            // ==========================================

            const booking =
                await this.bookingRepo.getBookingById(
                    bookingId
                );

            if (!booking) {
                return res.status(404).send(
                    "Booking not found"
                );
            }

            // ==========================================
            // 2. CHECK OWNERSHIP
            // ==========================================

            if (
                booking.userId.toString() !==
                userId.toString()
            ) {
                return res.status(403).send(
                    "You are not allowed to cancel this booking"
                );
            }

            // ==========================================
            // 3. CHECK ALREADY CANCELLED
            // ==========================================

            if (booking.status === "Cancelled") {
                return res.status(400).send(
                    "Booking is already cancelled"
                );
            }

            // ==========================================
            // 4. CHECK CANCELLATION DEADLINE
            // ==========================================

            const now = new Date();

            const checkInDate =
                new Date(booking.checkIn);

            if (now >= checkInDate) {
                return res.status(400).send(
                    "Booking cannot be cancelled after check-in"
                );
            }

            // ==========================================
            // 5. GET PAYMENT
            // ==========================================

            const payment =
                await this.paymentRepo.getPaymentByBookingId(
                    bookingId
                );

            // ==========================================
            // 6. GET USER
            // ==========================================

            const user =
                await this.userRepo.findUserById(userId);

            if (!user) {
                return res.status(404).send(
                    "User not found"
                );
            }

            // ==========================================
            // 7. CANCEL BOOKING
            // ==========================================

            await this.bookingRepo.cancelBooking(
                bookingId
            );

            logger.info(
                `Booking ${bookingId} cancelled by guest ${userId}`
            );

            // ==========================================
            // 8. SIMULATED REFUND
            // ==========================================

            if (
                payment &&
                payment.paymentMethod !== "Cash" &&
                payment.status === "Success"
            ) {
                // Change payment status
                payment.status = "Refunded";

                await payment.save();

                logger.info(
                    `Simulated refund completed for booking ${bookingId}`
                );

                logger.info(
                    `Refund amount: ₹${payment.amount}`
                );

                // ==========================================
                // 9. SEND REFUND EMAIL
                // ==========================================

                try {
                    await cancelBooking(
                        user.email,
                        bookingId,
                        payment.amount,
                        payment.paymentMethod
                    );

                    logger.info(
                        `Refund email sent to ${user.email}`
                    );
                } catch (emailError) {
                    logger.error(
                        `Refund email failed: ${emailError.message}`
                    );
                }
            } else {
                logger.info(
                    `No refund required for booking ${bookingId}`
                );
            }

            // ==========================================
            // 10. REDIRECT
            // ==========================================

            return res.redirect(
                "/api/guest/booking"
            );
        } catch (err) {
            logger.error(
                `Cancellation error: ${err.message}`
            );

            next(err);
        }
    }
}