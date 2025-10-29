"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import toast from "react-hot-toast";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    dob: "",
    college: "",
    course: "",
    skills: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // ✅ Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
          "Content-Type": "application/json", // ✅ fixed header
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
    <section className="min-h-screen flex items-center justify-center bg-slate-900 px-6 py-20">
      <div className="bg-slate-800 shadow-2xl rounded-2xl p-8 w-full max-w-lg border border-slate-700">
        <h2 className="text-3xl font-bold text-white text-center mb-6 font-[Poppins]">
          Create an Account
        </h2>
        <p className="text-gray-400 text-center mb-8">
          Join us and start your journey today
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
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

          {/* Email */}
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

          {/* Phone */}
          <div>
            <Label htmlFor="phone" className="text-gray-300">
              Phone Number
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="9876543210"
              value={form.phone}
              onChange={handleChange}
              className="bg-slate-700 border-slate-600 text-white placeholder-gray-400"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <Label htmlFor="dob" className="text-gray-300">
              Date of Birth
            </Label>
            <Input
              id="dob"
              name="dob"
              type="date"
              value={form.dob}
              onChange={handleChange}
              className="bg-slate-700 border-slate-600 text-white placeholder-gray-400"
            />
          </div>

          {/* College */}
          <div>
            <Label htmlFor="college" className="text-gray-300">
              College Name
            </Label>
            <Input
              id="college"
              name="college"
              type="text"
              placeholder="Your college"
              value={form.college}
              onChange={handleChange}
              className="bg-slate-700 border-slate-600 text-white placeholder-gray-400"
            />
          </div>

          {/* Course */}
          <div>
            <Label htmlFor="course" className="text-gray-300">
              Course
            </Label>
            <Input
              id="course"
              name="course"
              type="text"
              placeholder="Your course"
              value={form.course}
              onChange={handleChange}
              className="bg-slate-700 border-slate-600 text-white placeholder-gray-400"
            />
          </div>

          {/* Skills */}
          <div>
            <Label htmlFor="skills" className="text-gray-300">
              Skills
            </Label>
            <Input
              id="skills"
              name="skills"
              type="text"
              placeholder="E.g. React, Node.js, C++"
              value={form.skills}
              onChange={handleChange}
              className="bg-slate-700 border-slate-600 text-white placeholder-gray-400"
            />
          </div>

          {/* Message */}
          <div>
            <Label htmlFor="message" className="text-gray-300">
              Message (optional)
            </Label>
            <textarea
              id="message"
              name="message"
              placeholder="Write something..."
              value={form.message}
              onChange={handleChange}
              className="w-full rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-gray-400 p-3 resize-none h-24"
            />
          </div>

          {/* Password */}
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

          {/* Confirm Password */}
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

          {/* Submit */}
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
  );
};

export default Signup;
