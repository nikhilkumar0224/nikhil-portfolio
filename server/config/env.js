import "dotenv/config";

const required = [
  "DB_HOST",
  "DB_USER",
  "DB_NAME",
  "DB_PORT",
  "FRONTEND_URL",
  "ADMIN_API_KEY",
];

const missing = required.filter((name) => !process.env[name]);

if (missing.length > 0) {
  console.error(`❌ Missing environment variables: ${missing.join(", ")}`);
  process.exit(1); // stop now, with a clear message, instead of failing later in a confusing way
}

if (process.env.ADMIN_API_KEY.length < 16) {
  console.error("❌ ADMIN_API_KEY is too short. Use at least 16 characters.");
  process.exit(1);
}
