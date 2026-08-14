import feedbackRepo from "./contactRepository.js";
import logger from "../../../middleware/loggerMiddleware.js";
import { feedbackUpdate } from "../../../emailService/emailServices.js";
export default class contactController{
    constructor(){
        this.feedbackRepo=new feedbackRepo();
    }
async getFeedbackPage(req,res,next){
            try {
                const adminId=req.adminId;
                const feedback=await this.feedbackRepo.getAllFeedback(adminId);
            return res.render('admin/feedback',{
                title:"Feedback Page",
                feedback,
                errors:[],
                oldData:{}
            })
        } catch (err) {
logger.error(err.message);
            next(err)
        }

}
    async updateStatus(req,res,next){
                try {
            const {id}=req.params;
            const {status,message}=req.body;
            const feedback=await this.feedbackRepo.getFeedbackByID(id);
            if(!feedback){
                logger.warn(`Feedback not exist :${id}`);
                return res.render('admin/feedback',{
                                    title:"Feedback Page",
                                    feedback:[],
                errors:["Feedback not found!"],
                oldData:req.body

                })
            }
            await this.feedbackRepo.updateStatus(id,status);
            await feedbackUpdate(feedback.email,feedback.name,status,feedback.message)
            logger.info(`Feedback status update for ${id} and message sent successfully ${message}`);
            return res.redirect('/api/admin/feedback');
        } catch (err) {
logger.error(err.message);
            next(err)
        }

    }
    async getFeedbackDetails(req,res,next){
                try {
                    const {id}=req.params;
                    const feedback=await this.feedbackRepo.getFeedbackByID(id);
                    if(!feedback){
return res.status(404).render("admin/feedback", {
                    title: "Feedback Page",
                    errors: ["Feedback not found"],
                    oldData: {},
                    feedback: []
                });
            }
                    
            return res.render('admin/feedbackDetails',{
                title:"Feedback Details",
                feedback,
                errors:[],
                oldData:{}
            })
        } catch (err) {
logger.error(err.message);
            next(err)
        }

    }

    async filterFeedback(req,res,next){
                try {
            const {email,status,messageType}=req.query;
            const feedback=await this.feedbackRepo.filterFeedback(email,status,messageType);
                        return res.render('admin/feedback',{

                title:"Feedback Page",
                feedback,
                errors:[],
                oldData:req.body
            })

        } catch (err) {
logger.error(err.message);
            next(err)
        }

    }
}
