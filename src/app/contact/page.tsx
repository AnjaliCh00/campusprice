"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can handle form submission (e.g., send to API)
    console.log(formData);
    alert("Message sent!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white px-6 lg:px-20 py-24">
      {/* Heading */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          We'd love to hear from you! Fill out the form below and we'll get back to you as soon as possible.
        </p>
      </section>

      {/* Contact Form & Info */}
      <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-slate-800 p-8 rounded-2xl shadow-lg flex flex-col gap-6">
          <Input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="bg-slate-700 text-white border-none"
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="bg-slate-700 text-white border-none"
            required
          />
          <Textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="bg-slate-700 text-white border-none h-32 resize-none"
            required
          />
          <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold">
            Send Message
          </Button>
        </form>

        {/* Contact Info */}
        <div className="flex flex-col justify-center gap-6 text-center lg:text-left">
          <h2 className="text-3xl font-bold">Get in Touch</h2>
          <p className="text-gray-300">
            Email us, call us, or visit our office. We're always happy to answer your questions.
          </p>
          <div className="space-y-2">
            <p>Email: <span className="text-blue-400">support@yourwebsite.com</span></p>
            <p>Phone: <span className="text-blue-400">+91 123 456 7890</span></p>
            <p>Address: <span className="text-blue-400">123 Learning St, Education City, India</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
