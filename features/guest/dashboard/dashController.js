import bookingRepo from "../booking/bookingRepository.js";
import logger from "../../../middleware/loggerMiddleware.js";
import userRepo from "../userAuth/userRepository.js";
import travelRepo from "../../admin/travel/travelRepository.js";
export default class dashController {

    constructor() {
        this.bookingRepo = new bookingRepo();
        this.userRepo=new userRepo()
        this.travelRepo=new travelRepo()
    }

async getDashborad(req, res, next) {
    try {
        const userId = req.userId;

        const bookings = await this.bookingRepo.getUserBooking(userId);
const totalTrips = bookings.filter(b => b.status === "Completed").length;
const destination=await this.travelRepo.getAll();
const user=await this.userRepo.findUserById(req.userId)
const today=new Date();
today.setHours(0,0,0,0);
const upcomingCount = bookings.filter(b => {
    const checkIn = new Date(b.checkIn);
    checkIn.setHours(0, 0, 0, 0);

    return b.status === "Confirmed" && checkIn >= today;
}).length;
        return res.render("guest/dashboard", {
            title: "Dashboard Page",
            user,
            upcomingBooking:bookings[0],
            totalTrips,
            upcomingCount,
            destination
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