// npm packages
import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import cookieParser from 'cookie-parser';
import { connectToMongoose } from './cofnig/mongoose.js';

// features routes 
import userAuth from './features/userAuth/userRoutes.js';

const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
app.set("view engine",'ejs');
app.set("views",'./views')

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