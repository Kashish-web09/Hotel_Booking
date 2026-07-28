import jwt from 'jsonwebtoken';

export const jwtToken=(req,res,next)=>{
    // 1 read the token from brower cookeis
    const token=req.cookies.token;
    // 2 if no token user is not logged in
    if(!token){
        return res.redirect('/api/auth/login')
    }

    try {
        // 3. verify token
        const payload=jwt.verify(token,process.env.JWT_SECRET);
        // 4. save user info for later use
        req.userId=payload.userId;
        // 5. continue to the protected route
        next();
    } catch (err) {
                return res.redirect('/api/auth/login')

    }
}