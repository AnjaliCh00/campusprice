import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma"; 

const prisma = new PrismaClient();


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, dob, college, course, skills, message } = body;

   
    if (!name || !phone || !dob || !college || !course || !skills || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

   
    const parsedDob = new Date(dob);

  
    const contact = await prisma.contact.create({
      data: {
        name,
        phone,
        dob: parsedDob,
        college,
        course,
        skills,
        message,
      },
    });

    return NextResponse.json(
      { success: true, message: "Message saved successfully!", contact },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/contact error:", error);
    return NextResponse.json(
      { error: "Something went wrong on the server." },
      { status: 500 }
    );
  }
}
 