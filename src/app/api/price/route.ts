import { NextResponse } from "next/server";

export async function GET() {
  const courses = [
    {
      id: 1,
      name: "Full Stack Development",
      description:
        "Master both frontend and backend development using React, Next.js, Node.js, and MongoDB. Build, deploy, and scale full-featured web applications.",
      price: 14999,
      discountPrice: 9999,
      duration: "12 Weeks",
      level: "Beginner to Advanced",
      language: "English",
      instructor: {
        name: "Raj Mehta",
        bio: "Senior Full Stack Developer with 8+ years of industry experience.",
      },
      tags: ["WebDev", "React", "Next.js", "Node.js", "MongoDB"],
      video: "https://www.youtube.com/embed/nu_pCVPKzTk", // Traversy Media - Web Dev Roadmap
    },
    {
      id: 2,
      name: "UI/UX Design ",
      description:
        "Learn to design beautiful and user-friendly interfaces with Figma, UX research methods, wireframing, and prototyping techniques.",
      price: 12999,
      discountPrice: 8999,
      duration: "8 Weeks",
      level: "Beginner to Intermediate",
      language: "English",
      instructor: {
        name: "Priya Sharma",
        bio: "UI/UX Designer with 6+ years of experience in SaaS product design.",
      },
      tags: ["Figma", "Wireframing", "Prototyping", "UXResearch"],
      video: "https://www.youtube.com/embed/c9Wg6Cb_YlU", // DesignCourse - Figma Tutorial
    },
    {
      id: 3,
      name: "Data Science ",
      description:
        "Dive into Python, Pandas, NumPy, and Machine Learning. Learn to clean, analyze, and visualize data like a professional data scientist.",
      price: 15999,
      discountPrice: 10999,
      duration: "10 Weeks",
      level: "Intermediate",
      language: "English",
      instructor: {
        name: "Amit Kumar",
        bio: "Data Scientist at IBM specializing in AI-driven analytics.",
      },
      tags: ["Python", "Pandas", "MachineLearning", "DataViz"],
      video: "https://www.youtube.com/embed/X3paOmcrTjQ", // Simplilearn - Data Science in 5 Minutes
    },
    {
      id: 4,
      name: "AI & Machine Learning",
      description:
        "Understand core ML concepts, build AI models, and implement neural networks with TensorFlow and Python.",
      price: 17999,
      discountPrice: 12999,
      duration: "14 Weeks",
      level: "Intermediate to Advanced",
      language: "English",
      instructor: {
        name: "Dr. Kavya Patel",
        bio: "AI Researcher with publications in neural networks and deep learning.",
      },
      tags: ["AI", "DeepLearning", "TensorFlow", "Python"],
      video: "https://www.youtube.com/embed/ukzFI9rgwfU", // ColdFusion - Machine Learning Explained
    },
    {
      id: 5,
      name: "Cybersecurity",
      description:
        "Explore network security, ethical hacking, and data protection techniques to safeguard digital systems.",
      price: 12999,
      discountPrice:19999,
      duration: "9 Weeks",
      level: "Beginner",
      language: "English",
      instructor: {
        name: "Ankit Verma",
        bio: "Certified Ethical Hacker (CEH) with 7+ years of experience in cybersecurity.",
      },
      tags: ["Hacking", "NetworkSecurity", "CyberDefense"],
      video: "https://www.youtube.com/embed/inWWhr5tnEA", // Simplilearn - What is Cybersecurity
    },
    {
      id: 6,
      name: "Cloud Computing Essentials",
      description:
        "Learn how cloud infrastructure works using AWS, Azure, and Google Cloud. Deploy and manage scalable web apps.",
      price: 14999,
      discountPrice: 10499,
      duration: "8 Weeks",
      level: "Intermediate",
      language: "English",
      instructor: {
        name: "Sneha Nair",
        bio: "Cloud Solutions Architect at AWS with 9+ years of experience.",
      },
      tags: ["AWS", "Azure", "GoogleCloud", "DevOps"],
      video: "https://www.youtube.com/embed/lFKn6D1H8_U", // Techquickie - What is Cloud Computing
    },
  ];

  return NextResponse.json(courses);
}
