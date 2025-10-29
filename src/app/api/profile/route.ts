import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { verifyToken } from "@/utils/jwt";

const prisma = new PrismaClient();

// ✅ GET API → fetch user data by id
export async function GET(req: NextRequest) {
  try {
    // Get token from cookies
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify token
    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch user data from database
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        dob: true,
        college: true,
        course: true,
        skills: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("GET /api/profile error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// ✅ PUT API → update user profile
export async function PUT(req: NextRequest) {
  try {
    // Get token from cookies
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify token
    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get update data from request body
    const { name, email, phone, dob, college, course, skills } = await req.json();

    // Update user in database
    const updatedUser = await prisma.user.update({
      where: { id: payload.userId },
      data: {
        name,
        email,
        phone: phone || null,
        dob: dob ? new Date(dob) : null,
        college: college || null,
        course: course || null,
        skills: skills || null,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        dob: true,
        college: true,
        course: true,
        skills: true,
        createdAt: true,
        updatedAt: true,
      }
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("PUT /api/profile error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
