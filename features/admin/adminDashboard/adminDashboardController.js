import logger from "../../../middleware/loggerMiddleware.js";
import userRepo from "../../guest/userAuth/userRepository.js";
import roomRepo from "../../guest/rooms/roomsRepository.js";
import bookingRepo from "../booking/bookingRepository.js";
import adminUserRepo from "../adminAuth/adminRepository.js";
import hotelrepo from "../hotel/hotelRepository.js";
export default class adminDashController{
    constructor(){
        this.userRepo=new userRepo();
        this.roomRepo=new roomRepo();
        this.bookingRepo=new bookingRepo();
        this.adminUserRepo=new adminUserRepo();
        this.hotelrepo=new hotelrepo();
    }
    async getDashboardPage(req,res,next){
        const users=await this.userRepo.getAll();
        const rooms=await this.roomRepo.getAll();
        const booking=await this.bookingRepo.getAllBookings();
const totalRevenue = booking
    .filter(b => b.status === "Confirmed" || b.status === "Completed")
    .reduce((total, b) => total + (b.totalAmount || 0), 0);

    const confirmedBookings =booking.filter(b=>b.status==="Confirmed").length;
        const pendingBookings=booking.filter(b=>b.status==="Pending").length;
    const cancelledBookings=booking.filter(b=>b.status==="Cancelled").length;
const recentBookings=booking.slice(0,5);
const admin=await this.adminUserRepo.findUserById(req.adminId)
const hotelListedCount=(await this.hotelrepo.getAllHotel()).length;

            return res.render('admin/adminDashboard',{
            title:"Admin Dashboard Page",
            admin,
            totalUsers:users.length,
totalRooms:rooms.length,
totalBookings:booking.length,
totalRevenue,
hotelListedCount,
recentBookings,
confirmedBookings,
pendingBookings,
cancelledBookings,
            errors:[],
            oldDate:{}
        })
    }
}