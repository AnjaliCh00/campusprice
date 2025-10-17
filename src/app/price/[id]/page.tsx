"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function CoursePage() {
  const params = useParams();
  const [course, setCourse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch("/api/price");
        const data = await res.json();
        const found = data.find((c: any) => c.id.toString() === params.id);
        setCourse(found);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch course:", error);
      }
    };
    fetchCourse();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-900">
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="p-10 text-center text-xl text-white bg-slate-900 min-h-screen">
        Course not found
      </div>
    );
  }

  // -------------------- FEATURES DATA --------------------
  const features = [
    {
      id: 1,
      title: "Full Stack Development",

      subtopics: {
        Frontend: ["HTML", "CSS", "JavaScript", "React", "Next.js"],
        Backend: ["Node.js", "Express.js", "MongoDB", "REST APIs"],
        DevOps: ["Docker", "CI/CD", "AWS"],
      },
    },
    { 
      id: 2,
      title: "UI/UX Design",

      subtopics: {
        Design: ["Figma", "Adobe XD", "Wireframing", "Prototyping"],
        Research: ["User Testing", "Personas", "Usability Analysis"],
      },
    },
    {
      id: 3,
      title: "Data Science",

      subtopics: {
        Tools: ["Python", "Pandas", "NumPy", "Matplotlib"],
        MachineLearning: ["Scikit-learn", "Regression", "Classification"],
      },
    },
    {
      id: 4,
      title: "AI & Machine Learning",

      subtopics: {
        Topics: ["Neural Networks", "Deep Learning", "TensorFlow", "PyTorch"],
      },
    },
    {
      id: 5,
      title: "Cybersecurity",

      subtopics: {
        Areas: ["Network Security", "Ethical Hacking", "Cryptography"],
      },
    },
    {
      id: 6,
      title: "Cloud Computing",

      subtopics: {
        Platforms: ["AWS", "Azure", "Google Cloud"],
        Concepts: ["Serverless", "Containers", "Kubernetes"],
      },
    },
  ];

  // -------------------- MAIN RETURN --------------------
  return (
    <>
      {/* Course Header Section */}
      <section className="bg-slate-900 min-h-screen flex flex-col md:flex-row items-start pt-16 md:pt-20 px-6 md:px-12 lg:px-24 gap-12">
        {/* Video Section */}
        <div className="md:w-1/2 flex justify-center items-start pt-30">
          <div className="relative w-full aspect-video shadow-lg rounded-lg overflow-hidden">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={course.video}
              title={course.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Text Section */}
        <div className="md:w-1/2 flex flex-col justify-start space-y-3">
          {/* Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight font-[Poppins]">
            {course.name}
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-300 max-w-xl">
            {course.description}
          </p>

          {/* Price */}
          <div className="flex items-center space-x-4">
            <span className="text-3xl md:text-4xl font-bold text-green-400">
              ₹{course.discountPrice ?? course.price}
            </span>
            {course.discountPrice && (
              <span className="text-gray-400 line-through text-lg">
                ₹{course.price}
              </span>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-4">
            {course.tags?.map((tag: string, idx: number) => (
              <div
                key={idx}
                className="flex items-center space-x-2 bg-gray-800/70 p-2 rounded-lg shadow-md"
              >
                <span className="text-white font-medium">#{tag}</span>
              </div>
            ))}
          </div>

          {/* Additional Details */}
          <div className="space-y-1 text-gray-200">
            <p>
              <span className="font-semibold text-white">Duration:</span>{" "}
              {course.duration}
            </p>
            <p>
              <span className="font-semibold text-white">Level:</span>{" "}
              {course.level}
            </p>
            <p>
              <span className="font-semibold text-white">Language:</span>{" "}
              {course.language}
            </p>
            <p>
              <span className="font-semibold text-white">Instructor:</span>{" "}
              {course.instructor.name} - {course.instructor.bio}
            </p>
          </div>

          {/* Buy Button */}
          <button className="mt-2 px-8 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg shadow-lg transition duration-300 w-fit">
            Buy Now
          </button>
        </div>
      </section>

      {/* Accordion Section (Styled like FAQ) */}
      <section className="bg-slate-900 py-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center font-[Poppins] leading-tight">
            Explore Our Courses
          </h2>

          <Accordion features={features} />
        </div>
      </section>
    </>
  );
}

// -------------------- Accordion Component --------------------
function Accordion({ features }: any) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [openSubIndex, setOpenSubIndex] = useState<string | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
    setOpenSubIndex(null); // close subtopics when switching main accordion
  };

  const toggleSubAccordion = (section: string) => {
    setOpenSubIndex(openSubIndex === section ? null : section);
  };

  return (
    <div className="space-y-4">
      {features.map((feature: any, index: any) => {
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
              <span>{feature.title}</span>
              {isOpen ? (
                <ChevronUp className="w-5 h-5 text-indigo-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-indigo-400" />
              )}
            </button>

            {isOpen && (
              <div className="p-4 text-gray-300 border-t border-gray-700">
                <p className="mb-3 text-sm">{feature.desc}</p>

                {/* Subtopics */}
                {feature.subtopics &&
                  Object.entries(feature.subtopics).map(([section, topics]) => {
                    const subOpen = openSubIndex === section;
                    return (
                      <div key={section} className="mb-2">
                        <button
                          onClick={() => toggleSubAccordion(section)}
                          className="flex justify-between items-center w-full text-left py-2 px-3 rounded-md bg-gray-700/50 hover:bg-gray-600 text-white font-medium"
                        >
                          <span>{section}</span>
                          {subOpen ? (
                            <ChevronUp className="w-4 h-4 text-indigo-400" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-indigo-400" />
                          )}
                        </button>

                        {subOpen && (
                          <ul className="pl-6 mt-2 list-disc text-gray-400 text-sm space-y-1">
                            {(topics as string[]).map((topic, i) => (
                              <li key={i}>{topic}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
