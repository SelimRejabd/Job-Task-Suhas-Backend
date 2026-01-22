import dotenv from "dotenv";
dotenv.config();

const getEnv = (key: string, required = true, fallback?: string): string => {
  const value = process.env[key] ?? fallback;
  // console.log(`Environment variable ${key}: ${value}`);

  if (required && !value) {
    throw new Error(`Environment variable ${key} is required but not set.`);
  }
  return value!;
};

export const config = {
  port: parseInt(getEnv("PORT", false, "5000")),
  database_url: getEnv("MONGO_URI"),
  node_env: getEnv("NODE_ENV", false, "development"),
  local_frontend_url: getEnv(
    "LOCAL_FRONTEND_URL",
    false,
    "http://localhost:3000",
  ),
  prod_frontend_url: getEnv(
    "PROD_FRONTEND_URL",
    false,
    "https://your-production-domain.com",
  ),
  jwt_access_secret_key: getEnv("JWT_ACCESS_SECRET"),
  jwt_access_expires_in: getEnv("JWT_EXPIRES_IN", false, "1d"),
  jwt_refresh_secret_key: getEnv("JWT_REFRESH_SECRET"),
  jwt_refresh_expires_in: getEnv("JWT_REFRESH_EXPIRES_IN", false, "7d"),
  bcrypt_salt_rounds: getEnv("SALT_ROUNDS", false, "10"),
  cookie_domain: getEnv("COOKIE_DOMAIN", false, "localhost"),
  invite_expires: getEnv("INVITE_EXPIRES", false, "1d"),
  invite_secret: getEnv("INVITE_SECRET"),
  admin_email: getEnv("ADMIN_EMAIL"),
  admin_password: getEnv("ADMIN_PASSWORD"),
};
