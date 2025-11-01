import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const prices = await prisma.price.findMany({
      include: {
        instructor: true,
        tags: true,
      },
    });

    // Always return valid JSON
    return NextResponse.json(prices || []);
  } catch (error) {
    console.error("❌ Error in /api/price:", error);
    return NextResponse.json(
      { error: "Failed to fetch price data" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
