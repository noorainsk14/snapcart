import  mongoose  from 'mongoose';
const MONGDB_URI= process.env.MONGODB_URI

if(!MONGDB_URI){
    throw new Error("MONGODB_URI Error.")
}

let cached = global.mongoose

if(!cached){
    cached = global.mongoose = {conn:null, promise:null}
}

const connectDb = async () => {
    if(cached.conn){
        return cached.conn
    }
    if(!cached.promise){
        cached.promise = mongoose.connect(MONGDB_URI).then((conn) => conn.connection)
    }
    try {
        const conn = await cached.promise
        return conn
    }
     catch (error) {
        console.log(error);
        
        
    }

}

export default connectDb