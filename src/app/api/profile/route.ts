import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// ✅ GET API → fetch user data by email
export async function GET(req: Request) {
  try {
   
const user = prisma.user.findUnique(id)


    if (rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(rows[0], { status: 200 });
  } catch (error) {
    console.error("GET /api/profile error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
