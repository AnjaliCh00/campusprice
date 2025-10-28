"use client";

import React from "react";
import Navbar from "@/components/navbar";

const About = () => {
  return (
    <>
    <Navbar></Navbar>
    <div className="bg-slate-900 text-white min-h-screen">
      {/* Hero Section */}
      <section className="py-24 px-6 lg:px-20 text-center">
        <h1
          className="text-5xl mb-6"
          style={{ fontFamily: "NeueMachina", fontWeight: 300 }}
        >
          About Us
        </h1>
        <p className="text-lg max-w-3xl mx-auto text-gray-300">
          We are committed to providing high-quality online courses that help
          you grow your skills and advance your career. Our mission is to make
          learning accessible, practical, and enjoyable for everyone.
        </p>
      </section>

      {/* Text Section */}
      <section className="py-20 px-6 lg:px-20">
        <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2
              className="text-3xl mb-4"
              style={{ fontFamily: "NeueMachina", fontWeight: 300 }}
            >
              Our Mission
            </h2>
            <p className="text-gray-300 mb-6">
              Our goal is to empower learners worldwide with the skills and
              knowledge needed to succeed in today's fast-changing digital
              landscape. From web development to AI, our courses are designed to
              be hands-on and career-focused.
            </p>

            <h2
              className="text-3xl mb-4"
              style={{ fontFamily: "NeueMachina", fontWeight: 300 }}
            >
              Why Choose Us?
            </h2>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Expert instructors with real-world experience</li>
              <li>Practical, project-based learning</li>
              <li>Flexible and self-paced courses</li>
              <li>Career guidance and placement support</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-6 lg:px-20 text-center bg-slate-800">
        <h2
          className="text-4xl mb-6"
          style={{ fontFamily: "NeueMachina", fontWeight: 300 }}
        >
          Join Our Learning Community
        </h2>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
          Start your journey today and unlock your full potential with our
          expert-led courses.
        </p>
        <a
          href="/courses"
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition"
        >
          Explore Courses
        </a>
      </section>
    </div>
    </>
  );
};

export default About;
