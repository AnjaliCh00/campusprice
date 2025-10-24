"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient(); // PrismaClient instance

const SignupPage = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // "Inline API" function
  const handleSignup = async () => {
    if (!form.email || !form.password) {
      alert("Email and password are required");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      // Check if user exists
      const existingUser = await prisma.data.findUnique({
        where: { email: form.email },
      });

      if (existingUser) {
        alert("User already exists");
        return;
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(form.password, 10);

      // Create user
      const newUser = await prisma.data.create({
        data: {
          email: form.email,
          password: hashedPassword,
        },
      });

      alert("Signup successful! Please log in.");
      console.log(newUser);
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      await prisma.$disconnect();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSignup();
  };

  return (
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
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
          >
            Sign Up
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
  );
};

export default SignupPage;
