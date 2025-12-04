"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Calendar from "react-calendar";
import { useForm } from "react-hook-form";
import { 
  CalendarDays, 
  Clock, 
  User, 
  Building2, 
  Mail, 
  FileText, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  Download,
  Loader2,
  Briefcase
} from "lucide-react";
import { downloadICS } from "@/lib/calendarUtils";
import "react-calendar/dist/Calendar.css";

type BookingFormData = {
  name: string;
  email: string;
  company?: string;
  service: string;
  brief: string;
  phone?: string;
};

const TIME_SLOTS = [
  "09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"
];

const SERVICES = [
  { id: "digital-strategy", name: "Digital Transformation Strategy", duration: "60 min" },
  { id: "cloud-consulting", name: "Cloud Architecture Consulting", duration: "45 min" },
  { id: "ai-implementation", name: "AI & Machine Learning", duration: "60 min" },
  { id: "cybersecurity", name: "Cybersecurity Assessment", duration: "45 min" },
  { id: "tech-training", name: "Technology Training Programs", duration: "30 min" },
  { id: "product-consulting", name: "Product & Technical Consulting", duration: "60 min" },
];

export default function BookPage() {
  const [step, setStep] = React.useState<1 | 2 | 3 | 4>(1);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = React.useState<string>("");
  const [selectedService, setSelectedService] = React.useState<string>("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [icsContent, setIcsContent] = React.useState<string | null>(null);
  const [submittedData, setSubmittedData] = React.useState<BookingFormData | null>(null);

  const { register, handleSubmit, formState: { errors }, getValues } = useForm<BookingFormData>();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getServiceName = () => {
    const service = SERVICES.find(s => s.id === selectedService);
    return service?.name || "";
  };

  const handleDateSelect = (value: any) => {
    setSelectedDate(value);
  };

  const canProceed = () => {
    switch (step) {
      case 1: return !!selectedService;
      case 2: return selectedDate && selectedTime;
      case 3: return true;
      default: return false;
    }
  };

  const goNext = () => {
    if (step < 4 && canProceed()) {
      setStep((step + 1) as 1 | 2 | 3 | 4);
    }
  };

  const goBack = () => {
    if (step > 1) {
      setStep((step - 1) as 1 | 2 | 3 | 4);
    }
  };

  const onSubmit = async (data: BookingFormData) => {
    if (!selectedDate || !selectedTime) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const [hours, minutes] = selectedTime.split(":").map(Number);
      const bookingDateTime = new Date(selectedDate);
      bookingDateTime.setHours(hours, minutes);

      const response = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          service: getServiceName(),
          date: bookingDateTime.toISOString(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to book session');
      }

      setSubmittedData(data);
      if (result.icsContent) {
        setIcsContent(result.icsContent);
      }
      setSubmitStatus('success');
      setStep(4);
    } catch (error) {
      console.error('Booking error:', error);
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadCalendar = () => {
    if (!selectedDate || !selectedTime) return;
    
    const [hours, minutes] = selectedTime.split(":").map(Number);
    const startDate = new Date(selectedDate);
    startDate.setHours(hours, minutes);
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);

    const formatICSDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    };

    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//TechAware//Booking System//EN
CALSCALE:GREGORIAN
METHOD:REQUEST
BEGIN:VEVENT
DTSTART:${formatICSDate(startDate)}
DTEND:${formatICSDate(endDate)}
DTSTAMP:${formatICSDate(new Date())}
UID:booking-${Date.now()}@techaware.com
SUMMARY:TechAware Consultation - ${getServiceName()}
DESCRIPTION:Your consultation with TechAware regarding ${getServiceName()}
LOCATION:Virtual Meeting (Link will be shared via email)
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    downloadICS(icsData, "techaware-consultation.ics");
  };

  const tileDisabled = ({ date }: { date: Date }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // Disable weekends and past dates
    return date < today || date.getDay() === 0 || date.getDay() === 6;
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Header */}
      <div className="bg-[#051c2c] text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Schedule a Consultation
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Book a session with our experts to discuss your digital transformation journey and technology needs.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Panel - Progress & Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
                {/* Step Indicator */}
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                    Booking Progress
                  </h3>
                  <div className="space-y-4">
                    {[
                      { num: 1, label: "Select Service", icon: Briefcase },
                      { num: 2, label: "Choose Date & Time", icon: CalendarDays },
                      { num: 3, label: "Your Details", icon: User },
                      { num: 4, label: "Confirmation", icon: CheckCircle },
                    ].map((s, idx) => (
                      <div key={s.num} className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                          step >= s.num 
                            ? "bg-[#051c2c] text-white" 
                            : "bg-gray-100 text-gray-400"
                        }`}>
                          <s.icon className="w-5 h-5" />
                        </div>
                        <div className={`transition-colors ${
                          step >= s.num ? "text-gray-900" : "text-gray-400"
                        }`}>
                          <p className="font-medium">{s.label}</p>
                        </div>
                        {step > s.num && (
                          <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Booking Summary */}
                {(selectedService || selectedDate || selectedTime) && step < 4 && (
                  <div className="border-t pt-6">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                      Booking Summary
                    </h3>
                    <div className="space-y-3">
                      {selectedService && (
                        <div className="flex items-start gap-3">
                          <Briefcase className="w-5 h-5 text-[#051c2c] mt-0.5" />
                          <div>
                            <p className="text-sm text-gray-500">Service</p>
                            <p className="font-medium text-gray-900">{getServiceName()}</p>
                          </div>
                        </div>
                      )}
                      {selectedDate && (
                        <div className="flex items-start gap-3">
                          <CalendarDays className="w-5 h-5 text-[#051c2c] mt-0.5" />
                          <div>
                            <p className="text-sm text-gray-500">Date</p>
                            <p className="font-medium text-gray-900">{formatDate(selectedDate)}</p>
                          </div>
                        </div>
                      )}
                      {selectedTime && (
                        <div className="flex items-start gap-3">
                          <Clock className="w-5 h-5 text-[#051c2c] mt-0.5" />
                          <div>
                            <p className="text-sm text-gray-500">Time</p>
                            <p className="font-medium text-gray-900">{selectedTime}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Contact Info */}
                <div className="border-t pt-6 mt-6">
                  <p className="text-sm text-gray-500">
                    Questions? Contact us at
                  </p>
                  <a 
                    href="mailto:hello@techaware.com" 
                    className="text-[#051c2c] font-medium hover:underline"
                  >
                    hello@techaware.com
                  </a>
                </div>
              </div>
            </div>

            {/* Right Panel - Form Steps */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-xl shadow-sm p-8">
                <AnimatePresence mode="wait">
                  {/* Step 1: Select Service */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">
                        Select a Service
                      </h2>
                      <p className="text-gray-600 mb-8">
                        Choose the type of consultation you're interested in.
                      </p>

                      <div className="grid gap-4">
                        {SERVICES.map((service) => (
                          <button
                            key={service.id}
                            onClick={() => setSelectedService(service.id)}
                            className={`p-5 rounded-lg border-2 text-left transition-all ${
                              selectedService === service.id
                                ? "border-[#051c2c] bg-[#051c2c]/5"
                                : "border-gray-200 hover:border-[#051c2c]/50"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="font-semibold text-gray-900">{service.name}</h3>
                                <p className="text-sm text-gray-500 mt-1">
                                  <Clock className="w-4 h-4 inline mr-1" />
                                  {service.duration}
                                </p>
                              </div>
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                selectedService === service.id
                                  ? "border-[#051c2c] bg-[#051c2c]"
                                  : "border-gray-300"
                              }`}>
                                {selectedService === service.id && (
                                  <CheckCircle className="w-4 h-4 text-white" />
                                )}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Date & Time */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">
                        Choose Date & Time
                      </h2>
                      <p className="text-gray-600 mb-8">
                        Select a date and time that works best for you.
                      </p>

                      <div className="flex flex-col md:flex-row gap-8">
                        {/* Calendar */}
                        <div className="flex-1">
                          <Calendar
                            onChange={handleDateSelect}
                            value={selectedDate}
                            minDate={new Date()}
                            tileDisabled={tileDisabled}
                            className="w-full border rounded-lg p-4 shadow-sm"
                          />
                          <p className="text-xs text-gray-500 mt-2">
                            * Available Monday - Friday only
                          </p>
                        </div>

                        {/* Time Slots */}
                        <div className="md:w-48">
                          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Clock className="w-5 h-5" />
                            Available Times
                          </h3>
                          <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
                            {TIME_SLOTS.map((slot) => (
                              <button
                                key={slot}
                                onClick={() => setSelectedTime(slot)}
                                disabled={!selectedDate}
                                className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all ${
                                  selectedTime === slot
                                    ? "bg-[#051c2c] text-white border-[#051c2c]"
                                    : selectedDate
                                    ? "border-gray-200 hover:border-[#051c2c] text-gray-700"
                                    : "border-gray-100 text-gray-300 cursor-not-allowed"
                                }`}
                              >
                                {slot}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Details Form */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">
                        Your Details
                      </h2>
                      <p className="text-gray-600 mb-8">
                        Please provide your information so we can prepare for your consultation.
                      </p>

                      <form id="booking-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              <User className="w-4 h-4 inline mr-2" />
                              Full Name *
                            </label>
                            <input
                              {...register("name", { required: "Name is required" })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051c2c] focus:border-transparent outline-none"
                              placeholder="John Doe"
                            />
                            {errors.name && (
                              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              <Mail className="w-4 h-4 inline mr-2" />
                              Email Address *
                            </label>
                            <input
                              {...register("email", {
                                required: "Email is required",
                                pattern: {
                                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                  message: "Invalid email address"
                                }
                              })}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051c2c] focus:border-transparent outline-none"
                              placeholder="john@company.com"
                            />
                            {errors.email && (
                              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              <Building2 className="w-4 h-4 inline mr-2" />
                              Company / Organization
                            </label>
                            <input
                              {...register("company")}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051c2c] focus:border-transparent outline-none"
                              placeholder="Company Ltd."
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Phone (Optional)
                            </label>
                            <input
                              {...register("phone")}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051c2c] focus:border-transparent outline-none"
                              placeholder="+1 (555) 000-0000"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            <FileText className="w-4 h-4 inline mr-2" />
                            Project Brief *
                          </label>
                          <textarea
                            {...register("brief", { required: "Please provide a brief description" })}
                            rows={5}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#051c2c] focus:border-transparent outline-none resize-none"
                            placeholder="Tell us about your goals, challenges, and what you'd like to achieve from this consultation..."
                          />
                          {errors.brief && (
                            <p className="text-red-500 text-sm mt-1">{errors.brief.message}</p>
                          )}
                        </div>

                        {errorMessage && (
                          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-700">{errorMessage}</p>
                          </div>
                        )}
                      </form>
                    </motion.div>
                  )}

                  {/* Step 4: Success */}
                  {step === 4 && submitStatus === 'success' && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className="text-center py-8"
                    >
                      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-12 h-12 text-green-600" />
                      </div>

                      <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                        Booking Confirmed!
                      </h2>

                      <p className="text-gray-600 max-w-md mx-auto mb-8">
                        Thank you for scheduling a consultation with TechAware. 
                        We've sent a confirmation email with all the details to{" "}
                        <strong>{submittedData?.email}</strong>.
                      </p>

                      <div className="bg-gray-50 rounded-xl p-6 max-w-md mx-auto mb-8">
                        <h3 className="font-semibold text-gray-900 mb-4">Booking Details</h3>
                        <div className="space-y-3 text-left">
                          <div className="flex items-center gap-3">
                            <Briefcase className="w-5 h-5 text-[#051c2c]" />
                            <span>{getServiceName()}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <CalendarDays className="w-5 h-5 text-[#051c2c]" />
                            <span>{selectedDate && formatDate(selectedDate)}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Clock className="w-5 h-5 text-[#051c2c]" />
                            <span>{selectedTime}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                          onClick={handleDownloadCalendar}
                          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#051c2c] text-white font-medium rounded-lg hover:bg-[#0a2d42] transition-colors"
                        >
                          <Download className="w-5 h-5" />
                          Add to Calendar
                        </button>
                        <a
                          href="/"
                          className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Return Home
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                {step < 4 && (
                  <div className="flex justify-between mt-8 pt-6 border-t">
                    <button
                      onClick={goBack}
                      disabled={step === 1}
                      className={`inline-flex items-center gap-2 px-6 py-3 font-medium rounded-lg transition-colors ${
                        step === 1
                          ? "text-gray-300 cursor-not-allowed"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <ArrowLeft className="w-5 h-5" />
                      Back
                    </button>

                    {step < 3 ? (
                      <button
                        onClick={goNext}
                        disabled={!canProceed()}
                        className={`inline-flex items-center gap-2 px-8 py-3 font-medium rounded-lg transition-colors ${
                          canProceed()
                            ? "bg-[#051c2c] text-white hover:bg-[#0a2d42]"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        Continue
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        form="booking-form"
                        disabled={isSubmitting}
                        className="inline-flex items-center gap-2 px-8 py-3 bg-[#051c2c] text-white font-medium rounded-lg hover:bg-[#0a2d42] disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            Confirm Booking
                            <CheckCircle className="w-5 h-5" />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Calendar Styles */}
      <style jsx global>{`
        .react-calendar {
          border: none !important;
          font-family: inherit;
        }
        .react-calendar__tile {
          padding: 12px 8px;
          border-radius: 8px;
        }
        .react-calendar__tile:enabled:hover {
          background: #e5e7eb;
        }
        .react-calendar__tile--active {
          background: #051c2c !important;
          color: white;
        }
        .react-calendar__tile--active:enabled:hover {
          background: #0a2d42 !important;
        }
        .react-calendar__tile:disabled {
          color: #d1d5db;
        }
        .react-calendar__navigation button {
          font-size: 1rem;
          font-weight: 600;
        }
        .react-calendar__navigation button:enabled:hover {
          background: #e5e7eb;
          border-radius: 8px;
        }
        .react-calendar__month-view__weekdays__weekday {
          font-weight: 600;
          color: #6b7280;
        }
        .react-calendar__month-view__weekdays__weekday abbr {
          text-decoration: none;
        }
      `}</style>
    </div>
  );
}
