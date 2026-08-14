import bookingRepo from "./bookingRepository.js";
import roomRepo from '../rooms/roomsRepository.js'
import logger from '../../../middleware/loggerMiddleware.js'
import userRepo from '../userAuth/userRepository.js'
import hotelRepo from '../hotel/hotelRepository.js'
import { bookingConfirmation, cancelBooking } from "../../../emailService/emailServices.js";
export default class bookingController{
    constructor(){
        this.bookingRepo=new bookingRepo();
        this.roomRepo=new roomRepo();
        this.hotelRepo=new hotelRepo()
this.userRepo=new userRepo();
    }

    async getMyBookings(req,res,next){
        try {
            const userId=req.userId;
            
            const bookings=await this.bookingRepo.getUserBooking(userId);
            return res.render('guest/myBooking',{
                title:"My Booking Page",
                bookings,
                errors:[],
                oldData:{}
            })
        } catch (err) {
                        logger.error(err.message);
            next(err)

        }
    }

    async createBooking(req,res,next){
        try {
            const userId=req.userId;
            if(req.validationErrors){
                const room=await this.roomRepo.getRoomById(
                    req.body.roomId
                )
                return res.render('guest/roomDetails',{
                                    title:`${room.roomType} Room`,
                                    room,
                errors:req.validationErrors,
                oldData:req.body

                })
            }
            const {
                roomId,
                checkIn,
                checkOut,
                guests
            }=req.body;
            const room=await this.roomRepo.getRoomById(roomId);
            if(!room){
                logger.warn(`Room not found ${roomId}`);
                return res.status(400).send("Room not found")
            }
            if(Number(guests)>room.maxGuests){
                logger.warn(`This room can accomodate maxiumu ${room.maxGuests} guests`);
                          return res.status(400).send(`This room can accomodate maxiumu ${room.maxGuests} guests`)
            }
const startDate=new Date(checkIn);
const endDate=new Date(checkOut);

if(startDate>=endDate){
logger.warn("Check-out date must be after check-in date")
                       return res.status(400).send(`Check-out date must be after check-in date`)

}
if (endDate <= startDate) {
    logger.warn("Check-out date must be after check-in date");

    return res.status(400).send(
        "Check-out date must be after check-in date"
    );
}
const isAvailable=await this.bookingRepo.checkRoomAvailability(roomId,startDate,endDate);
if(!isAvailable){
    logger.warn(`Room is not available for ${startDate}`)
    return res.status(400).send(
                `Room is not available for ${startDate}`
            );
        }

    const milliSecondPerDay=1000*60*60*24;
    const night=Math.ceil(
        (endDate-startDate)/milliSecondPerDay
    )
    const pricePerNight=room.pricePerNight;
    const totalAmount=night*pricePerNight;
            const newBooking=await this.bookingRepo.createBooking({
            userId,
            roomId,
            checkIn:startDate,
            checkOut:endDate,
            guests,
            pricePerNight,
            totalAmount,
        })
        const user=await this.userRepo.findUserById(userId);
        const hotelId=room.hotelId
        const hotel=await this.hotelRepo.getHotelDetailsById(hotelId)
        await bookingConfirmation(user.email,user.name,hotel,newBooking._id)
        return res.redirect(`/api/guest/booking/details/${newBooking._id}`)

        } catch (err) {
            logger.error(err.message);
            next(err)
        }
    }
async bookingDetails(req, res, next) {
    try {

        const { id } = req.params;

        const booking =
            await this.bookingRepo.getBookingById(id);

        if (!booking) {
            return res.status(400).send("Booking not found");
        }

        return res.render('guest/bookingDetails', {
            title: "Booking Details",
            booking,
            errors: [],
            oldData: {}
        });

    } catch (err) {

        logger.error(err.message);
        next(err);

    }
}
 async cancelBooking(req, res, next) {

        try {

            const { id } = req.params;
            const userId = req.userId;


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
            if (
                existingBooking.userId.toString() !==
                userId.toString()
            ) {

                return res.status(403).send(
                    "You are not authorized to cancel this booking"
                );
            }

            if (
                existingBooking.status ===
                "Cancelled"
            ) {

                return res.status(400).send(
                    "Booking is already cancelled"
                );
            }


            // --------------------------------
            // Cancel booking
            // --------------------------------
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


            // --------------------------------
            // Find user
            // --------------------------------
            const user =
                await this.userRepo.findUserById(
                    userId
                );

            if (!user) {

                return res.status(404).send(
                    "User not found"
                );
            }


            // --------------------------------
            // Cancellation email
            // --------------------------------
            try {

                await cancelBooking(
                    user.email,
                    id,
                    booking.totalAmount,
                    booking.paymentMethod
                );

            } catch (emailError) {

                logger.error(
                    `Cancellation email failed: ${emailError.message}`
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
}
