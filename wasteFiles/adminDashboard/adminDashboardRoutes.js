import express from 'express'
import adminDashController from './adminDashboardController.js'

const adminDashRoutes=express.Router();
const adminController=new adminDashController();

adminDashRoutes.get('/',(req,res,next)=>{
    adminController.getDashboardPage(req,res,next)
})

export default adminDashRoutes;