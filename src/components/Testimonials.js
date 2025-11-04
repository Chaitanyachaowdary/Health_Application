import React from "react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Priya Sharma",
      feedback:
        "I booked a consultation through this platform, and the doctor was excellent! Super easy and convenient.",
      role: "Patient, Mumbai",
    },
    {
      name: "Rahul Verma",
      feedback:
        "Quick service and great support. I received my lab results online without any hassle. Highly recommend!",
      role: "Patient, Delhi",
    },
    {
      name: "Sneha Reddy",
      feedback:
        "A reliable platform with top-quality doctors. I appreciate how they value patient privacy.",
      role: "Patient, Hyderabad",
    },
  ];

  return (
    <section className="py-24 bg-white" id="testimonials">
      <div className="max-w-7xl mx-auto px-8 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-12">
          What Our <span className="text-blue-600">Patients Say</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="p-8 bg-gray-50 rounded-2xl shadow hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <p className="text-gray-600 italic mb-6">“{t.feedback}”</p>
              <h3 className="text-lg font-semibold text-gray-800">
                {t.name}
              </h3>
              <p className="text-sm text-gray-500">{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
