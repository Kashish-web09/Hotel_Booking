import jwt from 'jsonwebtoken'
import userRepo from "./userRepository.js";
import bcrypt from 'bcrypt'
export default class userController{
    constructor(){
        this.userRepo=new userRepo();
    }

    async getLogin(req,res,next){
try {
    return res.render('login',{
        title:"Login Page",
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

}

