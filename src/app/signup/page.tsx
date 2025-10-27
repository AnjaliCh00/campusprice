"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast"; 

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  // ✅ Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("⚠️ Passwords do not match!");
      
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "signup/json", // ✅ correct header
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Signup failed:", data);
        toast.error(data.error || "❌ Signup failed. Please try again.");
        return;
      }

      console.log("Signup successful:", data);
      toast.success("✅ Signup successful!");
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error("⚠️ Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ✅ Toast container — handles showing popups */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#1e293b", // slate-800
            color: "#fff",
            border: "1px solid #334155", // subtle border
            padding: "12px 16px",
            borderRadius: "10px",
          },
          success: {
            iconTheme: {
              primary: "#22c55e", // green-500
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444", // red-500
              secondary: "#fff",
            },
          },
        }}
      />

      <section className="min-h-screen flex items-center justify-center bg-slate-900 px-6 py-20">
        <div className="bg-slate-800 shadow-2xl rounded-2xl p-8 w-full max-w-md border border-slate-700">
          <h2 className="text-3xl font-bold text-white text-center mb-6 font-[Poppins]">
            Create an Account
          </h2>
          <p className="text-gray-400 text-center mb-8">
            Join us and start your journey today
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-gray-300">
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Your full name"
                value={form.name}
                onChange={handleChange}
                className="bg-slate-700 border-slate-600 text-white placeholder-gray-400"
                required
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-gray-300">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@email.com"
                value={form.email}
                onChange={handleChange}
                className="bg-slate-700 border-slate-600 text-white placeholder-gray-400"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-300">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="bg-slate-700 border-slate-600 text-white placeholder-gray-400"
                required
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-gray-300">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={form.confirmPassword}
                onChange={handleChange}
                className="bg-slate-700 border-slate-600 text-white placeholder-gray-400"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>

          <p className="text-gray-400 text-center mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-400 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default Signup;
