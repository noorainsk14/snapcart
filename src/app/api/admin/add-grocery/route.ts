import { auth } from "@/auth";
import { ApiError } from "@/lib/ApiError";
import { ApiResponse } from "@/lib/ApiResponse";
import { asyncHandler } from "@/lib/asyncHandler";
import uploadOnCLoudinary from "@/lib/cloudinary";
import connectDb from "@/lib/db";
import Grocery from "@/models/grocery.model";
import { image } from "motion/react-client";


export const POST = asyncHandler(async(req:Request) => {
    await connectDb();

    const session = await auth();

    if(session?.user?.role !== "admin"){
        throw new ApiError(400, "You are not admin")
    }

    const formData = await req.formData();
    const name = formData.get("name") as string
    const category = formData.get("category") as string
    const unit = formData.get("unit") as string
    const price = formData.get("price") as string
    const file = formData.get("image") as Blob | null

    let imageUrl
    if(file){
        imageUrl = await uploadOnCLoudinary(file)
    }
    const grocery = await Grocery.create({
        name,
        price,
        category,
        unit,
        image:imageUrl
    })

     return Response.json(
        new ApiResponse(200, grocery, "Grocery created successfully")
      );
})