import React from "react";
import aboutImg from "../assets/about.jpg";

export default function About() {
  return (
    <section className="py-24 bg-gray-50" id="about">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center px-8 gap-12">
        {/* Left Side - Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={aboutImg}
            alt="Healthcare teamwork"
            className="w-full max-w-md rounded-2xl shadow-lg"
          />
        </div>

        {/* Right Side - Text */}
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <h2 className="text-4xl font-bold text-gray-800">
            Why <span className="text-blue-600">Choose Us?</span>
          </h2>

          <p className="text-gray-600 leading-relaxed">
            We combine technology and compassion to deliver world-class
            healthcare services. Our mission is to ensure easy access to
            high-quality treatment and consultations — anytime, anywhere.
          </p>

          <ul className="text-gray-700 space-y-3">
            <li>✅ Certified and experienced doctors</li>
            <li>✅ 24/7 support for online consultations</li>
            <li>✅ Secure and private medical records</li>
            <li>✅ Easy appointment scheduling</li>
          </ul>

          <button className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition">
            Know More
          </button>
        </div>
      </div>
    </section>
  );
}
