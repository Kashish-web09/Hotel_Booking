import express from 'express';

import dashController from "./dashController.js";
const dashRoutes=express.Router();
const dashboardController=new dashController()
dashRoutes.get('/',(req,res,next)=>{
    dashboardController.getDashborad(req,res,next)
})

export default dashRoutes