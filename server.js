import dotenv from 'dotenv';
dotenv.config()

import app from "./app.js";
import { connectToMongoose } from './cofnig/mongoose.js';


const PORT=process.env.PORT;

const startServer = async () => {
try{
        await connectToMongoose();

    app.listen(PORT, () => {
        console.log(`Server running at ${PORT}`);
    });
}catch(err){
    console.error("Failed to start server",err)
    process.exit(1)
}
};

startServer();