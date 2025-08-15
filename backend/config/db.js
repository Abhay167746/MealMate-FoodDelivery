import mongoose from "mongoose";

export const connectDB= async ()=>{
  await mongoose.connect('mongodb+srv://tiwariabhay7978:54321@cluster0.2cj4con.mongodb.net/food-del').then(()=>console.log("DB Connected"));
}