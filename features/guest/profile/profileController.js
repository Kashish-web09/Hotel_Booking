import profileRepo from "./profileRepository.js";
import logger from "../../../middleware/loggerMiddleware.js";
import { profileUpdate } from "../../../emailService/emailServices.js";

export default class profileController {

    constructor() {
        this.profileRepo = new profileRepo();
    }

    async getProfile(req, res, next) {
        try {

            const userId = req.userId;

            const user = await this.profileRepo.getProfile(userId);

            // ADMIN PROFILE
            if (req.userRole === "Admin") {

                return res.render("adminProfile", {
                    title: "Admin Profile Page",
                    user,
                    errors: [],
                    oldData: {}
                });

            }

            // GUEST PROFILE
            return res.render("profile", {
                title: "Guest Profile Page",
                user,
                errors: [],
                oldData: {}
            });

        } catch (err) {

            logger.error(err.message);
            next(err);

        }
    }


    async updateProfile(req, res, next) {
        try {

            const userId = req.userId;

            const { name, email, phoneNo } = req.body;

            const image = req.file
                ? req.file.filename
                : "default.png";

            await this.profileRepo.updateProfile(
                userId,
                {
                    name,
                    email,
                    phoneNo,
                    image
                }
            );

            await profileUpdate(email, name);

            logger.info(`User Profile Updated ${userId}`);

            // Redirect based on role
            if (req.userRole === "Admin") {
                return res.redirect("/api/auth/profile");
            }

            return res.redirect("/api/auth/profile");

        } catch (err) {

            logger.error(err.message);
            next(err);

        }
    }
}