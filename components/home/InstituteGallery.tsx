"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
    alt: "Modern classroom with students",
    title: "Interactive Learning Spaces",
    height: "tall", // Varying heights for masonry effect
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80",
    alt: "Tech lab with computers",
    title: "State-of-the-Art Labs",
    height: "short",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80",
    alt: "Students collaborating",
    title: "Collaborative Environment",
    height: "medium",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
    alt: "Team working together",
    title: "Hands-On Projects",
    height: "tall",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
    alt: "Instructor teaching",
    title: "Expert Instructors",
    height: "short",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80",
    alt: "Modern office space",
    title: "Professional Facilities",
    height: "medium",
  },
];

export function InstituteGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <>
      <section className="py-20 md:py-32 bg-blue-600">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              Our institute
            </h2>
            <p className="text-xl text-white">
              Experience world-class facilities designed for immersive learning and collaboration.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px]">
            {galleryImages.map((image, index) => {
              // Define height classes for masonry effect
              const heightClass = 
                image.height === "tall" ? "row-span-2" : 
                image.height === "short" ? "row-span-1" : 
                "row-span-1";
              
              return (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`group relative overflow-hidden cursor-pointer ${heightClass}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-white font-serif font-bold text-xl">
                        {image.title}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
          <div className="relative w-full max-w-5xl">
            <img
              src={galleryImages[selectedImage].src}
              alt={galleryImages[selectedImage].alt}
              className="w-full h-auto object-contain max-h-[80vh]"
            />
          </div>
          <div className="absolute bottom-8 left-0 right-0 text-center">
            <h3 className="text-white font-serif font-bold text-2xl">
              {galleryImages[selectedImage].title}
            </h3>
          </div>
        </div>
      )}
    </>
  );
}
