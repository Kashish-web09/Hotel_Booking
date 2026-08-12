import profileRepo from "./profileRepository.js";
import logger from '../../../middleware/loggerMiddleware.js'
import { profileUpdate } from "../../../emailService/emailServices.js";

export default class profileController{
    constructor(){
        this.profileRepo=new profileRepo();
    }
    async getProfile(req,res,next){
        try {
            const id=req.adminId
            const user=await this.profileRepo.getProfile(id);
return res.render('admin/profile',{
    title:"Admin Profile Page",
    user,
    errors:[],
    oldDate:{}
})
        } catch (err) {
            logger.error(err.message);
            next(err)
        }
    }
    async updateProfile(req,res,next){
        try {
                        const id=req.adminId


        const { name, email } = req.body;

                    const image=req.file ? req.file.filename:'default.png';
            const data={
                name,email,image
            }
            await this.profileRepo.updateProfile(id,data);

            await profileUpdate(email,name);
            logger.info(`Admin Profile Updated ${id}`);
            res.redirect('/api/admin/dashboard')
        } catch (err) {
                        logger.error(err.message);
            next(err)

        }
    }
}
