"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { useState } from "react";

const initialCourses = [
  {
    title: "Full-Stack Web Development",
    batch: "Starting January 15, 2026",
    location: "Owerri, Nigeria",
    duration: "12 weeks",
    description: "Comprehensive training in modern web development, from front-end frameworks to backend architecture and deployment.",
  },
  {
    title: "Advanced Data Science & AI",
    batch: "Starting February 1, 2026",
    location: "Owerri, Nigeria",
    duration: "10 weeks",
    description: "Master data analysis, machine learning, and artificial intelligence with hands-on projects and real-world applications.",
  },
];

const additionalCourses = [
  {
    title: "Cloud Engineering with AWS",
    batch: "Starting February 15, 2026",
    location: "Owerri, Nigeria",
    duration: "8 weeks",
    description: "Learn cloud infrastructure, serverless computing, and DevOps practices on Amazon Web Services.",
  },
  {
    title: "Mobile App Development",
    batch: "Starting March 1, 2026",
    location: "Owerri, Nigeria",
    duration: "10 weeks",
    description: "Build cross-platform mobile applications using React Native and modern mobile development patterns.",
  },
  {
    title: "Cybersecurity Fundamentals",
    batch: "Starting March 15, 2026",
    location: "Owerri, Nigeria",
    duration: "6 weeks",
    description: "Essential security concepts, threat analysis, penetration testing, and security best practices.",
  },
  {
    title: "Product Management for Tech",
    batch: "Starting April 1, 2026",
    location: "Owerri, Nigeria",
    duration: "8 weeks",
    description: "Learn product strategy, user research, roadmap planning, and agile methodologies for tech products.",
  },
];

export function CoursesPreview() {
  const [showAll, setShowAll] = useState(false);
  const displayedCourses = showAll ? [...initialCourses, ...additionalCourses] : initialCourses;

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
              Upcoming courses
            </h2>
            <p className="text-xl text-gray-600">
              Intensive physical training programs designed to accelerate your career in technology.
            </p>
          </motion.div>
          
          <button 
            onClick={() => setShowAll(!showAll)}
            className="text-mckinsey-600 font-medium hover:underline whitespace-nowrap"
          >
            {showAll ? "Show less" : "View all courses"} →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence>
            {displayedCourses.map((course, index) => (
              <motion.div
                key={course.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="border border-gray-200 bg-white hover:border-mckinsey-600 transition-colors"
              >
                <div className="p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  <div className="space-y-3 mb-6 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-mckinsey-600" />
                      {course.batch}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-mckinsey-600" />
                      {course.location}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <span className="text-sm font-medium text-gray-600">
                      Duration: {course.duration}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
