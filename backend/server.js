import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mysql from "mysql2";
import bcrypt from "bcryptjs";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Connect to MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Update if needed
  password: "Chaitu@123", // Your MySQL password
  database: "healthcare_db",
});

db.connect((err) => {
  if (err) console.log("❌ MySQL connection failed:", err);
  else console.log("✅ Connected to MySQL Database");
});

// ✅ Create Tables One by One
const createContactTable = `
CREATE TABLE IF NOT EXISTS contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  phone VARCHAR(20),
  subject VARCHAR(150),
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

const createAppointmentsTable = `
CREATE TABLE IF NOT EXISTS appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  phone VARCHAR(20),
  date DATE,
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

const createUsersTable = `
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(15),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

db.query(createContactTable, (err) => {
  if (err) console.error("❌ Error creating contact_messages:", err);
  else console.log("✅ contact_messages table ready");

  db.query(createAppointmentsTable, (err) => {
    if (err) console.error("❌ Error creating appointments:", err);
    else console.log("✅ appointments table ready");

    db.query(createUsersTable, (err) => {
      if (err) console.error("❌ Error creating users:", err);
      else console.log("✅ users table ready");
    });
  });
});

// ✅ CONTACT FORM
app.post("/api/contact", (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  const sql = "INSERT INTO contact_messages (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [name, email, phone, subject, message], (err) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.status(201).json({ message: "Contact form submitted successfully!" });
  });
});

// ✅ APPOINTMENT FORM
app.post("/api/appointments", (req, res) => {
  const { name, email, phone, date, message } = req.body;
  const sql = "INSERT INTO appointments (name, email, phone, date, message) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [name, email, phone, date, message], (err) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.status(201).json({ message: "Appointment booked successfully!" });
  });
});

// ✅ FETCH ALL APPOINTMENTS (Admin)
app.get("/api/appointments", (req, res) => {
  db.query("SELECT * FROM appointments ORDER BY created_at DESC", (err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching appointments" });
    res.json(results);
  });
});

// ✅ DELETE APPOINTMENT (Admin)
app.delete("/api/appointments/:id", (req, res) => {
  db.query("DELETE FROM appointments WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ message: "Error deleting appointment" });
    res.json({ message: "Appointment deleted successfully!" });
  });
});

// ✅ USER SIGNUP
app.post("/api/signup", async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = "INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, email, phone, hashedPassword], (err) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY")
          return res.status(400).json({ message: "Email already registered!" });
        return res.status(500).json({ message: "Database error" });
      }
      res.status(201).json({ message: "User registered successfully!" });
    });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ USER LOGIN
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (results.length === 0) return res.status(401).json({ message: "Invalid credentials" });

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        created_at: user.created_at,
      },
    });
  });
});

// ✅ GET USER DETAILS
app.get("/api/users/:id", (req, res) => {
  db.query("SELECT id, name, email, phone, created_at FROM users WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching user" });
    if (results.length === 0) return res.status(404).json({ message: "User not found" });
    res.json(results[0]);
  });
});

// ✅ UPDATE USER DETAILS
app.put("/api/users/:id", (req, res) => {
  const { name, phone } = req.body;
  db.query("UPDATE users SET name = ?, phone = ? WHERE id = ?", [name, phone, req.params.id], (err) => {
    if (err) return res.status(500).json({ message: "Error updating user" });
    res.json({ message: "Profile updated successfully!" });
  });
});

// ✅ CHANGE PASSWORD
app.put("/api/users/:id/password", async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  db.query("SELECT * FROM users WHERE id = ?", [req.params.id], async (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (results.length === 0) return res.status(404).json({ message: "User not found" });

    const user = results[0];
    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) return res.status(401).json({ message: "Old password incorrect" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    db.query("UPDATE users SET password = ? WHERE id = ?", [hashedPassword, req.params.id], (err) => {
      if (err) return res.status(500).json({ message: "Error updating password" });
      res.json({ message: "Password updated successfully!" });
    });
  });
});

// ✅ USER APPOINTMENT HISTORY
app.get("/api/appointments/user/:email", (req, res) => {
  db.query(
    "SELECT id, name, email, phone, date, message, created_at FROM appointments WHERE email = ? ORDER BY created_at DESC",
    [req.params.email],
    (err, results) => {
      if (err) return res.status(500).json({ message: "Error fetching appointments" });
      res.json(results);
    }
  );
});

// ✅ SERVER START
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
