import logger from "../../../middleware/loggerMiddleware.js";
import userRepo from "../../guest/userAuth/userRepository.js";
// import roomRepo from "../../guest/rooms/roomsRepository.js";
import bookingRepo from "../booking/bookingRepository.js";
import adminUserRepo from "../adminAuth/adminRepository.js";
import hotelrepo from "../hotel/hotelRepository.js";
import roomRepo from '../rooms/roomsRepository.js'

export default class adminDashController{
    constructor(){
        this.userRepo=new userRepo();
        // this.roomRepo=new roomRepo();
        this.bookingRepo=new bookingRepo();
        this.adminUserRepo=new adminUserRepo();
        this.hotelrepo=new hotelrepo();
        this.roomRepo=new roomRepo();
    }
async getDashboardPage(req, res, next) {
    try {
        const adminId = req.adminId;

        const admin = await this.adminUserRepo.findUserById(adminId);

        if (!admin) {
            return res.status(404).render("404");
        }

        const users = await this.userRepo.getAll();

        // Get hotels
        const hotels = await this.hotelrepo.getAllHotel(adminId);
const hotel=hotels[0];

        // Get rooms belonging to admin's hotel
const rooms = hotel
    ? await this.roomRepo.getAllRooms(hotel._id)
    : [];
        const bookings = await this.bookingRepo.getAllBookings(adminId);

        const totalRevenue = bookings
            .filter(
                b =>
                    b.status === "Confirmed" ||
                    b.status === "Completed"
            )
            .reduce(
                (total, b) => total + (b.totalAmount || 0),
                0
            );

        const confirmedBookings =
            bookings.filter(b => b.status === "Confirmed").length;

        const pendingBookings =
            bookings.filter(b => b.status === "Pending").length;

        const cancelledBookings =
            bookings.filter(b => b.status === "Cancelled").length;

        const recentBookings = bookings.slice(0, 5);

      

        return res.render("admin/adminDashboard", {
            title: "Admin Dashboard Page",
            admin,

            totalUsers: users.length,
            totalRooms: rooms.length,
            totalBookings: bookings.length,
            totalRevenue,

            hotelListedCount: hotels.length,

            recentBookings,
            confirmedBookings,
            pendingBookings,
            cancelledBookings,

            errors: [],
            oldDate: {}
        });

    } catch (err) {
        next(err);
    }
}
}