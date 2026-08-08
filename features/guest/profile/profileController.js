import profileRepo from "./profileRepository.js";
import logger from '../../../middleware/loggerMiddleware.js'

export default class profileController{
    constructor(){
        this.profileRepo=new profileRepo();
    }
    async getProfile(req,res,next){
        try {
            const userId=req.userId;
            const user=await this.profileRepo.getProfile(userId);
            return res.render('guest/profile',{
                title:"Guest Profile Page",
                user,
                errors:[],
                oldData:{}
            })
        } catch (err) {
            logger.error(err.message)
            next(err)
        }
    }

    
    async updateProfile(req,res,next){
        try {
            const userId=req.userId
            const {name,email,phoneNo}=req.body;
            const image=req.file ? req.file.filename : "default.png"
            await this.profileRepo.updateProfile(userId,{name,email,phoneNo,image});
return res.redirect('/');
        } catch (err) {
                        logger.error(err.message)
            next(err)

        }
    }
}