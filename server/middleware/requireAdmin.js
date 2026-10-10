import crypto from "crypto";

// Lets a request through ONLY if it carries the secret key from .env
// in a header called x-admin-key.
export function requireAdmin(req, res, next) {
  const sentKey = req.get("x-admin-key") || "";
  const realKey = process.env.ADMIN_API_KEY || "";

  // Hash both so they have equal length, then compare in constant time.
  // (A normal === can leak information through how fast it answers.)
  const sentHash = crypto.createHash("sha256").update(sentKey).digest();
  const realHash = crypto.createHash("sha256").update(realKey).digest();

  if (!realKey || !crypto.timingSafeEqual(sentHash, realHash)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next(); // key matched, continue to the controller
}
