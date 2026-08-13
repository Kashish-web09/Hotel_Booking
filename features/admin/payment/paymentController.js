import paymentRepo from "./paymentRepository.js";
import logger from '../../../middleware/loggerMiddleware.js'
import bookingRepo from '../booking/bookingRepository.js'
import { cancelBooking } from "../../../emailService/emailServices.js";
import adminUserRepo from "../adminAuth/adminRepository.js";
import userRepo from "../../guest/userAuth/userRepository.js";
export default class paymentController{
    constructor(){
        this.paymentRepo=new paymentRepo();
        this.bookingRepo=new bookingRepo();
        this.adminUserRepo=new adminUserRepo();
        this.userRepo=new userRepo();
    }
    async getAllPayemnts(req,res,next){
      try {
         const payments=await this.paymentRepo.getAllPayments();
        return res.render('admin/payment',{
            title:"Payment History Page",
            payments,
            bookingId:"",
            errors:[],
            oldData:{}
        })
    }catch(err){
logger.error(err.message);
next(err)
    }
    }
    async updatePayment(req,res,next){
try {
    const {bookinId}=req.query;
    const {status}=req.body;
    const existBooking=await this.bookingRepo.getBookingById(bookinId);
    if(!existBooking){
logger.warn("No booking found");
return res.status(400).send("No booking found")
    }
    const allowedStatus=[
        "Pending",
        "Success",
        "Failed",
        "Refunded"
    ];
    if(!allowedStatus.includes(status)){
         return res.status(400).send(
                    "Invalid payment status"
                );
    }
    const payment=await this.paymentRepo.updatePaymentStatus(bookinId,status);


            if (!payment) {

                return res.status(404).send(
                    "Payment not found"
                );

            }

            logger.info(
                `Payment for booking ${bookingId} updated to ${status}`
            );


            return res.redirect(
                "/api/admin/payment"
            );

} catch (err) {
    logger.error(err.message);
next(err)

}
}
async refundPayment(req,res,next){
    try {
        const {bookingId}=req.query;
        // const {id}=req.body;
const adminId=req.adminId;
const admin=await this.adminUserRepo.findUserById(adminId);
if(!admin){
             return res.status(400).send("Admin user not found")
   
}
        const booking=await this.bookingRepo.getBookingById(bookingId);
        if(!booking){
            return res.status(400).send("Booking not found")
        }

            if (booking.status !== "Cancelled") {

                return res.status(400).send(
                    "Booking must be cancelled before refund"
                );

            }
const payment=await this.paymentRepo.getPaymentByBookingId(bookingId);
if(!payment){
     return res.status(404).send(
                    "Payment not found"
                );
}
if(payment.status!=="Success"){
      return res.status(400).send(
                    `Payment cannot be refunded because its status is ${payment.status}`
                );
}

            if (payment.paymentMethod === "Cash") {

                return res.status(400).send(
                    "Cash payment does not require a refund"
                );

            }
if(booking.status!=="Cancelled"){
      return res.status(400).send(
                    "Booking must be cancelled before refund"
                );
}
const user=await this.userRepo.findUserById(
    payment.userId
)
    if (!user) {

                return res.status(404).send(
                    "Guest user not found"
                );

            }

            const refundPayment=await this.paymentRepo.refundPayment(payment._id);
            if(!refundPayment){
                return res.status(400).send(
                    "Refund failed"
                );
            }
        
              logger.info(
                `Simulated refund completed by admin ${adminId} for booking ${bookingId}`
            );


            logger.info(
                `Refund amount: ₹${payment.amount}`
            );

                await cancelBooking(

                    user.email,

                    user.name,

                    bookingId,

                    refundPayment.amount,

                    refundPayment.paymentMethod

                );
logger.info(
                    `Refund email sent to ${user.email}`
                );

        return res.redirect('/api/admin/dashboard')
    } catch (err) {
         logger.error(err.message);

            next(err);
    }
}
async searchPayment(req,res,next){
    try {
        const {bookingId}=req.query;
 const payments= await this.paymentRepo.searchPayment(bookingId);
 return res.render('admin/payment',{
    title:"Payment History Page",
    payments,
    bookingId:"",
    errors:[],
    oldData:{}
 })
    } catch (err) {
                 logger.error(err.message);

            next(err);

    }
}
}