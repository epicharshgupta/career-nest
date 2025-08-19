import mongoose from "mongoose";

export const connectDb=async() => {
    try{
        await mongoose.connect(process.env.MONGODB_URl)
        console.log('Mongo db connected successfully')
    }catch(error){
        console.log(error)
    }
}