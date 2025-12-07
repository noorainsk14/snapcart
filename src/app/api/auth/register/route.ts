import { asyncHandler } from "@/lib/asyncHandler";
import { ApiError } from "@/lib/ApiError";
import { ApiResponse } from "@/lib/ApiResponse";
import connectDb from "@/lib/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";

export const POST = asyncHandler(async (req: Request) => {

    await connectDb();
  const { name, email, password } = await req.json();

 
  if (!name) throw new ApiError(400, "Name is required");
  if (!email) throw new ApiError(400, "Email is required");
  if (!password) throw new ApiError(400, "Password is required");

  const existedUser = await User.findOne({email});
  if(existedUser) throw new ApiError(400, "Email is already registered")
  if(password.length < 6) throw new ApiError(400, "Password must be atleast 6 characters")

    const hashedPassword = await bcrypt.hash(password, 10)

  
   await User.create({
    name,
    email,
    password:hashedPassword,
   
  })

  const user = {
    name,
    email,
  }

  return Response.json(
    new ApiResponse(201, user, "User registered successfully")
  );
});
