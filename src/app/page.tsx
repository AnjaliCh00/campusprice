"use client";
import React from "react";
import { useState } from "react";
import {
  CheckCircle,
  Lightbulb,
  Users,
  Cpu,
  Shield,
  Star,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  const features = [
    {
      id: 1,
      img: "/images/6aaad0b918d53721ff8f7ac7538cefbc9fde7279.png",
      title: "Full Stack Development",
      desc: "Learn modern web development with HTML, CSS, JavaScript, React, and Node.js.",
 
    },
    {
      id: 2,
      img: "/images/6aaad0b918d53721ff8f7ac7538cefbc9fde7279.png",
      title: "UI/UX Design",
      desc: "Master the art of creating intuitive and beautiful user experiences.",
   
    },
    {
      id: 3,
      img: "/images/6aaad0b918d53721ff8f7ac7538cefbc9fde7279.png",
      title: "Data Science",
      desc: "Analyze data and gain insights using Python, SQL, and machine learning.",
     
    },
    {
       id: 4,
      img: "/images/6aaad0b918d53721ff8f7ac7538cefbc9fde7279.png",
      title: "AI & Machine Learning",
      desc: "Understand AI concepts and build intelligent applications.",
      
    },
    {
      id: 5,
      img: "/images/6aaad0b918d53721ff8f7ac7538cefbc9fde7279.png",
      title: "Cybersecurity",
      desc: "Protect systems and networks from digital threats.",
    
    },
    {
      id: 6,
      img: "/images/6aaad0b918d53721ff8f7ac7538cefbc9fde7279.png",
      title: "Cloud Computing",
      desc: "Learn how to deploy and manage applications in the cloud.",
  
    },
  ];

  // accordion data
  const faqs = [
    {
      question: "What courses do you offer?",
      answer:
        "We offer Full Stack Development, UI/UX Design, Data Science, AI & Machine Learning, Cybersecurity, and Cloud Computing courses.",
    },
    {
      question: "Do I get a certificate?",
      answer:
        "Yes! You will receive a certificate upon successful completion of each course.",
    },
    {
      question: "Are there any prerequisites?",
      answer:
        "Some courses may require basic knowledge of programming, but most are beginner-friendly.",
    },
    {
      question: "What is the duration of the courses?",
      answer:
        "Course duration varies from 4 to 12 weeks depending on the topic and depth of study.",
    },
    {
      question: "Can I learn at my own pace?",
      answer:
        "Absolutely! Our courses are designed for flexible self-paced learning.",
    },
    {
      question: "Do you provide placement assistance?",
      answer:
        "Yes! We assist our students with resume building, mock interviews, and placement support.",
    },
    {
      question: "Are the courses live or pre-recorded?",
      answer:
        "We offer a combination of live interactive sessions and pre-recorded video tutorials.",
    },
    {
      question: "What is the fee structure?",
      answer:
        "Course fees vary depending on the program. Please visit our pricing page for detailed information.",
    },
    {
      question: "Is there any trial or demo available?",
      answer:
        "Yes! We offer demo sessions for most of our courses so you can explore before enrolling.",
    },
    {
      question: "Do you offer group or corporate training?",
      answer:
        "Yes, we provide customized group training for organizations and educational institutes.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <section className="bg-slate-900 min-h-screen flex flex-col md:flex-row items-start pt-16 mt-15">
        {/* Text Section */}
        <div className="container mx-auto px-6 md:px-12 lg:px-24 md:w-1/2 flex flex-col justify-start">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight font-[Poppins] mt-4">
            Welcome to Our Platform
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-xl">
            We provide the best solutions for your business and help you grow
            with confidence.
          </p>

          {/* Call-to-action Button */}
          <button className="mt-8 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg shadow-lg transition duration-300 w-fit">
            Get Started
          </button>

          {/* Small Cards Section */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="flex items-center space-x-2 bg-gray-800/70 p-3 rounded-lg shadow-md">
              <CheckCircle className="text-indigo-400 w-5 h-5" />
              <span className="text-white font-medium">Quality</span>
            </div>
            <div className="flex items-center space-x-2 bg-gray-800/70 p-3 rounded-lg shadow-md">
              <Lightbulb className="text-yellow-400 w-5 h-5" />
              <span className="text-white font-medium">Fast</span>
            </div>
            <div className="flex items-center space-x-2 bg-gray-800/70 p-3 rounded-lg shadow-md">
              <Users className="text-green-400 w-5 h-5" />
              <span className="text-white font-medium">Team</span>
            </div>
            <div className="flex items-center space-x-2 bg-gray-800/70 p-3 rounded-lg shadow-md">
              <Cpu className="text-red-400 w-5 h-5" />
              <span className="text-white font-medium">Power</span>
            </div>
            <div className="flex items-center space-x-2 bg-gray-800/70 p-3 rounded-lg shadow-md">
              <Shield className="text-blue-400 w-5 h-5" />
              <span className="text-white font-medium">Secure</span>
            </div>
            <div className="flex items-center space-x-2 bg-gray-800/70 p-3 rounded-lg shadow-md">
              <Star className="text-pink-400 w-5 h-5" />
              <span className="text-white font-medium">Premium</span>
            </div>
          </div>
        </div>

        {/* Video Section */}
        <div className="container mx-auto px-6 md:px-12 lg:px-24 mt-8 md:mt-0 md:w-1/2 flex justify-center items-start pt-30">
  <div className="relative w-full aspect-video shadow-lg rounded-lg overflow-hidden">
    <iframe
      className="absolute top-0 left-0 w-full h-full"
      src="https://www.youtube.com/embed/nu_pCVPKzTk"
      title="Full Stack Web Development Roadmap 2024"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </div>
</div>

      </section>

      {/* cards section  */}
     <section className="bg-slate-900 py-20 w-full">
  <div className="w-full px-6 md:px-12 lg:px-24">
    <h2 className="text-5xl md:text-5xl font-bold text-white mb-12 text-center font-[Poppins] leading-tight">
      Our Features
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <div
          key={index}
          className="bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 flex flex-col w-full"
        >
          {/* Image */}
          <div className="w-full h-48 relative">
            <img
              src={feature.img}
              alt={feature.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Card Content */}
          <div className="p-4 flex flex-col flex-1">
            <h3 className="text-2xl font-semibold text-white mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-300 mb-4 text-base flex-1">{feature.desc}</p>

            {/* View Price Button */}
       <Link href={`/price/${feature.id}`}>
            <button className="mt-auto bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-26 rounded-lg transition duration-300 w-fit text-base">
              View Price
            </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* section for the accordion */}
      <section className="bg-slate-900 py-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center font-[Poppins leading-tight">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="bg-gray-800 rounded-lg shadow-md overflow-hidden"
                >
                  <button
                    className="w-full flex justify-between items-center p-4 text-left text-white font-medium hover:bg-gray-700 transition duration-300"
                    onClick={() => toggleAccordion(index)}
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-indigo-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-indigo-400" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="p-4 text-gray-300 border-t border-gray-700">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
