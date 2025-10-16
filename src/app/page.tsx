"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function CourseLandingPage() {
// cards section data

  // const courses = [
  //   {
  //     title: "Full Stack Web Development",
  //     desc: "Learn React, Next.js, Node.js, and MongoDB to become a full-stack developer.",
  //     img: "/images/fullstack.jpg",
  //     link: "/pricing/fullstack",
  //   },
  //   {
  //     title: "UI/UX Design Masterclass",
  //     desc: "Master Figma, wireframing, and design systems to craft beautiful user experiences.",
  //     img: "/images/uiux.jpg",
  //     link: "/pricing/uiux",
  //   },
  //   {
  //     title: "Data Science Bootcamp",
  //     desc: "Dive into Python, Pandas, and Machine Learning with hands-on data projects.",
  //     img: "/images/datascience.jpg",
  //     link: "/pricing/datascience",
  //   },
  // ];

// cards square data

const course = [
  {
    title: "Full Stack Web Development",
    desc: "Build complete web apps using React, Next.js, and Node.js.",
    img: "/images/fullstack.jpg",
    link: "/pricing/fullstack",
  },
  {
    title: "UI/UX Design Masterclass",
    desc: "Design user-friendly and aesthetic interfaces using Figma.",
    img: "/images/uiux.jpg",
    link: "/pricing/uiux",
  },
  {
    title: "Data Science Bootcamp",
    desc: "Learn Python, Pandas, and ML with hands-on projects.",
    img: "/images/datascience.jpg",
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
            src="/images/course-hero.svg"
            alt="Web Development Course"
            width={500}
            height={400}
            className="mx-auto"
          />
        </div>
      </section>
{/* demo section */}

  <section className="py-20 bg-slate-900 text-white">
      <div className="container mx-auto px-6 lg:px-20 flex flex-col lg:flex-row items-center justify-between gap-16">
        {/* Left Side Text */}
        <div className="lg:w-1/3 text-center lg:text-left space-y-4">
          <h2 className="text-3xl font-bold">
            Interactive <span className="text-blue-400">Course Demos</span>
          </h2>
          <p className="text-gray-400">
            Explore our hands-on course previews and get a feel for how easy and
            engaging learning can be. Watch short demo videos and experience the
            teaching style before you enroll.
          </p>
        </div>

        {/* Center Image */}
        <div className="lg:w-1/3 flex justify-center">
          <Image
            src="/images/demo-preview.png"
            alt="Course Demo"
            width={400}
            height={400}
            className="rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Right Side Text */}
        <div className="lg:w-1/3 text-center lg:text-left space-y-4">
          <h3 className="text-2xl font-semibold">Real-World Learning</h3>
          <p className="text-gray-400">
            Each demo highlights practical, real-world projects built using the
            same technologies taught in the course. Learn the way professionals
            build — by doing.
          </p>
        </div>
      </div>
    </section>

{/* cards section */}

{/* <section className="py-20 bg-slate-900 text-white">
      <div className="container mx-auto px-6 lg:px-20">
        <h2 className="text-4xl font-bold text-center mb-12">
          Our <span className="text-blue-400">Popular Courses</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {courses.map((course, i) => (
            <div
              key={i}
              className="bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <div className="relative h-56 w-full">
                <Image
                  src={course.img}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-semibold">{course.title}</h3>
                <p className="text-gray-400">{course.desc}</p>
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
    </section> */}

{/* square cards data  */}
 <section className="py-20 bg-slate-900 text-white">
      <div className="container mx-auto px-6 lg:px-20">
        <h2 className="text-4xl font-bold text-center mb-12">
          Explore Our <span className="text-blue-400">Courses</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {course.map((course, index) => (
            <div
              key={index}
              className="bg-slate-800 rounded-2xl overflow-hidden shadow-lg flex flex-col items-center justify-between text-center aspect-square hover:scale-105 transition-transform duration-300"
            >
              {/* Image */}
              <div className="relative w-full h-1/2">
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
{/* collabration with campany */}




      
    </div>
  );
}
