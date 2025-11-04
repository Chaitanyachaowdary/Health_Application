import React from "react";

export default function Footer() {
  return (
    <footer className="bg-blue-600 text-white py-10 mt-20">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Column 1 - Logo & About */}
        <div>
          <h2 className="text-2xl font-bold mb-3">HealthCare+</h2>
          <p className="text-gray-100">
            Your trusted digital healthcare platform — connecting patients and doctors
            with secure, seamless consultations.
          </p>
        </div>

        {/* Column 2 - Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#home" className="hover:underline">Home</a></li>
            <li><a href="#services" className="hover:underline">Services</a></li>
            <li><a href="#about" className="hover:underline">About</a></li>
            <li><a href="#testimonials" className="hover:underline">Testimonials</a></li>
          </ul>
        </div>

        {/* Column 3 - Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
          <p>Email: support@healthcareplus.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Location: Bengaluru, India</p>
        </div>
      </div>

      <div className="text-center text-gray-200 mt-10 border-t border-blue-400 pt-4">
        © {new Date().getFullYear()} HealthCare+. All rights reserved.
      </div>
    </footer>
  );
}
