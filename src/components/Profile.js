import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [passwordData, setPasswordData] = useState({ oldPassword: "", newPassword: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      fetchUserData(parsedUser.id);
      fetchAppointments(parsedUser.email);
    } else {
      alert("⚠️ Please login first!");
      navigate("/user-login");
    }
  }, [navigate]);

  const fetchUserData = async (id) => {
    const res = await fetch(`http://localhost:5000/api/users/${id}`);
    const data = await res.json();
    setFormData({ name: data.name, phone: data.phone || "" });
  };

  const fetchAppointments = async (email) => {
    const res = await fetch(`http://localhost:5000/api/appointments/user/${email}`);
    const data = await res.json();
    setAppointments(data);
  };

  const handleUpdate = async () => {
    const res = await fetch(`http://localhost:5000/api/users/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    alert(data.message);
    setEditMode(false);
  };

  const handlePasswordChange = async () => {
    const res = await fetch(`http://localhost:5000/api/users/${user.id}/password`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(passwordData),
    });
    const data = await res.json();
    alert(data.message);
    setPasswordData({ oldPassword: "", newPassword: "" });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("👋 Logged out successfully!");
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-blue-50 py-16 flex justify-center">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-4xl p-8">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          👤 My Profile
        </h2>

        {/* Personal Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-3">Personal Information</h3>
            {editMode ? (
              <>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border rounded-lg p-2 mb-3"
                />
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full border rounded-lg p-2 mb-3"
                />
                <button
                  onClick={handleUpdate}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg mr-2 hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <p className="text-gray-700 mb-2">
                  <strong>Name:</strong> {formData.name}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Email:</strong> {user.email}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Phone:</strong> {formData.phone || "Not provided"}
                </p>
                <button
                  onClick={() => setEditMode(true)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                >
                  Edit Info
                </button>
              </>
            )}
          </div>

          {/* Password Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-3">Change Password</h3>
            <input
              type="password"
              placeholder="Old Password"
              value={passwordData.oldPassword}
              onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
              className="w-full border rounded-lg p-2 mb-3"
            />
            <input
              type="password"
              placeholder="New Password"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              className="w-full border rounded-lg p-2 mb-3"
            />
            <button
              onClick={handlePasswordChange}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Update Password
            </button>
          </div>
        </div>

        {/* Appointment History */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-3">🩺 Appointment History</h3>
          {appointments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 rounded-lg">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="p-2 border">Date</th>
                    <th className="p-2 border">Message</th>
                    <th className="p-2 border">Booked At</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((a) => (
                    <tr key={a.id} className="border-b hover:bg-blue-50">
                      <td className="p-2 border">{a.date}</td>
                      <td className="p-2 border">{a.message}</td>
                      <td className="p-2 border text-sm text-gray-500">
                        {new Date(a.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No appointments found.</p>
          )}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
