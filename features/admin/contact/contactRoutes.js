import express from 'express'
import contactController from './contactController.js'

const feedbackRoute=express.Router();
const feedbackController=new contactController();

feedbackRoute.get('/',(req,res,next)=>{
    feedbackController.getFeedbackPage(req,res,next)
})
feedbackRoute.get('/filter',(req,res,next)=>{
    feedbackController.filterFeedback(req,res,next)
})

feedbackRoute.post('/update-status/:id',(req,res,next)=>{
    feedbackController.updateStatus(req,res,next)
})

feedbackRoute.get('/:id',(req,res,next)=>{
    feedbackController.getFeedbackDetails(req,res,next)
})

export default feedbackRoute;