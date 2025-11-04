import React from "react";

export default function Header() {
  return (
    <header className="w-full fixed top-0 left-0 bg-white/90 backdrop-blur-md shadow-md z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-8">
        {/* Logo */}
        <h1 className="text-2xl font-extrabold text-blue-600 tracking-wide">
          Health<span className="text-gray-900">Care</span>
        </h1>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <a href="#" className="hover:text-blue-600 transition">
            Home
          </a>
          <a href="#" className="hover:text-blue-600 transition">
            Services
          </a>
          <a href="#" className="hover:text-blue-600 transition">
            Doctors
          </a>
          <a href="#" className="hover:text-blue-600 transition">
            About
          </a>
          <a href="#" className="hover:text-blue-600 transition">
            Contact
          </a>
        </nav>

        {/* Button */}
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition">
          Book Now
        </button>
      </div>
    </header>
  );
}
