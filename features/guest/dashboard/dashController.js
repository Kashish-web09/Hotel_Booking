import bookingRepo from "../booking/bookingRepository.js";
import logger from "../../../middleware/loggerMiddleware.js";
import userRepo from "../userAuth/userRepository.js";

export default class dashController {

    constructor() {
        this.bookingRepo = new bookingRepo();
        this.userRepo=new userRepo()
    }

async getDashborad(req, res, next) {
    try {
        const userId = req.userId;

        const bookings = await this.bookingRepo.getUserBooking(userId);
const totalTrips = bookings.filter(b => b.status === "Completed").length;
const user=await this.userRepo.findUserById(req.userId)
const upcomingCount=bookings.filter(
    b=> b.status==="Confirmed" &&  new Date(b.checkIn)>=new Date()
).length;
        return res.render("guest/dashboard", {
            title: "Dashboard Page",
            user,
            upcomingBooking:bookings[0],
            totalTrips,
            upcomingCount
        });

    } catch (err) {
        logger.error(err.message);
        next(err);
    }
}
async aboutUsPage(req,res,next){
    try {
        return res.render('guest/aboutUs',{
            title:"About Us Page",
            errors:[],
            oldData:{}
        })
    } catch (err) {
                logger.error(err.message);
        next(err);

    }
}
}