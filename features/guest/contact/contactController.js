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
            errors:[],
            oldData:{}
                })
}catch(err){
    logger.error(err.message);
    next(err)
}
    }
async feedback(req,res,next){
    try {
        const {name,email,phoneNo,messageType,message} = req.body;
        if(req.validationErrors){
    return res.render('guest/contact',{
                    title:"Feedback",
            errors:req.validationErrors,
            oldData:req.body

    })
}

        const contact={
            name,
            email,
            phoneNo,
            messageType,
            message
        }
        await this.feedbackRepo.createFeedback(contact);
        return res.redirect("/api/guest/feedback");

    } catch(err){
        logger.error(err.message);
        next(err);
    }
}
}