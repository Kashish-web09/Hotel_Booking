import bookingRepo from "../booking/bookingRepository.js";
import logger from "../../../middleware/loggerMiddleware.js";

export default class dashController {

    constructor() {
        this.bookingRepo = new bookingRepo();
    }

async getDashborad(req, res, next) {
    try {
        const userId = req.userId;

        const bookings = await this.bookingRepo.getUserBooking(userId);

        // const upcomingBooking = bookings[0];

        return res.render("guest/dashboard", {
            title: "Dashboard Page",
            upcomingBooking:bookings[0]
        });

    } catch (err) {
        logger.error(err.message);
        next(err);
    }
}
}