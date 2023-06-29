import mongoose from "mongoose";


export const connectDB=(url)=>{
    mongoose.set("strictQuery",true)
    mongoose.connect(url).then(()=>{
        console.log('connected successfull');
    }).catch((err)=>{
        console.log(err);
    })
}