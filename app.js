// npm packages
import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import ejs from 'ejs';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { connectToMongoose } from './cofnig/mongoose.js';
import expressEjsLayouts from 'express-ejs-layouts';
// features routes 
import { currentUser } from './middleware/jwtAuthMiddleware.js';
import feedbackRoutes from './features/guest/contact/contactRoutes.js';
import userAuth from './features/guest/userAuth/userRoutes.js';
import adminUserRoutes from './features/admin/adminAuth/adminRoutes.js';
import { adminUser } from './middleware/adminJwtAuthMiddleware.js';
import feedbackRoute from './features/admin/contact/contactRoutes.js';
import roomRoutes from './features/admin/rooms/roomsRoutes.js';
import roomRoute from './features/guest/rooms/roomsRoutes.js';
import bookingRoutes from './features/guest/booking/bookingRoutes.js';
import dashRoutes from './features/guest/dashboard/dashRoutes.js';
import bookingRoute from './features/admin/booking/bookingRoutes.js';
import adminDashRoutes from './features/admin/adminDashboard/adminDashboardRoutes.js';
import hotelRoutes from './features/admin/hotel/hotelRoutes.js';
import hotelRoute from './features/guest/hotel/hotelRoutes.js';
import profileRoutes from './features/guest/profile/profileRoutes.js';
const app=express();
let corsOption={
    origin:`http://127.0.0.1:5500`
}
//middlewares
app.use(cors(corsOption))
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
app.use((req,res,next)=>{

    res.locals.isLogin = false;
    
    next();

});
// View Engine
app.use(expressEjsLayouts)

app.set("view engine",'ejs');
app.set("views",'./views')
app.use((req, res, next) => {

    if (req.originalUrl.startsWith("/api/admin")) {
        res.locals.layout = "layout/adminLayout";
    } else {
        res.locals.layout = "layout/layout";
    }

    next();
});
app.use(express.static('./public'));
app.use('/uploads',express.static("uploads"))
// make user availabe to every view
app.use((req,res,next)=>{
    res.locals.user=req.user||null;
    next()
})


// guest routes
app.use('/api/auth',userAuth);
app.use('/',dashRoutes)
app.use('/api/guest/profile',currentUser,profileRoutes)
app.use('/api/guest/feedback',currentUser,feedbackRoutes)
app.use('/api/guest/hotel',currentUser,hotelRoute)
app.use('/api/guest/rooms',currentUser,roomRoute)
app.use('/api/guest/booking',currentUser,bookingRoutes)
// admin routes
app.use('/api/admin',adminUserRoutes) 

app.use('/api/admin/dashboard',adminUser,adminDashRoutes)
app.use('/api/admin/feedback',adminUser,feedbackRoute)
app.use('/api/admin/hotel',adminUser,hotelRoutes)
app.use('/api/admin/rooms',adminUser,roomRoutes)
app.use('/api/admin/booking',adminUser,bookingRoute)
const startServer = async () => {
    await connectToMongoose();

    app.listen(9090, () => {
        console.log("Server running at http://localhost:9090");
    });
};

startServer();