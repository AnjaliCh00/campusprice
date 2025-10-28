import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// ✅ GET API → fetch user data by id
export async function GET(req: Request) {
  try {
    // Get user id from query parameter
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    // ✅ Find user by ID
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // ✅ Exclude sensitive fields like password
    const { password, ...safeUser } = user;
    return NextResponse.json(safeUser, { status: 200 });

  } catch (error) {
    console.error("GET /api/profile error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
