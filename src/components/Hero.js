import React from "react";
import { Link } from "react-router-dom";
import heroImg from "../assets/hero.png"; // ✅ Make sure this image exists in src/assets/

export default function Hero() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-8 py-32 mt-16">
      {/* Left Side - Text */}
      <div className="md:w-1/2 text-center md:text-left space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
          Your Health, <span className="text-blue-600">Our Priority</span>
        </h1>

        <p className="text-gray-600 text-lg">
          Get personalized care from trusted doctors and specialists.
          We bring healthcare closer to you with easy online appointments.
        </p>

        <div className="flex justify-center md:justify-start gap-4">
          {/* ✅ Book Appointment Button (Link) */}
          <Link
            to="/appointment"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
          >
            Book Appointment
          </Link>

          {/* Optional Learn More button */}
          <a
            href="#about"
            className="border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold px-6 py-3 rounded-lg transition"
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
        <img
          src={heroImg}
          alt="Healthcare professionals"
          className="w-full max-w-md drop-shadow-lg rounded-xl"
        />
      </div>
    </section>
  );
}
