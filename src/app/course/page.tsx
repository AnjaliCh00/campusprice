"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button"; // ✅ make sure this path matches your project

const courses = [
  {
    title: "Full Stack Web Development",
    desc: "Build complete web apps using React, Next.js, and Node.js.",
    img: "/images/fullstack.jpg",
    link: "/pricing/fullstack",
  },
  {
    title: "UI/UX Design Masterclass",
    desc: "Design user-friendly and visually stunning digital experiences.",
    img: "/images/uiux.jpg",
    link: "/pricing/uiux",
  },
  {
    title: "Data Science & Machine Learning",
    desc: "Analyze data, train models, and deploy AI-powered solutions.",
    img: "/images/datascience.jpg",
    link: "/pricing/datascience",
  },
  {
    title: "Python Programming Bootcamp",
    desc: "Learn Python from scratch — the world’s most popular programming language.",
    img: "/images/python.jpg",
    link: "/pricing/python",
  },
  {
    title: "Digital Marketing Pro",
    desc: "Master SEO, Google Ads, and social media marketing to grow online businesses.",
    img: "/images/digitalmarketing.jpg",
    link: "/pricing/digital-marketing",
  },
  {
    title: "Mobile App Development",
    desc: "Create cross-platform mobile apps using Flutter and React Native.",
    img: "/images/mobiledev.jpg",
    link: "/pricing/mobile-app",
  },
  
];


const Course = () => {
  return (
    <>
      {/* Top Section */}
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <section className="py-16 text-white w-full">
          <div className="container mx-auto px-6 lg:px-20 text-center">
            <h2 className="text-4xl font-bold mb-6">Your Heading Here</h2>
            <p className="text-lg max-w-2xl mx-auto">
              Your paragraph text goes here. You can write anything you want to display in this section.
            </p>
          </div>
        </section>
      </div>

      {/* Cards Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-6 lg:px-20">
          <h2 className="text-4xl font-bold text-center mb-12">
            Explore Our <span className="text-blue-400">Courses</span>
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {courses.map((course, index) => (
              <div
                key={index}
                className="bg-slate-800 rounded-2xl overflow-hidden shadow-lg flex flex-col items-center justify-between text-center hover:scale-105 transition-transform duration-300"
              >
                {/* Image */}
                <div className="relative w-full h-52">
                  <Image
                    src={course.img}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-2xl font-semibold mb-3">{course.title}</h3>
                    <p className="text-gray-400 text-sm">{course.desc}</p>
                  </div>
                </div>

                {/* Button */}
                <div className="pb-6">
                  <Button
                    asChild
                    className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg"
                  >
                    <a href={course.link}>View Pricing</a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Course;
