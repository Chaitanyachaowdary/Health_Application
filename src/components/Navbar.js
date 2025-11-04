import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // ✅ Check login state on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    alert("👋 Logged out successfully!");
    navigate("/");
  };

  // ✅ Go to admin login
  const handleAdmin = () => {
    navigate("/admin-login");
  };

  // ✅ Go to user login
  const handleUserLogin = () => {
    navigate("/user-login");
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">
        {/* 🩵 Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-700 hover:text-blue-800 transition"
        >
          Health<span className="text-blue-500">Care+</span>
        </Link>

        {/* 🧭 Navigation Links */}
        <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <Link to="/" className="hover:text-blue-600 transition">
            Home
          </Link>
          <Link to="/about" className="hover:text-blue-600 transition">
            About
          </Link>
          <Link to="/services" className="hover:text-blue-600 transition">
            Services
          </Link>
          <Link to="/appointment" className="hover:text-blue-600 transition">
            Appointment
          </Link>
          <Link to="/contact" className="hover:text-blue-600 transition">
            Contact
          </Link>
        </div>

        {/* 🔐 Right Section */}
        <div className="flex items-center gap-3">
          {!user ? (
            <>
              {/* Show when user is NOT logged in */}
              <button
                onClick={handleUserLogin}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                User Login
              </button>

              <button
                onClick={handleAdmin}
                className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
              >
                Admin Login
              </button>
            </>
          ) : (
            // ✅ When logged in – show profile menu
            <div className="relative group">
              <button className="flex items-center gap-2 bg-blue-100 text-blue-700 font-semibold px-4 py-2 rounded-lg hover:bg-blue-200 transition">
                👤 {user.name?.split(" ")[0] || "User"}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <div className="absolute right-0 hidden group-hover:block bg-white shadow-lg rounded-lg w-48 mt-2">
                <div className="px-4 py-2 border-b">
                  <p className="text-sm text-gray-600">Signed in as</p>
                  <p className="font-semibold text-gray-800 truncate">{user.email}</p>
                </div>

                <button
                  onClick={() => navigate("/profile")}
                  className="block w-full text-left px-4 py-2 hover:bg-blue-50 text-gray-700"
                >
                  View Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 rounded-b-lg"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
