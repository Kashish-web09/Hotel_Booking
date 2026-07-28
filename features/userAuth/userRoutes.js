import express from 'express';
import userController from './userController.js';
import { upload } from '../../middleware/fileUploadMiddleware.js';
import { userLoginRules,userRegisterRules } from './userValidation.js';
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

export default userAuth;