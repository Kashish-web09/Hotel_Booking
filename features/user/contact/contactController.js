import {
    feedbackSent,
    feedbackUpdate
} from "../../../emailService/emailServices.js";

import logger from "../../../middleware/loggerMiddleware.js";
import feedbackRepo from "./contactRepository.js";

export default class feedbackController {
    constructor() {
        this.feedbackRepo = new feedbackRepo();
    }

    // =========================
    // CONTACT / FEEDBACK FORM
    // =========================

    async feedbackPage(req, res, next) {
        try {
            return res.render("contact", {
                title: "Feedback",
                errors: [],
                oldData: {}
            });
        } catch (err) {
            logger.error(err.message);
            next(err);
        }
    }

    // =========================
    // GET FEEDBACK
    // Admin -> All feedback
    // Guest -> Own feedback
    // =========================

    async getFeedbackPage(req, res, next) {
        try {
            if (req.role === "Admin") {
                const feedback =
                    await this.feedbackRepo.getAllFeedback();

                return res.render("feedback", {
                    title: "Admin Feedback",
                    feedback,
                    errors: [],
                    oldData: {}
                });
            }

            if (req.role === "Guest") {
                const feedback =
                    await this.feedbackRepo.getAllFeedback(
                        req.userId
                    );

                return res.render("contact", {
                    title: "My Feedback",
                    feedback,
                    errors: [],
                    oldData: {}
                });
            }

            return res.status(403).send("Invalid role");
        } catch (err) {
            logger.error(err.message);
            next(err);
        }
    }

    // =========================
    // CREATE FEEDBACK
    // =========================

    async feedback(req, res, next) {
        try {
            const {
                name,
                email,
                phoneNo,
                messageType,
                message
            } = req.body;

            if (req.validationErrors) {
                return res.render("contact", {
                    title: "Feedback",
                    errors: req.validationErrors,
                    oldData: req.body
                });
            }

            const contact = {
                name,
                email,
                phoneNo,
                messageType,
                message,

                // Logged-in user
                userId: req.userId
            };

            // Save feedback
            await this.feedbackRepo.createFeedback(contact);

            // Notify admin
            await feedbackSent(
                process.env.ADMIN_EMAIL,
                name
            );

            // Redirect according to role
            if (req.role === "Admin") {
                return res.redirect("/api/feedback");
            }

            return res.redirect("/api/feedback");
        } catch (err) {
            logger.error(err.message);
            next(err);
        }
    }

    // =========================
    // UPDATE FEEDBACK STATUS
    // ADMIN ONLY
    // =========================

    async updateStatus(req, res, next) {
        try {
            const { id } = req.params;
            const { status, message } = req.body;

            const feedback =
                await this.feedbackRepo.getFeedbackByID(id);

            if (!feedback) {
                logger.warn(`Feedback not exist: ${id}`);

                return res.render("feedback", {
                    title: "Feedback Page",
                    feedback: [],
                    errors: ["Feedback not found!"],
                    oldData: req.body
                });
            }

            await this.feedbackRepo.updateStatus(
                id,
                status
            );

            // Send status update email to guest
            await feedbackUpdate(
                feedback.email,
                feedback.name,
                status,
                feedback.message
            );

            logger.info(
                `Feedback status updated for ${id} and email sent successfully`
            );

            return res.redirect("/api/feedback");
        } catch (err) {
            logger.error(err.message);
            next(err);
        }
    }

    // =========================
    // FEEDBACK DETAILS
    // ADMIN
    // =========================

    async getFeedbackDetails(req, res, next) {
        try {
            const { id } = req.params;

            const feedback =
                await this.feedbackRepo.getFeedbackByID(id);

            if (!feedback) {
                return res.status(404).render(
                    "feedback",
                    {
                        title: "Feedback Page",
                        errors: ["Feedback not found"],
                        oldData: {},
                        feedback: []
                    }
                );
            }

            return res.render(
                "feedbackDetails",
                {
                    title: "Feedback Details",
                    feedback,
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
    // FILTER FEEDBACK
    // ADMIN
    // =========================

    async filterFeedback(req, res, next) {
        try {
            const {
                email,
                status,
                messageType
            } = req.query;

            const feedback =
                await this.feedbackRepo.filterFeedback(
                    email,
                    status,
                    messageType
                );

            return res.render(
                "feedback",
                {
                    title: "Feedback Page",
                    feedback,
                    errors: [],
                    oldData: req.query
                }
            );
        } catch (err) {
            logger.error(err.message);
            next(err);
        }
    }
}