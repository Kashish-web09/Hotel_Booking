import { feedbackSent } from '../../../emailService/emailServices.js';
import logger from '../../../middleware/loggerMiddleware.js';
import feedbackRepo from './contactRepository.js'
// import adminUserRepo from '../../admin/adminAuth/adminRepository.js'
export default class feedbackController{
    constructor(){
        this.feedbackRepo=new feedbackRepo();
        // this.adminUserRepo=new adminUserRepo();
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
async feedback(req, res, next) {
    try {
        const {
            name,
            email,
            phoneNo,
            messageType,
            message
        } = req.body;

        if (req.validationErrors) {
            return res.render('guest/contact', {
                title: "Feedback",
                errors: req.validationErrors,
                oldData: req.body
            });
        }
        // const admin=await this.adminUserRepo.findUserByEmail(
        //     process.env.ADMIN_EMAIL
        // )

        const contact = {
            name,
            email,
            phoneNo,
            messageType,
            message,
            adminId:admin._id
        };
        
        // Save feedback to database
        await this.feedbackRepo.createFeedback(contact);
await feedbackSent(process.env.ADMIN_EMAIL,name);

        return res.redirect("/api/guest/feedback");

    } catch (err) {
        logger.error(err.message);
        next(err);
    }
}
}