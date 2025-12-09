import mongoose from "mongoose";
interface IUser{
    _id?:mongoose.Types.ObjectId
    name:string
    email:string
    password?:string
    mobile:string
    role: "user" | "deliveryBoy" | "admin"
    image?:string

}

const userSchema = new mongoose.Schema<IUser>({
 name:{
    type:String,
    required: [true, "Name is required."]
 },
 email:{
    type:String,
    required: [true, "Email is required."],
    unique:true
 },
 password:{
    type:String,
    minLength:6
 },
 mobile:{
    type:String,
    required:false
 },
 role:{
    type:String,
    enum:["user", "deliveryBoy", "admin"],
    default: "user"
 },
 image:{
   type:String
 }
},{timestamps:true})

const User =  mongoose.models.User || mongoose.model("User", userSchema)

export default User