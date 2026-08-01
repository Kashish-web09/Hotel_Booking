import jwt from "jsonwebtoken";
// import userRepo from "../features/userAuth/userRepository.js";

// const repo = new userRepo();

export const currentUser =  (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        res.locals.isLogin = false;
        return next();
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
req.userId=payload.userId;
res.locals.isLogin=true;
next();
    } catch (err) {
        req.clearCookie('token')
                return res.redirect('/api/auth/login')
    }

};