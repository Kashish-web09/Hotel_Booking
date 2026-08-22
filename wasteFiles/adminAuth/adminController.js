import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import adminUserRepo from './adminRepository.js';
import logger from '../../../middleware/loggerMiddleware.js';
import { adminUserRegister, resetLinkSent } from '../../../emailService/emailServices.js';
export default class adminUserController{
    constructor(){
        this.adminUserRepo=new adminUserRepo();
    }


    
    async registerPage(req,res,next){
        try {
            return res.render('admin/register',{
                title:"Register Page",
                errors:[],
                oldData:{}
            })
        } catch (err) {
            logger.error(err.message);
            next(err)
        }
    }
        async register(req,res,next){
        try {
                         if (req.validationErrors) {
            return res.status(400).render("admin/register", {
                title: "Register Page",
                errors: req.validationErrors,
                oldData: req.body
            });
        }

            const {name,email,password,confirmPassword}=req.body;
            const user=await this.adminUserRepo.findUserByEmail(email);
            if(user){
                logger.warn(`Admin already exists ${email}`)
                return res.render('admin/register',{
                    title:"Register",
                    errors:[],
                    oldData:req.body
                })
            }
            if(password!==confirmPassword){
logger.warn("Password do not match");
                return res.render('admin/register',{
                    title:"Register",
                    errors:[],
                    oldData:req.body
                })
            }
            const hashedPasswrod=await bcrypt.hash(password,12);
            const image=req.file ? req.file.filename : 'default.png';
const newUser={
name,
email,
password:hashedPasswrod,
image

}
await this.adminUserRepo.register(newUser);
logger.info(`Admin account created ${newUser.email}`)
await adminUserRegister(newUser.email,newUser.name)
return res.redirect('/api/admin/dashboard')
        } catch (err) {
            logger.error(err.message);
            next(err)
        }
    }
    async loginPage(req,res,next){
        try {
            return res.render('admin/login',{
                title:"Login Page",
                errors:[],
                oldData:{},
            })
        } catch (err) {
            logger.error(err.message);
            next(err)
        }
    }
        async login(req,res,next){
        try {
             if (req.validationErrors) {
            return res.status(400).render("admin/login", {
                title: "Login Page",
                errors: req.validationErrors,
                oldData: req.body
            });
        }
          const {email,password}=req.body;
          const user=await this.adminUserRepo.findUserByEmail(email);

          if(!user){
            logger.warn(`Invalid email id:${email}`);
            return res.render('admin/login',{
                title:"Login Page",
                errors:[{msg:"Email not registered"}],
                oldData:{email},
            })
          }
          const isMatch=await bcrypt.compare(password,user.password);
          if(!isMatch){
                        logger.warn(`Invalid email id:${email}`);
            return res.render('admin/login',{
                title:"Login Page",
                errors:[{msg:"Invalid Password retry..."}],
                oldData:{email},
            })

          }
          const jwtToken=jwt.sign(
            {
                adminId:user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn:'1d'
            }
          );
          res.cookie("adminToken",jwtToken,{
httpOnly:true,
maxAge:24*60*60*1000
          });
          logger.info(`Admin login in: ${email}`)
          return res.redirect('/api/admin/dashboard')
        } catch (err) {
            logger.error(err.message);
            next(err)
        }
    }
    async logout(req,res,next){
        try {
            res.clearCookie('adminToken');
            logger.info('Admin logout');
            return res.redirect('/api/admin/login')
        } catch (err) {
                        logger.error(err.message);
            next(err)

        }
    }
    async forgotPassPage(req,res,next){
        try {
            return res.render('admin/forgotPass',{
                title:"Forgot Passwrod Page",
                errors:[],
                oldData:req.body
            })
        } catch (err) {
            logger.error(err.message);
            next(err)
        }
    }

    async forgotPass(req,res,next){
        try {
            if(req.validationErrors){
                return res.render('admin/forgotPass',{
                    title:"Forgot Password Page",
                    errors:req.validationErrors,
                    oldData:req.body
                })
            }
            const {email}=req.body;
            const user=await this.adminUserRepo.forgotPass(email);
            if(!user){
                logger.warn(`Password reset requested for unknown email: ${email}`);
                                return res.status(400).render("admin/forgotPass", {
                    title: "Forgot Password Page",
                    errors: [{ msg: "User email not found!" }],
                    oldData: {}
                });

            };
            const token=crypto.randomBytes(32).toString('hex');
            const expiry=Date.now()+15*60*1000;
            await this.adminUserRepo.saveResetPass(email,token,expiry);
            const resetUrl=`http://localhost:9090/api/admin/reset-pass/${token}`
                        logger.info(`Password reset token generated for: ${email}`);
            await resetLinkSent(user.email,user.name,resetUrl);
  return res.render("admin/forgotPass", {
            title: "Forgot Password Page",
            errors: [{ msg: "Password reset link has been sent to your email." }],
            oldData: {}
        });            
        } catch (err) {
            logger.error(err.message);
            next(err)
        }
    }
        async resetPassPage(req,res,next){
        try {
            const {token}=req.params
                        return res.render('admin/resetPass',{
                title:"Reset Passwrod Page",
                token,
                errors:[],
                oldData:{}
            })

        } catch (err) {
            logger.error(err.message);
            next(err)
        }
    }

async resetPass(req, res, next) {
    try {
        const { password } = req.body;
        const { token } = req.params;

        if (req.validationErrors) {
            return res.render('admin/resetPass', {
                title: "Reset Password Page",
                token,
                errors: req.validationErrors,
                oldData: req.body
            });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await this.adminUserRepo.resetPass(
            token,
            hashedPassword
        );

        if (result.modifiedCount === 0) {
            logger.warn(`Invalid or expired reset token: ${token}`);

            return res.status(400).render("admin/resetPass", {
                title: "Reset Password Page",
                token,
                errors: [{ msg: "Invalid or expired link" }],
                oldData: {}
            });
        }

        // Password successfully updated
        logger.info("Password reset successful");

        return res.redirect("/api/admin/login");

    } catch (err) {
        logger.error(err.message);
        next(err);
    }
}
    
}