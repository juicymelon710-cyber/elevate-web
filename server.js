require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
const port = Number(process.env.PORT) || 3000;

const allowedOrigins = (process.env.CORS_ORIGINS ||
  "https://elevateweb.md,https://www.elevateweb.md,http://localhost:5500,http://127.0.0.1:5500,http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json({ limit: "25kb" }));

const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || 10,
  queueLimit: 0,
});

function cleanString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function validateContactPayload(payload) {
  const data = {
    name: cleanString(payload.name),
    email: cleanString(payload.email),
    phone: cleanString(payload.phone),
    service: cleanString(payload.service),
    budget: cleanString(payload.budget),
    message: cleanString(payload.message),
  };

  if (!data.name || !data.email || !data.service || !data.budget || !data.message) {
    return { error: "Please complete all required fields." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return { error: "Please enter a valid email address." };
  }

  if (data.name.length > 120 || data.email.length > 190 || data.phone.length > 50) {
    return { error: "Some fields are too long." };
  }

  if (data.message.length > 3000) {
    return { error: "Please keep your message under 3000 characters." };
  }

  return { data };
}

app.get("/health", async (req, res) => {
  try {
    await db.query("SELECT 1");
    res.json({ ok: true, database: "connected" });
  } catch (error) {
    res.status(500).json({ ok: false, database: "unavailable" });
  }
});

app.post("/api/contact", async (req, res) => {
  const validation = validateContactPayload(req.body || {});

  if (validation.error) {
    res.status(400).json({ error: validation.error });
    return;
  }

  const { name, email, phone, service, budget, message } = validation.data;

  try {
    const sql = `
      INSERT INTO project_requests
        (name, email, phone, service, budget, message, source)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.execute(sql, [
      name,
      email,
      phone || null,
      service,
      budget,
      message,
      "website_contact_form",
    ]);

    res.status(201).json({
      message: "Message sent successfully. We will contact you soon.",
      requestId: result.insertId,
    });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({
      error: "We could not save your request right now. Please try again later.",
    });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.use((error, req, res, next) => {
  if (error.message === "Not allowed by CORS") {
    res.status(403).json({ error: "Origin not allowed." });
    return;
  }

  console.error("API error:", error);
  res.status(500).json({ error: "Internal server error." });
});

app.listen(port, () => {
  console.log(`Elevate Web API running on port ${port}`);
});
