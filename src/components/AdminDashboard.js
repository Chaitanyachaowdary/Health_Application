import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [contacts, setContacts] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // ✅ Check if admin is logged in
  useEffect(() => {
    const loggedIn = localStorage.getItem("isAdminLoggedIn");
    if (!loggedIn) {
      navigate("/admin-login");
    }
  }, [navigate]);

  // ✅ Fetch Contact Messages
  const fetchContacts = async () => {
    const res = await fetch("http://localhost:5000/api/contact");
    const data = await res.json();
    setContacts(data);
  };

  // ✅ Fetch Appointments
  const fetchAppointments = async () => {
    const res = await fetch("http://localhost:5000/api/appointments");
    const data = await res.json();
    setAppointments(data);
  };

  // ✅ Delete Contact
  const deleteContact = async (id) => {
    if (!window.confirm("Delete this contact?")) return;
    await fetch(`http://localhost:5000/api/contact/${id}`, { method: "DELETE" });
    fetchContacts();
  };

  // ✅ Delete Appointment
  const deleteAppointment = async (id) => {
    if (!window.confirm("Delete this appointment?")) return;
    await fetch(`http://localhost:5000/api/appointments/${id}`, { method: "DELETE" });
    fetchAppointments();
  };

  useEffect(() => {
    fetchContacts();
    fetchAppointments();
  }, []);

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/admin-login");
  };

  // ✅ Search Filter
  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm)
  );

  const filteredAppointments = appointments.filter(
    (a) =>
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.phone.includes(searchTerm)
  );

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* 🔷 Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-extrabold text-blue-700">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* 🔍 Search */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search by name, email, or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>

      {/* 📩 Contact Messages Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">📩 Contact Messages</h2>
        <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3 border">#</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Phone</th>
                <th className="p-3 border">Subject</th>
                <th className="p-3 border">Message</th>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((c) => (
                <tr key={c.id} className="border-b hover:bg-blue-50">
                  <td className="p-3 border text-center">{c.id}</td>
                  <td className="p-3 border">{c.name}</td>
                  <td className="p-3 border">{c.email}</td>
                  <td className="p-3 border">{c.phone}</td>
                  <td className="p-3 border">{c.subject}</td>
                  <td className="p-3 border">{c.message}</td>
                  <td className="p-3 border text-sm text-gray-600">
                    {new Date(c.created_at).toLocaleString()}
                  </td>
                  <td className="p-3 border text-center">
                    <button
                      onClick={() => deleteContact(c.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredContacts.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center p-5 text-gray-500">
                    No contact messages
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* 🩺 Appointments Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">🩺 Appointments</h2>
        <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="p-3 border">#</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Phone</th>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Message</th>
                <th className="p-3 border">Booked At</th> {/* ✅ Added */}
                <th className="p-3 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((a) => (
                <tr key={a.id} className="border-b hover:bg-green-50">
                  <td className="p-3 border text-center">{a.id}</td>
                  <td className="p-3 border">{a.name}</td>
                  <td className="p-3 border">{a.email}</td>
                  <td className="p-3 border">{a.phone}</td>
                  <td className="p-3 border">{a.date}</td>
                  <td className="p-3 border">{a.message}</td>
                  <td className="p-3 border text-sm text-gray-600">
                    {new Date(a.created_at).toLocaleString()} {/* ✅ shows booked time */}
                  </td>
                  <td className="p-3 border text-center">
                    <button
                      onClick={() => deleteAppointment(a.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredAppointments.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center p-5 text-gray-500">
                    No appointments
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
