import express from 'express';
import feedbackController from '../../guest/contact/contactController.js'
import validator from '../../../middleware/commonValidation.js'
import { feedbackRule } from './contactValidation.js';

const feedbackRoutes=express.Router();
const feedbacksController=new feedbackController();

feedbackRoutes.get('/feedback',(req,res,next)=>{
    feedbacksController.feedbackPage(req,res,next)
});
feedbackRoutes.post('/feedback',validator(feedbackRule,'contact'),(req,res,next)=>{
    feedbacksController.feedback(req,res,next)
})

export default feedbackRoutes;