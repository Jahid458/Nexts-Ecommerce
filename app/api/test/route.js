import { connectDB } from "@/lib/database";
import { NextResponse } from "next/server";


export async function GET() {
    await connectDB()
    return NextResponse.json({
        success: true,
        message: "Database connected successfully!!"
    })
}