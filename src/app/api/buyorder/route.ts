import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const { amount, customer } = await req.json();

    // 🧾 Create order payload for Cashfree
    const response = await axios.post(
      process.env.CASHFREE_BASE_URL!,
      {
        order_amount: amount,
        order_currency: "INR",
        customer_details: {
          customer_id: customer.id,
          customer_name: customer.name,
          customer_email: customer.email,
          customer_phone: customer.phone,
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
    console.error("Error creating Cashfree order:", error.response?.data || error.message);
    return NextResponse.json({ error: "Payment order creation failed" }, { status: 500 });
  }
}
