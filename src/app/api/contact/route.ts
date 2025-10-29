import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { name, phone, dob, college, course, skills, message, email } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        dob: dob ? new Date(dob) : null,
        college,
        course,
        skills,
        message,
        password: "N/A", 
      },
    });

    return NextResponse.json({ message: "Contact saved", user }, { status: 201 });
  } catch (error) {
    console.error("Contact error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
