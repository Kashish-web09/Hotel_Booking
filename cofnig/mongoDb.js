import { MongoClient } from "mongodb";


let client;
export const connectToDb=()=>{
MongoClient.connect(process.env.DB_URL).then((clientInstance)=>{
    client=clientInstance;
    console.log("MongoDb connected");
}).catch((err)=>{
    console.log(err)
})
}


export const getDB=()=>{
    return client.db();
}