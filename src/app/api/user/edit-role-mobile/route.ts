import { auth } from "@/auth";
import { ApiError } from "@/lib/ApiError";
import { ApiResponse } from "@/lib/ApiResponse";
import { asyncHandler } from "@/lib/asyncHandler";
import connectDb from "@/lib/db";
import User from "@/models/user.model";


export const POST = asyncHandler(async (req: Request) => {
  await connectDb();

  const session = await auth();
  if (!session?.user?.email) {
    throw new ApiError(401, "Unauthorized");
  }

  const { role, mobile } = await req.json();

  const user = await User.findOneAndUpdate(
    { email: session.user.email },
    { role, mobile },
    { new: true }
  );

  return Response.json(
    new ApiResponse(200, user, "User updated successfully")
  );
});

