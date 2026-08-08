import express from 'express'
import profileController from './profileController.js'
import { upload } from '../../../middleware/fileUploadMiddleware.js';
const profileRoutes=express.Router();
const profilesController=new profileController();

profileRoutes.get('/',(req,res,next)=>{
    profilesController.getProfile(req,res,next)
})
profileRoutes.post('/update',upload.single('image'),(req,res,next)=>{
    profilesController.updateProfile(req,res,next)
})

export default profileRoutes;