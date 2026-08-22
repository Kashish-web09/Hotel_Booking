import bookingRepo from "../../features/admin/booking/bookingRepository.js";
import logger from "../../middleware/loggerMiddleware.js";
import userRepo from "../userAuth/userRepository.js";
import travelRepo from "../../features/admin/travel/travelRepository.js";
import hotelRepo from "../../features/admin/hotel/hotelRepository.js";
import roomRepo from "../../features/admin/rooms/roomsRepository.js";

export default class dashboardController {

    constructor() {
        this.bookingRepo = new bookingRepo();
        this.userRepo = new userRepo();
        this.travelRepo = new travelRepo();
        this.hotelRepo = new hotelRepo();
        this.roomRepo = new roomRepo();
    }


    // =========================
    // GUEST DASHBOARD
    // =========================

    async getGuestDashboard(req, res, next) {
        try {

            const userId = req.userId;

            const bookings =
                await this.bookingRepo.getUserBooking(userId);

            const totalTrips = bookings.filter(
                b => b.status === "Completed"
            ).length;

            const destination =
                await this.travelRepo.getAll();

            const user =
                await this.userRepo.findUserById(userId);

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const upcomingCount = bookings.filter(b => {

                const checkIn = new Date(b.checkIn);

                checkIn.setHours(0, 0, 0, 0);

                return (
                    b.status === "Confirmed" &&
                    checkIn >= today
                );

            }).length;


            return res.render("dashboard", {
                title: "Dashboard Page",
                user,
                upcomingBooking: bookings[0],
                totalTrips,
                upcomingCount,
                destination
            });

        } catch (err) {

            logger.error(err.message);
            next(err);

        }
    }


    // =========================
    // ADMIN DASHBOARD
    // =========================

    async getAdminDashboard(req, res, next) {
        try {

            // Admin is also stored in the users collection
            const adminId = req.userId;

            const admin =
                await this.userRepo.findUserById(adminId);

            if (!admin) {
                return res.status(404).render("404");
            }

            const users =
                await this.userRepo.getAll();

            const hotels =
                await this.hotelRepo.getAllHotel(adminId);

            const hotel = hotels[0];

            const rooms = hotel
                ? await this.roomRepo.getAllRooms(hotel._id)
                : [];

            const bookings =
                await this.bookingRepo.getAllBookings(adminId);


            const totalRevenue = bookings
                .filter(
                    b =>
                        b.status === "Confirmed" ||
                        b.status === "Completed"
                )
                .reduce(
                    (total, b) =>
                        total + (b.totalAmount || 0),
                    0
                );


            const confirmedBookings =
                bookings.filter(
                    b => b.status === "Confirmed"
                ).length;

            const pendingBookings =
                bookings.filter(
                    b => b.status === "Pending"
                ).length;

            const cancelledBookings =
                bookings.filter(
                    b => b.status === "Cancelled"
                ).length;


            const recentBookings =
                bookings.slice(0, 5);


            return res.render(
                "admin/adminDashboard",
                {
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

                    oldData: {}
                }
            );

        } catch (err) {

            logger.error(err.message);
            next(err);

        }
    }


    // =========================
    // ABOUT US
    // =========================

    async aboutUsPage(req, res, next) {

        try {

            return res.render("aboutUs", {
                title: "About Us Page",
                errors: [],
                oldData: {}
            });

        } catch (err) {

            logger.error(err.message);
            next(err);

        }
    }

}