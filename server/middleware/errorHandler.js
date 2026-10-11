import multer from "multer";

export function errorHandler(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    let message = err.message;
    if (err.code === "LIMIT_FILE_SIZE") {
      message = "Image is too large. Maximum size is 2 MB.";
    } else if (err.code === "LIMIT_UNEXPECTED_FILE") {
      message = "Send the file in a field named 'image' (one file only).";
    }
    return res.status(400).json({ error: message });
  }

  console.error(err.stack);

  const status = err.status || 500;

  const message =
    status === 500 && process.env.NODE_ENV === "production"
      ? "Something went wrong on the server."
      : err.message || "Something went wrong on the server.";

  res.status(status).json({ error: message });
}
