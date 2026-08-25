// npm packages
import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import ejs from 'ejs';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { connectToMongoose } from './cofnig/mongoose.js';
import expressEjsLayouts from 'express-ejs-layouts';
import swagger from 'swagger-ui-express';
// features routes 
import { currentUser } from './middleware/jwtAuthMiddleware.js';
import feedbackRoutes from './features/guest/contact/contactRoutes.js';
import userAuth from './features/guest/userAuth/userRoutes.js';
// import adminUserRoutes from './features/admin/adminAuth/adminRoutes.js';
// import { adminUser } from './middleware/adminJwtAuthMiddleware.js';
// import feedbackRoute from './features/contact/contactRoutes.js';
// import roomRoutes from './features/admin/rooms/roomsRoutes.js';
import roomRoute from './features/guest/rooms/roomsRoutes.js';
import bookingRoutes from './features/guest/booking/bookingRoutes.js';
import dashRoutes from './features/guest/dashboard/dashRoutes.js';
// import bookingRoute from './features/admin/booking/bookingRoutes.js';
// import adminDashRoutes from './features/admin/adminDashboard/adminDashboardRoutes.js';
// import hotelRoutes from './features/admin/hotel/hotelRoutes.js';
import hotelRoute from './features/guest/hotel/hotelRoutes.js';
import profileRoutes from './features/guest/profile/profileRoutes.js';
// import profileRoute from './features/admin/profile/profileRoutes.js';
// import travelRoutes from './features/travel/travelRoutes.js';
import logger from './middleware/loggerMiddleware.js';
import apiDocs from './swagger.json' with{type:'json'}
import paymentRoutes from './features/guest/payment/paymentRoutes.js';
// import paymentRoute from './features/admin/payment/paymentRoutes.js';
import router from './aiService/aiRoutes.js';
import travelRoutes from './features/guest/travel/travelRoutes.js';
const app=express();
let corsOption={
    origin:`http://127.0.0.1:5500`
}
//middlewares
app.use(cors(corsOption))
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())

// Swagge API documentation
app.use('/api-docs',swagger.serve,swagger.setup(apiDocs))
app.use((req,res,next)=>{

    res.locals.isLogin = false;
    
    next();

});
// View Engine
app.use(expressEjsLayouts)

app.set("view engine",'ejs');
app.set("views",'./views')
app.use((req, res, next) => {
    res.locals.layout = "layout/layout";
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
app.use('/',currentUser,dashRoutes)
app.use('/api/auth/profile',currentUser,profileRoutes)
app.use('/api/feedback',currentUser,feedbackRoutes)
app.use('/api/hotel',currentUser,hotelRoute)
app.use('/api/rooms',currentUser,roomRoute)
app.use('/api/payment',currentUser,paymentRoutes)
app.use('/api/booking',currentUser,bookingRoutes)
app.use('/api/travel',currentUser,travelRoutes)
// admin routes
// app.use('/api/admin',adminUserRoutes) 

// app.use('/api/dashboard/admin',adminUser,adminDashRoutes)
// app.use('/api/admin/profile',adminUser,profileRoute)
// app.use('/api/feedback',adminUser,feedbackRoute)
// app.use('/api/admin/hotel',adminUser,hotelRoutes)
// app.use('/api/admin/payment',adminUser,paymentRoute)
// app.use('/api/admin/rooms',adminUser,roomRoutes)
// app.use('/api/travel',adminUser,travelRoutes)
// app.use('/api/admin/booking',adminUser,bookingRoute);


//ai prompt

app.use('/api/ai',router)

// error handler page

app.use((req,res,next)=>{
    res.status(404).render('errorPages/404Error',{
        title:"404- Page Not Found"
    })
})

app.use((err,req,res,next)=>{
    logger.error(err.stack);
    res.status(500).render('errorPages/500Error',{
        title:"500- Internal Server Error"
    })
})
const startServer = async () => {
    await connectToMongoose();

    app.listen(9090, () => {
        console.log("Server running at http://localhost:9090");
    });
};

startServer();