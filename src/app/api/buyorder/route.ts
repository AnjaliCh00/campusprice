import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { verifyToken } from "@/utils/jwt";
import { PrismaClient } from "@/generated/prisma";
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
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
      },
    });

    if (!user) {
      return NextResponse.json({
        sttus: 404,
      });
    }

    const { amount, customer } = await req.json();

    // 🧾 Create order payload for Cashfree
    const response = await axios.post(
      process.env.CASHFREE_BASE_URL!,
      {
        order_amount: amount,
        order_currency: "INR",
        customer_details: {
          customer_id: `customer_id-${user.id}`,
          customer_name: user.name,
          customer_email: user.email,
          customer_phone: user.phone,
        },
        order_meta: {
          return_url: `${process.env.NEXT_PUBLIC_BASE_URL}paymentsuccess?order_id={order_id}`,
          notify_url: `${process.env.NEXT_PUBLIC_BASE_URL}api/payment-webhook`,
        },
      },
      {
        headers: {
          "x-client-id": process.env.CASHFREE_APP_ID!,
          "x-client-secret": process.env.CASHFREE_SECRET_KEY!,
          "x-api-version": "2023-08-01",
          "Content-Type": "application/json",
        },
      }
    );

    // Return Cashfree response (order_id + session_id)
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error(
      "Error creating Cashfree order:",
      error.response?.data || error.message
    );
    return NextResponse.json(
      { error: "Payment order creation failed" },
      { status: 500 }
    );
  }
}
