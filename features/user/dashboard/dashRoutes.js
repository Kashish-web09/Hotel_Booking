import express from "express";

import dashController from "./dashController.js";
import { authorize } from "../../../middleware/adminMiddleware.js";

const dashRoutes = express.Router();

const dashboardController = new dashController();


// Guest Dashboard
dashRoutes.get(
    "/",
    authorize("Guest"),
    (req, res, next) => {
        dashboardController.getGuestDashboard(req, res, next);
    }
);


// Admin Dashboard
dashRoutes.get(
    "/admin",
    authorize("Admin"),
    (req, res, next) => {
        dashboardController.getAdminDashboard(req, res, next);
    }
);


// About Us
dashRoutes.get(
    "/about-us",
    (req, res, next) => {
        dashboardController.aboutUsPage(req, res, next);
    }
);

export default dashRoutes;