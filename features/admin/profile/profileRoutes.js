import express from 'express';
import profileController from './profileController.js';
import { upload } from '../../../middleware/fileUploadMiddleware.js';

const profileRoute=express.Router();
const profilesController=new profileController();

profileRoute.get('/',(req,res,next)=>{
profilesController.getProfile(req,res,next)
})
profileRoute.post('/update',upload.single('image'),(req,res,next)=>{
profilesController.updateProfile(req,res,next)
})


export default profileRoute