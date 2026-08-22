import express from 'express';
import { currentUser } from '../../../middleware/jwtAuthMiddleware.js';
import dashController from "./dashController.js";
import { authorize } from '../../../middleware/adminMiddleware.js';
const dashRoutes=express.Router();
const dashboardController=new dashController()
dashRoutes.get('/',currentUser,authorize("Guest"),(req,res,next)=>{
    dashboardController.getGuestDashboard(req,res,next)
})
dashRoutes.get(
    "/admin/dashboard",
    currentUser,
    authorize("Admin"),
    (req, res, next) => {
        dashboardController.getAdminDashboard(req, res, next);
    }
);

dashRoutes.get('/about-us',(req,res,next)=>{
    dashboardController.aboutUsPage(req,res,next)
})
export default dashRoutes