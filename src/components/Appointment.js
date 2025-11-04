import React, { useState } from "react";

const Appointment = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("✅ Appointment booked successfully!");
        setFormData({ name: "", email: "", phone: "", date: "", message: "" });
      } else {
        alert("❌ " + data.message);
      }
    } catch (error) {
      alert("⚠️ Server error. Please try again later.");
    }
  };

  return (
    <div className="p-10 bg-blue-50 min-h-screen">
      <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">
        Book an Appointment
      </h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-md space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-lg"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          title="Please enter a valid email address"
          className="w-full border p-3 rounded-lg"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          pattern="[0-9]{10,15}"
          title="Please enter a valid phone number (10–15 digits)"
          className="w-full border p-3 rounded-lg"
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-lg"
        />
        <textarea
          name="message"
          placeholder="Message (optional)"
          value={formData.message}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
          rows="4"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg w-full hover:bg-blue-700"
        >
          Book Now
        </button>
      </form>
    </div>
  );
};

export default Appointment;
