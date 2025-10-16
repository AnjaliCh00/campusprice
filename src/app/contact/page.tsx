"use client";

import React, { useState } from "react";
import Image from "next/image";

const CourseSection = () => {
  const items = [
    {
      title: "Course Overview",
      content: (
        <p className="text-gray-300">
          This course covers everything from basics to advanced topics, helping you build real-world projects and gain practical experience.
        </p>
      ),
    },
    {
      title: "Modules Included",
      content: (
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li>Module 1: Introduction</li>
          <li>Module 2: Frontend Development</li>
          <li>Module 3: Backend Development</li>
          <li>Module 4: Full Stack Projects</li>
        </ul>
      ),
    },
    {
      title: "Tools & Technologies",
      content: (
        <p className="text-gray-300">
          You will learn React, Next.js, Node.js, Tailwind CSS, and more modern web development tools.
        </p>
      ),
    },
    {
      title: "Projects",
      content: (
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li>Portfolio Website</li>
          <li>E-commerce Web App</li>
          <li>Blog Platform</li>
        </ul>
      ),
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-slate-900 text-white">
      {/* Text + Image Section */}
      <div className="py-24 px-6 lg:px-20">
        <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12">
          {/* Text Side */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-4xl font-bold mb-4">Your Heading Here</h2>
            <p className="text-gray-300 mb-6">
              Your paragraph text goes here. You can describe the content, share details, or explain features of your product or service. This section is perfect for marketing or informational content.
            </p>
            <a
              href="#"
              className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-semibold transition"
            >
              Learn More
            </a>
          </div>

          {/* Image Side */}
          <div className="lg:w-1/2 relative w-full h-64 lg:h-96">
            <Image
              src="/images/6aaad0b918d53721ff8f7ac7538cefbc9fde7279.png"
              alt="Info Image"
              fill
              className="object-cover rounded-xl shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Accordion Section */}
      <div className="py-20 px-6 lg:px-20">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Course Details</h2>
          <p className="text-gray-300">
            Expand each section to learn more about this course.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-slate-800 rounded-xl overflow-hidden shadow-lg"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none"
              >
                <span className="font-semibold text-lg">{item.title}</span>
                <span className="text-2xl">{openIndex === index ? "<  " : ">"}</span>
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 border-t border-slate-700">
                  {item.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseSection;
