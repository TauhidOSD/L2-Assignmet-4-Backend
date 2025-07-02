import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL as string);
        console.log('MongoDb connected Successfully');
    } catch (err){
        console.log('MongoDb connection fail',err);
        process.exit(1);
    }
}