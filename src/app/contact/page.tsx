"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Navbar from "@/components/navbar";


export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    dob: "",
    college: "",
    course: "",
    skills: "",
    message: "",
  });

  // ✅ Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.phone ||
      !form.dob ||
      !form.college ||
      !form.course ||
      !form.skills ||
      !form.message
    ) {
      toast.error("⚠️ Please fill all fields before submitting!");
      return;
    }

    toast.success("✅ Message sent successfully!");
    setForm({
      name: "",
      phone: "",
      dob: "",
      college: "",
      course: "",
      skills: "",
      message: "",
    });
  };

  return (
    <>
    <Navbar></Navbar>
    <section className="min-h-screen bg-slate-900 flex items-center justify-center px-6 py-10 mt-12">
      <div className="bg-slate-800 shadow-lg rounded-2xl p-8 w-full max-w-2xl border border-slate-700">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Contact Us
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Input Group */}
          {[
            { label: "Full Name", name: "name", type: "text", placeholder: "Enter your name" },
            { label: "Phone Number", name: "phone", type: "tel", placeholder: "Enter your phone number" },
            { label: "Date of Birth", name: "dob", type: "date", placeholder: "" },
            { label: "College Name", name: "college", type: "text", placeholder: "Enter your college name" },
            { label: "Graduation Course", name: "course", type: "text", placeholder: "Enter your course (e.g., B.Tech, B.Sc)" },
            { label: "Skills", name: "skills", type: "text", placeholder: "Enter your skills (e.g., React, Node.js)" },
          ].map((input) => (
            <div key={input.name}>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                {input.label}
              </label>
              <input
                type={input.type}
                name={input.name}
                value={(form as any)[input.name]}
                onChange={handleChange}
                placeholder={input.placeholder}
                className="w-full bg-slate-700 text-white placeholder-gray-400 border border-slate-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>
          ))}

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Message
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Write your message..."
              rows={4}
              className="w-full bg-slate-700 text-white placeholder-gray-400 border border-slate-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition duration-200"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
    </>
  );
}
