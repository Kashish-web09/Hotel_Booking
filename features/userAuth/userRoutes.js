import express from 'express';
import userController from './userController.js';
import { upload } from '../../middleware/fileUploadMiddleware.js';
import { userLoginRules,userRegisterRules,forgotPassRules,resetPassrules } from './userValidation.js';
import { validator } from '../../middleware/commonValidation.js';
const userAuth=express.Router();
const userControllerAuth=new userController();

userAuth.get('/login',(req,res,next)=>{
    userControllerAuth.getLogin(req,res,next)
})
userAuth.post('/login',validator(userLoginRules,'login'),(req,res,next)=>{
    userControllerAuth.login(req,res,next)
})
userAuth.get('/register',(req,res,next)=>{
    userControllerAuth.getRegister(req,res,next)
})
userAuth.post('/register',upload.single('image'),validator(userRegisterRules,'register'),(req,res,next)=>{
    userControllerAuth.register(req,res,next)
})
userAuth.get('/forgot-pass',(req,res,next)=>{
    userControllerAuth.forgotPassPage(req,res,next)
});
userAuth.post('/forgot-pass',validator(forgotPassRules,'forgotPass'),(req,res,next)=>{
    userControllerAuth.forgotPass(req,res,next)
});
userAuth.get('/reset-pass/:token',(req,res,next)=>{
    userControllerAuth.resetPassPage(req,res,next)
})
userAuth.post('/reset-pass/:token',validator(resetPassrules,'resetPass'),(req,res,next)=>{
    userControllerAuth.resetPass(req,res,next)
})
export default userAuth;