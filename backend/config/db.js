import mongoose, { connect } from "mongoose";

 export const connectDB=async()=>{
    
    await mongoose.connect('mongodb+srv://jiwangoyal:food900@cluster0.j70rbe3.mongodb.net/food-delivery').then(()=>console.log("Database Connected"));

}