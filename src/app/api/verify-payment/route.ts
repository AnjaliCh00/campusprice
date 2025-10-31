// /app/api/verify-payment/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { PrismaClient } from "@/generated/prisma";
import { verifyToken } from "@/utils/jwt";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
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

    const { order_id } = await req.json();

    // ✅ 1. Verify payment from Cashfree
    const verifyResponse = await axios.get(
      `https://sandbox.cashfree.com/pg/orders/${order_id}`,
      {
        headers: {
          "x-client-id": process.env.CASHFREE_APP_ID!,
          "x-client-secret": process.env.CASHFREE_SECRET_KEY!,
          "x-api-version": "2023-08-01",
        },
      }
    );
    console.log(verifyResponse);
    const payments = verifyResponse.data;
    const latestPayment = payments[0];

    // ✅ 2. Check if payment was successful
    if (latestPayment.order_status === "PAID") {
      // ✅ 3. Save in DB
      await prisma.payment.create({
        data: {
          orderId: order_id,
          amount: latestPayment.order_amount,
          status: "SUCCESS",
          paymentId: latestPayment.cf_payment_id,
          currency: "INR",
          method: latestPayment.payment_group || "UNKNOWN",
          transactionTime: new Date(latestPayment.payment_time),

          // ✅ Link payment with the user
          user: {
            connect: { id: payload.userId },
          },
        },
      });

      return NextResponse.json({
        success: true,
        message: "Payment verified and saved.",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Payment not completed yet.",
      });
    }
  } catch (error: any) {
    console.error(
      "Error verifying payment:",
      error.response?.data || error.message
    );
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
