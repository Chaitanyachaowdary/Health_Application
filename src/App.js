import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Appointment from "./components/Appointment";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import UserLogin from "./components/UserLogin";
import UserSignup from "./components/UserSignup";
import Profile from "./components/Profile";

function App() {
  return (
    <Router>
      {/* 🩵 Navbar always visible */}
      <Navbar />

      {/* 🚀 Page Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/contact" element={<Contact />} />

        {/* User Auth */}
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-signup" element={<UserSignup />} />
        <Route path="/profile" element={<Profile />} /> {/* ✅ Added */}

        {/* Admin */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>

      {/* 💬 Contact & Footer visible on all pages */}
      <Contact />
      <Footer />
    </Router>
  );
}

export default App;
