import express from 'express';
import paymentController from './paymentController.js';
const paymentRoute=express.Router();
const paymentsController=new paymentController();

paymentRoute.get('/',(req,res,next)=>{
    paymentsController.getAllPayemnts(req,res,next)
})
paymentRoute.get('/search',(req,res,next)=>{
    paymentsController.searchPayment(req,res,next)
})
paymentRoute.post('/update',(req,res,next)=>{
    paymentsController.updatePayment(req,res,next)
})
paymentRoute.post('/refund',(req,res,next)=>{
    paymentsController.refundPayment(req,res,next)
})
export default paymentRoute;