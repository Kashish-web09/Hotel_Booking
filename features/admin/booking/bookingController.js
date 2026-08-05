import bookingRepo from "./bookingRepository.js";
import logger from '../../../middleware/loggerMiddleware.js'

export default class bookingController{
    constructor(){
        this.bookingRepo=new bookingRepo();
    }
    async getAllBookings(req,res,next){
try {
    const booking=await this.bookingRepo.getAllBookings();
    return res.render('admin/allBookings',{
        title:"Guest Bookings Page",
        booking,
        errors:[],
        oldData:{}
    })
} catch (err) {
    logger.error(err.message);
    next(err)
}
    }

    async getBookingById(req,res,next){
        try {
            const {id}=req.params;
            const booking=await this.bookingRepo.getBookingById(id);
            if(!booking){
                logger.warn(`No booking found for this ${id}`);
                return res.redirect('/api/admin/booking')
            }
            return res.render('admin/guestBooking',{
                title:"Guest Booking Page",
                booking,
                errors:[],
                oldData:req.body
            })
        } catch (err) {
                logger.error(err.message);
    next(err)

        }
    }
    async updateBooking(req,res,next){
        try {
            const {id}=req.params;
            const {status}=req.body;
            const booking=await this.bookingRepo.updateBookingStatus(id,status);
                        if(!booking){
                logger.warn(`No booking found for  ${id}`);
                return res.redirect('/api/admin/booking')
            }
                        logger.info(`${status} for this ${id} id have been updated`)

            return res.redirect(`/api/admin/booking/${id}`);

        } catch (err) {
                            logger.error(err.message);
    next(err)

        }
    }
}