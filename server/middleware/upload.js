import multer from "multer";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

// ES Modules have no __dirname, so we rebuild it (same trick as server.js)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Always points to server/uploads, no matter where you start the server from
const uploadDir = path.join(__dirname, "..", "uploads");

// The ONLY file types we accept, mapped to the extension we save them with.
// image/jpeg covers both .jpg and .jpeg files.
const allowedTypes = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
};

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB

// storage: WHERE to save the file and WHAT to name it
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    // A random name means we never trust the user's original file name,
    // and two uploads can never overwrite each other.
    cb(null, `${crypto.randomUUID()}${allowedTypes[file.mimetype]}`);
  },
});

// fileFilter: runs BEFORE saving. Reject anything that isn't an allowed image.
const fileFilter = (req, file, cb) => {
  if (allowedTypes[file.mimetype]) {
    return cb(null, true);
  }
  const error = new Error("Only JPG, PNG and WEBP images are allowed.");
  error.status = 400;
  cb(error);
};

export const uploadImage = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_FILE_SIZE, files: 1 },
});
