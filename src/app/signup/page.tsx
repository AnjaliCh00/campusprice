"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

    // Basic validation
    if (form.password !== form.confirmPassword) {
      alert("⚠️ Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      console.log("Signup submitted:", form);

      const res = await fetch("/api/signup", {
        method: "POST",
       headers: { "Content-Type": "signup/json" },

        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Signup failed:", data);
        alert(data.error || "❌ Signup failed. Please try again.");
      } else {
        console.log("Signup successful:", data);
        alert("✅ Signup successful!");
       
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("⚠️ Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-900 px-6 py-20">
      <div className="bg-slate-800 shadow-2xl rounded-2xl p-8 w-full max-w-md border border-slate-700">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-white text-center mb-6 font-[Poppins]">
          Create an Account
        </h2>
        <p className="text-gray-400 text-center mb-8">
          Join us and start your journey today
        </p>

        {/* Form */}
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

        {/* Login Link */}
        <p className="text-gray-400 text-center mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-400 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Signup;
