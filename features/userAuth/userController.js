
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import userRepo from "./userRepository.js";
export default class userController{
    constructor(){
        this.userRepo=new userRepo();
    }

    async getLogin(req,res,next){
try {
    return res.render('login',{
        title:"Login",
        errors:[],
        oldData:{}
    })
} catch (err) {
    next(err)
}
    }

    async login(req,res,next){
        try {
    const {email,password}=req.body;
    const result=await this.userRepo.findUserByEmail(email);
    if(!result){
                return res.status(400).render('login',{
                    title:"Login Page",
                    errors:[{msg:"Invalid email or password"}],
                    oldData:{email}
                })
    }
    const isMatch=await bcrypt.compare(password,result.password);
    if(!isMatch){
                return res.status(400).render('login',{
                    title:"Login Page",
                    errors:[{msg:"Invalid email or password"}],
                    oldData:{email}
                })

    }
    const token=jwt.sign(
        {
            userId:result._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn:'1d'
        }
)
            res.cookie("token",token,{
            httpOnly:true,
            maxAge:24*60*60*1000
        }
    )
return res.redirect("/dashboard");
} catch (err) {
    next(err)
}

    }
    async getRegister(req,res,next){
        try {
    return res.render('register',{
        title:"Register Page",
        errors:[],
        oldData:{}
    })
} catch (err) {
    next(err)
}

    }
    async register(req,res,next){
        try {
    const {name,email,phoneNo,password,confirmPassword,role}=req.body;
    const user=await this.userRepo.findUserByEmail(email);
    if(user){
return res.status(400).render("register", {
    title: "Register Page",
    errors: [{ msg: "User already exists" }],
    oldData: req.body
});
    };
    if(confirmPassword!==password){
return res.status(400).render("register", {
    title: "Register Page",
    errors: [{ msg: "Password don't match" }],
    oldData: req.body
});
    }
    const hashPassword=await bcrypt.hash(password,12);
    const image=req.file ? req.file.filename : "default.png";
    const newUser={
        name,
        email,
        phoneNo,
       password:hashPassword,
       role,
        image
    }
    await this.userRepo.register(newUser);
    return res.redirect('/api/auth/login')
} catch (err) {
    next(err)
}

    }

    async forgotPassPage(req,res,next){
try{        return res.render('forgotPass',{
            title:"Forgot Password",
            errors:[],
            oldData:{}
        })
}catch(err){
    next();
}
    }
async forgotPass(req,res,next){
try{ 
    const {email}=req.body;
const result=await this.userRepo.forgotPass(email);
if(!result){
return res.status(400).render("forgotPass", {
    title: "Forgot Passwrod Page",
    errors: [{msg:"User email not found!"}],
    oldData: {}
});
}
const token=crypto.randomBytes(32).toString('hex');
const expiry=Date.now()+15*60*1000;
await this.userRepo.saveResetToken(email,token,expiry)
return res.redirect(`/api/auth/reset-pass/${token}`)
}catch(err){
    next(err)
}
}

async resetPassPage(req,res,next){
    try {
        const {token}=req.params;
        return res.render('resetPass',{
            title:"Reset Password",
            token,
            errors:[],
            oldData:{}
        })
    } catch (err) {
        next(err)
    }
}
async resetPass(req,res,next){
try{
        const {password}=req.body;
    const {token}=req.params;
    const hashedPassword=await bcrypt.hash(password,12);
    const result=await this.userRepo.resetPass(
        token,
        hashedPassword
    )
    if(result.modifiedCount===0){
        return res.status(400).render('resetPass',{
            errors:[{msg:"Invalid or expiry link"}]
        })
    }
    return res.redirect('/api/auth/login')
}catch(err){
    next(err)
}
}
}

