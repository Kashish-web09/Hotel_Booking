import jwt from "jsonwebtoken";

export const currentUser =  (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        res.locals.isLogin = false;
        res.locals.role=null;
        res.locals.user=null;
        return next();
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
req.userId=payload.userId;
req.role=payload.role
res.locals.isLogin=true;
res.locals.role=payload.role;
        console.log("CURRENT USER ROLE:", res.locals.role);


next();
    } catch (err) {
        res.clearCookie('token')
                return res.redirect('/api/auth/login')
    }

};