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
import userAuth from './features/userAuth/userRoutes.js';

const app=express();
let corsOption={
    origin:`http://127.0.0.1:5500`
}
//middlewares
app.use(cors(corsOption))
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())

// View Engine
app.use(expressEjsLayouts)

app.set("view engine",'ejs');
app.set("views",'./views')
//express EJS layouts
app.set("layout","/layout/layout");
app.use((req,res,next)=>{
    res.locals.layout="layout/layout";
    next();
})
app.use(express.static('./public'));
app.use('/uploads',express.static("uploads"))
// make user availabe to every view
app.use((req,res,next)=>{
    res.locals.user=req.user||null;
    next()
})
app.get('/dashboard',(req,res,next)=>{
    return res.render('dashboard',{
title:"Dashboard Page"
    })
})


app.use('/api/auth',userAuth);

const startServer = async () => {
    await connectToMongoose();

    app.listen(9090, () => {
        console.log("Server running at http://localhost:9090");
    });
};

startServer();