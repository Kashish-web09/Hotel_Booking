// npm packages
import express from 'express';
import ejs from 'ejs';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import expressEjsLayouts from 'express-ejs-layouts';
import swagger from 'swagger-ui-express';
// features routes 
import { currentUser } from './middleware/jwtAuthMiddleware.js';
import feedbackRoutes from './features/user/contact/contactRoutes.js';
import userAuth from './features/user/userAuth/userRoutes.js';
import roomRoute from './features/user/rooms/roomsRoutes.js';
import bookingRoutes from './features/user/booking/bookingRoutes.js';
import dashRoutes from './features/user/dashboard/dashRoutes.js';
import hotelRoute from './features/user/hotel/hotelRoutes.js';
import profileRoutes from './features/user/profile/profileRoutes.js';
import logger from './middleware/loggerMiddleware.js';
import apiDocs from './swagger.json' with{type:'json'}
import paymentRoutes from './features/user/payment/paymentRoutes.js';
import router from './aiService/aiRoutes.js';
import travelRoutes from './features/user/travel/travelRoutes.js';
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
app.get('/',(req,res)=>{
        console.log("ROOT ROUTE HIT");

    res.redirect('/api/auth/login')
})



//-------------------------------------- user routes ----------------//

app.use('/api/auth',userAuth);
app.use('/dashboard',currentUser,dashRoutes)
app.use('/api/auth/profile',currentUser,profileRoutes)
app.use('/api/feedback',currentUser,feedbackRoutes)
app.use('/api/hotel',currentUser,hotelRoute)
app.use('/api/rooms',currentUser,roomRoute)
app.use('/api/payment',currentUser,paymentRoutes)
app.use('/api/booking',currentUser,bookingRoutes)
app.use('/api/travel',currentUser,travelRoutes)

//..................................ai prompt.........................//

app.use('/api/ai',router)

// ................................UI page.............................//

//............................error handler page......................//

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

export default app;