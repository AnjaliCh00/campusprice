"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  // ✅ Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!form.email || !form.password) {
      alert("⚠️ Please fill in both email and password!");
      return;
    }

    setLoading(true);

    try {
      console.log("Login submitted:", form);

      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "login/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("❌ Login failed:", data);
        alert(data.error || "❌ Invalid email or password!");
      } else {
        console.log("✅ Login successful:", data);
        alert("✅ Login successful! Welcome back!");
        
      }
    } catch (error) {
      console.error("⚠️ Error during login:", error);
      alert("⚠️ Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-900 px-6 py-20">
      <div className="bg-slate-800 shadow-2xl rounded-2xl p-8 w-full max-w-md border border-slate-700">
        <h2 className="text-3xl font-bold text-white text-center mb-6 font-[Poppins]">
          Welcome Back 👋
        </h2>
        <p className="text-gray-400 text-center mb-8">
          Log in to your account to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email" className="text-gray-300">
              Email
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

          <div className="flex justify-between text-sm">
            <Link href="#" className="text-blue-400 hover:underline">
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
          >
            {loading ? "Logging in..." : "Log In"}
          </Button>
        </form>

        <p className="text-gray-400 text-center mt-6">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-blue-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
