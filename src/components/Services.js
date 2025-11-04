import React from "react";
import { Stethoscope, Activity, Pill, Ambulance } from "lucide-react";

export default function Services() {
  const services = [
    {
      title: "Doctor Consultation",
      description: "Book appointments with top specialists and general physicians online.",
      icon: <Stethoscope className="w-10 h-10 text-blue-600" />,
    },
    {
      title: "Diagnostics",
      description: "Get lab tests and diagnostic reports delivered straight to your inbox.",
      icon: <Activity className="w-10 h-10 text-blue-600" />,
    },
    {
      title: "Pharmacy",
      description: "Order medicines online and get fast doorstep delivery at the best prices.",
      icon: <Pill className="w-10 h-10 text-blue-600" />,
    },
    {
      title: "Emergency Care",
      description: "24/7 ambulance and emergency support, available across major cities.",
      icon: <Ambulance className="w-10 h-10 text-blue-600" />,
    },
  ];

  return (
    <section className="py-20 bg-white" id="services">
      <div className="max-w-7xl mx-auto px-8 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-12">
          Our <span className="text-blue-600">Services</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-8 bg-gray-50 rounded-2xl shadow hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <div className="flex justify-center mb-6">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
