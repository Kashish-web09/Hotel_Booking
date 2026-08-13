import express from 'express';
import paymentController from './paymentController.js';

const paymentRoutes=express.Router();
const paymentsController=new paymentController();

paymentRoutes.get('/',(req,res,next)=>{
    paymentsController.getPaymentPage(req,res,next)
})
paymentRoutes.post('/',(req,res,next)=>{
    paymentsController.createPayment(req,res,next)
})
paymentRoutes.post('/refund',(req,res,next)=>{
    paymentsController.payentRefund(req,res,next)
})
export default paymentRoutes;