import { connectDB } from "@/lib/database";
import { catchError, response } from "@/lib/helperFunction";
import UserModel from "@/models/user.model";
import { jwtVerify } from "jose";

export async function POST(request) {
  try {
    await connectDB();
    const { token } = await request.json();
    console.log(token);

    if (!token) {
      return response(false, 400, "Missing token.");
    }

    const secret = new TextEncoder().encode(process.env.SECRET_KEY);
    const decoded = await jwtVerify(token, secret, {
      algorithms: ["HS256"], // ✅ MUST ADD
    });
    const userId = decoded.payload.userId;

    if (!userId) {
      return response(false, 400, "Invalid userId!");
    }

    //getuser
    const user = await UserModel.findById(userId);
    if (!user) {
      return response(false, 404, "User not found!");
    }

    user.isEmailVerified = true;
    await user.save();

    return response(true, 200, "Email verification success.");
  } catch (error) {
    return catchError(error);
  }
}
