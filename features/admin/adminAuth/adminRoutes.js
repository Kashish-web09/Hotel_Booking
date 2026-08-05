import express from 'express';
import adminUserController from './adminController.js';
import validator from '../../../middleware/commonValidation.js';
import { registerRules,loginRule,resetPassRules,forgotPassRules } from './adminValidation.js';
import { upload } from '../../../middleware/fileUploadMiddleware.js';

const adminUserRoutes=express.Router();
const adminController=new adminUserController();



adminUserRoutes.get('/register',(req,res,next)=>{
    adminController.registerPage(req,res,next)
})
adminUserRoutes.post('/register',upload.single('image'),validator(registerRules,'admin/register'),(req,res,next)=>{
    adminController.register(req,res,next)
})

adminUserRoutes.get('/login',(req,res,next)=>{
    adminController.loginPage(req,res,next)
})

adminUserRoutes.post('/login',validator(loginRule,'admin/login'),(req,res,next)=>{
    adminController.login(req,res,next)
})
adminUserRoutes.get('/forgotPass',(req,res,next)=>{
    adminController.forgotPassPage(req,res,next)
})

adminUserRoutes.post('/forgotPass',validator(forgotPassRules,'admin/forgotPass'),(req,res,next)=>{
    adminController.forgotPass(req,res,next)
})
adminUserRoutes.get('/reset-pass/:token',(req,res,next)=>{
    adminController.resetPassPage(req,res,next)
})
adminUserRoutes.post('/reset-pass/:token',validator(resetPassRules,'admin/resetPass'),(req,res,next)=>{
    adminController.resetPass(req,res,next)
})
adminUserRoutes.get('/logout',(req,res,next)=>{
    adminController.logout(req,res,next)
})
export default adminUserRoutes;