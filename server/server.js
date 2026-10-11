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

app.set("trust proxy", 1);

// ====== MIDDLEWARE ====== //
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));

// FRONTEND_URL can hold one URL, or several separated by commas
const allowedOrigins = process.env.FRONTEND_URL.split(",").map((url) =>
  url.trim().replace(/\/$/, ""),
);

app.use(
  cors({
    origin(origin, callback) {
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

app.use(express.json({ limit: "10kb" }));

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

app.use("/api", apiLimiter);

app.use("/api/projects", projectsRoutes);
app.use("/api/contact", contactLimiter, contactRoutes);

// ====== ERROR HANDLER ====== //
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
