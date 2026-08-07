import express from 'express';
import { currentUser } from '../../../middleware/jwtAuthMiddleware.js';
import dashController from "./dashController.js";
const dashRoutes=express.Router();
const dashboardController=new dashController()
dashRoutes.get('/',currentUser,(req,res,next)=>{
    dashboardController.getDashborad(req,res,next)
})
dashRoutes.get('/about-us',(req,res,next)=>{
    dashboardController.aboutUsPage(req,res,next)
})
export default dashRoutes