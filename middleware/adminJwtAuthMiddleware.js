import jwt from 'jsonwebtoken';


export const adminUser=(req,res,next)=>{
const token=req.cookies.adminToken;
if(!token){
    res.locals.isLogin=false;
  return  next();
}

try {
    const payload=jwt.verify(token,process.env.JWT_SECRET);
    req.adminId=payload.adminId;
    res.locals.isLogin=true;
    
    next();
} catch (err) {
    res.clearCookie('adminToken')
                    return res.redirect('/api/admin/login')

}
}