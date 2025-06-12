import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI! ;

if(!MONGODB_URI){
    throw new Error("Please define MONGODB_URI in env")
}

let cashed = global.mongoose

if (!cashed){
    cashed = global.mongoose ={conn: null,promise:null}
}

export async function connectToDatabase(){
    if( cached.conn ){
        return cashed.conn;
    }
    if(!cashed.promise){
        mongoose
        .connect(MONGODB_URI)
        .then(()=>mongoose.connection)
    }

    try {
        cashed.conn= await cashed.promise;
    } catch (error) {
        cashed.promise=null
        throw error
    }
}