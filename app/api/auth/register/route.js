import { emailVerificationLink } from "@/email/emailVerificationLink";
import { connectDB } from "@/lib/database";
import { catchError, response } from "@/lib/helperFunction";
import { sendMail } from "@/lib/sendMail";
import { zSchema } from "@/lib/zodSchema";
import UserModel from "@/models/user.model";
import { SignJWT } from "jose";



export async function POST(request) {
  try {
    await connectDB();
    // validation Schema
    const validationSchema = zSchema.pick({
      name: true, email: true, password: true,
    });

    const payload = await request.json();
    const validateData = validationSchema.safeParse(payload);

    if (!validateData.success) {
      return response(false,401,"Invalid or missing input Field",validateData.error);
    }

    const { name, email, password } = validateData.data;

    //   check alreay register user with email
    const checkUser = await UserModel.exists({ email });
    if (checkUser) {
      return response(false, 409, "User already Registered!");
    }

    //New Registeration
    const NewRegisteretaion = new UserModel({ name, email, password });
    await NewRegisteretaion.save();

    const secret = new TextEncoder().encode(process.env.SECRET_KEY);

    const token = await new SignJWT({ userId: NewRegisteretaion._id })
      .setIssuedAt()
      .setExpirationTime("1h")
      .setProtectedHeader({ alg: "HS256" })
      .sign(secret);

    await sendMail("Email verfication req from jahid",email,emailVerificationLink(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email/${token}`),
    );
    return response(true,200,"Registration Success. Please verify your email address.");
  } catch (error) {
     return catchError(error);
  }
}
