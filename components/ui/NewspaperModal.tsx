"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface NewspaperModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: {
    intro: string;
    sections: { heading: string; text: string }[];
  };
}

export function NewspaperModal({ isOpen, onClose, title, content }: NewspaperModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full md:w-2/3 lg:w-1/2 bg-white z-50 overflow-y-auto shadow-2xl"
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex justify-between items-center">
              <h2 className="text-3xl font-serif font-bold text-gray-900">{title}</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="px-8 py-12">
              {/* Newspaper-style layout */}
              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-gray-700 leading-relaxed mb-8 font-serif italic border-l-4 border-mckinsey-600 pl-6">
                  {content.intro}
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  {content.sections.map((section, index) => (
                    <div key={index} className="space-y-3">
                      <h3 className="text-xl font-serif font-bold text-gray-900 border-b border-gray-300 pb-2">
                        {section.heading}
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-justify">
                        {section.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
