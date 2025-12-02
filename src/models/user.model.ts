import mongoose from "mongoose";
interface IUser{
    _id?:mongoose.Types.ObjectId
    name:String
    email:String
    password?:String
    mobile:String
    role: "user" | "deliveryBoy" | "admin"

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

 }
},{timestamps:true})

const User =  mongoose.models.User || mongoose.model("User", userSchema)

export default User