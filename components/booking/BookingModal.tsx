"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar as CalendarIcon, Clock, CheckCircle, Loader2, Download } from "lucide-react";
import Calendar from "react-calendar";
import { useForm } from "react-hook-form";
import { downloadICS } from "@/lib/calendarUtils";
import "react-calendar/dist/Calendar.css";

// Custom styles for react-calendar to match the theme
import "@/app/calendar.css"; 

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type BookingFormData = {
  name: string;
  email: string;
  company?: string;
  service: string;
  brief: string;
};

const TIME_SLOTS = [
  "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"
];

const SERVICES = [
  "Digital Transformation Strategy",
  "Cloud Architecture Review",
  "Cybersecurity Audit",
  "AI & Machine Learning Consultation",
  "Software Development Training",
  "Other"
];

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<string>("");
  const [step, setStep] = useState<"date" | "details" | "success">("date");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [icsContent, setIcsContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<BookingFormData>();

  const handleDateSelect = (value: any) => {
    setDate(value);
  };

  const onSubmit = async (data: BookingFormData) => {
    if (!date || !time) {
      setError("Please select a date and time");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Combine date and time
      const [hours, minutes] = time.split(":").map(Number);
      const bookingDateTime = new Date(date);
      bookingDateTime.setHours(hours, minutes);

      const response = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          date: bookingDateTime.toISOString(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to book session");
      }

      setIcsContent(result.icsContent); // Assuming API returns base64 or raw ICS content
      setStep("success");
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadCalendar = () => {
    if (icsContent) {
      // If it's base64, decode it, otherwise use as is
      const content = icsContent.includes("BEGIN:VCALENDAR") 
        ? icsContent 
        : atob(icsContent);
      downloadICS(content, "techaware-consultation.ics");
    }
  };

  const resetModal = () => {
    setStep("date");
    setTime("");
    setDate(new Date());
    setError(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetModal}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 m-auto w-full max-w-4xl h-[90vh] md:h-auto md:max-h-[90vh] bg-white z-50 rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
          >
            {/* Left Panel - Summary/Visual */}
            <div className="w-full md:w-1/3 bg-mckinsey-900 text-white p-8 flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-serif font-bold mb-4">Book a Session</h2>
                <p className="text-mckinsey-100 mb-8">
                  Schedule a consultation with our experts to discuss your digital transformation needs.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CalendarIcon className="w-5 h-5 text-mckinsey-300 mt-1" />
                    <div>
                      <p className="font-medium">Select Date & Time</p>
                      <p className="text-sm text-mckinsey-300">Choose a slot that works for you</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-mckinsey-300 mt-1" />
                    <div>
                      <p className="font-medium">Confirm Details</p>
                      <p className="text-sm text-mckinsey-300">Tell us about your project</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-mckinsey-700">
                <p className="text-sm text-mckinsey-400">
                  Questions? Contact us at<br />
                  <a href="mailto:hello@techaware.com" className="text-white hover:underline">hello@techaware.com</a>
                </p>
              </div>
            </div>

            {/* Right Panel - Content */}
            <div className="w-full md:w-2/3 bg-white p-8 overflow-y-auto relative">
              <button
                onClick={resetModal}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>

              {step === "date" && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900">Select a Date & Time</h3>
                  
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1">
                      <Calendar
                        onChange={handleDateSelect}
                        value={date}
                        minDate={new Date()}
                        className="border rounded-lg p-4 w-full"
                        tileClassName={({ date: tileDate }) => {
                          // Highlight today
                          if (tileDate.toDateString() === new Date().toDateString()) {
                            return "bg-blue-50 text-blue-600 font-bold";
                          }
                          return "";
                        }}
                      />
                    </div>
                    
                    <div className="w-full md:w-48 space-y-2">
                      <p className="font-medium text-gray-700 mb-2">Available Times</p>
                      <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
                        {TIME_SLOTS.map((slot) => (
                          <button
                            key={slot}
                            onClick={() => setTime(slot)}
                            className={`px-4 py-2 text-sm rounded-md border transition-all ${
                              time === slot
                                ? "bg-mckinsey-600 text-white border-mckinsey-600"
                                : "hover:border-mckinsey-600 hover:text-mckinsey-600 border-gray-200 text-gray-700"
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      onClick={() => {
                        if (date && time) setStep("details");
                        else setError("Please select both date and time");
                      }}
                      disabled={!date || !time}
                      className="px-6 py-3 bg-mckinsey-600 text-white font-medium rounded-md hover:bg-mckinsey-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Continue
                    </button>
                  </div>
                  {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </div>
              )}

              {step === "details" && (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Your Details</h3>
                    <button 
                      type="button"
                      onClick={() => setStep("date")}
                      className="text-sm text-gray-500 hover:text-mckinsey-600"
                    >
                      Back to Date
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Full Name</label>
                      <input
                        {...register("name", { required: "Name is required" })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-mckinsey-500 focus:border-transparent outline-none"
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Email Address</label>
                      <input
                        {...register("email", { 
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address"
                          }
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-mckinsey-500 focus:border-transparent outline-none"
                        placeholder="john@company.com"
                      />
                      {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Company (Optional)</label>
                      <input
                        {...register("company")}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-mckinsey-500 focus:border-transparent outline-none"
                        placeholder="Company Ltd."
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Service Interest</label>
                      <select
                        {...register("service", { required: "Please select a service" })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-mckinsey-500 focus:border-transparent outline-none bg-white"
                      >
                        <option value="">Select a service...</option>
                        {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      {errors.service && <p className="text-red-500 text-xs">{errors.service.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Project Brief</label>
                    <textarea
                      {...register("brief", { required: "Please provide a brief description" })}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-mckinsey-500 focus:border-transparent outline-none resize-none"
                      placeholder="Tell us about your goals and what you're looking to achieve..."
                    />
                    {errors.brief && <p className="text-red-500 text-xs">{errors.brief.message}</p>}
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-6 py-3 bg-mckinsey-600 text-white font-medium rounded-md hover:bg-mckinsey-700 disabled:opacity-70 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        "Confirm Booking"
                      )}
                    </button>
                    {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
                  </div>
                </form>
              )}

              {step === "success" && (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-6 py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  
                  <h3 className="text-3xl font-serif font-bold text-gray-900">Booking Confirmed!</h3>
                  
                  <p className="text-gray-600 max-w-md mx-auto">
                    We've sent a confirmation email to <strong>{document.querySelector<HTMLInputElement>('input[name="email"]')?.value}</strong>.
                    Our team will review your request and get back to you shortly.
                  </p>

                  <div className="pt-8 space-y-4 w-full max-w-xs">
                    <button
                      onClick={handleDownloadCalendar}
                      className="w-full px-6 py-3 bg-mckinsey-600 text-white font-medium rounded-md hover:bg-mckinsey-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Download className="w-5 h-5" />
                      Add to Calendar
                    </button>
                    
                    <button
                      onClick={resetModal}
                      className="w-full px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
