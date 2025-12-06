"use client";

import { motion } from "framer-motion";
import { Code2, LineChart, GraduationCap, ArrowRight } from "lucide-react";
import { useState } from "react";
import { NewspaperModal } from "@/components/ui/NewspaperModal";

const services = [
  {
    title: "Strategic consulting",
    description: "Enterprise architecture, cloud migration strategies, and digital transformation roadmaps powered by data-driven insights.",
    icon: <LineChart className="w-6 h-6" />,
    modalContent: {
      intro: "We help organizations navigate complex technology decisions through comprehensive analysis and strategic planning.",
      sections: [
        {
          heading: "Enterprise Architecture",
          text: "Design scalable, resilient systems that align with business objectives. Our architects evaluate your current infrastructure, identify bottlenecks, and create migration paths to modern cloud-native architectures using AWS, Azure, and GCP.",
        },
        {
          heading: "Digital Transformation",
          text: "Accelerate innovation through process automation, AI integration, and data analytics. We assess organizational readiness, develop transformation roadmaps, and implement change management strategies.",
        },
        {
          heading: "Technology Due Diligence",
          text: "Comprehensive technical assessments for M&A activities, including code quality audits, infrastructure reviews, security posture analysis, and technical debt quantification.",
        },
        {
          heading: "Cloud Migration Strategy",
          text: "Plan and execute seamless migrations to cloud platforms. We analyze workloads, optimize costs, ensure security compliance, and minimize downtime during transitions.",
        },
      ],
    },
  },
  {
    title: "Software engineering",
    description: "Full-stack development using React, Next.js, Node.js, Python, and microservices architecture with CI/CD automation.",
    icon: <Code2 className="w-6 h-6" />,
    modalContent: {
      intro: "End-to-end software development services leveraging modern frameworks and best practices in software architecture.",
      sections: [
        {
          heading: "Web Applications",
          text: "Build responsive, performant web applications using React, Next.js, TypeScript, and modern CSS frameworks. We implement server-side rendering, static generation, and progressive web app capabilities.",
        },
        {
          heading: "Backend Systems",
          text: "Design and develop scalable APIs using Node.js, Python (Django/FastAPI), and microservices architecture. Implement event-driven systems, message queues, and distributed caching.",
        },
        {
          heading: "DevOps & CI/CD",
          text: "Automate deployment pipelines using GitHub Actions, Jenkins, and GitLab CI. Implement infrastructure as code with Terraform, containerization with Docker, and orchestration with Kubernetes.",
        },
        {
          heading: "Quality Assurance",
          text: "Comprehensive testing strategies including unit tests, integration tests, end-to-end testing with Playwright/Cypress, and performance testing with load simulation tools.",
        },
      ],
    },
  },
  {
    title: "Corporate training",
    description: "Intensive bootcamps covering modern JavaScript frameworks, Python for data science, cloud computing, and agile methodologies.",
    icon: <GraduationCap className="w-6 h-6" />,
    modalContent: {
      intro: "Intensive physical courses designed to upskill teams in cutting-edge technologies and modern development methodologies.",
      sections: [
        {
          heading: "Web Development Track",
          text: "12-week intensive program covering HTML5, CSS3, JavaScript ES6+, React, Next.js, Node.js, and database design. Includes hands-on projects, code reviews, and portfolio development.",
        },
        {
          heading: "Data Science & AI",
          text: "10-week program focusing on Python, NumPy, Pandas, scikit-learn, TensorFlow, and PyTorch. Students work on real-world datasets and deploy ML models to production.",
        },
        {
          heading: "Cloud Engineering",
          text: "8-week course on AWS/Azure fundamentals, infrastructure as code, serverless computing, container orchestration, and cloud security best practices.",
        },
        {
          heading: "Agile & DevOps",
          text: "6-week program teaching Scrum, Kanban, continuous integration/deployment, monitoring, and incident management. Includes certification preparation.",
        },
      ],
    },
  },
];

export function ServicesOverview() {
  const [selectedService, setSelectedService] = useState<number | null>(null);

  return (
    <>
      <section className="py-24 relative z-10">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              Our expertise
            </h2>
            <p className="text-xl text-gray-300">
              We combine deep technical knowledge with business acumen to deliver measurable results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="group relative h-full bg-white/5 backdrop-blur-sm border border-white/10 p-8 transition-all hover:bg-white/10 hover:border-white/20 hover:-translate-y-1">
                  <div className="w-12 h-12 bg-mckinsey-600/20 text-mckinsey-400 border border-mckinsey-600/30 flex items-center justify-center mb-6 rounded-lg group-hover:bg-mckinsey-600 group-hover:text-white transition-colors">
                    {service.icon}
                  </div>
                  
                  <h3 className="text-2xl font-serif font-bold text-white mb-4">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-400 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  
                  <button
                    onClick={() => setSelectedService(index)}
                    className="text-white/70 font-medium hover:text-white flex items-center gap-2 transition-colors"
                  >
                    Learn more <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newspaper Modal */}
      {selectedService !== null && (
        <NewspaperModal
          isOpen={selectedService !== null}
          onClose={() => setSelectedService(null)}
          title={services[selectedService].title}
          content={services[selectedService].modalContent}
        />
      )}
    </>
  );
}
