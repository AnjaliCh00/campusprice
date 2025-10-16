"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function CourseLandingPage() {


const courses = [
  {
    title: "Full Stack Web Development",
    desc: "Build complete web apps using React, Next.js, and Node.js.",
    img: "/images/6aaad0b918d53721ff8f7ac7538cefbc9fde7279.png",
    link: "/pricing/fullstack",
  },
  {
    title: "UI/UX Design Masterclass",
    desc: "Design user-friendly and aesthetic interfaces using Figma.",
    img: "/images/6aaad0b918d53721ff8f7ac7538cefbc9fde7279.png",
    link: "/pricing/uiux",
  },
  {
    title: "Data Science Bootcamp",
    desc: "Learn Python, Pandas, and ML with hands-on projects.",
    img: "/images/6aaad0b918d53721ff8f7ac7538cefbc9fde7279.png",
    link: "/pricing/datascience",
  },
  
 
];



  return (
    <div className="bg-slate-900 text-white min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between px-8 lg:px-20 py-24 bg-slate-900">
        <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
          <h1 className="text-5xl font-bold leading-tight">
            Master <span className="text-blue-400">Full-Stack Web Development</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-xl mx-auto lg:mx-0">
            Learn to build modern web applications using React, Next.js, Node.js, and Tailwind CSS from industry experts.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="/enroll">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 text-lg rounded-xl">
                Enroll Now
              </Button>
            </Link>
            <Link href="#curriculum">
              <Button variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-400/10 px-8 py-3 text-lg rounded-xl">
                View Curriculum
              </Button>
            </Link>
          </div>
        </div>

        <div className="lg:w-1/2 mt-10 lg:mt-0">
          <Image
            src="/images/6aaad0b918d53721ff8f7ac7538cefbc9fde7279.png"
            alt="Web Development Course"
            width={500}
            height={400}
            className="mx-auto"
          />
        </div>
      </section>

{/*  cards data section  */}
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




      
    </div>
  );
}
