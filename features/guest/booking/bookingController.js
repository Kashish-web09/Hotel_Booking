import bookingRepo from "./bookingRepository.js";
import roomRepo from '../rooms/roomsRepository.js'
import logger from '../../../middleware/loggerMiddleware.js'

export default class bookingController{
    constructor(){
        this.bookingRepo=new bookingRepo();
        this.roomRepo=new roomRepo();

    }

    async getMyBookings(req,res,next){
        try {
            const bookings=await this.bookingRepo.getMyBookings();
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
logger.wanr("Check-out date must be after check-in date")
                       return res.status(400).send(`Check-out date must be after check-in date`)

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
            const booking=await this.bookingRepo.createBooking({
            userId,
            roomId,
            checkIn:startDate,
            checkOut:endDate,
            guests,
            pricePerNight,
            totalAmount,
        })
        return res.redirect(`/api/hotel/booking/details/${booking._id}`)

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

        const booking =
            await this.bookingRepo.cancelBooking(id);

        if (!booking) {

            logger.warn(
                `Booking not found: ${id}`
            );

            return res.status(404).send(
                "Booking not found"
            );
        }

        return res.redirect("/api/hotel/booking");

    } catch (err) {

        logger.error(err.message);
        next(err);

    }
}}
