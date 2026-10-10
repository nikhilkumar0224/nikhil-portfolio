// MUST be the first import: loads .env and checks the required variables
import "./config/env.js";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";

import pool from "./config/db.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { apiLimiter, contactLimiter } from "./middleware/rateLimiters.js";
import projectsRoutes from "./routes/projectsRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Railway (and most hosts) put a proxy in front of your app.
// Without this, rate limiting would see the proxy's IP for EVERY visitor.
app.set("trust proxy", 1);

// ====== MIDDLEWARE ====== //

// helmet adds security headers.
// crossOriginResourcePolicy must be "cross-origin", otherwise browsers would
// block your Netlify site from loading images served by this backend.
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

// FRONTEND_URL can hold one URL, or several separated by commas
const allowedOrigins = process.env.FRONTEND_URL.split(",").map(
  (url) => url.trim().replace(/\/$/, ""), // remove spaces and a trailing slash
);

app.use(
  cors({
    origin(origin, callback) {
      // Requests with no Origin header (Postman, curl) are allowed through.
      // CORS only controls what BROWSERS may do. It is not a lock, which is
      // why requireAdmin exists.
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      const error = new Error("Origin not allowed");
      error.status = 403;
      callback(error);
    },
  }),
);

app.get("/", (req, res) => {
  res.json();
});

app.use(express.json({ limit: "10kb" })); // a contact form never needs more

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ====== ROUTES ====== //
app.get("/api/health", async (_req, res, next) => {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS result");
    res.json({
      status: "ok",
      message: "Server and database are both working!",
      testQuery: rows[0].result,
    });
  } catch (err) {
    next(err);
  }
});

app.use("/api", apiLimiter); // applies to every /api route registered below

app.use("/api/projects", projectsRoutes);
app.use("/api/contact", contactLimiter, contactRoutes);

// ====== ERROR HANDLER (must be last) ====== //
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
