"use client";

import { useEffect, useState } from "react";

export default function PaymentSuccessPage() {
  const [status, setStatus] = useState("Verifying payment...");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const order_id = params.get("order_id");

        if (!order_id) {
          setStatus("❌ Invalid or missing order ID.");
          return;
        }

        const res = await fetch("/api/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ order_id }),
        });

        const data = await res.json();

        if (!res.ok) {
          setStatus(`⚠️ Server error: ${data.error || "Verification failed"}`);
          return;
        }

        if (data.success) {
          setStatus("✅ Payment verified successfully!");
          setIsSuccess(true);
        } else {
          setStatus(`❌ Payment pending or failed. ${data.message || ""}`);
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
        setStatus("⚠️ Something went wrong during verification.");
      }
    };

    verifyPayment();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      {isSuccess ? (
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl font-bold text-green-600 mb-4">
            🎉 Thank You for Your Order!
          </h1>
          <p className="text-lg text-gray-700 mb-2">
            Your payment was successful, and your order is confirmed.
          </p>
          <p className="text-gray-500">
            You’ll receive an email confirmation shortly.
          </p>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-600 mb-4">
            Payment Status
          </h1>
          <p className="text-lg text-gray-700">{status}</p>
        </div>
      )}
    </div>
  );
}
