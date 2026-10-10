import pool from "../config/db.js";

// A simple check that the email looks like something@something.something
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// POST /api/contact
// Validates the form data, then saves it into the contact_messages table.
export async function createContactMessage(req, res, next) {
  try {
    const { name, email, subject, message } = req.body;

    // 1. Required fields must exist and not be only spaces
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res
        .status(400)
        .json({ error: "Name, email and message are required." });
    }

    // 2. Email must look valid
    if (!emailPattern.test(email.trim())) {
      return res
        .status(400)
        .json({ error: "Please enter a valid email address." });
    }

    // 3. Lengths must fit the database columns (name 100, email 150, subject 150)
    if (
      name.trim().length > 100 ||
      email.trim().length > 150 ||
      (subject || "").trim().length > 150
    ) {
      return res.status(400).json({ error: "One of the fields is too long." });
    }

    // The ? placeholders keep the query safe from SQL injection
    await pool.query(
      "INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)",
      [name.trim(), email.trim(), subject?.trim() || null, message.trim()],
    );

    res.status(201).json({ message: "Thanks! Your message has been sent." });
  } catch (err) {
    next(err); // goes to errorHandler.js
  }
}
