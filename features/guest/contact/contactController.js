import logger from '../../../middleware/loggerMiddleware.js';
import feedbackRepo from './contactRepository.js'
export default class feedbackController{
    constructor(){
        this.feedbackRepo=new feedbackRepo();
    }

    async feedbackPage(req,res,next){
try{
            return res.render('guest/contact',{
            title:"Feedback",
            errors:{},
            oldData:req.body
                })
}catch(err){
    logger.error(err.message);
    next(err)
}
    }
async feedback(req,res,next){
    try {


        const {name,email,phoneNo,messageType,message} = req.body;
        const contact={
            name,
            email,
            phoneNo,
            messageType,
            message
        }
        await this.feedbackRepo.createFeedback(contact);
        return res.redirect("/api/hotel/feedback");

    } catch(err){
        logger.error(err.message);
        next(err);
    }
}}