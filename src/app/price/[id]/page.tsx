"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Cashfree, CFEnvironment } from "cashfree-pg";
import axios from "axios";
import Script from "next/script";

export default function CoursePage() {
  const [course, setCourse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  // ✅ Fetch course data
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch("/api/price", { cache: "no-store" });

        if (!res.ok) {
          const text = await res.text();
          console.error("❌ API Error:", text);
          throw new Error("Failed to fetch course data");
        }

        const data = await res.json();
        const found = data.find((c: any) => c.id.toString() === params.id);

        setCourse(found);
      } catch (error) {
        console.error("❌ Failed to fetch course:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [params.id]);

  // ✅ Handle Buy Button
  const handleClick = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const customer = {
        id: "user_101",
        name: "Anjali Choudhary",
        email: "anjali@example.com",
        phone: "9876543210",
      };

      const res = await axios.post("/api/buyorder", {
        amount: course.discountPrice,
        customer,
      });

      const data = res.data;

      if (data?.payment_session_id) {
        const cashfree = new (window as any).Cashfree({
          mode: process.env.NEXT_PUBLIC_CASHFREE_MODE || "sandbox",
        });

        cashfree.checkout({
          paymentSessionId: data.payment_session_id,
          redirectTarget: "_self",
        });
      } else {
        alert("❌ Failed to create payment session.");
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
      alert("Something went wrong during payment!");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Loading UI
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-900 text-white">
        ⏳ Loading course details...
      </div> 
    );
  }

  // ✅ If no course found
  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white">
        ❌ Course not found or failed to load.
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  // -------------------- FEATURES --------------------
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

  return (
    <>
      <Script
        src="https://sdk.cashfree.com/js/v3/cashfree.js"
        strategy="afterInteractive"
      />

      {/* ---------- COURSE HEADER ---------- */}
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
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight">
            {course.name}
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-xl">
            {course.description}
          </p>

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

          <div className="flex flex-wrap gap-4">
            {course.tags?.map((tag: any, idx: number) => (
              <div
                key={idx}
                className="flex items-center space-x-2 bg-gray-800/70 p-2 rounded-lg shadow-md"
              >
                <span className="text-white font-medium">#{tag.name || tag}</span>
              </div>
            ))}
          </div>

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

          <button
            onClick={handleClick}
            disabled={loading}
            className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 active:scale-95"
          >
            {loading ? "Processing..." : "Buy Now"}
          </button>
        </div>
      </section>

      {/* ---------- ACCORDION SECTION ---------- */}
      <section className="bg-slate-900 py-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
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
    setOpenSubIndex(null);
  };

  const toggleSubAccordion = (section: string) => {
    setOpenSubIndex(openSubIndex === section ? null : section);
  };

  return (
    <div className="space-y-4">
      {features.map((feature: any, index: number) => {
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
